/**
 * index functionality tests
 * Tests main orchestration, startProxy, and error handling
 */

// @ts-nocheck - Disable TypeScript checks for this test file due to complex mocking

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

// Mock all dependencies
const mockGetProxyConfig = jest.fn();
const mockStartStdioServer = jest.fn();

jest.mock("../src/config.js", () => ({
  getProxyConfig: mockGetProxyConfig,
}));

jest.mock("../src/stdio-server.js", () => ({
  startStdioServer: mockStartStdioServer,
}));

// Mock constants
jest.mock("../src/constants.js", () => ({
  PROXY_NAME: "test-proxy",
  PROXY_VERSION: "1.0.0",
}));

import { main, startProxy } from "../src/index.js";

describe("index Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();

    // Set up default mocks
    mockGetProxyConfig.mockReturnValue({
      debugMode: false,
      targetUrl: "https://test.example.com/mcp",
    });

    mockStartStdioServer.mockResolvedValue({});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("startProxy", () => {
    test("successfully starts proxy with valid config", async () => {
      const config = {
        debugMode: true,
        targetUrl: "https://api.example.com/mcp",
      };

      await startProxy(config);

      expect(mockStartStdioServer).toHaveBeenCalledWith({
        url: "https://api.example.com/mcp",
      });

      expect(console.error).toHaveBeenCalledWith(
        "Starting test-proxy (stdio -> HTTPStream)"
      );
      expect(console.error).toHaveBeenCalledWith(
        "Target URL: https://api.example.com/mcp"
      );
      expect(console.error).toHaveBeenCalledWith("Debug mode: enabled");
      expect(console.error).toHaveBeenCalledWith(
        "AI Job Search MCP server started successfully"
      );
    });

    test("logs debug mode disabled when false", async () => {
      const config = {
        debugMode: false,
        targetUrl: "https://api.example.com/mcp",
      };

      await startProxy(config);

      expect(console.error).toHaveBeenCalledWith("Debug mode: disabled");
    });

    test("sets up signal handlers", async () => {
      const mockProcessOn = jest.spyOn(process, "on").mockImplementation();
      const mockProcessExit = jest.spyOn(process, "exit").mockImplementation();

      const config = {
        debugMode: false,
        targetUrl: "https://test.com/mcp",
      };

      await startProxy(config);

      expect(mockProcessOn).toHaveBeenCalledWith(
        "SIGINT",
        expect.any(Function)
      );
      expect(mockProcessOn).toHaveBeenCalledWith(
        "SIGTERM",
        expect.any(Function)
      );

      mockProcessOn.mockRestore();
      mockProcessExit.mockRestore();
    });

    test("signal handlers call process.exit", async () => {
      const mockProcessOn = jest.spyOn(process, "on").mockImplementation();
      const mockProcessExit = jest.spyOn(process, "exit").mockImplementation();

      const config = {
        debugMode: false,
        targetUrl: "https://test.com/mcp",
      };

      await startProxy(config);

      // Get the signal handlers
      const sigintHandler = mockProcessOn.mock.calls.find(
        (call) => call[0] === "SIGINT"
      )[1];
      const sigtermHandler = mockProcessOn.mock.calls.find(
        (call) => call[0] === "SIGTERM"
      )[1];

      // Call the handlers
      sigintHandler();
      sigtermHandler();

      expect(mockProcessExit).toHaveBeenCalledWith(0);
      expect(mockProcessExit).toHaveBeenCalledTimes(2);
      expect(console.error).toHaveBeenCalledWith(
        "Shutting down proxy server..."
      );

      mockProcessOn.mockRestore();
      mockProcessExit.mockRestore();
    });

    test("handles stdio server startup failure", async () => {
      const error = new Error("Server startup failed");
      mockStartStdioServer.mockRejectedValue(error);

      const config = {
        debugMode: true,
        targetUrl: "https://unreachable.com/mcp",
      };

      await expect(startProxy(config)).rejects.toThrow("Server startup failed");

      expect(console.error).toHaveBeenCalledWith(
        "Failed to connect to target MCP server:",
        error
      );
      expect(console.error).toHaveBeenCalledWith(
        "Please check that the target server at https://unreachable.com/mcp is accessible"
      );
      expect(console.error).toHaveBeenCalledWith(
        "For debugging, try setting MCP_TARGET_URL to a local server"
      );
    });

    test("logs startup information", async () => {
      const config = {
        debugMode: true,
        targetUrl: "https://example.com/mcp",
      };

      await startProxy(config);

      expect(console.error).toHaveBeenCalledWith(
        "Starting test-proxy (stdio -> HTTPStream)"
      );
      expect(console.error).toHaveBeenCalledWith(
        "AI Job Search MCP server started successfully"
      );
      expect(console.error).toHaveBeenCalledWith(
        "Ready to accept MCP client connections via stdio"
      );
      expect(console.error).toHaveBeenCalledWith(
        "Original client info will be forwarded to backend"
      );
    });
  });

  describe("main", () => {
    test("successfully runs with default config", async () => {
      await main();

      expect(mockGetProxyConfig).toHaveBeenCalledTimes(1);
      expect(mockStartStdioServer).toHaveBeenCalledWith({
        url: "https://test.example.com/mcp",
      });
    });

    test("handles config retrieval error", async () => {
      const mockProcessExit = jest.spyOn(process, "exit").mockImplementation();
      const error = new Error("Config error");
      mockGetProxyConfig.mockImplementation(() => {
        throw error;
      });

      await main();

      expect(console.error).toHaveBeenCalledWith(
        "Unexpected error starting MCP proxy:",
        error
      );
      expect(mockProcessExit).toHaveBeenCalledWith(1);

      mockProcessExit.mockRestore();
    });

    test("handles proxy startup error", async () => {
      const mockProcessExit = jest.spyOn(process, "exit").mockImplementation();
      const error = new Error("Proxy startup error");
      mockStartStdioServer.mockRejectedValue(error);

      await main();

      expect(console.error).toHaveBeenCalledWith(
        "Unexpected error starting MCP proxy:",
        error
      );
      expect(mockProcessExit).toHaveBeenCalledWith(1);

      mockProcessExit.mockRestore();
    });

    test("uses config from getProxyConfig", async () => {
      const customConfig = {
        debugMode: true,
        targetUrl: "http://localhost:3000/mcp",
      };
      mockGetProxyConfig.mockReturnValue(customConfig);

      await main();

      expect(mockStartStdioServer).toHaveBeenCalledWith({
        url: "http://localhost:3000/mcp",
      });
    });
  });

  describe("Error Scenarios", () => {
    test("handles multiple startup attempts", async () => {
      let callCount = 0;
      mockStartStdioServer.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          throw new Error("First attempt failed");
        }
        return Promise.resolve({});
      });

      const config = {
        debugMode: false,
        targetUrl: "https://test.com/mcp",
      };

      // First call should fail
      await expect(startProxy(config)).rejects.toThrow("First attempt failed");

      // Second call should succeed
      await expect(startProxy(config)).resolves.not.toThrow();
    });

    test("provides helpful error messages", async () => {
      const networkError = new Error("ENOTFOUND");
      mockStartStdioServer.mockRejectedValue(networkError);

      const config = {
        debugMode: false,
        targetUrl: "https://nonexistent.example.com/mcp",
      };

      await expect(startProxy(config)).rejects.toThrow("ENOTFOUND");

      expect(console.error).toHaveBeenCalledWith(
        "Failed to connect to target MCP server:",
        networkError
      );
      expect(console.error).toHaveBeenCalledWith(
        "Please check that the target server at https://nonexistent.example.com/mcp is accessible"
      );
    });
  });

  describe("Configuration Integration", () => {
    test("works with different target URLs", async () => {
      const urls = [
        "http://localhost:3000/mcp",
        "https://api.example.com/v1/mcp",
        "https://secure.mcp.server.com/endpoint",
      ];

      for (const url of urls) {
        jest.clearAllMocks();
        const config = { debugMode: false, targetUrl: url };

        await startProxy(config);

        expect(mockStartStdioServer).toHaveBeenCalledWith({ url });
        expect(console.error).toHaveBeenCalledWith(`Target URL: ${url}`);
      }
    });

    test("works with debug mode variations", async () => {
      const debugModes = [true, false];

      for (const debugMode of debugModes) {
        jest.clearAllMocks();
        const config = {
          debugMode,
          targetUrl: "https://test.com/mcp",
        };

        await startProxy(config);

        expect(console.error).toHaveBeenCalledWith(
          `Debug mode: ${debugMode ? "enabled" : "disabled"}`
        );
      }
    });
  });

  describe("Process Management", () => {
    test("handles process termination gracefully", async () => {
      const mockProcessOn = jest.spyOn(process, "on").mockImplementation();
      const mockProcessExit = jest.spyOn(process, "exit").mockImplementation();

      const config = {
        debugMode: false,
        targetUrl: "https://test.com/mcp",
      };

      await startProxy(config);

      // Verify signal handlers are set up
      expect(mockProcessOn).toHaveBeenCalledWith(
        "SIGINT",
        expect.any(Function)
      );
      expect(mockProcessOn).toHaveBeenCalledWith(
        "SIGTERM",
        expect.any(Function)
      );

      mockProcessOn.mockRestore();
      mockProcessExit.mockRestore();
    });

    test("logs shutdown message on termination", async () => {
      const mockProcessOn = jest.spyOn(process, "on").mockImplementation();
      const mockProcessExit = jest.spyOn(process, "exit").mockImplementation();

      const config = {
        debugMode: false,
        targetUrl: "https://test.com/mcp",
      };

      await startProxy(config);

      // Get and call the SIGINT handler
      const sigintHandler = mockProcessOn.mock.calls.find(
        (call) => call[0] === "SIGINT"
      )[1];
      sigintHandler();

      expect(console.error).toHaveBeenCalledWith(
        "Shutting down proxy server..."
      );
      expect(mockProcessExit).toHaveBeenCalledWith(0);

      mockProcessOn.mockRestore();
      mockProcessExit.mockRestore();
    });
  });
});
