import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";

import { describe, expect, it } from "@jest/globals";

import { SERVER_CATALOG } from "../src/server-catalog.js";

const repoRoot = process.cwd();
const claudeSkills = join(repoRoot, "claude-plugin", "skills");
const rootSkills = join(repoRoot, "skills");

const filesUnder = (dir: string): string[] =>
  readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => relative(dir, join(entry.parentPath, entry.name)))
    .sort();

describe("plugin skills", () => {
  it("ships identical guidance and references in both plugin roots", () => {
    const files = filesUnder(claudeSkills);

    expect(files.length).toBeGreaterThan(0);
    expect(filesUnder(rootSkills)).toEqual(files);
    for (const file of files) {
      expect(readFileSync(join(rootSkills, file), "utf8")).toBe(
        readFileSync(join(claudeSkills, file), "utf8")
      );
    }
  });

  it("ships every relative Markdown reference linked from the skills", () => {
    const files = filesUnder(claudeSkills);
    for (const file of files.filter((path) => path.endsWith(".md"))) {
      const markdown = readFileSync(join(claudeSkills, file), "utf8");
      const references = markdown.matchAll(
        /\]\((?![a-z]+:\/\/)([^\s)#]+\.md)(?:#[^)]+)?\)/giu
      );
      for (const [, reference] of references) {
        expect(files).toContain(join(dirname(file), reference));
      }
    }
  });

  it("keeps the versioned distribution manifests on the package version", () => {
    const manifestPaths = [
      ".claude-plugin/plugin.json",
      ".cursor-plugin/plugin.json",
      ".grok-plugin/plugin.json",
      "claude-plugin/.claude-plugin/plugin.json",
      "gemini-extension.json",
      "plugin.json",
      "server.json",
    ];

    const versionOf = (path: string): unknown =>
      (
        JSON.parse(readFileSync(join(repoRoot, path), "utf8")) as {
          version: unknown;
        }
      ).version;
    for (const path of manifestPaths) {
      expect(versionOf(path)).toBe(versionOf("package.json"));
    }
  });
  it("discovers the bundled skill resources at their packaged sizes", () => {
    const resources = SERVER_CATALOG.resources.resources.filter((resource) =>
      resource.uri.startsWith("skill://")
    );
    expect(
      resources.map((resource) => resource.uri.slice("skill://".length)).sort()
    ).toEqual(filesUnder(rootSkills));
    for (const resource of resources) {
      const path = resource.uri.slice("skill://".length);
      expect(resource.size).toBe(readFileSync(join(rootSkills, path)).length);
    }
  });

  it("exposes the same text tools to the stdio and Microsoft packages", () => {
    const microsoftCatalog: unknown = JSON.parse(
      readFileSync(
        join(repoRoot, "microsoft-certification", "mcptools.json"),
        "utf8"
      )
    );
    expect(microsoftCatalog).toEqual(SERVER_CATALOG.tools);
  });
});
