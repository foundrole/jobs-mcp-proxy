#!/usr/bin/env node
/**
 * Release strictly as the FoundRole bot — never under a human GitHub account.
 *
 * Why this exists: `git push` authenticates against whatever credentials the
 * `origin` remote uses (your SSH key / gh login), and GitHub attributes the
 * push — and any triggered Action — to THAT account, regardless of the git
 * author. Pushing a release tag by hand therefore leaks the human's identity
 * into the push event and the workflow actor.
 *
 * This script pushes over an HTTPS URL carrying the bot token
 * (https://x-access-token:<token>@github.com/...), so the push, the tag, and
 * the publish-mcp Action are always attributed to the bot. Commit/tag identity
 * is forced to the bot too. Same approach as ai-pipelines' gh-bot layer.
 *
 * Usage:
 *   GH_BOT_TOKEN=... GH_BOT_USERNAME=FoundRoleApp GH_BOT_EMAIL=...noreply... \
 *     node scripts/release.mjs <patch|minor|major|x.y.z>
 *
 * It bumps the version (npm version runs the `version` hook → syncs server.json),
 * then pushes the branch + tag as the bot. It does NOT publish to npm — run
 * `npm run publish:npm` first (the registry requires the npm package to exist
 * before the tag triggers `mcp-publisher publish`).
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const REPO = "foundrole/jobs-mcp-proxy";
const bump = process.argv[2];

if (!bump) {
  console.error("usage: node scripts/release.mjs <patch|minor|major|x.y.z>");
  process.exit(1);
}

const token = process.env.GH_BOT_TOKEN;
const user = process.env.GH_BOT_USERNAME || "FoundRoleApp";
const email = process.env.GH_BOT_EMAIL;

if (!token || !email) {
  console.error(
    "GH_BOT_TOKEN and GH_BOT_EMAIL must be set (the bot's classic PAT and its " +
      "@users.noreply.github.com address). Load them from ai-pipelines/.env."
  );
  process.exit(1);
}

if (!/@users\.noreply\.github\.com$/.test(email)) {
  console.error(
    `GH_BOT_EMAIL must be a @users.noreply.github.com address, got: ${email}`
  );
  process.exit(1);
}

// Force bot identity on every git object this script creates.
const env = {
  ...process.env,
  GIT_AUTHOR_NAME: user,
  GIT_AUTHOR_EMAIL: email,
  GIT_COMMITTER_NAME: user,
  GIT_COMMITTER_EMAIL: email,
};

const git = (args, opts = {}) =>
  execFileSync("git", args, { stdio: "inherit", env, ...opts });
const gitOut = (args) =>
  execFileSync("git", args, { encoding: "utf8", env }).trim();

const branch = gitOut(["rev-parse", "--abbrev-ref", "HEAD"]);

// 1. Bump version. `npm version` runs the `version` lifecycle hook
//    (sync-server-json.js + git add server.json), commits, and creates the tag —
//    all under the bot identity via env above.
execFileSync("npm", ["version", bump], { stdio: "inherit", env });
// Read the bumped version straight from package.json. (Parsing `npm pkg get`
// output is fragile — depending on the npm version it returns either a
// JSON-quoted "1.2.3" or a bare 1.2.3, and the bare form is not valid JSON.)
const pkgUrl = new URL("../package.json", import.meta.url);
const tag = `v${JSON.parse(readFileSync(pkgUrl, "utf8")).version}`;

// 2. Push branch + tag over a bot-token URL so GitHub attributes everything to
//    the bot — NOT to whoever owns the configured `origin` remote.
const pushUrl = `https://x-access-token:${token}@github.com/${REPO}.git`;
const redact = (s) => s.split(token).join("***");

try {
  git(["-c", "credential.helper=", "push", pushUrl, `${branch}:${branch}`]);
  git(["-c", "credential.helper=", "push", pushUrl, `${tag}:${tag}`]);
} catch (e) {
  console.error(redact(String(e.message || e)));
  process.exit(1);
}

console.log(
  `\nReleased ${tag} as ${user}. The publish-mcp Action will run on the tag.`
);
