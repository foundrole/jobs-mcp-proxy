import { UnauthorizedError } from "@modelcontextprotocol/sdk/client/auth.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import type { ServerCapabilities } from "@modelcontextprotocol/sdk/types.js";
import { ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

import { createBrowserOAuth } from "./browser-oauth.js";
import { extractClientInfoFromParent } from "./client-detector.js";
import { PROXY_VERSION } from "./constants.js";
import { proxyServer } from "./proxy-server.js";
import { TOOL_CATALOG } from "./tool-catalog.js";

export const BRIDGE_SERVER_INFO = {
  name: "FoundRole MCP",
  title: "FoundRole Jobs",
  version: PROXY_VERSION,
};

export const BRIDGE_CAPABILITIES: ServerCapabilities = {
  completions: {},
  prompts: { listChanged: false },
  resources: { listChanged: false, subscribe: false },
  tools: { listChanged: false },
};

export const startStdioServer = async ({
  url,
}: {
  url: string;
}): Promise<Server> => {
  const originalClientInfo = await extractClientInfoFromParent();
  const oauth = await createBrowserOAuth({ serverUrl: url });

  const createTransport = () =>
    new StreamableHTTPClientTransport(new URL(url), {
      authProvider: oauth.provider,
    });

  const connectClient = async (transport: StreamableHTTPClientTransport) => {
    const client = new Client(originalClientInfo, { capabilities: {} });
    await client.connect(transport as any);
    return client;
  };

  const connectSignedIn = async () => {
    const transport = createTransport();
    try {
      return await connectClient(transport);
    } catch (error) {
      if (!(error instanceof UnauthorizedError)) throw error;
      await transport.finishAuth(await oauth.authorizationCode());
      return connectClient(createTransport());
    }
  };

  let upstream: Promise<Client> | undefined;
  let connected: Client | undefined;
  const getUpstream = () => {
    upstream ??= connectSignedIn().then(
      (client) => (connected = client),
      (error: unknown) => {
        upstream = undefined;
        throw error;
      }
    );
    return upstream;
  };
  getUpstream().catch(() => undefined);

  const stdioServer = new Server(BRIDGE_SERVER_INFO, {
    capabilities: BRIDGE_CAPABILITIES,
  });

  await proxyServer({
    getClient: getUpstream,
    server: stdioServer,
    serverCapabilities: BRIDGE_CAPABILITIES,
  });

  stdioServer.setRequestHandler(ListToolsRequestSchema, async (request) =>
    connected ? connected.listTools(request.params) : TOOL_CATALOG
  );

  await stdioServer.connect(new StdioServerTransport());

  return stdioServer;
};
