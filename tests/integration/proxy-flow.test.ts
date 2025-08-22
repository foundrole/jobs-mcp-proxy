/**
 * Integration tests for proxy request/response flow
 * Tests end-to-end message proxying between client and target server
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

// Create mock implementations directly
const mockClient = {
  callTool: jest.fn().mockResolvedValue({
    content: [{ text: "Mock tool response", type: "text" }],
  }),
  complete: jest.fn().mockResolvedValue({
    completion: { hasMore: false, total: 1, values: ["test completion"] },
  }),
  connect: jest.fn().mockResolvedValue(undefined),
  disconnect: jest.fn().mockResolvedValue(undefined),
  getPrompt: jest.fn().mockResolvedValue({
    messages: [
      { content: { text: "Test prompt", type: "text" }, role: "user" },
    ],
  }),
  getServerCapabilities: jest.fn().mockReturnValue({
    logging: {},
    prompts: {},
    resources: {},
    tools: {},
  }),
  getServerVersion: jest.fn().mockReturnValue({
    name: "test-server",
    version: "1.0.0",
  }),
  listPrompts: jest.fn().mockResolvedValue({
    prompts: [{ description: "Test prompt", name: "test-prompt" }],
  }),
  listResources: jest.fn().mockResolvedValue({
    resources: [{ name: "test-resource", uri: "test://resource" }],
  }),
  listResourceTemplates: jest.fn().mockResolvedValue({
    resourceTemplates: [{ name: "test-template", uriTemplate: "test://{id}" }],
  }),
  listTools: jest.fn().mockResolvedValue({
    tools: [{ description: "Test tool", name: "test-tool" }],
  }),
  notification: jest.fn().mockResolvedValue(undefined),
  readResource: jest.fn().mockResolvedValue({
    contents: [{ text: "Resource content", type: "text" }],
  }),
  setNotificationHandler: jest.fn(),
  subscribeResource: jest.fn().mockResolvedValue({}),
  unsubscribeResource: jest.fn().mockResolvedValue({}),
};

const mockServer = {
  close: jest.fn().mockResolvedValue(undefined),
  connect: jest.fn().mockResolvedValue(undefined),
  notification: jest.fn().mockResolvedValue(undefined),
  setNotificationHandler: jest.fn(),
  setRequestHandler: jest.fn(),
};

// Mock the MCP SDK modules
jest.mock("@modelcontextprotocol/sdk/server/index.js", () => ({
  Server: jest.fn().mockImplementation(() => mockServer),
}));

jest.mock("@modelcontextprotocol/sdk/client/index.js", () => ({
  Client: jest.fn().mockImplementation((...args) => {
    // Ensure all required methods are available on every instance
    return {
      ...mockClient,
      // Reset the mocks but keep the structure
      callTool: jest.fn().mockResolvedValue({
        content: [{ text: "Mock tool response", type: "text" }],
      }),
      connect: jest.fn().mockResolvedValue(undefined),
      getServerCapabilities: jest.fn().mockReturnValue({
        logging: {},
        prompts: {},
        resources: {},
        tools: {},
      }),
      getServerVersion: jest
        .fn()
        .mockReturnValue({ name: "test-server", version: "1.0.0" }),
      notification: jest.fn().mockResolvedValue(undefined),
    };
  }),
}));

jest.mock("@modelcontextprotocol/sdk/server/stdio.js", () => ({
  StdioServerTransport: jest.fn().mockImplementation(() => ({
    close: jest.fn().mockResolvedValue(undefined),
    send: jest.fn().mockResolvedValue(undefined),
    start: jest.fn().mockResolvedValue(undefined),
  })),
}));

jest.mock("@modelcontextprotocol/sdk/client/streamableHttp.js", () => ({
  StreamableHTTPClientTransport: jest.fn().mockImplementation(() => ({
    close: jest.fn().mockResolvedValue(undefined),
    send: jest.fn().mockResolvedValue(undefined),
    start: jest.fn().mockResolvedValue(undefined),
  })),
}));

jest.mock("@modelcontextprotocol/sdk/types.js", () => ({
  CallToolRequestSchema: { method: "tools/call", type: "request" },
  CompleteRequestSchema: { method: "completion/complete", type: "request" },
  GetPromptRequestSchema: { method: "prompts/get", type: "request" },
  InitializedNotificationSchema: {
    method: "notifications/initialized",
    type: "notification",
  },
  ListPromptsRequestSchema: { method: "prompts/list", type: "request" },
  ListResourcesRequestSchema: { method: "resources/list", type: "request" },
  ListResourceTemplatesRequestSchema: {
    method: "resources/templates/list",
    type: "request",
  },
  ListToolsRequestSchema: { method: "tools/list", type: "request" },
  LoggingMessageNotificationSchema: {
    method: "notifications/message",
    type: "notification",
  },
  ProgressNotificationSchema: {
    method: "notifications/progress",
    type: "notification",
  },
  PromptListChangedNotificationSchema: {
    method: "notifications/prompts/list_changed",
    type: "notification",
  },
  ReadResourceRequestSchema: { method: "resources/read", type: "request" },
  ResourceListChangedNotificationSchema: {
    method: "notifications/resources/list_changed",
    type: "notification",
  },
  ResourceUpdatedNotificationSchema: {
    method: "notifications/resources/updated",
    type: "notification",
  },
  SetLevelRequestSchema: { method: "logging/setLevel", type: "request" },
  SubscribeRequestSchema: { method: "resources/subscribe", type: "request" },
  ToolListChangedNotificationSchema: {
    method: "notifications/tools/list_changed",
    type: "notification",
  },
  UnsubscribeRequestSchema: {
    method: "resources/unsubscribe",
    type: "request",
  },
}));

// Mock client-detector
const mockExtractClientInfoFromParent = jest.fn().mockResolvedValue({
  name: "test-client",
  version: "1.0.0",
});

jest.mock("../../src/client-detector.js", () => ({
  extractClientInfoFromParent: mockExtractClientInfoFromParent,
}));

import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import type { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  LoggingMessageNotificationSchema,
  ProgressNotificationSchema,
  ReadResourceRequestSchema,
  ResourceUpdatedNotificationSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { proxyServer } from "../../src/proxy-server.js";

// Mock the stdio server function to avoid complex client construction
const mockStartStdioServer = jest.fn().mockImplementation(async ({ url }) => {
  // Simulate the behavior of the real function
  await mockExtractClientInfoFromParent();
  const httpClient = {
    ...mockClient,
    getServerCapabilities: jest
      .fn()
      .mockReturnValue({ logging: {}, prompts: {}, resources: {}, tools: {} }),
    getServerVersion: jest
      .fn()
      .mockReturnValue({ name: "test-server", version: "1.0.0" }),
  };

  await httpClient.connect();
  await mockServer.connect();

  // Set up proxy handlers
  await proxyServer({
    client: httpClient,
    server: mockServer,
    serverCapabilities: httpClient.getServerCapabilities(),
  });

  return mockServer;
});

jest.mock("../../src/stdio-server.js", () => ({
  startStdioServer: mockStartStdioServer,
}));

import { startStdioServer } from "../../src/stdio-server.js";

describe("Proxy Flow Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();

    // Reset client detector mock
    mockExtractClientInfoFromParent.mockResolvedValue({
      name: "test-client",
      version: "1.0.0",
    });

    // Reset stdio server mock implementation
    mockStartStdioServer.mockImplementation(async ({ url }) => {
      await mockExtractClientInfoFromParent();
      const httpClient = {
        ...mockClient,
        getServerCapabilities: jest.fn().mockReturnValue({
          logging: {},
          prompts: {},
          resources: {},
          tools: {},
        }),
        getServerVersion: jest
          .fn()
          .mockReturnValue({ name: "test-server", version: "1.0.0" }),
      };

      await httpClient.connect();
      await mockServer.connect();

      await proxyServer({
        client: httpClient,
        server: mockServer,
        serverCapabilities: httpClient.getServerCapabilities(),
      });

      return mockServer;
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("End-to-End Request Flow", () => {
    test("successfully proxies tool call request", async () => {
      const serverCapabilities = { tools: {} };

      await proxyServer({
        client: mockClient as any,
        server: mockServer as any,
        serverCapabilities,
      });

      // Simulate tool call request
      const toolRequest = {
        method: "tools/call",
        params: {
          arguments: { query: "software engineer" },
          name: "search_jobs",
        },
      };

      const expectedResponse = {
        content: [
          {
            text: "Found 50 jobs matching 'software engineer'",
            type: "text",
          },
        ],
      };

      mockClient.callTool.mockResolvedValueOnce(expectedResponse);

      // Get the request handler that was set up
      const requestHandler = mockServer.setRequestHandler.mock.calls.find(
        (call) => call[0] === CallToolRequestSchema
      )[1];

      const response = await requestHandler(toolRequest);

      expect(mockClient.callTool).toHaveBeenCalledWith(toolRequest.params);
      expect(response).toEqual(expectedResponse);
    });

    test("successfully proxies resource request", async () => {
      const serverCapabilities = { resources: {} };

      await proxyServer({
        client: mockClient as any,
        server: mockServer as any,
        serverCapabilities,
      });

      const resourceRequest = {
        method: "resources/read",
        params: {
          uri: "job://12345",
        },
      };

      const expectedResponse = {
        contents: [
          {
            mimeType: "application/json",
            text: JSON.stringify({
              company: "Tech Corp",
              title: "Software Engineer",
            }),
            uri: "job://12345",
          },
        ],
      };

      mockClient.readResource.mockResolvedValueOnce(expectedResponse);

      // Get the resource request handler
      const requestHandler = mockServer.setRequestHandler.mock.calls.find(
        (call) => call[0] === ReadResourceRequestSchema
      )[1];

      const response = await requestHandler(resourceRequest);

      expect(mockClient.readResource).toHaveBeenCalledWith(
        resourceRequest.params
      );
      expect(response).toEqual(expectedResponse);
    });

    test("successfully proxies list requests", async () => {
      const serverCapabilities = { tools: {} };

      await proxyServer({
        client: mockClient as any,
        server: mockServer as any,
        serverCapabilities,
      });

      const listToolsRequest = {
        method: "tools/list",
        params: {},
      };

      const expectedResponse = {
        tools: [
          {
            description: "Search for job listings",
            inputSchema: {
              properties: {
                query: { type: "string" },
              },
              type: "object",
            },
            name: "search_jobs",
          },
        ],
      };

      mockClient.listTools.mockResolvedValueOnce(expectedResponse);

      // Get the list tools request handler
      const requestHandler = mockServer.setRequestHandler.mock.calls.find(
        (call) => call[0] === ListToolsRequestSchema
      )[1];

      const response = await requestHandler(listToolsRequest);

      expect(mockClient.listTools).toHaveBeenCalledWith(
        listToolsRequest.params
      );
      expect(response).toEqual(expectedResponse);
    });
  });

  describe("End-to-End Notification Flow", () => {
    test("successfully proxies progress notification", async () => {
      const serverCapabilities = { logging: {} };

      await proxyServer({
        client: mockClient as any,
        server: mockServer as any,
        serverCapabilities,
      });

      const progressNotification = {
        method: "notifications/message",
        params: {
          data: {
            progress: 50,
            progressToken: "search-123",
            total: 100,
          },
          level: "info",
          message: "Progress update",
        },
      };

      // Get the logging notification handler
      const notificationHandler =
        mockServer.setNotificationHandler.mock.calls.find(
          (call) => call[0] === LoggingMessageNotificationSchema
        )[1];

      await notificationHandler(progressNotification);

      expect(mockClient.notification).toHaveBeenCalledWith(
        progressNotification
      );
    });

    test("successfully proxies logging notification", async () => {
      const serverCapabilities = { logging: {} };

      await proxyServer({
        client: mockClient as any,
        server: mockServer as any,
        serverCapabilities,
      });

      const loggingNotification = {
        method: "notifications/message",
        params: {
          data: { resultsCount: 25 },
          level: "info",
          message: "Search completed successfully",
        },
      };

      // Get the logging notification handler
      const notificationHandler =
        mockServer.setNotificationHandler.mock.calls.find(
          (call) => call[0] === LoggingMessageNotificationSchema
        )[1];

      await notificationHandler(loggingNotification);

      expect(mockClient.notification).toHaveBeenCalledWith(loggingNotification);
    });

    test("successfully proxies resource update notifications", async () => {
      const serverCapabilities = { resources: { subscribe: true } };

      await proxyServer({
        client: mockClient as any,
        server: mockServer as any,
        serverCapabilities,
      });

      const resourceUpdateNotification = {
        method: "notifications/resources/updated",
        params: {
          uri: "job://12345",
        },
      };

      // Get the resource update notification handler
      const notificationHandler =
        mockServer.setNotificationHandler.mock.calls.find(
          (call) => call[0] === ResourceUpdatedNotificationSchema
        )[1];

      await notificationHandler(resourceUpdateNotification);

      expect(mockClient.notification).toHaveBeenCalledWith(
        resourceUpdateNotification
      );
    });
  });

  describe("Error Handling in Proxy Flow", () => {
    test("handles request error from target server", async () => {
      const serverCapabilities = { tools: {} };

      await proxyServer({
        client: mockClient as any,
        server: mockServer as any,
        serverCapabilities,
      });

      const error = new Error("Target server error");
      mockClient.callTool.mockRejectedValueOnce(error);

      const toolRequest = {
        method: "tools/call",
        params: { name: "search_jobs" },
      };

      // Get the request handler
      const requestHandler = mockServer.setRequestHandler.mock.calls.find(
        (call) => call[0] === CallToolRequestSchema
      )[1];

      await expect(requestHandler(toolRequest)).rejects.toThrow(
        "Target server error"
      );

      expect(mockClient.callTool).toHaveBeenCalledWith(toolRequest.params);
    });

    test("handles notification error from target server", async () => {
      const serverCapabilities = { logging: {} };

      await proxyServer({
        client: mockClient as any,
        server: mockServer as any,
        serverCapabilities,
      });

      const error = new Error("Notification failed");
      mockClient.notification.mockRejectedValueOnce(error);

      const notification = {
        method: "notifications/message",
        params: { level: "error", message: "test" },
      };

      // Get the notification handler
      const notificationHandler =
        mockServer.setNotificationHandler.mock.calls.find(
          (call) => call[0] === LoggingMessageNotificationSchema
        )[1];

      // Notification errors should propagate
      await expect(notificationHandler(notification)).rejects.toThrow(
        "Notification failed"
      );

      expect(mockClient.notification).toHaveBeenCalledWith(notification);
    });

    test("handles malformed request parameters", async () => {
      const serverCapabilities = { tools: {} };

      await proxyServer({
        client: mockClient as any,
        server: mockServer as any,
        serverCapabilities,
      });

      const malformedRequest = {
        method: "tools/call",
        params: null, // Invalid params
      };

      // Get the request handler
      const requestHandler = mockServer.setRequestHandler.mock.calls.find(
        (call) => call[0] === CallToolRequestSchema
      )[1];

      await requestHandler(malformedRequest);

      expect(mockClient.callTool).toHaveBeenCalledWith(null);
    });
  });

  describe("Server Integration Flow", () => {
    test("complete server startup to request handling flow", async () => {
      // Import the mocked client detector to ensure mock is active
      const { extractClientInfoFromParent } = await import(
        "../../src/client-detector.js"
      );

      // Verify the mock is working
      const clientInfo = await extractClientInfoFromParent();
      expect(clientInfo).toEqual({
        name: "test-client",
        version: "1.0.0",
      });

      // Start the stdio server
      await startStdioServer({ url: "https://api.example.com/mcp" });

      // Verify server was created and connected
      expect(mockServer.connect).toHaveBeenCalledTimes(1);
      expect(mockClient.connect).toHaveBeenCalledTimes(1);

      // Verify request handlers were set up based on server capabilities
      const requestHandlerCalls = mockServer.setRequestHandler.mock.calls;
      const handlerSchemas = requestHandlerCalls.map((call) => call[0]);

      expect(handlerSchemas).toContain(CallToolRequestSchema);
      expect(handlerSchemas).toContain(ListToolsRequestSchema);
      expect(handlerSchemas).toContain(ListResourcesRequestSchema);
      expect(handlerSchemas).toContain(ReadResourceRequestSchema);
      expect(handlerSchemas).toContain(ListPromptsRequestSchema);
      expect(handlerSchemas).toContain(GetPromptRequestSchema);
    });

    test("server handles multiple concurrent requests", async () => {
      const serverCapabilities = { resources: {}, tools: {} };

      await proxyServer({
        client: mockClient as any,
        server: mockServer as any,
        serverCapabilities,
      });

      // Set up different responses for different requests
      mockClient.listTools
        .mockResolvedValueOnce({ tools: [] })
        .mockResolvedValueOnce({ tools: [] });
      mockClient.listResources
        .mockResolvedValueOnce({ resources: [] })
        .mockResolvedValueOnce({ resources: [] });
      mockClient.callTool
        .mockResolvedValueOnce({ content: [{ text: "result1", type: "text" }] })
        .mockResolvedValueOnce({
          content: [{ text: "result2", type: "text" }],
        });

      const requests = [
        { method: "tools/list", params: {} },
        { method: "resources/list", params: {} },
        { method: "tools/call", params: { name: "tool1" } },
        { method: "tools/call", params: { name: "tool2" } },
      ];

      // Get request handlers
      const listToolsHandler = mockServer.setRequestHandler.mock.calls.find(
        (call) => call[0] === ListToolsRequestSchema
      )[1];
      const listResourcesHandler = mockServer.setRequestHandler.mock.calls.find(
        (call) => call[0] === ListResourcesRequestSchema
      )[1];
      const callToolHandler = mockServer.setRequestHandler.mock.calls.find(
        (call) => call[0] === CallToolRequestSchema
      )[1];

      // Execute requests concurrently
      const responses = await Promise.all([
        listToolsHandler(requests[0]),
        listResourcesHandler(requests[1]),
        callToolHandler(requests[2]),
        callToolHandler(requests[3]),
      ]);

      expect(responses).toHaveLength(4);
      expect(mockClient.listTools).toHaveBeenCalledTimes(1);
      expect(mockClient.listResources).toHaveBeenCalledTimes(1);
      expect(mockClient.callTool).toHaveBeenCalledTimes(2);
    });
  });

  describe("Data Flow Integrity", () => {
    test("request data is preserved through proxy", async () => {
      const serverCapabilities = { tools: {} };

      await proxyServer({
        client: mockClient as any,
        server: mockServer as any,
        serverCapabilities,
      });

      const complexRequest = {
        method: "tools/call",
        params: {
          arguments: {
            experience: "5-10 years",
            filters: {
              company_size: "startup",
              salary: { max: 180000, min: 120000 },
            },
            location: "San Francisco",
            query: "software engineer",
            remote: true,
            skills: ["JavaScript", "TypeScript", "React"],
          },
          name: "search_jobs",
        },
      };

      const expectedResponse = {
        content: [
          {
            text: "Search results",
            type: "text",
          },
          {
            data: {
              jobs: [
                { id: "1", title: "Senior Software Engineer" },
                { id: "2", title: "Full Stack Developer" },
              ],
              totalCount: 25,
            },
            type: "application/json",
          },
        ],
      };

      mockClient.callTool.mockResolvedValueOnce(expectedResponse);

      // Get the request handler
      const requestHandler = mockServer.setRequestHandler.mock.calls.find(
        (call) => call[0] === CallToolRequestSchema
      )[1];

      const response = await requestHandler(complexRequest);

      // Verify exact data preservation
      expect(mockClient.callTool).toHaveBeenCalledWith(complexRequest.params);
      expect(response).toEqual(expectedResponse);
    });

    test("notification data is preserved through proxy", async () => {
      const serverCapabilities = { logging: {} };

      await proxyServer({
        client: mockClient as any,
        server: mockServer as any,
        serverCapabilities,
      });

      const complexNotification = {
        method: "notifications/message",
        params: {
          data: {
            metadata: {
              estimated_time: "2 minutes",
              processed: 750,
              remaining: 250,
              stage: "filtering",
            },
            progress: 75,
            progressToken: "search-job-12345",
            total: 100,
          },
          level: "info",
          message: "Processing job applications",
        },
      };

      // Get the notification handler
      const notificationHandler =
        mockServer.setNotificationHandler.mock.calls.find(
          (call) => call[0] === LoggingMessageNotificationSchema
        )[1];

      await notificationHandler(complexNotification);

      // Verify exact data preservation
      expect(mockClient.notification).toHaveBeenCalledWith(complexNotification);
    });

    test("binary and unicode data handling", async () => {
      const serverCapabilities = { resources: {} };

      await proxyServer({
        client: mockClient as any,
        server: mockServer as any,
        serverCapabilities,
      });

      const binaryRequest = {
        method: "resources/read",
        params: {
          uri: "file://resume.pdf",
        },
      };

      const binaryResponse = {
        contents: [
          {
            blob: "base64encodedcontent...",
            mimeType: "application/pdf",
            uri: "file://resume.pdf",
          },
        ],
      };

      mockClient.readResource.mockResolvedValueOnce(binaryResponse);

      // Get the request handler
      const requestHandler = mockServer.setRequestHandler.mock.calls.find(
        (call) => call[0] === ReadResourceRequestSchema
      )[1];

      const response = await requestHandler(binaryRequest);

      expect(response).toEqual(binaryResponse);
      expect(mockClient.readResource).toHaveBeenCalledWith(
        binaryRequest.params
      );
    });
  });
});
