import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { UnauthorizedError } from "@modelcontextprotocol/sdk/client/auth.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

import { createBrowserOAuth, openInBrowser } from "../dist/browser-oauth.js";

const CATALOG_PATH = new URL("../src/server-catalog.ts", import.meta.url);

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

const listAll = async (list, key) => {
  const items = [];
  let cursor;
  do {
    const page = await list(cursor ? { cursor } : {});
    items.push(...page[key]);
    cursor = page.nextCursor;
  } while (cursor);
  return { [key]: items };
};

const client = await connectSignedIn();
const catalog = {
  prompts: await listAll((params) => client.listPrompts(params), "prompts"),
  resources: await listAll(
    (params) => client.listResources(params),
    "resources"
  ),
  resourceTemplates: await listAll(
    (params) => client.listResourceTemplates(params),
    "resourceTemplates"
  ),
  tools: await listAll((params) => client.listTools(params), "tools"),
};
await client.close();

writeFileSync(
  CATALOG_PATH,
  `import type { ServerCatalog } from "./server-catalog-types.js";\n\n` +
    `export const SERVER_CATALOG: ServerCatalog = ${JSON.stringify(catalog, null, 2)};\n`
);
execFileSync("npx", ["prettier", "--write", fileURLToPath(CATALOG_PATH)], {
  stdio: "ignore",
});
process.stdout.write(
  `${serverUrl}: ${catalog.tools.tools.length} tools, ${catalog.prompts.prompts.length} prompts, ` +
    `${catalog.resources.resources.length} resources, ` +
    `${catalog.resourceTemplates.resourceTemplates.length} resource templates\n`
);
