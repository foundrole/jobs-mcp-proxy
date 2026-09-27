import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { UnauthorizedError } from "@modelcontextprotocol/sdk/client/auth.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

import { createBrowserOAuth, openInBrowser } from "../dist/browser-oauth.js";

const CATALOG_PATH = new URL("../src/tool-catalog.ts", import.meta.url);

const serverUrl = process.argv[2];
if (!serverUrl) {
  process.stderr.write("Usage: npm run snapshot:tools -- <mcp-server-url>\n");
  process.exit(1);
}
const oauth = await createBrowserOAuth({
  openBrowser: async (url) => {
    process.stdout.write(`Sign in to FoundRole: ${url}\n`);
    await openInBrowser(url);
  },
  serverUrl,
});
const createTransport = () =>
  new StreamableHTTPClientTransport(new URL(serverUrl), {
    authProvider: oauth.provider,
  });

const connect = async (transport) => {
  const client = new Client(
    { name: "foundrole-tool-snapshot", version: "1" },
    { capabilities: {} }
  );
  await client.connect(transport);
  return client;
};

const connectSignedIn = async () => {
  const transport = createTransport();
  try {
    return await connect(transport);
  } catch (error) {
    if (!(error instanceof UnauthorizedError)) throw error;
    await transport.finishAuth(await oauth.authorizationCode());
    return connect(createTransport());
  }
};

const client = await connectSignedIn();
const tools = [];
let cursor;
do {
  const page = await client.listTools(cursor ? { cursor } : {});
  tools.push(...page.tools);
  cursor = page.nextCursor;
} while (cursor);
await client.close();

writeFileSync(
  CATALOG_PATH,
  `import type { ListToolsResult } from "@modelcontextprotocol/sdk/types.js";\n\n` +
    `export const TOOL_CATALOG: ListToolsResult = ${JSON.stringify({ tools }, null, 2)};\n`
);
execFileSync("npx", ["prettier", "--write", fileURLToPath(CATALOG_PATH)], {
  stdio: "ignore",
});
process.stdout.write(
  `${tools.length} tools from ${serverUrl}: ${tools.map((tool) => tool.name).join(", ")}\n`
);
