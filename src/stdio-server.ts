import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import type { ServerCapabilities } from "@modelcontextprotocol/sdk/types.js";

import { extractClientInfoFromParent } from "./client-detector.js";
import { proxyServer } from "./proxy-server.js";

export const startStdioServer = async ({
  url,
}: {
  url: string;
}): Promise<Server> => {
  // Detect original client from parent process
  const originalClientInfo = await extractClientInfoFromParent();
  console.error(
    `[PROXY] Using client identity: ${originalClientInfo.name}@${originalClientInfo.version}`
  );

  const createHttpClient = async () => {
    const transport = new StreamableHTTPClientTransport(new URL(url));
    const client = new Client(originalClientInfo, { capabilities: {} });
    // Type assertion needed due to MCP SDK type incompatibility:
    // StreamableHTTPClientTransport.sessionId is string|undefined but Transport expects string
    await client.connect(transport as any);
    return client;
  };

  // Create HTTP client with original client identity
  const httpClient = await createHttpClient();

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
