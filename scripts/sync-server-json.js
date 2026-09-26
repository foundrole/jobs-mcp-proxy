#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const SEMVER = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?(\+[a-zA-Z0-9.-]+)?$/;
const VERSIONED_MANIFESTS = [
  ".grok-plugin/plugin.json",
  "gemini-extension.json",
];

const readJson = (relativePath) =>
  JSON.parse(readFileSync(join(rootDir, relativePath), "utf8"));
const writeJson = (relativePath, value) =>
  writeFileSync(
    join(rootDir, relativePath),
    `${JSON.stringify(value, null, 2)}\n`
  );

const { version } = readJson("package.json");

if (!SEMVER.test(version)) {
  throw new Error(`Invalid version in package.json: ${version}`);
}

const server = readJson("server.json");
server.version = version;
if (Array.isArray(server.packages)) {
  for (const entry of server.packages) {
    entry.version = version;
  }
}
writeJson("server.json", server);

for (const manifestPath of VERSIONED_MANIFESTS) {
  const manifest = readJson(manifestPath);
  manifest.version = version;
  writeJson(manifestPath, manifest);
}
