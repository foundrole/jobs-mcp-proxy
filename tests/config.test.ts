/**
 * Configuration functionality tests
 * Tests getProxyConfig function with comprehensive coverage
 */

import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";

import { getProxyConfig } from "../src/config.js";

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

    test("handles whitespace-only MCP_TARGET_URL", () => {
      process.env.MCP_TARGET_URL = "   ";

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

    test("handles URL with trailing whitespace", () => {
      const baseUrl = "http://localhost:3000/mcp";
      const urlWithWhitespace = `  ${baseUrl}  `;
      process.env.MCP_TARGET_URL = urlWithWhitespace;

      const config = getProxyConfig();

      // The config function doesn't trim the URL, it only uses trim() to check if it's set
      expect(config.targetUrl).toBe(urlWithWhitespace);
      expect(config.debugMode).toBe(true);
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

    test("accepts URLs with authentication", () => {
      const urlWithAuth = "https://user:pass@api.example.com/mcp";
      process.env.MCP_TARGET_URL = urlWithAuth;

      const config = getProxyConfig();

      expect(config.targetUrl).toBe(urlWithAuth);
      expect(() => new URL(config.targetUrl)).not.toThrow();
    });

    test("accepts URLs with hash fragments", () => {
      const urlWithHash = "https://example.com/mcp#section1";
      process.env.MCP_TARGET_URL = urlWithHash;

      const config = getProxyConfig();

      expect(config.targetUrl).toBe(urlWithHash);
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

    test("handles Unicode characters in URL", () => {
      const unicodeUrl = "https://example.com/mcp?q=café&city=München";
      process.env.MCP_TARGET_URL = unicodeUrl;

      const config = getProxyConfig();

      expect(config.targetUrl).toBe(unicodeUrl);
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

    test("converts whitespace-only string to false", () => {
      process.env.MCP_TARGET_URL = "   \t\n  ";

      const config = getProxyConfig();

      expect(config.debugMode).toBe(false);
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

  describe("default URL validation", () => {
    test("default URL is valid and well-formed", () => {
      delete process.env.MCP_TARGET_URL;

      const config = getProxyConfig();

      expect(() => new URL(config.targetUrl)).not.toThrow();
      expect(config.targetUrl).toBe("https://www.foundrole.com/mcp");
    });

    test("default URL uses HTTPS protocol", () => {
      delete process.env.MCP_TARGET_URL;

      const config = getProxyConfig();
      const url = new URL(config.targetUrl);

      expect(url.protocol).toBe("https:");
    });

    test("default URL has correct hostname", () => {
      delete process.env.MCP_TARGET_URL;

      const config = getProxyConfig();
      const url = new URL(config.targetUrl);

      expect(url.hostname).toBe("www.foundrole.com");
    });

    test("default URL has correct pathname", () => {
      delete process.env.MCP_TARGET_URL;

      const config = getProxyConfig();
      const url = new URL(config.targetUrl);

      expect(url.pathname).toBe("/mcp");
    });
  });

  describe("environment variable behavior", () => {
    test("respects changes to environment variable between calls", () => {
      // First call with no env var
      delete process.env.MCP_TARGET_URL;
      const config1 = getProxyConfig();

      // Change env var
      process.env.MCP_TARGET_URL = "http://localhost:3000";
      const config2 = getProxyConfig();

      expect(config1.targetUrl).toBe("https://www.foundrole.com/mcp");
      expect(config1.debugMode).toBe(false);
      expect(config2.targetUrl).toBe("http://localhost:3000");
      expect(config2.debugMode).toBe(true);
    });

    test("handles null environment variable", () => {
      // TypeScript doesn't allow null assignment, but JavaScript runtime might
      (process.env as any).MCP_TARGET_URL = null;

      const config = getProxyConfig();

      expect(config.targetUrl).toBe("https://www.foundrole.com/mcp");
      expect(config.debugMode).toBe(false);
    });
  });

  describe("type safety", () => {
    test("returns object with correct TypeScript types", () => {
      const config = getProxyConfig();

      expect(typeof config.targetUrl).toBe("string");
      expect(typeof config.debugMode).toBe("boolean");
      expect(Object.keys(config)).toEqual(["debugMode", "targetUrl"]);
    });

    test("configuration matches ProxyConfig interface", () => {
      const config = getProxyConfig();

      // These should compile and pass if the interface is correct
      expect(config).toHaveProperty("targetUrl");
      expect(config).toHaveProperty("debugMode");
      expect(typeof config.targetUrl).toBe("string");
      expect(typeof config.debugMode).toBe("boolean");
    });
  });
});
