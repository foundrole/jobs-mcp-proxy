/**
 * stdio-server functionality tests
 * Tests MCP server initialization and HTTP client setup
 */

// @ts-nocheck - Disabling TypeScript for simplified mocking

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import type { ClientInfo } from "../src/types.js";

// Create a global mock client instance that can be shared
const createMockClient = () => ({
  connect: jest.fn().mockResolvedValue(undefined),
  getServerCapabilities: jest.fn().mockReturnValue({
    logging: {},
    prompts: {},
    resources: { subscribe: true },
    tools: {},
  }),
  getServerVersion: jest.fn().mockReturnValue({
    name: "test-server",
    version: "1.0.0",
  }),
});

// Mock the MCP SDK modules - must be declared before imports
jest.mock("@modelcontextprotocol/sdk/client/index.js", () => ({
  Client: jest.fn(),
}));

jest.mock("@modelcontextprotocol/sdk/server/index.js", () => ({
  Server: jest.fn().mockImplementation(() => ({
    connect: jest.fn().mockResolvedValue(undefined),
  })),
}));

jest.mock("@modelcontextprotocol/sdk/server/stdio.js", () => ({
  StdioServerTransport: jest.fn().mockImplementation(() => ({})),
}));

jest.mock("@modelcontextprotocol/sdk/client/streamableHttp.js", () => ({
  StreamableHTTPClientTransport: jest.fn().mockImplementation(() => ({})),
}));

// Mock the client detector and proxy server
jest.mock("../src/client-detector.js", () => ({
  extractClientInfoFromParent: jest
    .fn<() => Promise<ClientInfo>>()
    .mockResolvedValue({
      name: "macOS//TestApp",
      version: "1.2.3",
    }),
}));

jest.mock("../src/proxy-server.js", () => ({
  proxyServer: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
}));

// Import mocked modules
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { extractClientInfoFromParent } from "../src/client-detector.js";
import { proxyServer } from "../src/proxy-server.js";
import { startStdioServer } from "../src/stdio-server.js";

// Create typed mock constructors
const MockClient = Client as jest.MockedClass<typeof Client>;
const MockServer = Server as jest.MockedClass<typeof Server>;
const MockStdioTransport = StdioServerTransport as jest.MockedClass<
  typeof StdioServerTransport
>;
const MockHttpTransport = StreamableHTTPClientTransport as jest.MockedClass<
  typeof StreamableHTTPClientTransport
>;

const mockExtractClient = extractClientInfoFromParent as jest.MockedFunction<
  typeof extractClientInfoFromParent
>;
const mockProxyServer = proxyServer as jest.MockedFunction<typeof proxyServer>;

// Global mock instances
let mockClientInstance: ReturnType<typeof createMockClient>;
let mockServerInstance: any;
let mockTransportInstance: any;

