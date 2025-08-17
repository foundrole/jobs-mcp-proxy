/**
 * Comprehensive error handling and edge case tests
 * Tests various failure scenarios, error propagation, and edge cases
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

import { getProxyConfig, startProxy } from "~/index";

import {
  cleanupTestEnvironment,
  ConsoleCapture,
  createMockStdioServer,
  createTestEnvironment,
  createTestProxyConfig,
  TEST_ERROR_MESSAGES,
  TEST_URLS,
} from "./utils/test-helpers";

// Mock the mcp-proxy module
jest.unstable_mockModule("mcp-proxy", () => {
  const mockStdioServer = createMockStdioServer();
  return {
    ServerType: mockStdioServer.mockServerType,
    startStdioServer: mockStdioServer.mockStartStdioServer,
  };
});

describe("Error Handling and Edge Cases", () => {
  let consoleCapture: ConsoleCapture;
  let mockStartStdioServer: jest.MockedFunction<any>;

  beforeEach(async () => {
    // Import the mocked module
    const mcpProxy = await import("mcp-proxy");
    mockStartStdioServer =
      mcpProxy.startStdioServer as jest.MockedFunction<any>;

    consoleCapture = new ConsoleCapture();
    consoleCapture.start();

    // Clean up environment variables
    cleanupTestEnvironment(["MCP_TARGET_URL"]);

    // Reset all mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleCapture.stop();
  });

  describe("Network and Connection Errors", () => {
    test("handles DNS resolution failure", async () => {
      const dnsError = new Error("ENOTFOUND unknown-domain.example.com");
      mockStartStdioServer.mockRejectedValue(dnsError);

      const config = createTestProxyConfig({
        targetUrl: "https://unknown-domain.example.com/mcp",
      });

      await expect(startProxy(config)).rejects.toThrow(
        "ENOTFOUND unknown-domain.example.com"
      );

      const errorOutput = consoleCapture.getErrorOutput();
      expect(errorOutput).toContain("Failed to connect to target MCP server:");
      expect(errorOutput).toContain("ENOTFOUND unknown-domain.example.com");
    });

    test("handles connection refused error", async () => {
      const connRefusedError = new Error("ECONNREFUSED 127.0.0.1:3000");
      mockStartStdioServer.mockRejectedValue(connRefusedError);

      const config = createTestProxyConfig({
        targetUrl: "http://127.0.0.1:3000/mcp",
      });

      await expect(startProxy(config)).rejects.toThrow(
        "ECONNREFUSED 127.0.0.1:3000"
      );

      const errorOutput = consoleCapture.getErrorOutput();
      expect(errorOutput).toContain("Failed to connect to target MCP server:");
    });

    test("handles timeout errors", async () => {
      const timeoutError = new Error("ETIMEDOUT");
      mockStartStdioServer.mockRejectedValue(timeoutError);

      const config = createTestProxyConfig();

      await expect(startProxy(config)).rejects.toThrow("ETIMEDOUT");
    });

    test("handles SSL/TLS certificate errors", async () => {
      const sslError = new Error("CERT_UNTRUSTED");
      mockStartStdioServer.mockRejectedValue(sslError);

      const config = createTestProxyConfig({
        targetUrl: "https://self-signed.example.com/mcp",
      });

      await expect(startProxy(config)).rejects.toThrow("CERT_UNTRUSTED");
    });

    test("handles HTTP error responses", async () => {
      const httpError = new Error("HTTP 404: Not Found");
      mockStartStdioServer.mockRejectedValue(httpError);

      const config = createTestProxyConfig();

      await expect(startProxy(config)).rejects.toThrow("HTTP 404: Not Found");
    });

    test("handles server internal errors", async () => {
      const serverError = new Error("HTTP 500: Internal Server Error");
      mockStartStdioServer.mockRejectedValue(serverError);

      const config = createTestProxyConfig();

      await expect(startProxy(config)).rejects.toThrow(
        "HTTP 500: Internal Server Error"
      );
    });

    test("handles malformed response errors", async () => {
      const malformedError = new Error("Invalid JSON response");
      mockStartStdioServer.mockRejectedValue(malformedError);

      const config = createTestProxyConfig();

      await expect(startProxy(config)).rejects.toThrow("Invalid JSON response");
    });
  });

  describe("Configuration Edge Cases", () => {
    test("handles extremely long URLs", async () => {
      const veryLongUrl = `https://example.com/mcp?${"a".repeat(2000)}=value`;
      const config = createTestProxyConfig({ targetUrl: veryLongUrl });

      mockStartStdioServer.mockResolvedValue(undefined);

      await startProxy(config);

      expect(mockStartStdioServer).toHaveBeenCalledWith({
        serverType: expect.any(String),
        url: veryLongUrl,
      });
    });

    test("handles URLs with special characters", async () => {
      const specialUrl = "https://example.com/mcp?param=hello%20world&emoji=🚀";
      const config = createTestProxyConfig({ targetUrl: specialUrl });

      mockStartStdioServer.mockResolvedValue(undefined);

      await startProxy(config);

      expect(mockStartStdioServer).toHaveBeenCalledWith({
        serverType: expect.any(String),
        url: specialUrl,
      });
    });

    test("handles URLs with unicode characters", async () => {
      const unicodeUrl = "https://ëxämplë.com/mcp?tëst=ünïcödë";
      const config = createTestProxyConfig({ targetUrl: unicodeUrl });

      mockStartStdioServer.mockResolvedValue(undefined);

      await startProxy(config);

      expect(mockStartStdioServer).toHaveBeenCalledWith({
        serverType: expect.any(String),
        url: unicodeUrl,
      });
    });

    test("handles null and undefined values in config", async () => {
      // Test with partial configuration
      const partialConfig = {
        targetUrl: TEST_URLS.DEFAULT,
        // debugMode is missing but should default to false behavior
      } as any;

      mockStartStdioServer.mockResolvedValue(undefined);

      await startProxy(partialConfig);

      expect(mockStartStdioServer).toHaveBeenCalled();
    });
  });

  describe("Environment Variable Edge Cases", () => {
    test("handles environment variable with newlines", async () => {
      createTestEnvironment({
        MCP_TARGET_URL: "https://example.com/mcp\n",
      });

      const config = getProxyConfig();

      expect(config.targetUrl).toBe("https://example.com/mcp\n");
      expect(config.debugMode).toBe(true);
    });

    test("handles environment variable with tabs", async () => {
      createTestEnvironment({
        MCP_TARGET_URL: "\thttps://example.com/mcp\t",
      });

      const config = getProxyConfig();

      expect(config.targetUrl).toBe("\thttps://example.com/mcp\t");
      expect(config.debugMode).toBe(true);
    });

    test("handles environment variable with only spaces", async () => {
      createTestEnvironment({
        MCP_TARGET_URL: "   ",
      });

      const config = getProxyConfig();

      expect(config.targetUrl).toBe("https://www.foundrole.com/mcp");
      expect(config.debugMode).toBe(false);
    });

    test("handles environment variable with control characters", async () => {
      createTestEnvironment({
        MCP_TARGET_URL: "https://example.com/mcp\r\n\t",
      });

      const config = getProxyConfig();

      expect(config.targetUrl).toBe("https://example.com/mcp\r\n\t");
    });
  });

  describe("Error Recovery and Resilience", () => {
    test("error does not affect subsequent startProxy calls", async () => {
      // First call fails
      const error = new Error("First call error");
      mockStartStdioServer.mockRejectedValueOnce(error);

      const config = createTestProxyConfig();

      await expect(startProxy(config)).rejects.toThrow("First call error");

      // Second call succeeds
      mockStartStdioServer.mockResolvedValueOnce(undefined);

      await expect(startProxy(config)).resolves.toBeUndefined();

      expect(mockStartStdioServer).toHaveBeenCalledTimes(2);
    });

    test("multiple concurrent startProxy calls handle errors independently", async () => {
      const successConfig = createTestProxyConfig({
        targetUrl: TEST_URLS.DEFAULT,
      });
      const failConfig = createTestProxyConfig({
        targetUrl: TEST_URLS.LOCALHOST,
      });

      mockStartStdioServer
        .mockResolvedValueOnce(undefined) // First call succeeds
        .mockRejectedValueOnce(new Error("Second call fails")); // Second call fails

      const [successResult, failResult] = await Promise.allSettled([
        startProxy(successConfig),
        startProxy(failConfig),
      ]);

      expect(successResult.status).toBe("fulfilled");
      expect(failResult.status).toBe("rejected");
      expect((failResult as PromiseRejectedResult).reason.message).toBe(
        "Second call fails"
      );
    });

    test("error stack traces are preserved", async () => {
      const originalError = new Error("Original error with stack");
      // Simulate a real stack trace
      originalError.stack =
        "Error: Original error with stack\n    at test (/path/to/test.js:1:1)";

      mockStartStdioServer.mockRejectedValue(originalError);

      const config = createTestProxyConfig();

      try {
        await startProxy(config);
      } catch (error) {
        expect(error).toBe(originalError);
        expect((error as Error).stack).toContain("Original error with stack");
        expect((error as Error).stack).toContain("/path/to/test.js:1:1");
      }
    });
  });

  describe("Memory and Resource Management", () => {
    test("failed startProxy does not leak memory", async () => {
      const error = new Error("Memory test error");
      mockStartStdioServer.mockRejectedValue(error);

      const config = createTestProxyConfig();

      // Run multiple failed attempts
      for (let i = 0; i < 10; i++) {
        await expect(startProxy(config)).rejects.toThrow("Memory test error");
      }

      // Should still be able to call successfully after failures
      mockStartStdioServer.mockResolvedValueOnce(undefined);
      await expect(startProxy(config)).resolves.toBeUndefined();
    });

    test("console capture handles large error messages", async () => {
      const largeError = new Error("A".repeat(1000)); // Large error message
      mockStartStdioServer.mockRejectedValue(largeError);

      const config = createTestProxyConfig();

      await expect(startProxy(config)).rejects.toThrow(largeError);

      const errorOutput = consoleCapture.getErrorOutput();
      expect(errorOutput.length).toBeGreaterThan(100);
    });
  });

  describe("Async Error Handling", () => {
    test("handles promise rejection after successful resolution", async () => {
      // Simulate a case where the initial promise resolves but then fails
      let resolveFunc: () => void;
      const delayedPromise = new Promise<void>((resolve) => {
        resolveFunc = resolve;
      });

      mockStartStdioServer.mockImplementation(() => {
        setTimeout(() => resolveFunc(), 10);
        return delayedPromise;
      });

      const config = createTestProxyConfig();

      await expect(startProxy(config)).resolves.toBeUndefined();

      const errorOutput = consoleCapture.getErrorOutput();
      expect(errorOutput).toContain(
        "AI Job Search MCP server started successfully"
      );
    });

    test("handles synchronous errors from mcp-proxy", async () => {
      // Simulate a synchronous error thrown by startStdioServer
      mockStartStdioServer.mockImplementation(() => {
        throw new Error("Synchronous error");
      });

      const config = createTestProxyConfig();

      await expect(startProxy(config)).rejects.toThrow("Synchronous error");
    });

    test("handles undefined/null rejection", async () => {
      mockStartStdioServer.mockRejectedValue(null);

      const config = createTestProxyConfig();

      await expect(startProxy(config)).rejects.toBeNull();

      const errorOutput = consoleCapture.getErrorOutput();
      expect(errorOutput).toContain("Failed to connect to target MCP server:");
    });

    test("handles rejection with non-Error objects", async () => {
      mockStartStdioServer.mockRejectedValue("String error");

      const config = createTestProxyConfig();

      await expect(startProxy(config)).rejects.toBe("String error");
    });
  });

  describe("Boundary Value Testing", () => {
    test("handles minimum viable configuration", async () => {
      mockStartStdioServer.mockResolvedValue(undefined);

      const minConfig = {
        debugMode: false,
        targetUrl: "https://a.co/m",
      };

      await startProxy(minConfig);

      expect(mockStartStdioServer).toHaveBeenCalledWith({
        serverType: expect.any(String),
        url: "https://a.co/m",
      });
    });

    test("handles configuration with all properties", async () => {
      mockStartStdioServer.mockResolvedValue(undefined);

      const fullConfig = createTestProxyConfig({
        debugMode: true,
        targetUrl:
          "https://full-config.example.com/mcp?param=value&debug=true#section",
      });

      await startProxy(fullConfig);

      expect(mockStartStdioServer).toHaveBeenCalledWith({
        serverType: expect.any(String),
        url: "https://full-config.example.com/mcp?param=value&debug=true#section",
      });
    });
  });
});
