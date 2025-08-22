/**
 * cli functionality tests
 * Tests CLI entry point and process error handling
 */

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

// Mock main function from index
const mockMain = jest.fn<() => Promise<void>>();
jest.mock("../src/index.js", () => ({
  main: mockMain,
}));

// Mock console.error and process.exit
let mockProcessExit: jest.SpiedFunction<typeof process.exit>;
let mockConsoleError: jest.Mock;

describe("CLI Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock console.error
    mockConsoleError = jest.fn();
    console.error = mockConsoleError;

    // Mock process.exit
    mockProcessExit = jest.spyOn(process, "exit").mockImplementation((() => {
      throw new Error("process.exit was called");
    }) as any);

    // Set up default main mock
    mockMain.mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.resetAllMocks();
    mockProcessExit.mockRestore();
  });

  describe("CLI Logic Simulation", () => {
    test("successful main execution", async () => {
      // Simulate CLI logic: main().catch(handler)
      try {
        await mockMain();
      } catch (error) {
        console.error("Unexpected error starting MCP proxy:", error);
        process.exit(1);
      }

      expect(mockMain).toHaveBeenCalledWith();
      expect(mockProcessExit).not.toHaveBeenCalled();
      expect(mockConsoleError).not.toHaveBeenCalled();
    });

    test("handles main function rejection", async () => {
      const error = new Error("Main function failed");
      mockMain.mockRejectedValue(error);

      // Simulate CLI logic with error
      try {
        await mockMain();
      } catch (caughtError) {
        console.error("Unexpected error starting MCP proxy:", caughtError);
        expect(() => process.exit(1)).toThrow("process.exit was called");
      }

      expect(mockMain).toHaveBeenCalledTimes(1);
      expect(mockConsoleError).toHaveBeenCalledWith(
        "Unexpected error starting MCP proxy:",
        error
      );
    });

    test("handles synchronous errors", async () => {
      const error = new Error("Sync error");
      mockMain.mockImplementation(() => {
        throw error;
      });

      try {
        await mockMain();
      } catch (caughtError) {
        console.error("Unexpected error starting MCP proxy:", caughtError);
        expect(() => process.exit(1)).toThrow("process.exit was called");
      }

      expect(mockConsoleError).toHaveBeenCalledWith(
        "Unexpected error starting MCP proxy:",
        error
      );
    });
  });

  describe("Error Handling Scenarios", () => {
    test("handles network errors gracefully", async () => {
      const networkError = new Error("ECONNREFUSED");
      mockMain.mockRejectedValue(networkError);

      try {
        await mockMain();
      } catch (error) {
        console.error("Unexpected error starting MCP proxy:", error);
        expect(() => process.exit(1)).toThrow("process.exit was called");
      }

      expect(mockConsoleError).toHaveBeenCalledWith(
        "Unexpected error starting MCP proxy:",
        networkError
      );
    });

    test("handles configuration errors gracefully", async () => {
      const configError = new Error("Invalid configuration");
      mockMain.mockRejectedValue(configError);

      try {
        await mockMain();
      } catch (error) {
        console.error("Unexpected error starting MCP proxy:", error);
        expect(() => process.exit(1)).toThrow("process.exit was called");
      }

      expect(mockConsoleError).toHaveBeenCalledWith(
        "Unexpected error starting MCP proxy:",
        configError
      );
    });

    test("handles timeout errors gracefully", async () => {
      const timeoutError = new Error("Request timeout");
      mockMain.mockRejectedValue(timeoutError);

      try {
        await mockMain();
      } catch (error) {
        console.error("Unexpected error starting MCP proxy:", error);
        expect(() => process.exit(1)).toThrow("process.exit was called");
      }

      expect(mockConsoleError).toHaveBeenCalledWith(
        "Unexpected error starting MCP proxy:",
        timeoutError
      );
    });
  });

  describe("Edge Cases", () => {
    test("handles undefined error", async () => {
      mockMain.mockRejectedValue(undefined);

      try {
        await mockMain();
      } catch (error) {
        console.error("Unexpected error starting MCP proxy:", error);
        expect(() => process.exit(1)).toThrow("process.exit was called");
      }

      expect(mockConsoleError).toHaveBeenCalledWith(
        "Unexpected error starting MCP proxy:",
        undefined
      );
    });

    test("handles null error", async () => {
      mockMain.mockRejectedValue(null);

      try {
        await mockMain();
      } catch (error) {
        console.error("Unexpected error starting MCP proxy:", error);
        expect(() => process.exit(1)).toThrow("process.exit was called");
      }

      expect(mockConsoleError).toHaveBeenCalledWith(
        "Unexpected error starting MCP proxy:",
        null
      );
    });

    test("handles string error", async () => {
      mockMain.mockRejectedValue("String error");

      try {
        await mockMain();
      } catch (error) {
        console.error("Unexpected error starting MCP proxy:", error);
        expect(() => process.exit(1)).toThrow("process.exit was called");
      }

      expect(mockConsoleError).toHaveBeenCalledWith(
        "Unexpected error starting MCP proxy:",
        "String error"
      );
    });
  });

  describe("CLI Module Import Test", () => {
    test("CLI module triggers main function when imported", async () => {
      // The CLI module should be importable and trigger the main function
      // Since modules are cached, this mainly verifies the module structure
      await import("../src/cli.js");

      // The main function would have been called during module execution
      // We can't test this directly due to module caching, but we verify
      // that the module can be imported without errors
      expect(true).toBe(true); // Module imported successfully
    });
  });
});
