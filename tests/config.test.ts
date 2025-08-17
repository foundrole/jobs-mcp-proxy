/**
 * Configuration functionality tests
 * Tests getProxyConfig function without complex mocking
 */

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

import { getProxyConfig } from "~/index";

describe("Configuration Tests", () => {
  // Store original environment variables
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset environment variables before each test
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restore environment variables after each test
    process.env = originalEnv;
  });

  describe("getProxyConfig", () => {
    test("returns default configuration when no environment variables are set", () => {
      delete process.env.MCP_TARGET_URL;

      const config = getProxyConfig();

      expect(config).toEqual({
        debugMode: false,
        targetUrl: "https://www.foundrole.com/mcp",
      });
    });

    test("returns custom configuration when MCP_TARGET_URL is set", () => {
      process.env.MCP_TARGET_URL = "http://localhost:3002/mcp";

      const config = getProxyConfig();

      expect(config).toEqual({
        debugMode: true,
        targetUrl: "http://localhost:3002/mcp",
      });
    });

    test("enables debug mode when MCP_TARGET_URL is set", () => {
      process.env.MCP_TARGET_URL = "https://example.com/mcp";

      const config = getProxyConfig();

      expect(config.debugMode).toBe(true);
    });

    test("disables debug mode when MCP_TARGET_URL is not set", () => {
      delete process.env.MCP_TARGET_URL;

      const config = getProxyConfig();

      expect(config.debugMode).toBe(false);
    });

    test("handles empty string MCP_TARGET_URL", () => {
      process.env.MCP_TARGET_URL = "";

      const config = getProxyConfig();

      expect(config.targetUrl).toBe("https://www.foundrole.com/mcp");
      expect(config.debugMode).toBe(false);
    });

    test("preserves exact URL format from environment variable", () => {
      const customUrl = "https://api.example.com/v1/mcp?key=123";
      process.env.MCP_TARGET_URL = customUrl;

      const config = getProxyConfig();

      expect(config.targetUrl).toBe(customUrl);
    });
  });

  describe("URL validation", () => {
    test("accepts valid HTTP URLs", () => {
      process.env.MCP_TARGET_URL = "http://localhost:3000/mcp";

      const config = getProxyConfig();

      // Validate URL format
      expect(() => new URL(config.targetUrl)).not.toThrow();
    });

    test("accepts valid HTTPS URLs", () => {
      process.env.MCP_TARGET_URL = "https://secure.example.com/mcp";

      const config = getProxyConfig();

      expect(() => new URL(config.targetUrl)).not.toThrow();
    });

    test("accepts URLs with query parameters", () => {
      const urlWithQuery =
        "https://api.example.com/mcp?token=abc123&debug=true";
      process.env.MCP_TARGET_URL = urlWithQuery;

      const config = getProxyConfig();

      expect(config.targetUrl).toBe(urlWithQuery);
      expect(() => new URL(config.targetUrl)).not.toThrow();
    });

    test("accepts URLs with ports", () => {
      const urlWithPort = "http://localhost:8080/mcp";
      process.env.MCP_TARGET_URL = urlWithPort;

      const config = getProxyConfig();

      expect(config.targetUrl).toBe(urlWithPort);
      expect(() => new URL(config.targetUrl)).not.toThrow();
    });
  });

  describe("edge cases", () => {
    test("handles undefined environment variable gracefully", () => {
      delete process.env.MCP_TARGET_URL;

      const config = getProxyConfig();

      expect(config.targetUrl).toBe("https://www.foundrole.com/mcp");
      expect(config.debugMode).toBe(false);
    });

    test("handles environment variable with special characters", () => {
      const specialUrl =
        "https://example.com/mcp?param=value%20with%20spaces&other=123";
      process.env.MCP_TARGET_URL = specialUrl;

      const config = getProxyConfig();

      expect(config.targetUrl).toBe(specialUrl);
      expect(config.debugMode).toBe(true);
    });

    test("handles very long URLs", () => {
      const longUrl = `https://example.com/mcp?${"param=value&".repeat(50)}end=true`;
      process.env.MCP_TARGET_URL = longUrl;

      const config = getProxyConfig();

      expect(config.targetUrl).toBe(longUrl);
      expect(config.debugMode).toBe(true);
    });
  });

  describe("boolean conversion for debug mode", () => {
    test("converts truthy strings to true", () => {
      process.env.MCP_TARGET_URL = "any-non-empty-string";

      const config = getProxyConfig();

      expect(config.debugMode).toBe(true);
    });

    test("converts empty string to false", () => {
      process.env.MCP_TARGET_URL = "";

      const config = getProxyConfig();

      expect(config.debugMode).toBe(false);
    });

    test("converts undefined to false", () => {
      delete process.env.MCP_TARGET_URL;

      const config = getProxyConfig();

      expect(config.debugMode).toBe(false);
    });

    test("converts string '0' to true (non-empty string)", () => {
      process.env.MCP_TARGET_URL = "0";

      const config = getProxyConfig();

      expect(config.debugMode).toBe(true);
    });

    test("converts string 'false' to true (non-empty string)", () => {
      process.env.MCP_TARGET_URL = "false";

      const config = getProxyConfig();

      expect(config.debugMode).toBe(true);
    });
  });

  describe("configuration immutability", () => {
    test("returns new configuration object each time", () => {
      const config1 = getProxyConfig();
      const config2 = getProxyConfig();

      expect(config1).toEqual(config2);
      expect(config1).not.toBe(config2);
    });

    test("configuration is not affected by mutations", () => {
      const config = getProxyConfig();
      const originalTargetUrl = config.targetUrl;
      const originalDebugMode = config.debugMode;

      // Attempt to mutate the configuration
      (config as any).targetUrl = "mutated-url";
      (config as any).debugMode = !config.debugMode;

      // Get a new configuration
      const newConfig = getProxyConfig();

      expect(newConfig.targetUrl).toBe(originalTargetUrl);
      expect(newConfig.debugMode).toBe(originalDebugMode);
    });
  });
});
