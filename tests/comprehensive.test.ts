/**
 * Comprehensive test suite for jobs-mcp-proxy
 * Tests all core functionality including configuration, startup, and error handling
 */

import type { ProxyConfig } from "~/index";

import {
  describe,
  expect,
  test,
  beforeEach,
  afterEach,
  jest,
} from "@jest/globals";

// Mock the mcp-proxy module before importing our code
jest.mock("mcp-proxy", () => ({
  ServerType: {
    HTTPStream: "HTTPStream",
  },
  startStdioServer: jest.fn(),
}));

// Import types for mocking
type MockedStartStdioServer = jest.MockedFunction<
  (...args: any[]) => Promise<any>
>;

describe("Jobs MCP Proxy - Comprehensive Test Suite", () => {
  // Store original environment variables
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset environment variables before each test
    process.env = { ...originalEnv };
    jest.clearAllMocks();
    // Clear module cache to ensure fresh imports
    jest.resetModules();
  });

  afterEach(() => {
    // Restore environment variables after each test
    process.env = originalEnv;
  });

  describe("ProxyConfig Functionality", () => {
    test("getProxyConfig returns default configuration when no environment variables are set", async () => {
      // Clean up any environment variables
      delete process.env.MCP_TARGET_URL;

      // Import fresh module after clearing cache
      const indexModule = await import("~/index");
      const config = indexModule.getProxyConfig();

      expect(config).toEqual({
        debugMode: false,
        targetUrl: "https://www.foundrole.com/mcp",
      });
    });

    test("getProxyConfig returns custom configuration when MCP_TARGET_URL is set", async () => {
      process.env.MCP_TARGET_URL = "http://localhost:3002/mcp";

      const indexModule = await import("~/index");
      const config = indexModule.getProxyConfig();

      expect(config).toEqual({
        debugMode: true,
        targetUrl: "http://localhost:3002/mcp",
      });
    });

    test("debug mode is enabled when MCP_TARGET_URL is set", async () => {
      process.env.MCP_TARGET_URL = "https://example.com/mcp";

      const indexModule = await import("~/index");
      const config = indexModule.getProxyConfig();

      expect(config.debugMode).toBe(true);
    });

    test("debug mode is disabled when MCP_TARGET_URL is not set", async () => {
      delete process.env.MCP_TARGET_URL;

      const indexModule = await import("~/index");
      const config = indexModule.getProxyConfig();

      expect(config.debugMode).toBe(false);
    });

    test("handles empty string MCP_TARGET_URL", async () => {
      process.env.MCP_TARGET_URL = "";

      const indexModule = await import("~/index");
      const config = indexModule.getProxyConfig();

      expect(config.targetUrl).toBe("https://www.foundrole.com/mcp");
      expect(config.debugMode).toBe(false);
    });

    test("preserves exact URL format from environment variable", async () => {
      const customUrl = "https://api.example.com/v1/mcp?key=123";
      process.env.MCP_TARGET_URL = customUrl;

      const indexModule = await import("~/index");
      const config = indexModule.getProxyConfig();

      expect(config.targetUrl).toBe(customUrl);
    });
  });

  describe("URL Validation", () => {
    test("accepts valid HTTP URLs", async () => {
      process.env.MCP_TARGET_URL = "http://localhost:3000/mcp";

      const indexModule = await import("~/index");
      const config = indexModule.getProxyConfig();

      // Validate URL format
      expect(() => new URL(config.targetUrl)).not.toThrow();
    });

    test("accepts valid HTTPS URLs", async () => {
      process.env.MCP_TARGET_URL = "https://secure.example.com/mcp";

      const indexModule = await import("~/index");
      const config = indexModule.getProxyConfig();

      expect(() => new URL(config.targetUrl)).not.toThrow();
    });

    test("accepts URLs with query parameters", async () => {
      const urlWithQuery =
        "https://api.example.com/mcp?token=abc123&debug=true";
      process.env.MCP_TARGET_URL = urlWithQuery;

      const indexModule = await import("~/index");
      const config = indexModule.getProxyConfig();

      expect(config.targetUrl).toBe(urlWithQuery);
      expect(() => new URL(config.targetUrl)).not.toThrow();
    });

    test("accepts URLs with ports", async () => {
      const urlWithPort = "http://localhost:8080/mcp";
      process.env.MCP_TARGET_URL = urlWithPort;

      const indexModule = await import("~/index");
      const config = indexModule.getProxyConfig();

      expect(config.targetUrl).toBe(urlWithPort);
      expect(() => new URL(config.targetUrl)).not.toThrow();
    });
  });

  describe("Configuration Edge Cases", () => {
    test("handles undefined environment variable gracefully", async () => {
      delete process.env.MCP_TARGET_URL;

      const indexModule = await import("~/index");
      const config = indexModule.getProxyConfig();

      expect(config.targetUrl).toBe("https://www.foundrole.com/mcp");
      expect(config.debugMode).toBe(false);
    });

    test("handles environment variable with special characters", async () => {
      const specialUrl =
        "https://example.com/mcp?param=value%20with%20spaces&other=123";
      process.env.MCP_TARGET_URL = specialUrl;

      const indexModule = await import("~/index");
      const config = indexModule.getProxyConfig();

      expect(config.targetUrl).toBe(specialUrl);
      expect(config.debugMode).toBe(true);
    });

    test("handles very long URLs", async () => {
      const longUrl = `https://example.com/mcp?${"param=value&".repeat(50)}end=true`;
      process.env.MCP_TARGET_URL = longUrl;

      const indexModule = await import("~/index");
      const config = indexModule.getProxyConfig();

      expect(config.targetUrl).toBe(longUrl);
      expect(config.debugMode).toBe(true);
    });
  });

  describe("Boolean Conversion for Debug Mode", () => {
    test("converts truthy strings to true", async () => {
      process.env.MCP_TARGET_URL = "any-non-empty-string";

      const indexModule = await import("~/index");
      const config = indexModule.getProxyConfig();

      expect(config.debugMode).toBe(true);
    });

    test("converts empty string to false", async () => {
      process.env.MCP_TARGET_URL = "";

      const indexModule = await import("~/index");
      const config = indexModule.getProxyConfig();

      expect(config.debugMode).toBe(false);
    });

    test("converts undefined to false", async () => {
      delete process.env.MCP_TARGET_URL;

      const indexModule = await import("~/index");
      const config = indexModule.getProxyConfig();

      expect(config.debugMode).toBe(false);
    });

    test("converts string '0' to true (non-empty string)", async () => {
      process.env.MCP_TARGET_URL = "0";

      const indexModule = await import("~/index");
      const config = indexModule.getProxyConfig();

      expect(config.debugMode).toBe(true);
    });

    test("converts string 'false' to true (non-empty string)", async () => {
      process.env.MCP_TARGET_URL = "false";

      const indexModule = await import("~/index");
      const config = indexModule.getProxyConfig();

      expect(config.debugMode).toBe(true);
    });
  });

  describe("Configuration Immutability", () => {
    test("returns new configuration object each time", async () => {
      const indexModule = await import("~/index");

      const config1 = indexModule.getProxyConfig();
      const config2 = indexModule.getProxyConfig();

      expect(config1).toEqual(config2);
      expect(config1).not.toBe(config2);
    });

    test("configuration is not affected by mutations", async () => {
      const indexModule = await import("~/index");

      const config = indexModule.getProxyConfig();
      const originalTargetUrl = config.targetUrl;
      const originalDebugMode = config.debugMode;

      // Attempt to mutate the configuration
      (config as any).targetUrl = "mutated-url";
      (config as any).debugMode = !config.debugMode;

      // Get a new configuration
      const newIndexModule = await import("~/index");
      const newConfig = newIndexModule.getProxyConfig();

      expect(newConfig.targetUrl).toBe(originalTargetUrl);
      expect(newConfig.debugMode).toBe(originalDebugMode);
    });
  });

  describe("Proxy Server Functionality", () => {
    // Get reference to the mocked startStdioServer function
    let mockStartStdioServer: jest.MockedFunction<
      (...args: any[]) => Promise<any>
    >;

    beforeEach(async () => {
      // Get the mocked function from the module
      const mcpProxyModule = await import("mcp-proxy");
      mockStartStdioServer =
        mcpProxyModule.startStdioServer as jest.MockedFunction<
          (...args: any[]) => Promise<any>
        >;
    });

    test("startProxy calls startStdioServer with correct parameters", async () => {
      mockStartStdioServer.mockResolvedValue(undefined);

      const indexModule = await import("~/index");
      const { startProxy } = indexModule;

      const config = {
        debugMode: false,
        targetUrl: "https://www.foundrole.com/mcp",
      };

      await startProxy(config);

      expect(mockStartStdioServer).toHaveBeenCalledWith({
        serverType: "HTTPStream",
        url: "https://www.foundrole.com/mcp",
      });
    });

    test("startProxy handles custom configuration", async () => {
      mockStartStdioServer.mockResolvedValue(undefined);

      const indexModule = await import("~/index");
      const { startProxy } = indexModule;

      const config = {
        debugMode: true,
        targetUrl: "http://localhost:3002/mcp",
      };

      await startProxy(config);

      expect(mockStartStdioServer).toHaveBeenCalledWith({
        serverType: "HTTPStream",
        url: "http://localhost:3002/mcp",
      });
    });

    test("startProxy handles connection failures", async () => {
      const connectionError = new Error("Connection failed");
      mockStartStdioServer.mockRejectedValue(connectionError);

      const indexModule = await import("~/index");
      const { startProxy } = indexModule;

      const config = {
        debugMode: false,
        targetUrl: "https://www.foundrole.com/mcp",
      };

      await expect(startProxy(config)).rejects.toThrow("Connection failed");
    });

    test("startProxy preserves original error when connection fails", async () => {
      const originalError = new Error("ECONNREFUSED");
      mockStartStdioServer.mockRejectedValue(originalError);

      const indexModule = await import("~/index");
      const { startProxy } = indexModule;

      const config = {
        debugMode: false,
        targetUrl: "https://www.foundrole.com/mcp",
      };

      await expect(startProxy(config)).rejects.toBe(originalError);
    });
  });

  describe("Error Handling", () => {
    let mockStartStdioServer: jest.MockedFunction<
      (...args: any[]) => Promise<any>
    >;

    beforeEach(async () => {
      // Get the mocked function from the module
      const mcpProxyModule = await import("mcp-proxy");
      mockStartStdioServer =
        mcpProxyModule.startStdioServer as jest.MockedFunction<
          (...args: any[]) => Promise<any>
        >;
    });

    test("handles DNS resolution failure", async () => {
      const dnsError = new Error("ENOTFOUND unknown-domain.example.com");
      mockStartStdioServer.mockRejectedValue(dnsError);

      const indexModule = await import("~/index");
      const { startProxy } = indexModule;

      const config = {
        debugMode: false,
        targetUrl: "https://unknown-domain.example.com/mcp",
      };

      await expect(startProxy(config)).rejects.toThrow(
        "ENOTFOUND unknown-domain.example.com"
      );
    });

    test("handles connection timeout errors", async () => {
      const timeoutError = new Error("ETIMEDOUT");
      mockStartStdioServer.mockRejectedValue(timeoutError);

      const indexModule = await import("~/index");
      const { startProxy } = indexModule;

      const config = {
        debugMode: false,
        targetUrl: "https://www.foundrole.com/mcp",
      };

      await expect(startProxy(config)).rejects.toThrow("ETIMEDOUT");
    });

    test("handles HTTP error responses", async () => {
      const httpError = new Error("HTTP 404: Not Found");
      mockStartStdioServer.mockRejectedValue(httpError);

      const indexModule = await import("~/index");
      const { startProxy } = indexModule;

      const config = {
        debugMode: false,
        targetUrl: "https://www.foundrole.com/mcp",
      };

      await expect(startProxy(config)).rejects.toThrow("HTTP 404: Not Found");
    });
  });

  describe("Module Exports", () => {
    test("exports getProxyConfig function", async () => {
      const indexModule = await import("~/index");

      expect(typeof indexModule.getProxyConfig).toBe("function");
    });

    test("exports startProxy function", async () => {
      const indexModule = await import("~/index");

      expect(typeof indexModule.startProxy).toBe("function");
    });

    test("exports ProxyConfig interface", async () => {
      const indexModule = await import("~/index");

      const config = indexModule.getProxyConfig();

      // Validate that the config object has the expected shape
      expect(config).toHaveProperty("targetUrl");
      expect(config).toHaveProperty("debugMode");
      expect(typeof config.targetUrl).toBe("string");
      expect(typeof config.debugMode).toBe("boolean");
    });
  });

  describe("Integration Test", () => {
    test("complete workflow from environment to proxy startup", async () => {
      // Set up environment
      process.env.MCP_TARGET_URL = "https://test.example.com/mcp";

      // Get the mocked function
      const mcpProxyModule = await import("mcp-proxy");
      const mockStartStdioServer =
        mcpProxyModule.startStdioServer as jest.MockedFunction<
          (...args: any[]) => Promise<any>
        >;
      mockStartStdioServer.mockResolvedValue(undefined);

      // Test the complete workflow
      const indexModule = await import("~/index");
      const { getProxyConfig, startProxy } = indexModule;

      // Get configuration from environment
      const config = indexModule.getProxyConfig();
      expect(config.targetUrl).toBe("https://test.example.com/mcp");
      expect(config.debugMode).toBe(true);

      // Start the proxy with the configuration
      await startProxy(config);

      // Verify the proxy was started with correct parameters
      expect(mockStartStdioServer).toHaveBeenCalledWith({
        serverType: "HTTPStream",
        url: "https://test.example.com/mcp",
      });
    });
  });
});
