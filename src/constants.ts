import fs from "node:fs";
import path from "node:path";

// Find package.json by trying multiple search strategies
function findPackageJson(): string {
  // Strategy 1: Try current working directory (works for local development)
  const cwdPath = path.resolve(process.cwd(), "package.json");
  if (fs.existsSync(cwdPath)) {
    return cwdPath;
  }

  // Strategy 2: Traverse up from current working directory
  let currentDir = process.cwd();
  while (currentDir !== path.dirname(currentDir)) {
    const pkgPath = path.join(currentDir, "package.json");
    if (fs.existsSync(pkgPath)) {
      return pkgPath;
    }
    currentDir = path.dirname(currentDir);
  }

  // Strategy 3: Try common global installation paths relative to process.argv[1] (the script path)
  if (process.argv[1]) {
    let scriptDir = path.dirname(process.argv[1]);
    // Go up from the script location to find package.json
    while (scriptDir !== path.dirname(scriptDir)) {
      const pkgPath = path.join(scriptDir, "package.json");
      if (fs.existsSync(pkgPath)) {
        return pkgPath;
      }
      scriptDir = path.dirname(scriptDir);
    }
  }

  // Fallback: Use hardcoded values if package.json cannot be found
  throw new Error("package.json not found - using fallback values");
}

function getPackageInfo(): { name: string; version: string } {
  try {
    const pkgJsonPath = findPackageJson();
    return JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8")) as {
      name: string;
      version: string;
    };
  } catch {
    // Fallback to hardcoded values when package.json cannot be found
    return {
      name: "@foundrole/ai-job-search-mcp",
      version: "1.0.0",
    };
  }
}

const pkg = getPackageInfo();

export const PROXY_NAME = pkg.name;
export const PROXY_VERSION = pkg.version;
export const USER_AGENT = `${PROXY_NAME}/${PROXY_VERSION}`;
export const MCP_PROTOCOL_VERSION = "2025-03-26";
