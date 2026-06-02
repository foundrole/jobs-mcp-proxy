#!/usr/bin/env node
/**
 * Keep server.json in sync with package.json's version.
 *
 * The MCP Registry validates that server.json's top-level `version` and each
 * `packages[].version` match the npm package version it points at — a mismatch
 * makes `mcp-publisher publish` reject the manifest. This script copies the
 * version from package.json into server.json so the two never drift.
 *
 * Wired into the npm `version` lifecycle hook (see package.json): `npm version`
 * bumps package.json, then runs this, then `git add`s server.json so it lands
 * in the same version commit/tag the publish workflow triggers on.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");

const pkg = JSON.parse(readFileSync(join(rootDir, "package.json"), "utf8"));
const { version } = pkg;

if (!/^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?(\+[a-zA-Z0-9.-]+)?$/.test(version)) {
  console.error(`Invalid version in package.json: ${version}`);
  process.exit(1);
}

const serverPath = join(rootDir, "server.json");
const server = JSON.parse(readFileSync(serverPath, "utf8"));

server.version = version;
if (Array.isArray(server.packages)) {
  for (const entry of server.packages) {
    entry.version = version;
  }
}

writeFileSync(serverPath, `${JSON.stringify(server, null, 2)}\n`);
console.log(`Synced server.json to ${version}`);
