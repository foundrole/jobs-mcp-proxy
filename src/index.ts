import { getProxyConfig } from "./config.js";
import { PROXY_NAME, PROXY_VERSION } from "./constants.js";
import { startStdioServer } from "./stdio-server.js";
import type { ProxyConfig } from "./types.js";

export { getProxyConfig } from "./config.js";
export { PROXY_NAME, PROXY_VERSION } from "./constants.js";
export { startStdioServer } from "./stdio-server.js";
export type { ProxyConfig } from "./types.js";

// Safe console.error wrapper that handles errors gracefully
function safeConsoleError(...args: any[]): void {
  try {
    console.error(...args);
  } catch {
    // Silently ignore console errors to prevent crashes
    // In production, logging infrastructure might be broken
  }
}

export async function startProxy(config: ProxyConfig): Promise<() => void> {
  safeConsoleError(`Starting ${PROXY_NAME} (stdio -> HTTPStream)`);
  safeConsoleError(`Target URL: ${config.targetUrl}`);
  safeConsoleError(`Debug mode: ${config.debugMode ? "enabled" : "disabled"}`);

  try {
    await startStdioServer({
      url: config.targetUrl,
    });

    safeConsoleError("AI Job Search MCP server started successfully");
    safeConsoleError("Ready to accept MCP client connections via stdio");
    safeConsoleError("Original client info will be forwarded to backend");

    const sigintHandler = () => {
      safeConsoleError("Shutting down proxy server...");
      process.exit(0);
    };

    const sigtermHandler = () => {
      safeConsoleError("Shutting down proxy server...");
      process.exit(0);
    };

    process.on("SIGINT", sigintHandler);
    process.on("SIGTERM", sigtermHandler);

    return () => {
      process.removeListener("SIGINT", sigintHandler);
      process.removeListener("SIGTERM", sigtermHandler);
    };
  } catch (error) {
    safeConsoleError("Failed to connect to target MCP server:", error);
    safeConsoleError(
      `Please check that the target server at ${config.targetUrl} is accessible`
    );
    safeConsoleError(
      "For debugging, try setting MCP_TARGET_URL to a local server"
    );
    throw error;
  }
}

export async function main(): Promise<() => void> {
  try {
    const config = getProxyConfig();
    return await startProxy(config);
  } catch (error) {
    safeConsoleError("Unexpected error starting MCP proxy:", error);
    process.exit(1);
  }
}
