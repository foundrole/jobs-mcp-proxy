#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

async function main(): Promise<void> {
  const targetUrl = process.env.MCP_TARGET_URL || "http://localhost:3002/mcp";

  console.error(`Starting MCP stdio proxy, forwarding to: ${targetUrl}`);

  const server = new Server(
    {
      name: "jobs-mcp-proxy",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("MCP proxy server started successfully");
}

main().catch((error) => {
  console.error("Failed to start MCP proxy:", error);
  process.exit(1);
});