describe("stdio-server Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset console.error mock
    console.error = jest.fn();

    // Get fresh references to mock instances
    MockClient.mockClear();
    MockServer.mockClear();
    MockStdioTransport.mockClear();
    MockHttpTransport.mockClear();

    // Set up default mock returns
    mockExtractClient.mockResolvedValue({
      name: "macOS//TestApp",
      version: "1.2.3",
    });

    mockProxyServer.mockResolvedValue(undefined);

    // Create fresh mock instances
    mockClientInstance = createMockClient();
    mockServerInstance = {
      connect: jest.fn().mockResolvedValue(undefined),
    };
    mockTransportInstance = {};

    // Set up the mock implementations
    MockClient.mockImplementation(() => mockClientInstance);
    MockServer.mockImplementation(() => mockServerInstance);
    MockStdioTransport.mockImplementation(() => mockTransportInstance);
    MockHttpTransport.mockImplementation(() => mockTransportInstance);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("startStdioServer", () => {
    test("successfully starts stdio server with valid URL", async () => {
      const testUrl = "https://api.example.com/mcp";

      const server = await startStdioServer({ url: testUrl });

      expect(server).toBeDefined();
      expect(MockServer).toHaveBeenCalledWith(
        { name: "test-server", version: "1.0.0" },
        {
          capabilities: {
            logging: {},
            prompts: {},
            resources: { subscribe: true },
            tools: {},
          },
        }
      );
    });

    test("extracts client info from parent process", async () => {
      const testUrl = "http://localhost:3000/mcp";

      await startStdioServer({ url: testUrl });

      expect(mockExtractClient).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        "[PROXY] Using client identity: macOS//TestApp@1.2.3"
      );
    });

    test("creates HTTP client with correct transport", async () => {
      const testUrl = "https://secure.example.com/mcp";

      await startStdioServer({ url: testUrl });

      expect(MockHttpTransport).toHaveBeenCalledWith(new URL(testUrl));
      expect(MockClient).toHaveBeenCalledWith(
        { name: "macOS//TestApp", version: "1.2.3" },
        { capabilities: {} }
      );

      // Verify the client connect method was called
      expect(mockClientInstance.connect).toHaveBeenCalled();
    });

    test("retrieves server version and capabilities", async () => {
      const testUrl = "http://api.test.com/mcp";

      await startStdioServer({ url: testUrl });

      expect(mockClientInstance.getServerVersion).toHaveBeenCalledTimes(1);
      expect(mockClientInstance.getServerCapabilities).toHaveBeenCalledTimes(1);
    });

    test("creates stdio server with retrieved info", async () => {
      const testUrl = "https://example.com/mcp";

      await startStdioServer({ url: testUrl });

      expect(MockServer).toHaveBeenCalledWith(
        { name: "test-server", version: "1.0.0" },
        {
          capabilities: {
            logging: {},
            prompts: {},
            resources: { subscribe: true },
            tools: {},
          },
        }
      );
    });

    test("connects stdio transport to server", async () => {
      const testUrl = "https://test.example.com/mcp";

      await startStdioServer({ url: testUrl });

      expect(MockStdioTransport).toHaveBeenCalledTimes(1);

      // Verify server connect was called with transport
      expect(mockServerInstance.connect).toHaveBeenCalledWith(
        mockTransportInstance
      );
    });

    test("sets up proxy server connection", async () => {
      const testUrl = "http://localhost:8080/mcp";

      await startStdioServer({ url: testUrl });

      expect(mockProxyServer).toHaveBeenCalledWith({
        client: mockClientInstance,
        server: mockServerInstance,
        serverCapabilities: {
          logging: {},
          prompts: {},
          resources: { subscribe: true },
          tools: {},
        },
      });
    });

    test("returns the created server instance", async () => {
      const testUrl = "https://api.example.com/mcp";

      const server = await startStdioServer({ url: testUrl });

      expect(server).toBe(mockServerInstance);
    });
  });

  describe("Error Handling", () => {
    test("handles client info extraction failure", async () => {
      const error = new Error("Failed to extract client info");
      mockExtractClient.mockRejectedValue(error);

      await expect(
        startStdioServer({ url: "https://test.com" })
      ).rejects.toThrow("Failed to extract client info");
    });

    test("handles HTTP client connection failure", async () => {
      const error = new Error("Connection failed");

      // Mock the connect method to fail
      mockClientInstance.connect.mockRejectedValueOnce(error);

      await expect(
        startStdioServer({ url: "https://unreachable.com" })
      ).rejects.toThrow("Connection failed");
    });

    test("handles stdio server connection failure", async () => {
      const error = new Error("Stdio connection failed");

      // Mock the server connect method to fail
      mockServerInstance.connect.mockRejectedValueOnce(error);

      await expect(
        startStdioServer({ url: "https://test.com" })
      ).rejects.toThrow("Stdio connection failed");
    });

    test("handles proxy server setup failure", async () => {
      const error = new Error("Proxy setup failed");
      mockProxyServer.mockRejectedValue(error);

      await expect(
        startStdioServer({ url: "https://test.com" })
      ).rejects.toThrow("Proxy setup failed");
    });

    test("handles invalid URL format", async () => {
      await expect(startStdioServer({ url: "invalid-url" })).rejects.toThrow();
    });
  });

  describe("URL Handling", () => {
    test("works with HTTP URLs", async () => {
      const httpUrl = "http://localhost:3000/mcp";

      await startStdioServer({ url: httpUrl });

      expect(MockHttpTransport).toHaveBeenCalledWith(new URL(httpUrl));
    });

    test("works with HTTPS URLs", async () => {
      const httpsUrl = "https://secure.api.com/mcp";

      await startStdioServer({ url: httpsUrl });

      expect(MockHttpTransport).toHaveBeenCalledWith(new URL(httpsUrl));
    });

    test("handles URLs with query parameters", async () => {
      const urlWithQuery = "https://api.com/mcp?auth=token&debug=true";

      await startStdioServer({ url: urlWithQuery });

      expect(MockHttpTransport).toHaveBeenCalledWith(new URL(urlWithQuery));
    });

    test("handles URLs with ports", async () => {
      const urlWithPort = "http://localhost:8080/mcp";

      await startStdioServer({ url: urlWithPort });

      expect(MockHttpTransport).toHaveBeenCalledWith(new URL(urlWithPort));
    });

    test("handles URLs with authentication", async () => {
      const urlWithAuth = "https://user:pass@api.example.com/mcp";

      await startStdioServer({ url: urlWithAuth });

      expect(MockHttpTransport).toHaveBeenCalledWith(new URL(urlWithAuth));
    });
  });

  describe("Client Info Scenarios", () => {
    test("handles different client info formats", async () => {
      const clientInfos: ClientInfo[] = [
        { name: "macOS//Claude", version: "2.1.0" },
        { name: "Windows//VSCode", version: "1.85.0" },
        { name: "Linux//Firefox", version: "120.0" },
        { name: "TestApp", version: "unknown" },
      ];

      for (const clientInfo of clientInfos) {
        jest.clearAllMocks();
        mockExtractClient.mockResolvedValue(clientInfo);

        await startStdioServer({ url: "https://test.com" });

        expect(console.error).toHaveBeenCalledWith(
          `[PROXY] Using client identity: ${clientInfo.name}@${clientInfo.version}`
        );
        expect(MockClient).toHaveBeenCalledWith(clientInfo, {
          capabilities: {},
        });
      }
    });

    test("handles client info with additional properties", async () => {
      const clientInfo: ClientInfo = {
        build: "abc123",
        name: "macOS//CustomApp",
        platform: "darwin",
        version: "3.0.0",
      };

      mockExtractClient.mockResolvedValue(clientInfo);

      await startStdioServer({ url: "https://test.com" });

      expect(MockClient).toHaveBeenCalledWith(clientInfo, { capabilities: {} });
    });
  });

  describe("Server Capabilities Scenarios", () => {
    test("handles different server capability configurations", async () => {
      const capabilities = [
        { prompts: {}, tools: {} },
        { logging: {}, resources: { subscribe: false } },
        {
          logging: {},
          prompts: {},
          resources: { subscribe: true },
          tools: {},
        },
        {},
      ];

      for (const serverCapabilities of capabilities) {
        jest.clearAllMocks();

        // Update the mock to return specific capabilities
        mockClientInstance.getServerCapabilities.mockReturnValue(
          serverCapabilities
        );

        await startStdioServer({ url: "https://test.com" });

        expect(MockServer).toHaveBeenCalledWith(
          { name: "test-server", version: "1.0.0" },
          { capabilities: serverCapabilities }
        );
      }
    });

    test("handles server with no capabilities", async () => {
      // Update mock to return empty capabilities
      mockClientInstance.getServerCapabilities.mockReturnValue({});

      await startStdioServer({ url: "https://test.com" });

      expect(MockServer).toHaveBeenCalledWith(
        { name: "test-server", version: "1.0.0" },
        { capabilities: {} }
      );
    });
  });

  describe("Integration Flow", () => {
    test("all components are properly initialized", async () => {
      const testUrl = "https://complete.test.com/mcp";

      const server = await startStdioServer({ url: testUrl });

      // Verify all mocks were called
      expect(mockExtractClient).toHaveBeenCalled();
      expect(MockHttpTransport).toHaveBeenCalled();
      expect(MockClient).toHaveBeenCalled();
      expect(MockServer).toHaveBeenCalled();
      expect(MockStdioTransport).toHaveBeenCalled();
      expect(mockProxyServer).toHaveBeenCalled();

      expect(mockClientInstance.connect).toHaveBeenCalled();
      expect(mockClientInstance.getServerVersion).toHaveBeenCalled();
      expect(mockClientInstance.getServerCapabilities).toHaveBeenCalled();
      expect(mockServerInstance.connect).toHaveBeenCalled();
      expect(server).toBe(mockServerInstance);
    });
  });
});
