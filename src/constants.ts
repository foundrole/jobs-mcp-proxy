import fs from "node:fs";
import path from "node:path";

const pkgJsonPath = path.resolve(process.cwd(), "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8")) as {
  name: string;
  version: string;
};

export const PROXY_NAME = pkg.name;
export const PROXY_VERSION = pkg.version;
export const USER_AGENT = `${PROXY_NAME}/${PROXY_VERSION}`;
export const MCP_PROTOCOL_VERSION = "2025-03-26";
