import { readFileSync } from "fs";
import { dirname, join, resolve } from "path";

import type {
  ApplicationInfo,
  PlistInfo,
  VersionExtractionResult,
} from "./types.js";

/**
 * Cross-platform version extractor for applications
 */
export class VersionExtractor {
  /**
   * Extracts version information from an executable path
   */
  static async extractVersion(
    executablePath: string,
    processName?: string
  ): Promise<VersionExtractionResult> {
    const platform = process.platform;

    console.error(
      `[VERSION-EXTRACTOR] Extracting version for: ${executablePath} on ${platform}`
    );

    try {
      switch (platform) {
        case "darwin":
          return await this.extractMacOSVersion(executablePath, processName);
        case "win32":
          return await this.extractWindowsVersion(executablePath);
        case "linux":
          return await this.extractLinuxVersion(executablePath);
        default:
          return {
            error: `Unsupported platform: ${platform}`,
            source: "fallback",
          };
      }
    } catch (error) {
      console.error(`[VERSION-EXTRACTOR] Error: ${String(error)}`);
      return {
        error: error instanceof Error ? error.message : String(error),
        source: "fallback",
      };
    }
  }

  /**
   * Extracts version from macOS application bundles or executables
   */
  private static async extractMacOSVersion(
    executablePath: string,
    processName?: string
  ): Promise<VersionExtractionResult> {
    try {
      // Try to find .app or .xpc bundle
      const appBundlePath = this.findMacOSAppBundle(executablePath);

      if (appBundlePath) {
        return await this.extractFromPlist(appBundlePath);
      }

      // Fallback: try to parse version from path or process name
      if (processName) {
        const versionMatch = processName.match(/(\d+\.\d+(?:\.\d+)?)/);
        if (versionMatch && versionMatch[1]) {
          return {
            source: "fallback",
            version: versionMatch[1],
          };
        }
      }

      return {
        error: "Could not find app bundle or extract version",
        source: "fallback",
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : String(error),
        source: "fallback",
      };
    }
  }

  /**
   * Extracts version from Windows PE executables
   */
  private static async extractWindowsVersion(
    executablePath: string
  ): Promise<VersionExtractionResult> {
    try {
      // Dynamic import since win-version-info is Windows-only
      const winVersionInfo = await import("win-version-info");
      const versionInfo = winVersionInfo.default(executablePath);

      if (versionInfo && versionInfo.FileVersion) {
        return {
          source: "executable",
          version: versionInfo.FileVersion,
        };
      }

      if (versionInfo && versionInfo.ProductVersion) {
        return {
          source: "executable",
          version: versionInfo.ProductVersion,
        };
      }

      return {
        error: "No version information found in PE file",
        source: "fallback",
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : String(error),
        source: "fallback",
      };
    }
  }

  /**
   * Extracts version from Linux ELF executables
   */
  private static async extractLinuxVersion(
    executablePath: string
  ): Promise<VersionExtractionResult> {
    try {
      // Dynamic import since elfy might not work on all platforms
      const elfy = await import("elfy");
      const elf = elfy.parse(readFileSync(executablePath));

      // ELF files don't typically contain version info in a standard way
      // Try to find version in string sections
      if (elf.body && elf.body.sections) {
        for (const section of elf.body.sections) {
          if (section.name === ".rodata" || section.name === ".comment") {
            const content = section.data?.toString();
            if (content) {
              const versionMatch = content.match(/(\d+\.\d+(?:\.\d+)?)/);
              if (versionMatch) {
                return {
                  source: "executable",
                  version: versionMatch[1],
                };
              }
            }
          }
        }
      }

      return {
        error: "No version information found in ELF file",
        source: "fallback",
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : String(error),
        source: "fallback",
      };
    }
  }

  /**
   * Finds macOS .app or .xpc bundle path from executable path
   */
  private static findMacOSAppBundle(executablePath: string): string | null {
    let currentPath = resolve(executablePath);

    // Walk up the directory tree looking for .app or .xpc bundle
    while (currentPath !== dirname(currentPath)) {
      if (currentPath.endsWith(".app") || currentPath.endsWith(".xpc")) {
        return currentPath;
      }
      currentPath = dirname(currentPath);
    }

    return null;
  }

  /**
   * Extracts version from macOS Info.plist file
   */
  private static async extractFromPlist(
    appBundlePath: string
  ): Promise<VersionExtractionResult> {
    try {
      const plistPath = join(appBundlePath, "Contents", "Info.plist");
      const plist = await import("plist");

      const plistContent = readFileSync(plistPath, "utf8");
      const parsed = plist.default
        ? plist.default.parse(plistContent)
        : plist.parse(plistContent);

      // Cast to PlistInfo interface for type-safe property access
      const plistObj = parsed as PlistInfo;

      // Try different version keys
      const version =
        plistObj.CFBundleShortVersionString ||
        plistObj.CFBundleVersion ||
        plistObj.CFBundleVersionString;

      if (version) {
        console.error(`[VERSION-EXTRACTOR] Found version in plist: ${version}`);
        return {
          source: "plist",
          version: String(version),
        };
      }

      return {
        error: "No version found in Info.plist",
        source: "fallback",
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : String(error),
        source: "fallback",
      };
    }
  }

  /**
   * Gets application info with proper version detection
   */
  static async getApplicationInfo(
    executablePath: string,
    processName: string,
    fallbackVersion?: string
  ): Promise<ApplicationInfo> {
    const versionResult = await this.extractVersion(
      executablePath,
      processName
    );

    const bundlePath =
      process.platform === "darwin"
        ? this.findMacOSAppBundle(executablePath)
        : null;

    return {
      executablePath,
      name: processName,
      version: versionResult.version || fallbackVersion || "unknown",
      ...(bundlePath && { bundlePath }),
    };
  }
}
