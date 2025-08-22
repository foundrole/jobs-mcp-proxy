/**
 * Jest setup file for global test configuration
 */

import { jest } from "@jest/globals";

// Set up global mocks for external dependencies
jest.mock("@modelcontextprotocol/sdk/server/index.js", () =>
  import("./mocks/mcp-sdk.js").then((m) => ({ Server: m.Server }))
);

jest.mock("@modelcontextprotocol/sdk/client/index.js", () =>
  import("./mocks/mcp-sdk.js").then((m) => ({ Client: m.Client }))
);

jest.mock("@modelcontextprotocol/sdk/server/stdio.js", () =>
  import("./mocks/mcp-sdk.js").then((m) => ({
    StdioServerTransport: m.StdioServerTransport,
  }))
);

jest.mock("@modelcontextprotocol/sdk/client/streamableHttp.js", () =>
  import("./mocks/mcp-sdk.js").then((m) => ({
    StreamableHTTPClientTransport: m.StreamableHTTPClientTransport,
  }))
);

jest.mock("@modelcontextprotocol/sdk/types.js", () =>
  import("./mocks/mcp-sdk.js").then((m) => ({
    CallToolRequestSchema: m.CallToolRequestSchema,
    CompleteRequestSchema: m.CompleteRequestSchema,
    GetPromptRequestSchema: m.GetPromptRequestSchema,
    ListPromptsRequestSchema: m.ListPromptsRequestSchema,
    ListResourcesRequestSchema: m.ListResourcesRequestSchema,
    ListResourceTemplatesRequestSchema: m.ListResourceTemplatesRequestSchema,
    ListToolsRequestSchema: m.ListToolsRequestSchema,
    LoggingMessageNotificationSchema: m.LoggingMessageNotificationSchema,
    ReadResourceRequestSchema: m.ReadResourceRequestSchema,
    ResourceUpdatedNotificationSchema: m.ResourceUpdatedNotificationSchema,
    SubscribeRequestSchema: m.SubscribeRequestSchema,
    UnsubscribeRequestSchema: m.UnsubscribeRequestSchema,
  }))
);

jest.mock("find-process", () =>
  import("./mocks/external-dependencies.js").then((m) => m.findProcess)
);

jest.mock("elfy", () =>
  import("./mocks/external-dependencies.js").then((m) => m.elfy)
);

jest.mock("plist", () =>
  import("./mocks/external-dependencies.js").then((m) => m.plist)
);

jest.mock("win-version-info", () =>
  import("./mocks/external-dependencies.js").then((m) => m.winVersionInfo)
);

// Global test setup - runs before all tests

// Store original environment variables
const originalEnv = process.env;

// Mock console methods to prevent noise in tests
const originalConsoleError = console.error;
const originalConsoleLog = console.log;

beforeEach(() => {
  // Reset environment variables before each test
  process.env = { ...originalEnv };

  // Clear all mocks
  jest.clearAllMocks();

  // Mock console methods by default (tests can override if needed)
  console.error = jest.fn() as any;
  console.log = jest.fn() as any;
});

afterEach(() => {
  // Restore environment variables after each test
  process.env = originalEnv;
});

afterAll(() => {
  // Restore console methods
  console.error = originalConsoleError;
  console.log = originalConsoleLog;
});

// Global test utilities - types are defined in types/jest.d.ts

// Custom Jest matchers
expect.extend({
  toBeValidUrl(received: string) {
    let pass = false;
    let matcherResult = {
      message: () => "",
      pass: false,
    };

    try {
      const url = new URL(received);
      pass = Boolean(url.protocol && url.host);
      matcherResult = {
        message: () =>
          pass
            ? `Expected ${received} not to be a valid URL`
            : `Expected ${received} to be a valid URL`,
        pass,
      };
    } catch {
      matcherResult = {
        message: () =>
          `Expected ${received} to be a valid URL but it threw an error`,
        pass: false,
      };
    }

    return matcherResult;
  },
});

// Global test timeout for async operations
jest.setTimeout(15000);
