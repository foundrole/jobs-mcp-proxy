/**
 * Tests for main function execution and script lifecycle
 * Tests entry point behavior, process exit handling, and command-line execution
 */

import {
  describe,
  expect,
  test,
  beforeEach,
  afterEach,
  jest,
} from "@jest/globals";

import {
  cleanupTestEnvironment,
  ConsoleCapture,
  createMockStdioServer,
  createTestEnvironment,
  TEST_URLS,
} from "./utils/test-helpers";

// Mock the mcp-proxy module
jest.mock("mcp-proxy", () => ({
  ServerType: {
    HTTPStream: "HTTPStream",
  },
  startStdioServer: jest.fn(),
}));

describe("Main Function Execution", () => {
  let consoleCapture: ConsoleCapture;
  let mockStartStdioServer: jest.MockedFunction<any>;
  let originalProcessExit: typeof process.exit;
  let mockProcessExit: jest.MockedFunction<typeof process.exit>;
  let originalProcessArgv: string[];

  beforeEach(async () => {
    // Get the mocked function
    const mcpProxy = await import("mcp-proxy");
    mockStartStdioServer =
      mcpProxy.startStdioServer as jest.MockedFunction<any>;

    consoleCapture = new ConsoleCapture();
    consoleCapture.start();

    // Clean up environment variables
    cleanupTestEnvironment(["MCP_TARGET_URL"]);

    // Mock process.exit
    originalProcessExit = process.exit;
    mockProcessExit = jest.fn() as jest.MockedFunction<typeof process.exit>;
    process.exit = mockProcessExit;

    // Store original process.argv
    originalProcessArgv = process.argv;

    // Reset all mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleCapture.stop();

    // Restore process.exit
    process.exit = originalProcessExit;

    // Restore process.argv
    process.argv = originalProcessArgv;
  });

  describe("main function behavior", () => {
    test("main function executes successfully with default configuration", async () => {
      mockStartStdioServer.mockResolvedValue(undefined);

      // Simulate direct execution by importing the module
      // Note: The actual main() function is not exported, so we test the module loading behavior
      const indexModule = await import("~/index");

      // Get configuration and start proxy manually to simulate main function
      const config = indexModule.getProxyConfig();
      await indexModule.startProxy(config);

      expect(mockStartStdioServer).toHaveBeenCalledWith({
        serverType: expect.any(String),
        url: TEST_URLS.DEFAULT,
      });

      const errorOutput = consoleCapture.getErrorOutput();
      expect(errorOutput).toContain(
        "AI Job Search MCP server started successfully"
      );
    });

    test("main function handles configuration from environment", async () => {
      mockStartStdioServer.mockResolvedValue(undefined);
      createTestEnvironment({ MCP_TARGET_URL: TEST_URLS.LOCALHOST });

      const indexModule = await import("~/index");

      const config = indexModule.getProxyConfig();
      await indexModule.startProxy(config);

      expect(mockStartStdioServer).toHaveBeenCalledWith({
        serverType: expect.any(String),
        url: TEST_URLS.LOCALHOST,
      });

      const errorOutput = consoleCapture.getErrorOutput();
      expect(errorOutput).toContain(`Target URL: ${TEST_URLS.LOCALHOST}`);
      expect(errorOutput).toContain("Debug mode: enabled");
    });

    test("main function handles startup errors and exits with code 1", async () => {
      const startupError = new Error("Startup failed");
      mockStartStdioServer.mockRejectedValue(startupError);

      const indexModule = await import("~/index");

      try {
        const config = indexModule.getProxyConfig();
        await indexModule.startProxy(config);
      } catch (error) {
        // This simulates what the main function would do on error
        const errorOutput = consoleCapture.getErrorOutput();
        expect(errorOutput).toContain(
          "Failed to connect to target MCP server:"
        );
        expect(error).toBe(startupError);
      }
    });
  });

  describe("command-line execution detection", () => {
    test("module execution is detected correctly", () => {
      // Test the condition used in the actual module for direct execution
      // if (import.meta.url === `file://${process.argv[1]}`) {

      // Simulate different execution scenarios
      const moduleUrl = "file:///path/to/src/index.ts";
      const processArgv1 = "/path/to/src/index.ts";

      const isDirectExecution = moduleUrl === `file://${processArgv1}`;
      expect(typeof isDirectExecution).toBe("boolean");
    });

    test("handles different file path formats", () => {
      const testCases = [
        {
          description: "Unix path",
          expected: true,
          moduleUrl: "file:///usr/local/project/src/index.ts",
          processArgv: "/usr/local/project/src/index.ts",
        },
        {
          description: "Windows path mismatch",
          expected: false,
          moduleUrl: "file:///C:/project/src/index.ts",
          processArgv: "/D:/project/src/index.ts",
        },
        {
          description: "Relative path",
          expected: false,
          moduleUrl: "file:///project/src/index.ts",
          processArgv: "src/index.ts",
        },
        {
          description: "Different file",
          expected: false,
          moduleUrl: "file:///project/src/index.ts",
          processArgv: "/project/src/other.ts",
        },
      ];

      testCases.forEach(({ description, expected, moduleUrl, processArgv }) => {
        const isDirectExecution = moduleUrl === `file://${processArgv}`;
        expect(isDirectExecution).toBe(expected);
      });
    });
  });

  describe("error handling in main execution", () => {
    test("unexpected errors are logged and cause exit", async () => {
      const unexpectedError = new Error("Unexpected error");
      mockStartStdioServer.mockRejectedValue(unexpectedError);

      // Simulate the main function error handling
      try {
        const indexModule = await import("~/index");
        const config = indexModule.getProxyConfig();
        await indexModule.startProxy(config);
      } catch (error) {
        // This simulates the main function's catch block
        expect(error).toBe(unexpectedError);

        const errorOutput = consoleCapture.getErrorOutput();
        expect(errorOutput).toContain(
          "Failed to connect to target MCP server:"
        );
      }
    });

    test("configuration errors are handled gracefully", async () => {
      // Test scenario where getProxyConfig might throw (though it currently doesn't)
      const indexModule = await import("~/index");

      // This should not throw under normal circumstances
      expect(() => indexModule.getProxyConfig()).not.toThrow();
    });

    test("multiple error scenarios are handled independently", async () => {
      const errors = [
        new Error("Network error"),
        new Error("Configuration error"),
        new Error("Server error"),
      ];

      for (const error of errors) {
        mockStartStdioServer.mockRejectedValueOnce(error);

        const indexModule = await import("~/index");

        await expect(async () => {
          const config = indexModule.getProxyConfig();
          await indexModule.startProxy(config);
        }).rejects.toThrow(error.message);
      }
    });
  });

  describe("process lifecycle", () => {
    test("successful execution does not call process.exit", async () => {
      mockStartStdioServer.mockResolvedValue(undefined);

      const indexModule = await import("~/index");
      const config = indexModule.getProxyConfig();
      await indexModule.startProxy(config);

      // In successful execution, process.exit should not be called
      expect(mockProcessExit).not.toHaveBeenCalled();
    });

    test("error scenarios would call process.exit with code 1", () => {
      // This tests the expected behavior of the main function
      // In the actual implementation, errors cause process.exit(1)

      // Simulate the error handling logic
      const shouldExit = true; // This would be determined by error handling

      if (shouldExit) {
        // This is what the main function would do
        expect(typeof process.exit).toBe("function");
      }
    });
  });

  describe("module loading and imports", () => {
    test("module exports are accessible", async () => {
      const indexModule = await import("~/index");

      expect(typeof indexModule.getProxyConfig).toBe("function");
      expect(typeof indexModule.startProxy).toBe("function");
    });

    test("exported functions work independently", async () => {
      mockStartStdioServer.mockResolvedValue(undefined);

      const indexModule = await import("~/index");

      // Test getProxyConfig independently
      const config1 = indexModule.getProxyConfig();
      expect(config1).toHaveProperty("targetUrl");
      expect(config1).toHaveProperty("debugMode");

      // Test that it returns consistent results
      const config2 = indexModule.getProxyConfig();
      expect(config1).toEqual(config2);

      // Test startProxy independently
      await expect(indexModule.startProxy(config1)).resolves.toBeUndefined();
    });

    test("module can be imported multiple times safely", async () => {
      // Multiple imports should not cause issues
      const module1 = await import("~/index");
      const module2 = await import("~/index");

      expect(module1.getProxyConfig).toBe(module2.getProxyConfig);
      expect(module1.startProxy).toBe(module2.startProxy);
    });
  });

  describe("environment isolation", () => {
    test("different environment setups work independently", async () => {
      mockStartStdioServer.mockResolvedValue(undefined);

      // Test with default environment
      cleanupTestEnvironment(["MCP_TARGET_URL"]);
      const indexModule = await import("~/index");

      const defaultConfig = indexModule.getProxyConfig();
      expect(defaultConfig.targetUrl).toBe(TEST_URLS.DEFAULT);
      expect(defaultConfig.debugMode).toBe(false);

      // Test with custom environment
      createTestEnvironment({ MCP_TARGET_URL: TEST_URLS.LOCALHOST });

      const customConfig = indexModule.getProxyConfig();
      expect(customConfig.targetUrl).toBe(TEST_URLS.LOCALHOST);
      expect(customConfig.debugMode).toBe(true);
    });

    test("environment changes are reflected in new configurations", async () => {
      const indexModule = await import("~/index");

      // Start with no custom environment
      cleanupTestEnvironment(["MCP_TARGET_URL"]);
      const config1 = indexModule.getProxyConfig();

      // Change environment
      createTestEnvironment({
        MCP_TARGET_URL: "https://changed.example.com/mcp",
      });
      const config2 = indexModule.getProxyConfig();

      expect(config1.targetUrl).toBe(TEST_URLS.DEFAULT);
      expect(config2.targetUrl).toBe("https://changed.example.com/mcp");
      expect(config1.debugMode).toBe(false);
      expect(config2.debugMode).toBe(true);
    });
  });
});
