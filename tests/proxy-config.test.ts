/**
 * Test suite for ProxyConfig functionality
 * Tests configuration parsing, environment variable handling, and validation
 */

import { describe, expect, test, beforeEach, jest } from "@jest/globals";

// Mock the mcp-proxy module before importing our code
jest.mock("mcp-proxy", () => ({
  ServerType: {
    HTTPStream: "HTTPStream",
  },
  startStdioServer: jest.fn(),
}));

import { getProxyConfig } from "~/index";

import {
  cleanupTestEnvironment,
  createTestEnvironment,
  TEST_ENV_SCENARIOS,
  TEST_URLS,
} from "./utils/test-helpers";

describe("ProxyConfig", () => {
  beforeEach(() => {
    // Clean up any environment variables that might affect tests
    cleanupTestEnvironment(["MCP_TARGET_URL"]);
  });

  describe("getProxyConfig", () => {
    test("returns default configuration when no environment variables are set", () => {
      const config = getProxyConfig();

      expect(config).toEqual({
        debugMode: false,
        targetUrl: TEST_URLS.DEFAULT,
      });
    });

    test("returns configuration with custom URL when MCP_TARGET_URL is set", () => {
      createTestEnvironment(TEST_ENV_SCENARIOS.WITH_CUSTOM_URL);

      const config = getProxyConfig();

      expect(config).toEqual({
        debugMode: true,
        targetUrl: TEST_URLS.LOCALHOST,
      });
    });

    test("enables debug mode when MCP_TARGET_URL is set", () => {
      createTestEnvironment({ MCP_TARGET_URL: "http://example.com/mcp" });

      const config = getProxyConfig();

      expect(config.debugMode).toBe(true);
    });

    test("disables debug mode when MCP_TARGET_URL is not set", () => {
      const config = getProxyConfig();

      expect(config.debugMode).toBe(false);
    });

    test("handles empty string MCP_TARGET_URL", () => {
      createTestEnvironment({ MCP_TARGET_URL: "" });

      const config = getProxyConfig();

      expect(config.targetUrl).toBe(TEST_URLS.DEFAULT);
      expect(config.debugMode).toBe(false);
    });

    test("handles whitespace-only MCP_TARGET_URL", () => {
      createTestEnvironment({ MCP_TARGET_URL: "   " });

      const config = getProxyConfig();

      expect(config.targetUrl).toBe(TEST_URLS.DEFAULT);
      expect(config.debugMode).toBe(false);
    });

    test("preserves exact URL format from environment variable", () => {
      const customUrl = "https://api.example.com/v1/mcp?key=123";
      createTestEnvironment({ MCP_TARGET_URL: customUrl });

      const config = getProxyConfig();

      expect(config.targetUrl).toBe(customUrl);
    });
  });

  describe("URL validation scenarios", () => {
    test("accepts valid HTTP URLs", () => {
      createTestEnvironment({ MCP_TARGET_URL: "http://localhost:3000/mcp" });

      const config = getProxyConfig();

      expect(config.targetUrl).toBeValidUrl();
    });

    test("accepts valid HTTPS URLs", () => {
      createTestEnvironment({ MCP_TARGET_URL: TEST_URLS.SECURE });

      const config = getProxyConfig();

      expect(config.targetUrl).toBeValidUrl();
    });

    test("accepts URLs with query parameters", () => {
      const urlWithQuery =
        "https://api.example.com/mcp?token=abc123&debug=true";
      createTestEnvironment({ MCP_TARGET_URL: urlWithQuery });

      const config = getProxyConfig();

      expect(config.targetUrl).toBe(urlWithQuery);
      expect(config.targetUrl).toBeValidUrl();
    });

    test("accepts URLs with ports", () => {
      const urlWithPort = "http://localhost:8080/mcp";
      createTestEnvironment({ MCP_TARGET_URL: urlWithPort });

      const config = getProxyConfig();

      expect(config.targetUrl).toBe(urlWithPort);
      expect(config.targetUrl).toBeValidUrl();
    });

    test("accepts URLs with paths", () => {
      const urlWithPath = "https://example.com/api/v2/mcp/endpoint";
      createTestEnvironment({ MCP_TARGET_URL: urlWithPath });

      const config = getProxyConfig();

      expect(config.targetUrl).toBe(urlWithPath);
      expect(config.targetUrl).toBeValidUrl();
    });

    test("returns invalid URLs as-is without validation", () => {
      createTestEnvironment({ MCP_TARGET_URL: TEST_URLS.INVALID });

      const config = getProxyConfig();

      expect(config.targetUrl).toBe(TEST_URLS.INVALID);
      expect(config.debugMode).toBe(true);
      // Note: getProxyConfig doesn't validate URLs, it just returns them
    });
  });

  describe("environment variable edge cases", () => {
    test("handles undefined environment variable gracefully", () => {
      delete process.env.MCP_TARGET_URL;

      const config = getProxyConfig();

      expect(config.targetUrl).toBe(TEST_URLS.DEFAULT);
      expect(config.debugMode).toBe(false);
    });

    test("handles environment variable with special characters", () => {
      const specialUrl =
        "https://example.com/mcp?param=value%20with%20spaces&other=123";
      createTestEnvironment({ MCP_TARGET_URL: specialUrl });

      const config = getProxyConfig();

      expect(config.targetUrl).toBe(specialUrl);
      expect(config.debugMode).toBe(true);
    });

    test("handles very long URLs", () => {
      const longUrl = `https://example.com/mcp?${"param=value&".repeat(50)}end=true`;
      createTestEnvironment({ MCP_TARGET_URL: longUrl });

      const config = getProxyConfig();

      expect(config.targetUrl).toBe(longUrl);
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

  describe("boolean conversion for debug mode", () => {
    test("converts truthy strings to true", () => {
      createTestEnvironment({ MCP_TARGET_URL: "any-non-empty-string" });

      const config = getProxyConfig();

      expect(config.debugMode).toBe(true);
    });

    test("converts empty string to false", () => {
      createTestEnvironment({ MCP_TARGET_URL: "" });

      const config = getProxyConfig();

      expect(config.debugMode).toBe(false);
    });

    test("converts undefined to false", () => {
      delete process.env.MCP_TARGET_URL;

      const config = getProxyConfig();

      expect(config.debugMode).toBe(false);
    });

    test("converts string '0' to true (non-empty string)", () => {
      createTestEnvironment({ MCP_TARGET_URL: "0" });

      const config = getProxyConfig();

      expect(config.debugMode).toBe(true);
    });

    test("converts string 'false' to true (non-empty string)", () => {
      createTestEnvironment({ MCP_TARGET_URL: "false" });

      const config = getProxyConfig();

      expect(config.debugMode).toBe(true);
    });
  });
});
