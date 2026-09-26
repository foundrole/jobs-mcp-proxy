import { UnauthorizedError } from "@modelcontextprotocol/sdk/client/auth.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import type { ServerCapabilities } from "@modelcontextprotocol/sdk/types.js";

import { createBrowserOAuth } from "./browser-oauth.js";
import { extractClientInfoFromParent } from "./client-detector.js";
import { proxyServer } from "./proxy-server.js";

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

  const httpClient = await connectSignedIn();

  const serverVersion = httpClient.getServerVersion() as {
    name: string;
    version: string;
  };

  const serverCapabilities =
    httpClient.getServerCapabilities() as ServerCapabilities;

  const stdioServer = new Server(serverVersion, {
    capabilities: serverCapabilities,
  });

  const stdioTransport = new StdioServerTransport();
  await stdioServer.connect(stdioTransport);

  await proxyServer({
    client: httpClient,
    server: stdioServer,
    serverCapabilities,
  });

  return stdioServer;
};
