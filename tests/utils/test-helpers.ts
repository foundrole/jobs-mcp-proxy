/**
 * Test utilities and helpers for MCP proxy testing
 */

import type { ProxyConfig } from "~/index";

import { jest } from "@jest/globals";

/**
 * Creates a valid ProxyConfig for testing
 */
export function createTestProxyConfig(
  overrides: Partial<ProxyConfig> = {}
): ProxyConfig {
  return {
    debugMode: false,
    targetUrl: "https://www.foundrole.com/mcp",
    ...overrides,
  };
}

/**
 * Creates environment variables setup for testing
 */
export function createTestEnvironment(
  envVars: Record<string, string> = {}
): void {
  Object.entries(envVars).forEach(([key, value]) => {
    process.env[key] = value;
  });
}

/**
 * Cleans up environment variables after testing
 */
export function cleanupTestEnvironment(keys: string[]): void {
  keys.forEach((key) => {
    delete process.env[key];
  });
}

/**
 * Mock implementation for the mcp-proxy startStdioServer function
 */
export function createMockStdioServer(): {
  mockStartStdioServer: jest.MockedFunction<any>;
  mockServerType: { HTTPStream: string };
} {
  const mockStartStdioServer = jest.fn() as jest.MockedFunction<any>;
  const mockServerType = { HTTPStream: "HTTPStream" };

  return {
    mockServerType,
    mockStartStdioServer,
  };
}

/**
 * Creates a promise that resolves after a specified delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Creates a promise that rejects after a specified delay
 */
export function delayedReject(ms: number, error: Error): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(error);
    }, ms);
  });
}

/**
 * Captures console output for testing
 */
export class ConsoleCapture {
  private originalError: typeof console.error;
  private originalLog: typeof console.log;
  public errorCalls: string[] = [];
  public logCalls: string[] = [];

  constructor() {
    this.originalError = console.error;
    this.originalLog = console.log;
  }

  start(): void {
    this.errorCalls = [];
    this.logCalls = [];

    console.error = jest.fn((...args: any[]) => {
      this.errorCalls.push(args.join(" "));
    }) as any;

    console.log = jest.fn((...args: any[]) => {
      this.logCalls.push(args.join(" "));
    }) as any;
  }

  stop(): void {
    console.error = this.originalError;
    console.log = this.originalLog;
  }

  getErrorOutput(): string {
    return this.errorCalls.join("\n");
  }

  getLogOutput(): string {
    return this.logCalls.join("\n");
  }

  getAllOutput(): string {
    return [...this.errorCalls, ...this.logCalls].join("\n");
  }
}

/**
 * Test data constants
 */
export const TEST_URLS = {
  DEFAULT: "https://www.foundrole.com/mcp",
  INVALID: "not-a-valid-url",
  LOCALHOST: "http://localhost:3002/mcp",
  SECURE: "https://secure.example.com/mcp",
} as const;

/**
 * Common test scenarios for environment variables
 */
export const TEST_ENV_SCENARIOS = {
  DEFAULT: {},
  WITH_CUSTOM_URL: { MCP_TARGET_URL: TEST_URLS.LOCALHOST },
  WITH_INVALID_URL: { MCP_TARGET_URL: TEST_URLS.INVALID },
  WITH_SECURE_URL: { MCP_TARGET_URL: TEST_URLS.SECURE },
} as const;

/**
 * Common error messages for testing
 */
export const TEST_ERROR_MESSAGES = {
  CONNECTION_FAILED: "Failed to connect to target MCP server",
  INVALID_URL: "Invalid URL format",
  SERVER_UNREACHABLE: "Server is not reachable",
  TIMEOUT: "Connection timeout",
} as const;
