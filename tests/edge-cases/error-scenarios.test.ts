/**
 * Edge case and error scenario tests
 * Tests boundary conditions, error handling, and resilience
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
const mockCreateMcpProxyServer = jest.fn();
const mockExtractClientInfoFromParent = jest.fn();

jest.mock("../../src/config.js", () => ({
  getProxyConfig: mockGetProxyConfig,
}));

jest.mock("../../src/stdio-server.js", () => ({
  startStdioServer: mockStartStdioServer,
}));

jest.mock("../../src/proxy-server.js", () => ({
  createMcpProxyServer: mockCreateMcpProxyServer,
}));

jest.mock("../../src/client-detector.js", () => ({
  extractClientInfoFromParent: mockExtractClientInfoFromParent,
}));

import { main, startProxy } from "../../src/index.js";

describe("Error Scenarios and Edge Cases", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();

    // Increase max listeners to prevent warnings during tests
    process.setMaxListeners(20);

    // Set up default mocks
    mockGetProxyConfig.mockReturnValue({
      debugMode: false,
      targetUrl: "https://test.example.com/mcp",
    });

    mockStartStdioServer.mockResolvedValue({});
    mockCreateMcpProxyServer.mockReturnValue({});
    mockExtractClientInfoFromParent.mockResolvedValue({
      name: "TestClient",
      version: "1.0.0",
    });
  });

  afterEach(() => {
    jest.resetAllMocks();

    // Clean up any lingering event listeners
    process.removeAllListeners("SIGINT");
    process.removeAllListeners("SIGTERM");

    // Reset max listeners to default
    process.setMaxListeners(10);
  });

  describe("Network and Connection Errors", () => {
    test("handles DNS resolution failure", async () => {
      const dnsError = new Error("ENOTFOUND");
      dnsError.code = "ENOTFOUND";
      mockStartStdioServer.mockRejectedValue(dnsError);

      const config = {
        debugMode: true,
        targetUrl: "https://nonexistent.domain.invalid/mcp",
      };

      await expect(startProxy(config)).rejects.toThrow("ENOTFOUND");

      expect(console.error).toHaveBeenCalledWith(
        "Failed to connect to target MCP server:",
        dnsError
      );
    });

    test("handles connection timeout", async () => {
      const timeoutError = new Error("ETIMEDOUT");
      timeoutError.code = "ETIMEDOUT";
      mockStartStdioServer.mockRejectedValue(timeoutError);

      const config = {
        debugMode: false,
        targetUrl: "https://very.slow.server.com/mcp",
      };

      await expect(startProxy(config)).rejects.toThrow("ETIMEDOUT");
    });

    test("handles connection refused", async () => {
      const refusedError = new Error("ECONNREFUSED");
      refusedError.code = "ECONNREFUSED";
      mockStartStdioServer.mockRejectedValue(refusedError);

      const config = {
        debugMode: true,
        targetUrl: "http://localhost:9999/mcp",
      };

      await expect(startProxy(config)).rejects.toThrow("ECONNREFUSED");
    });

    test("handles TLS/SSL certificate errors", async () => {
      const sslError = new Error("certificate has expired");
      sslError.code = "CERT_HAS_EXPIRED";
      mockStartStdioServer.mockRejectedValue(sslError);

      const config = {
        debugMode: false,
        targetUrl: "https://expired.badssl.com/mcp",
      };

      await expect(startProxy(config)).rejects.toThrow(
        "certificate has expired"
      );
    });

    test("handles network interruption during operation", async () => {
      const networkError = new Error("ENETUNREACH");
      networkError.code = "ENETUNREACH";

      // Server starts successfully but then network fails
      mockStartStdioServer.mockResolvedValueOnce({});

      const config = {
        debugMode: true,
        targetUrl: "https://remote.server.com/mcp",
      };

      await expect(startProxy(config)).resolves.not.toThrow();

      // Simulate network failure during operation
      mockStartStdioServer.mockRejectedValue(networkError);

      await expect(startProxy(config)).rejects.toThrow("ENETUNREACH");
    });
  });

  describe("Configuration Edge Cases", () => {
    test("handles invalid URL formats", async () => {
      const invalidUrls = [
        "not-a-url",
        "http://",
        "https://",
        "ftp://invalid.protocol.com",
        "http:// invalid spaces .com",
        "",
        null,
        undefined,
      ];

      for (const invalidUrl of invalidUrls) {
        jest.clearAllMocks();

        const config = {
          debugMode: false,
          targetUrl: invalidUrl,
        };

        // Configuration should still be accepted, error happens at connection time
        mockGetProxyConfig.mockReturnValue(config);

        if (invalidUrl === null || invalidUrl === undefined) {
          const configError = new Error("Invalid target URL");
          mockGetProxyConfig.mockImplementation(() => {
            throw configError;
          });

          const mockProcessExit = jest
            .spyOn(process, "exit")
            .mockImplementation();

          await main();

          expect(console.error).toHaveBeenCalledWith(
            "Unexpected error starting MCP proxy:",
            configError
          );
          expect(mockProcessExit).toHaveBeenCalledWith(1);

          mockProcessExit.mockRestore();
        }
      }
    });

    test("handles missing environment variables", async () => {
      // Simulate missing MCP_TARGET_URL
      mockGetProxyConfig.mockImplementation(() => {
        throw new Error("MCP_TARGET_URL is required");
      });

      const mockProcessExit = jest.spyOn(process, "exit").mockImplementation();

      await main();

      expect(console.error).toHaveBeenCalledWith(
        "Unexpected error starting MCP proxy:",
        expect.any(Error)
      );
      expect(mockProcessExit).toHaveBeenCalledWith(1);

      mockProcessExit.mockRestore();
    });

    test("handles malformed environment variables", async () => {
      const malformedConfigs = [
        { debugMode: false, targetUrl: "http://[invalid:ipv6::address]/mcp" },
        { debugMode: false, targetUrl: "https://example.com:99999/mcp" }, // Invalid port
        {
          debugMode: "invalid",
          targetUrl: "https://user:pass@example.com/mcp",
        }, // Invalid debug mode
      ];

      for (const config of malformedConfigs) {
        jest.clearAllMocks();
        mockGetProxyConfig.mockReturnValue(config);

        // These should not crash the configuration loading
        await expect(main()).resolves.not.toThrow();
        expect(mockStartStdioServer).toHaveBeenCalled();
      }
    });
  });

  describe("Resource Exhaustion Scenarios", () => {
    test("handles memory pressure", async () => {
      // Simulate memory allocation failure
      const memoryError = new Error("JavaScript heap out of memory");
      memoryError.code = "ERR_OUT_OF_MEMORY";
      mockStartStdioServer.mockRejectedValue(memoryError);

      const config = {
        debugMode: false,
        targetUrl: "https://api.example.com/mcp",
      };

      await expect(startProxy(config)).rejects.toThrow(
        "JavaScript heap out of memory"
      );
    });

    test("handles file descriptor exhaustion", async () => {
      const fdError = new Error("EMFILE: too many open files");
      fdError.code = "EMFILE";
      mockStartStdioServer.mockRejectedValue(fdError);

      const config = {
        debugMode: true,
        targetUrl: "https://api.example.com/mcp",
      };

      await expect(startProxy(config)).rejects.toThrow("EMFILE");
    });

    test("handles multiple concurrent startup attempts", async () => {
      let startupCount = 0;
      mockStartStdioServer.mockImplementation(() => {
        startupCount++;
        if (startupCount <= 3) {
          return new Promise((resolve) => setTimeout(resolve, 100));
        }
        throw new Error("Too many concurrent startups");
      });

      const config = {
        debugMode: false,
        targetUrl: "https://api.example.com/mcp",
      };

      // Start multiple instances concurrently
      const startupPromises = Array(5)
        .fill()
        .map(() => startProxy(config));

      const results = await Promise.allSettled(startupPromises);

      // Some should succeed, others should fail
      const successes = results.filter((r) => r.status === "fulfilled");
      const failures = results.filter((r) => r.status === "rejected");

      expect(successes.length).toBeGreaterThan(0);
      expect(failures.length).toBeGreaterThan(0);
    });
  });

  describe("Signal and Process Management Edge Cases", () => {
    test("handles multiple signals in rapid succession", async () => {
      const mockProcessOn = jest.spyOn(process, "on").mockImplementation();
      const mockProcessExit = jest.spyOn(process, "exit").mockImplementation();

      const config = {
        debugMode: false,
        targetUrl: "https://test.com/mcp",
      };

      await startProxy(config);

      // Get signal handlers with null checks
      const sigintCall = mockProcessOn.mock.calls.find(
        (call) => call[0] === "SIGINT"
      );
      const sigtermCall = mockProcessOn.mock.calls.find(
        (call) => call[0] === "SIGTERM"
      );

      expect(sigintCall).toBeDefined();
      expect(sigtermCall).toBeDefined();

      const sigintHandler = sigintCall![1] as () => void;
      const sigtermHandler = sigtermCall![1] as () => void;

      // Send multiple signals rapidly
      sigintHandler();
      sigtermHandler();
      sigintHandler();

      // Should exit for each signal
      expect(mockProcessExit).toHaveBeenCalledTimes(3);
      expect(mockProcessExit).toHaveBeenCalledWith(0);

      // Clean up mocks and listeners
      process.removeAllListeners("SIGINT");
      process.removeAllListeners("SIGTERM");
      mockProcessOn.mockRestore();
      mockProcessExit.mockRestore();
    });

    test("handles signal during startup", async () => {
      const mockProcessOn = jest.spyOn(process, "on").mockImplementation();
      const mockProcessExit = jest.spyOn(process, "exit").mockImplementation();

      // Make startup take time
      mockStartStdioServer.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      const config = {
        debugMode: false,
        targetUrl: "https://test.com/mcp",
      };

      const startupPromise = startProxy(config);

      // Wait for startup to complete and signal handlers to be registered
      await startupPromise;

      // Now get signal handlers with null checks
      const sigintCall = mockProcessOn.mock.calls.find(
        (call) => call[0] === "SIGINT"
      );

      expect(sigintCall).toBeDefined();

      if (sigintCall) {
        const sigintHandler = sigintCall[1] as () => void;
        sigintHandler();
        expect(mockProcessExit).toHaveBeenCalledWith(0);
      }

      // Clean up mocks and listeners
      process.removeAllListeners("SIGINT");
      process.removeAllListeners("SIGTERM");
      mockProcessOn.mockRestore();
      mockProcessExit.mockRestore();
    });
  });

  describe("Client Detection Edge Cases", () => {
    test("handles client detection timeout", async () => {
      mockExtractClientInfoFromParent.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ name: "slow", version: "1.0" }), 5000)
          )
      );

      const config = {
        debugMode: false,
        targetUrl: "https://test.com/mcp",
      };

      // Should not block server startup
      await expect(startProxy(config)).resolves.not.toThrow();
      expect(mockStartStdioServer).toHaveBeenCalled();
    });

    test("handles client detection crash", async () => {
      mockExtractClientInfoFromParent.mockImplementation(() => {
        throw new Error("Client detection crashed");
      });

      const config = {
        debugMode: true,
        targetUrl: "https://test.com/mcp",
      };

      // Should not prevent server startup
      await expect(startProxy(config)).resolves.not.toThrow();
      expect(mockStartStdioServer).toHaveBeenCalled();
    });

    test("handles malformed client information", async () => {
      const malformedClientInfos = [
        null,
        undefined,
        { name: null, version: "1.0" },
        { name: "Test", version: null },
        { name: "", version: "" },
        { invalidField: "value" },
        "not an object",
        42,
      ];

      for (const clientInfo of malformedClientInfos) {
        jest.clearAllMocks();
        mockExtractClientInfoFromParent.mockResolvedValue(clientInfo);

        const config = {
          debugMode: false,
          targetUrl: "https://test.com/mcp",
        };

        // Should handle gracefully
        await expect(startProxy(config)).resolves.not.toThrow();
        expect(mockStartStdioServer).toHaveBeenCalled();
      }
    });
  });

  describe("Logging and Output Edge Cases", () => {
    test("handles console.error override", async () => {
      const originalError = console.error;

      // Mock console.error to throw an error when called
      console.error = jest.fn().mockImplementation(() => {
        throw new Error("Console error is broken");
      });

      const config = {
        debugMode: true,
        targetUrl: "https://test.com/mcp",
      };

      // Should handle gracefully when console.error throws
      await expect(startProxy(config)).resolves.not.toThrow();

      console.error = originalError;
    });

    test("handles extremely long error messages", async () => {
      const longError = new Error("x".repeat(10000));
      mockStartStdioServer.mockRejectedValue(longError);

      const config = {
        debugMode: true,
        targetUrl: "https://test.com/mcp",
      };

      await expect(startProxy(config)).rejects.toThrow();

      // Should handle long error messages gracefully
      expect(console.error).toHaveBeenCalled();
    });

    test("handles circular reference in error objects", async () => {
      const circularError: any = new Error("Circular error");
      circularError.self = circularError;
      mockStartStdioServer.mockRejectedValue(circularError);

      const config = {
        debugMode: false,
        targetUrl: "https://test.com/mcp",
      };

      await expect(startProxy(config)).rejects.toThrow("Circular error");

      // Should handle circular references in error logging
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("Race Condition Edge Cases", () => {
    test("handles rapid start/stop cycles", async () => {
      const config = {
        debugMode: false,
        targetUrl: "https://test.com/mcp",
      };

      const mockProcessExit = jest.spyOn(process, "exit").mockImplementation();

      // Start and immediately signal shutdown
      const promises = [];
      for (let i = 0; i < 5; i++) {
        promises.push(startProxy(config));
      }

      await Promise.allSettled(promises);

      // All should complete without crashing
      expect(mockStartStdioServer).toHaveBeenCalled();

      mockProcessExit.mockRestore();
    });

    test("handles configuration changes during startup", async () => {
      let configCallCount = 0;
      mockGetProxyConfig.mockImplementation(() => {
        configCallCount++;
        return {
          debugMode: configCallCount % 2 === 0,
          targetUrl: `https://test${configCallCount}.com/mcp`,
        };
      });

      // Start multiple instances that will get different configs
      const startupPromises = Array(3)
        .fill()
        .map(() => main());

      await Promise.allSettled(startupPromises);

      expect(mockGetProxyConfig).toHaveBeenCalledTimes(3);
      expect(mockStartStdioServer).toHaveBeenCalledTimes(3);
    });
  });

  describe("Platform-Specific Edge Cases", () => {
    test("handles Windows-specific path issues", async () => {
      const originalPlatform = process.platform;
      Object.defineProperty(process, "platform", {
        configurable: true,
        value: "win32",
      });

      const config = {
        debugMode: false,
        targetUrl: "https://test.com/mcp",
      };

      await expect(startProxy(config)).resolves.not.toThrow();

      Object.defineProperty(process, "platform", {
        configurable: true,
        value: originalPlatform,
      });
    });

    test("handles Unix signal variations", async () => {
      const originalPlatform = process.platform;

      for (const platform of ["linux", "darwin", "freebsd"]) {
        Object.defineProperty(process, "platform", {
          configurable: true,
          value: platform,
        });

        jest.clearAllMocks();
        const mockProcessOn = jest.spyOn(process, "on").mockImplementation();

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

        // Clean up for this iteration
        process.removeAllListeners("SIGINT");
        process.removeAllListeners("SIGTERM");
        mockProcessOn.mockRestore();
      }

      Object.defineProperty(process, "platform", {
        configurable: true,
        value: originalPlatform,
      });
    });
  });
});
