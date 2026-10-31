import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

import { describe, expect, it } from "@jest/globals";

const repoRoot = process.cwd();
const claudeSkills = join(repoRoot, "claude-plugin", "skills");
const antigravitySkills = join(repoRoot, "skills");

const filesUnder = (dir: string): string[] =>
  readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => relative(dir, join(entry.parentPath, entry.name)))
    .sort();

describe("plugin skills", () => {
  it("ships the same skill files to Antigravity as to Claude", () => {
    const files = filesUnder(claudeSkills);

    expect(files.length).toBeGreaterThan(0);
    expect(filesUnder(antigravitySkills)).toEqual(files);
    for (const file of files) {
      expect(readFileSync(join(antigravitySkills, file), "utf8")).toBe(
        readFileSync(join(claudeSkills, file), "utf8")
      );
    }
  });
});
