import findProcess from "find-process";

import { PROXY_NAME, PROXY_VERSION } from "./constants.js";
import type { ClientInfo } from "./types.js";
import { VersionExtractor } from "./version-extractor.js";

interface ProcessInfo {
  cmd: string;
  name: string;
  pid: number;
  ppid: number;
}

/**
 * Gets OS-friendly name from platform
 */
function getOSName(): string {
  switch (process.platform) {
    case "darwin":
      return "macOS";
    case "win32":
      return "Windows";
    case "linux":
      return "Linux";
    default:
      return process.platform;
  }
}

/**
 * Extracts app name from executable path
 */
function extractAppName(executablePath: string, processName: string): string {
  if (process.platform === "darwin") {
    // Extract app name from macOS .app bundle
    const appMatch = executablePath.match(/([^/]+)\.app$/);
    if (appMatch && appMatch[1]) {
      return appMatch[1];
    }

    // Extract service name from macOS .xpc bundle
    const xpcMatch = executablePath.match(/([^/]+)\.xpc$/);
    if (xpcMatch && xpcMatch[1]) {
      return xpcMatch[1];
    }
  }

  if (process.platform === "win32") {
    // Extract executable name without .exe extension
    const exeMatch = executablePath.match(/([^/\\]+)\.exe$/i);
    if (exeMatch && exeMatch[1]) {
      return exeMatch[1];
    }
  }

  // For Linux or fallback, use process name
  return processName;
}

/**
 * Extracts executable path from process command line
 */
function extractExecutablePath(
  cmd: string,
  processName: string
): string | null {
  // For macOS, look for .app and .xpc bundle paths
  if (process.platform === "darwin") {
    // Strategy: Find bundle patterns and extract the containing bundle path
    // Look for paths that end with .app or .xpc (before / or space that starts a new argument)

    // Try to find patterns like /path/to/App Name.app or /path/to/ServiceName.xpc
    // Look for the full path to the bundle, handling spaces in directory names

    // Match complete bundle paths that end with .app or .xpc (before /Contents or end)
    const bundlePathMatch = cmd.match(/(.*?\.(?:app|xpc))(?=\/Contents|\/|$)/i);

    if (bundlePathMatch && bundlePathMatch[1]) {
      return bundlePathMatch[1];
    }

    // Fallback: if no clear bundle/Contents pattern, look for any .app or .xpc
    const simpleBundleMatch = cmd.match(/([^"\s]+\.(?:app|xpc))/i);
    if (simpleBundleMatch && simpleBundleMatch[1]) {
      return simpleBundleMatch[1];
    }
  }

  // For Windows, look for .exe paths
  if (process.platform === "win32") {
    const exeMatch = cmd.match(/([^\s]*\.exe)/i);
    if (exeMatch && exeMatch[1]) {
      return exeMatch[1];
    }
  }

  // Generic approach: first word in command is usually the executable
  const parts = cmd.trim().split(/\s+/);
  if (parts.length > 0 && parts[0] && parts[0] !== processName) {
    return parts[0];
  }

  return null;
}

/**
 * Extracts version from process command line arguments
 */
function extractVersionFromCommand(cmd: string): string | null {
  // Look for common version patterns in command line
  const versionPatterns = [
    /--version[=\s]+([0-9]+\.[0-9]+\.[0-9]+)/i,
    /-v[=\s]+([0-9]+\.[0-9]+\.[0-9]+)/i,
    /version[=:\s]+([0-9]+\.[0-9]+\.[0-9]+)/i,
    /([0-9]+\.[0-9]+\.[0-9]+)/i, // Generic semver pattern
  ];

  for (const pattern of versionPatterns) {
    const match = cmd.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Identifies client from process information using direct app name extraction
 */
async function identifyClientFromProcess(
  process: ProcessInfo
): Promise<ClientInfo> {
  const { cmd, name } = process;

  console.error(`[CLIENT-DETECTOR] Analyzing process: ${name} (${cmd})`);

  try {
    // Extract executable path from command
    const executablePath = extractExecutablePath(cmd, name);

    if (!executablePath) {
      console.error(
        "[CLIENT-DETECTOR] Could not extract executable path, using proxy identity"
      );
      return {
        name: PROXY_NAME,
        version: PROXY_VERSION,
      };
    }

    console.error(
      `[CLIENT-DETECTOR] Extracted executable path: ${executablePath}`
    );

    // Extract app name from executable path
    const appName = extractAppName(executablePath, name);
    const osName = getOSName();
    const clientName = `${osName}//${appName}`;

    console.error(`[CLIENT-DETECTOR] Extracted app name: ${appName}`);

    // Try to extract version from executable
    let version = "unknown"; // Default to unknown when app is identified but version fails

    try {
      console.error(
        `[CLIENT-DETECTOR] Extracting version from: ${executablePath}`
      );
      const versionResult = await VersionExtractor.extractVersion(
        executablePath,
        name
      );

      if (versionResult.version) {
        version = versionResult.version;
        console.error(
          `[CLIENT-DETECTOR] Version extracted from ${versionResult.source}: ${version}`
        );
      } else {
        console.error(
          `[CLIENT-DETECTOR] Version extraction failed: ${versionResult.error}`
        );
        // Try extracting from command line as fallback
        const cmdVersion = extractVersionFromCommand(cmd);
        if (cmdVersion) {
          version = cmdVersion;
          console.error(
            `[CLIENT-DETECTOR] Version extracted from command: ${version}`
          );
        } else {
          console.error(`[CLIENT-DETECTOR] No version found, using 'unknown'`);
        }
      }
    } catch (error) {
      console.error(
        `[CLIENT-DETECTOR] Version extraction error: ${String(error)}`
      );
      // Try command line extraction as final fallback
      const cmdVersion = extractVersionFromCommand(cmd);
      if (cmdVersion) {
        version = cmdVersion;
        console.error(
          `[CLIENT-DETECTOR] Version extracted from command: ${version}`
        );
      }
    }

    console.error(`[CLIENT-DETECTOR] Identified as ${clientName}@${version}`);
    return {
      name: clientName,
      version,
    };
  } catch (error) {
    console.error(
      `[CLIENT-DETECTOR] Error during client identification: ${String(error)}`
    );
    console.error("[CLIENT-DETECTOR] Using proxy identity as fallback");
    return {
      name: PROXY_NAME,
      version: PROXY_VERSION,
    };
  }
}

/**
 * Extracts original client info from parent process
 */
export async function extractClientInfoFromParent(): Promise<ClientInfo> {
  const parentPid = process.ppid;

  if (!parentPid || parentPid === undefined) {
    console.error("[CLIENT-DETECTOR] No parent PID available");
    return {
      name: PROXY_NAME,
      version: PROXY_VERSION,
    };
  }

  try {
    console.error(
      `[CLIENT-DETECTOR] Looking up parent process PID: ${parentPid}`
    );
    const processes = await (findProcess as any).default("pid", parentPid);

    if (processes.length === 0) {
      console.error(`[CLIENT-DETECTOR] Parent process ${parentPid} not found`);
      return {
        name: PROXY_NAME,
        version: PROXY_VERSION,
      };
    }

    const parentProcess = processes[0] as ProcessInfo;
    return await identifyClientFromProcess(parentProcess);
  } catch (error) {
    console.error(
      `[CLIENT-DETECTOR] Error looking up parent process: ${String(error)}`
    );
    return {
      name: PROXY_NAME,
      version: PROXY_VERSION,
    };
  }
}
