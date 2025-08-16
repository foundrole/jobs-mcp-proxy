/**
 * Integration tests for MCP proxy server startup and connection handling
 * Tests server lifecycle, connection management, and integration with mcp-proxy library
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

import { startProxy } from "~/index";

import {
  cleanupTestEnvironment,
  ConsoleCapture,
  createMockStdioServer,
  createTestEnvironment,
  createTestProxyConfig,
  delay,
  delayedReject,
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

describe("MCP Proxy Server", () => {
  let consoleCapture: ConsoleCapture;
  let mockStartStdioServer: jest.MockedFunction<any>;
  let mockServerType: { HTTPStream: string };

  beforeEach(async () => {
    // Import the mocked module
    const mcpProxy = await import("mcp-proxy");
    mockStartStdioServer =
      mcpProxy.startStdioServer as jest.MockedFunction<any>;
    mockServerType = mcpProxy.ServerType as { HTTPStream: string };

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

  describe("startProxy", () => {
    test("successfully starts proxy server with default configuration", async () => {
      mockStartStdioServer.mockResolvedValue(undefined);

      const config = createTestProxyConfig();
      await startProxy(config);

      expect(mockStartStdioServer).toHaveBeenCalledWith({
        serverType: mockServerType.HTTPStream,
        url: TEST_URLS.DEFAULT,
      });

      const errorOutput = consoleCapture.getErrorOutput();
      expect(errorOutput).toContain(
        "Starting ai-job-search-mcp (stdio -> HTTPStream)"
      );
      expect(errorOutput).toContain(`Target URL: ${TEST_URLS.DEFAULT}`);
      expect(errorOutput).toContain("Debug mode: disabled");
      expect(errorOutput).toContain(
        "AI Job Search MCP server started successfully"
      );
      expect(errorOutput).toContain(
        "Ready to accept MCP client connections via stdio"
      );
    });

    test("successfully starts proxy server with custom configuration", async () => {
      mockStartStdioServer.mockResolvedValue(undefined);

      const customConfig = createTestProxyConfig({
        debugMode: true,
        targetUrl: TEST_URLS.LOCALHOST,
      });

      await startProxy(customConfig);

      expect(mockStartStdioServer).toHaveBeenCalledWith({
        serverType: mockServerType.HTTPStream,
        url: TEST_URLS.LOCALHOST,
      });

      const errorOutput = consoleCapture.getErrorOutput();
      expect(errorOutput).toContain(
        "Starting ai-job-search-mcp (stdio -> HTTPStream)"
      );
      expect(errorOutput).toContain(`Target URL: ${TEST_URLS.LOCALHOST}`);
      expect(errorOutput).toContain("Debug mode: enabled");
      expect(errorOutput).toContain(
        "AI Job Search MCP server started successfully"
      );
    });

    test("logs appropriate messages for debug mode enabled", async () => {
      mockStartStdioServer.mockResolvedValue(undefined);

      const debugConfig = createTestProxyConfig({
        debugMode: true,
        targetUrl: TEST_URLS.SECURE,
      });

      await startProxy(debugConfig);

      const errorOutput = consoleCapture.getErrorOutput();
      expect(errorOutput).toContain("Debug mode: enabled");
      expect(errorOutput).toContain(`Target URL: ${TEST_URLS.SECURE}`);
    });

    test("logs appropriate messages for debug mode disabled", async () => {
      mockStartStdioServer.mockResolvedValue(undefined);

      const config = createTestProxyConfig({
        debugMode: false,
        targetUrl: TEST_URLS.DEFAULT,
      });

      await startProxy(config);

      const errorOutput = consoleCapture.getErrorOutput();
      expect(errorOutput).toContain("Debug mode: disabled");
    });

    test("handles connection failures gracefully", async () => {
      const connectionError = new Error(TEST_ERROR_MESSAGES.CONNECTION_FAILED);
      mockStartStdioServer.mockRejectedValue(connectionError);

      const config = createTestProxyConfig();

      await expect(startProxy(config)).rejects.toThrow(
        TEST_ERROR_MESSAGES.CONNECTION_FAILED
      );

      const errorOutput = consoleCapture.getErrorOutput();
      expect(errorOutput).toContain("Failed to connect to target MCP server:");
      expect(errorOutput).toContain(
        `Please check that the target server at ${config.targetUrl} is accessible`
      );
      expect(errorOutput).toContain(
        "For debugging, try setting MCP_TARGET_URL to a local server"
      );
    });

    test("handles network timeout errors", async () => {
      const timeoutError = new Error(TEST_ERROR_MESSAGES.TIMEOUT);
      mockStartStdioServer.mockRejectedValue(timeoutError);

      const config = createTestProxyConfig();

      await expect(startProxy(config)).rejects.toThrow(
        TEST_ERROR_MESSAGES.TIMEOUT
      );

      const errorOutput = consoleCapture.getErrorOutput();
      expect(errorOutput).toContain("Failed to connect to target MCP server:");
      expect(errorOutput).toContain(TEST_ERROR_MESSAGES.TIMEOUT);
    });

    test("handles server unreachable errors", async () => {
      const unreachableError = new Error(
        TEST_ERROR_MESSAGES.SERVER_UNREACHABLE
      );
      mockStartStdioServer.mockRejectedValue(unreachableError);

      const config = createTestProxyConfig();

      await expect(startProxy(config)).rejects.toThrow(
        TEST_ERROR_MESSAGES.SERVER_UNREACHABLE
      );
    });

    test("preserves original error when connection fails", async () => {
      const originalError = new Error("ECONNREFUSED");
      mockStartStdioServer.mockRejectedValue(originalError);

      const config = createTestProxyConfig();

      await expect(startProxy(config)).rejects.toBe(originalError);
    });

    test("calls startStdioServer with correct parameters", async () => {
      mockStartStdioServer.mockResolvedValue(undefined);

      const config = createTestProxyConfig({
        targetUrl: "https://custom.example.com/mcp",
      });

      await startProxy(config);

      expect(mockStartStdioServer).toHaveBeenCalledTimes(1);
      expect(mockStartStdioServer).toHaveBeenCalledWith({
        serverType: mockServerType.HTTPStream,
        url: "https://custom.example.com/mcp",
      });
    });

    test("handles URL with query parameters correctly", async () => {
      mockStartStdioServer.mockResolvedValue(undefined);

      const urlWithQuery =
        "https://api.example.com/mcp?token=abc123&debug=true";
      const config = createTestProxyConfig({
        targetUrl: urlWithQuery,
      });

      await startProxy(config);

      expect(mockStartStdioServer).toHaveBeenCalledWith({
        serverType: mockServerType.HTTPStream,
        url: urlWithQuery,
      });
    });

    test("handles startup delay gracefully", async () => {
      // Simulate a slow startup
      mockStartStdioServer.mockImplementation(() => delay(100));

      const config = createTestProxyConfig();
      const startTime = Date.now();

      await startProxy(config);

      const endTime = Date.now();
      expect(endTime - startTime).toBeGreaterThanOrEqual(100);

      const errorOutput = consoleCapture.getErrorOutput();
      expect(errorOutput).toContain(
        "AI Job Search MCP server started successfully"
      );
    });

    test("handles rejection after delay", async () => {
      const error = new Error("Delayed failure");
      mockStartStdioServer.mockImplementation(() => delayedReject(50, error));

      const config = createTestProxyConfig();

      await expect(startProxy(config)).rejects.toThrow("Delayed failure");

      const errorOutput = consoleCapture.getErrorOutput();
      expect(errorOutput).toContain("Failed to connect to target MCP server:");
    });
  });

  describe("error message formatting", () => {
    test("includes target URL in error messages", async () => {
      const error = new Error("Connection refused");
      mockStartStdioServer.mockRejectedValue(error);

      const customUrl = "https://custom.example.com/mcp";
      const config = createTestProxyConfig({ targetUrl: customUrl });

      await expect(startProxy(config)).rejects.toThrow("Connection refused");

      const errorOutput = consoleCapture.getErrorOutput();
      expect(errorOutput).toContain(
        `Please check that the target server at ${customUrl} is accessible`
      );
    });

    test("provides debugging guidance in error messages", async () => {
      const error = new Error("Network error");
      mockStartStdioServer.mockRejectedValue(error);

      const config = createTestProxyConfig();

      await expect(startProxy(config)).rejects.toThrow("Network error");

      const errorOutput = consoleCapture.getErrorOutput();
      expect(errorOutput).toContain(
        "For debugging, try setting MCP_TARGET_URL to a local server"
      );
    });

    test("logs complete error information", async () => {
      const detailedError = new Error(
        "Detailed connection error with stack trace"
      );
      mockStartStdioServer.mockRejectedValue(detailedError);

      const config = createTestProxyConfig();

      await expect(startProxy(config)).rejects.toThrow(
        "Detailed connection error with stack trace"
      );

      const errorOutput = consoleCapture.getErrorOutput();
      expect(errorOutput).toContain("Failed to connect to target MCP server:");
      expect(errorOutput).toContain(
        "Detailed connection error with stack trace"
      );
    });
  });

  describe("server type configuration", () => {
    test("always uses HTTPStream server type", async () => {
      mockStartStdioServer.mockResolvedValue(undefined);

      const config = createTestProxyConfig();
      await startProxy(config);

      expect(mockStartStdioServer).toHaveBeenCalledWith({
        serverType: mockServerType.HTTPStream,
        url: config.targetUrl,
      });
    });

    test("server type is not affected by configuration", async () => {
      mockStartStdioServer.mockResolvedValue(undefined);

      const configs = [
        createTestProxyConfig({ debugMode: true }),
        createTestProxyConfig({ debugMode: false }),
        createTestProxyConfig({ targetUrl: TEST_URLS.LOCALHOST }),
        createTestProxyConfig({ targetUrl: TEST_URLS.SECURE }),
      ];

      for (const config of configs) {
        jest.clearAllMocks();
        await startProxy(config);

        expect(mockStartStdioServer).toHaveBeenCalledWith({
          serverType: mockServerType.HTTPStream,
          url: config.targetUrl,
        });
      }
    });
  });

  describe("console output validation", () => {
    test("all console output goes to stderr", async () => {
      mockStartStdioServer.mockResolvedValue(undefined);

      const config = createTestProxyConfig();
      await startProxy(config);

      // All output should be in error stream (stderr)
      expect(consoleCapture.getErrorOutput().length).toBeGreaterThan(0);
      expect(consoleCapture.getLogOutput().length).toBe(0);
    });

    test("startup messages are in correct order", async () => {
      mockStartStdioServer.mockResolvedValue(undefined);

      const config = createTestProxyConfig();
      await startProxy(config);

      const errorOutput = consoleCapture.getErrorOutput();
      const lines = errorOutput.split("\n").filter((line) => line.trim());

      expect(lines[0]).toContain(
        "Starting ai-job-search-mcp (stdio -> HTTPStream)"
      );
      expect(lines[1]).toContain("Target URL:");
      expect(lines[2]).toContain("Debug mode:");
      expect(lines[3]).toContain(
        "AI Job Search MCP server started successfully"
      );
      expect(lines[4]).toContain(
        "Ready to accept MCP client connections via stdio"
      );
    });

    test("error messages are properly formatted", async () => {
      const error = new Error("Test error message");
      mockStartStdioServer.mockRejectedValue(error);

      const config = createTestProxyConfig();

      await expect(startProxy(config)).rejects.toThrow("Test error message");

      const errorOutput = consoleCapture.getErrorOutput();
      const lines = errorOutput.split("\n").filter((line) => line.trim());

      expect(
        lines.some((line) =>
          line.includes("Failed to connect to target MCP server:")
        )
      ).toBe(true);
      expect(
        lines.some((line) =>
          line.includes("Please check that the target server at")
        )
      ).toBe(true);
      expect(
        lines.some((line) =>
          line.includes(
            "For debugging, try setting MCP_TARGET_URL to a local server"
          )
        )
      ).toBe(true);
    });
  });
});
