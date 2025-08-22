import type { ProxyConfig } from "./types.js";

export function getProxyConfig(): ProxyConfig {
  const envTargetUrl = process.env.MCP_TARGET_URL;
  const hasCustomUrl = !!(envTargetUrl && envTargetUrl.trim());
  const targetUrl = hasCustomUrl
    ? envTargetUrl
    : "https://www.foundrole.com/mcp";
  const debugMode = hasCustomUrl;

  return {
    debugMode,
    targetUrl,
  };
}
