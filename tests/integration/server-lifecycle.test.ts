/**
 * Integration tests for server lifecycle
 * Tests end-to-end server startup, running, and shutdown
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
const mockExtractClientInfoFromParent = jest.fn();

jest.mock("../../src/config.js", () => ({
  getProxyConfig: mockGetProxyConfig,
}));

jest.mock("../../src/stdio-server.js", () => ({
  startStdioServer: mockStartStdioServer,
}));

jest.mock("../../src/client-detector.js", () => ({
  extractClientInfoFromParent: mockExtractClientInfoFromParent,
}));

jest.mock("../../src/constants.js", () => ({
  PROXY_NAME: "test-proxy",
  PROXY_VERSION: "1.0.0",
}));

import { main, startProxy } from "../../src/index.js";

describe("Server Lifecycle Integration Tests", () => {
  let cleanup: (() => void) | null = null;

  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();

    // Set up default mocks
    mockGetProxyConfig.mockReturnValue({
      debugMode: false,
      targetUrl: "https://test.example.com/mcp",
    });

    mockStartStdioServer.mockResolvedValue({});

    mockExtractClientInfoFromParent.mockResolvedValue({
      name: "TestClient",
      version: "1.0.0",
    });
  });

  afterEach(() => {
    if (cleanup) {
      cleanup();
      cleanup = null;
    }
    jest.resetAllMocks();
  });

  describe("Full Server Lifecycle", () => {
    test("successfully completes full startup sequence", async () => {
      cleanup = await main();

      // Verify configuration loading
      expect(mockGetProxyConfig).toHaveBeenCalledTimes(1);

      // Verify server startup
      expect(mockStartStdioServer).toHaveBeenCalledWith({
        url: "https://test.example.com/mcp",
      });

      // Verify logging sequence
      expect(console.error).toHaveBeenCalledWith(
        "Starting test-proxy (stdio -> HTTPStream)"
      );
      expect(console.error).toHaveBeenCalledWith(
        "AI Job Search MCP server started successfully"
      );
    });

    test("handles configuration to server startup flow", async () => {
      const customConfig = {
        debugMode: true,
        targetUrl: "https://custom.api.com/mcp",
      };
      mockGetProxyConfig.mockReturnValue(customConfig);

      cleanup = await startProxy(customConfig);

      expect(mockStartStdioServer).toHaveBeenCalledWith({
        url: "https://custom.api.com/mcp",
      });

      expect(console.error).toHaveBeenCalledWith(
        "Target URL: https://custom.api.com/mcp"
      );
      expect(console.error).toHaveBeenCalledWith("Debug mode: enabled");
    });

    test("integrates signal handling with server lifecycle", async () => {
      const mockProcessOn = jest.spyOn(process, "on").mockImplementation();
      const mockProcessExit = jest.spyOn(process, "exit").mockImplementation();

      cleanup = await startProxy({
        debugMode: false,
        targetUrl: "https://test.com/mcp",
      });

      // Verify signal handlers are set up
      expect(mockProcessOn).toHaveBeenCalledWith(
        "SIGINT",
        expect.any(Function)
      );
      expect(mockProcessOn).toHaveBeenCalledWith(
        "SIGTERM",
        expect.any(Function)
      );

      // Test signal handler execution
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

  describe("Error Recovery Integration", () => {
    test("handles config error to process exit flow", async () => {
      const mockProcessExit = jest.spyOn(process, "exit").mockImplementation();
      const configError = new Error("Config loading failed");

      mockGetProxyConfig.mockImplementation(() => {
        throw configError;
      });

      await main();

      expect(console.error).toHaveBeenCalledWith(
        "Unexpected error starting MCP proxy:",
        configError
      );
      expect(mockProcessExit).toHaveBeenCalledWith(1);

      mockProcessExit.mockRestore();
    });

    test("handles server startup error to process exit flow", async () => {
      const mockProcessExit = jest.spyOn(process, "exit").mockImplementation();
      const serverError = new Error("Server startup failed");

      mockStartStdioServer.mockRejectedValue(serverError);

      await main();

      expect(console.error).toHaveBeenCalledWith(
        "Unexpected error starting MCP proxy:",
        serverError
      );
      expect(mockProcessExit).toHaveBeenCalledWith(1);

      mockProcessExit.mockRestore();
    });

    test("recovery after failed startup attempt", async () => {
      let attemptCount = 0;
      mockStartStdioServer.mockImplementation(() => {
        attemptCount++;
        if (attemptCount === 1) {
          throw new Error("First attempt failed");
        }
        return Promise.resolve({});
      });

      const config = {
        debugMode: false,
        targetUrl: "https://test.com/mcp",
      };

      // First attempt should fail
      await expect(startProxy(config)).rejects.toThrow("First attempt failed");

      // Second attempt should succeed
      cleanup = await startProxy(config);
      expect(attemptCount).toBe(2);
    });
  });

  describe("Configuration Integration", () => {
    test("configuration changes propagate through system", async () => {
      const configs = [
        {
          debugMode: false,
          targetUrl: "http://localhost:3001/mcp",
        },
        {
          debugMode: true,
          targetUrl: "https://prod.api.com/mcp",
        },
        {
          debugMode: false,
          targetUrl: "https://staging.api.com/v2/mcp",
        },
      ];

      for (const config of configs) {
        jest.clearAllMocks();
        if (cleanup) {
          cleanup();
        }
        mockGetProxyConfig.mockReturnValue(config);

        cleanup = await main();

        expect(mockStartStdioServer).toHaveBeenCalledWith({
          url: config.targetUrl,
        });

        expect(console.error).toHaveBeenCalledWith(
          `Target URL: ${config.targetUrl}`
        );
        expect(console.error).toHaveBeenCalledWith(
          `Debug mode: ${config.debugMode ? "enabled" : "disabled"}`
        );
      }
    });

    test("environment variable integration", async () => {
      // Simulate different environment configurations
      const envConfigs = [
        { debugMode: true, targetUrl: "http://dev.localhost:3000/mcp" },
        { debugMode: false, targetUrl: "https://test.example.com/api/mcp" },
        { debugMode: false, targetUrl: "https://prod.secure.com/mcp/v1" },
      ];

      for (const config of envConfigs) {
        jest.clearAllMocks();
        if (cleanup) {
          cleanup();
        }
        mockGetProxyConfig.mockReturnValue(config);

        cleanup = await startProxy(config);

        expect(mockStartStdioServer).toHaveBeenCalledWith({
          url: config.targetUrl,
        });
      }
    });
  });

  describe("Client Detection Integration", () => {
    test("client detection does not interfere with server startup", async () => {
      // Mock different client detection scenarios
      const clientScenarios = [
        { name: "Claude", version: "3.5.0" },
        { name: "test-proxy", version: "1.0.0" },
        { name: "Unknown", version: "unknown" },
      ];

      for (const clientInfo of clientScenarios) {
        jest.clearAllMocks();
        if (cleanup) {
          cleanup();
        }
        mockExtractClientInfoFromParent.mockResolvedValue(clientInfo);

        cleanup = await main();

        // Server should start regardless of client detection results
        expect(mockStartStdioServer).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith(
          "AI Job Search MCP server started successfully"
        );
      }
    });

    test("client detection error does not prevent server startup", async () => {
      mockExtractClientInfoFromParent.mockRejectedValue(
        new Error("Client detection failed")
      );

      cleanup = await main();

      // Server should still start successfully
      expect(mockStartStdioServer).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        "AI Job Search MCP server started successfully"
      );
    });
  });

  describe("Logging Integration", () => {
    test("logging flow during successful startup", async () => {
      const config = {
        debugMode: true,
        targetUrl: "https://api.example.com/mcp",
      };

      cleanup = await startProxy(config);

      // Verify complete logging sequence
      const errorCalls = (console.error as jest.Mock).mock.calls;
      const logMessages = errorCalls.map((call) => call[0]);

      expect(logMessages).toContain(
        "Starting test-proxy (stdio -> HTTPStream)"
      );
      expect(logMessages).toContain("Target URL: https://api.example.com/mcp");
      expect(logMessages).toContain("Debug mode: enabled");
      expect(logMessages).toContain(
        "AI Job Search MCP server started successfully"
      );
      expect(logMessages).toContain(
        "Ready to accept MCP client connections via stdio"
      );
      expect(logMessages).toContain(
        "Original client info will be forwarded to backend"
      );
    });

    test("error logging flow during startup failure", async () => {
      const error = new Error("Network connection failed");
      mockStartStdioServer.mockRejectedValue(error);

      const config = {
        debugMode: true,
        targetUrl: "https://unreachable.example.com/mcp",
      };

      await expect(startProxy(config)).rejects.toThrow(
        "Network connection failed"
      );

      // Verify error logging sequence
      expect(console.error).toHaveBeenCalledWith(
        "Failed to connect to target MCP server:",
        error
      );
      expect(console.error).toHaveBeenCalledWith(
        "Please check that the target server at https://unreachable.example.com/mcp is accessible"
      );
      expect(console.error).toHaveBeenCalledWith(
        "For debugging, try setting MCP_TARGET_URL to a local server"
      );
    });
  });

  describe("Resource Cleanup Integration", () => {
    test("proper cleanup on normal shutdown", async () => {
      const mockProcessOn = jest.spyOn(process, "on").mockImplementation();
      const mockProcessExit = jest.spyOn(process, "exit").mockImplementation();

      cleanup = await startProxy({
        debugMode: false,
        targetUrl: "https://test.com/mcp",
      });

      // Simulate graceful shutdown
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

    test("cleanup on error during startup", async () => {
      const mockProcessExit = jest.spyOn(process, "exit").mockImplementation();

      mockStartStdioServer.mockRejectedValue(new Error("Startup failed"));

      await main();

      expect(mockProcessExit).toHaveBeenCalledWith(1);

      mockProcessExit.mockRestore();
    });
  });
});
