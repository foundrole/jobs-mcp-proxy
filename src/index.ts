#!/usr/bin/env node

import { ServerType, startStdioServer } from "mcp-proxy";

async function main(): Promise<void> {
  // Default to production URL, allow override for debugging
  const targetUrl =
    process.env.MCP_TARGET_URL || "https://www.foundrole.com/mcp";

  console.error("Starting ai-job-search-mcp (stdio -> HTTPStream)");
  console.error(`Target URL: ${targetUrl}`);
  console.error(
    `Debug mode: ${process.env.MCP_TARGET_URL ? "enabled" : "disabled"}`
  );

  try {
    await startStdioServer({
      serverType: ServerType.HTTPStream,
      url: targetUrl,
    });

    console.error("AI Job Search MCP server started successfully");
    console.error("Ready to accept MCP client connections via stdio");
  } catch (error) {
    console.error("Failed to connect to target MCP server:", error);
    console.error(
      `Please check that the target server at ${targetUrl} is accessible`
    );
    console.error(
      "For debugging, try setting MCP_TARGET_URL to a local server"
    );
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Unexpected error starting MCP proxy:", error);
  process.exit(1);
});
