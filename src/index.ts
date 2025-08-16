import { ServerType, startStdioServer } from "mcp-proxy";

export interface ProxyConfig {
  debugMode: boolean;
  targetUrl: string;
}

export function getProxyConfig(): ProxyConfig {
  const envTargetUrl = process.env.MCP_TARGET_URL;
  const targetUrl =
    envTargetUrl && envTargetUrl.trim() !== ""
      ? envTargetUrl
      : "https://www.foundrole.com/mcp";
  const debugMode = Boolean(envTargetUrl && envTargetUrl.trim() !== "");

  return {
    debugMode,
    targetUrl,
  };
}

export async function startProxy(config: ProxyConfig): Promise<void> {
  console.error("Starting ai-job-search-mcp (stdio -> HTTPStream)");
  console.error(`Target URL: ${config.targetUrl}`);
  console.error(`Debug mode: ${config.debugMode ? "enabled" : "disabled"}`);

  try {
    await startStdioServer({
      serverType: ServerType.HTTPStream,
      url: config.targetUrl,
    });

    console.error("AI Job Search MCP server started successfully");
    console.error("Ready to accept MCP client connections via stdio");
  } catch (error) {
    console.error("Failed to connect to target MCP server:", error);
    console.error(
      `Please check that the target server at ${config.targetUrl} is accessible`
    );
    console.error(
      "For debugging, try setting MCP_TARGET_URL to a local server"
    );
    throw error;
  }
}

export async function main(): Promise<void> {
  try {
    const config = getProxyConfig();
    await startProxy(config);
  } catch (error) {
    console.error("Unexpected error starting MCP proxy:", error);
    process.exit(1);
  }
}
