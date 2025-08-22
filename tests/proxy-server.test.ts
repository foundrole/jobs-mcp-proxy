/**
 * proxy-server functionality tests
 * Tests MCP request/response proxying with comprehensive coverage
 */

// @ts-nocheck - Complex mocking scenarios with MCP SDK types

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

// Create mock implementations using jest.fn with manual implementation
const mockClient = {
  callTool: jest.fn(async () => ({
    content: [{ text: "Tool response", type: "text" }],
  })),
  complete: jest.fn(async () => ({
    completion: {
      hasMore: false,
      total: 1,
      values: ["test completion"],
    },
  })),
  getPrompt: jest.fn(async () => ({
    messages: [
      { content: { text: "Test prompt", type: "text" }, role: "user" },
    ],
  })),
  listPrompts: jest.fn(async () => ({
    prompts: [{ description: "Test prompt", name: "test-prompt" }],
  })),
  listResources: jest.fn(async () => ({
    resources: [{ name: "Test Resource", uri: "test://resource" }],
  })),
  listResourceTemplates: jest.fn(async () => ({
    resourceTemplates: [{ name: "Test Template", uriTemplate: "test://{id}" }],
  })),
  listTools: jest.fn(async () => ({
    tools: [{ description: "Test tool", name: "test-tool" }],
  })),
  notification: jest.fn(async () => void 0),
  readResource: jest.fn(async () => ({
    contents: [{ text: "Resource content", type: "text" }],
  })),
  setNotificationHandler: jest.fn(),
  subscribeResource: jest.fn(async () => ({})),
  unsubscribeResource: jest.fn(async () => ({})),
} as unknown as Client;

const mockServer = {
  notification: jest.fn(async () => void 0),
  setNotificationHandler: jest.fn(),
  setRequestHandler: jest.fn(),
} as any;

// Mock the schema imports
jest.mock("@modelcontextprotocol/sdk/types.js", () => ({
  CallToolRequestSchema: { method: "tools/call", type: "request" },
  CompleteRequestSchema: { method: "completion/complete", type: "request" },
  GetPromptRequestSchema: { method: "prompts/get", type: "request" },
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
  ReadResourceRequestSchema: { method: "resources/read", type: "request" },
  ResourceUpdatedNotificationSchema: {
    method: "notifications/resources/updated",
    type: "notification",
  },
  SubscribeRequestSchema: { method: "resources/subscribe", type: "request" },
  UnsubscribeRequestSchema: {
    method: "resources/unsubscribe",
    type: "request",
  },
}));

import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import {
  CallToolRequestSchema,
  CompleteRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ListToolsRequestSchema,
  LoggingMessageNotificationSchema,
  ReadResourceRequestSchema,
  ResourceUpdatedNotificationSchema,
  SubscribeRequestSchema,
  UnsubscribeRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { proxyServer } from "../src/proxy-server.js";

describe("proxy-server Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Restore mock implementations after clear
    (mockClient.getPrompt as jest.Mock).mockImplementation(async () => ({
      messages: [
        { content: { text: "Test prompt", type: "text" }, role: "user" },
      ],
    }));
    (mockClient.listPrompts as jest.Mock).mockImplementation(async () => ({
      prompts: [{ description: "Test prompt", name: "test-prompt" }],
    }));
    (mockClient.listResources as jest.Mock).mockImplementation(async () => ({
      resources: [{ name: "Test Resource", uri: "test://resource" }],
    }));
    (mockClient.readResource as jest.Mock).mockImplementation(async () => ({
      contents: [{ text: "Resource content", type: "text" }],
    }));
    (mockClient.subscribeResource as jest.Mock).mockImplementation(
      async () => ({})
    );
    (mockClient.callTool as jest.Mock).mockImplementation(async () => ({
      content: [{ text: "Tool response", type: "text" }],
    }));
    (mockClient.listTools as jest.Mock).mockImplementation(async () => ({
      tools: [{ description: "Test tool", name: "test-tool" }],
    }));
    (mockClient.complete as jest.Mock).mockImplementation(async () => ({
      completion: {
        hasMore: false,
        total: 1,
        values: ["test completion"],
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Logging Capabilities", () => {
    test("sets up logging handlers when logging capability is present", async () => {
      const serverCapabilities = { logging: {} };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      expect(mockServer.setNotificationHandler).toHaveBeenCalledWith(
        LoggingMessageNotificationSchema,
        expect.any(Function)
      );
      expect(mockClient.setNotificationHandler).toHaveBeenCalledWith(
        LoggingMessageNotificationSchema,
        expect.any(Function)
      );
    });

    test("server logging handler forwards to client", async () => {
      const serverCapabilities = { logging: {} };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      // Get the handler function that was registered
      const serverLogHandler = (
        mockServer.setNotificationHandler as jest.Mock
      ).mock.calls.find(
        (call: any[]) => call[0] === LoggingMessageNotificationSchema
      )?.[1];

      expect(serverLogHandler).toBeDefined();

      // Test the handler
      const logArgs = {
        method: "notifications/message",
        params: { level: "info", message: "test" },
      };
      await (serverLogHandler as any)(logArgs);

      expect(mockClient.notification).toHaveBeenCalledWith(logArgs);
    });

    test("client logging handler forwards to server", async () => {
      const serverCapabilities = { logging: {} };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      // Get the handler function that was registered
      const clientLogHandler = (
        mockClient.setNotificationHandler as jest.Mock
      ).mock.calls.find(
        (call: any[]) => call[0] === LoggingMessageNotificationSchema
      )?.[1];

      expect(clientLogHandler).toBeDefined();

      // Test the handler
      const logArgs = {
        method: "notifications/message",
        params: { level: "error", message: "test error" },
      };
      await (clientLogHandler as any)(logArgs);

      expect(mockServer.notification).toHaveBeenCalledWith(logArgs);
    });

    test("does not set up logging handlers when logging capability is absent", async () => {
      const serverCapabilities = {};

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      // Should not have set logging handlers
      expect(mockServer.setNotificationHandler).not.toHaveBeenCalledWith(
        LoggingMessageNotificationSchema,
        expect.any(Function)
      );
    });
  });

  describe("Prompts Capabilities", () => {
    test("sets up prompt handlers when prompts capability is present", async () => {
      const serverCapabilities = { prompts: {} };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      expect(mockServer.setRequestHandler).toHaveBeenCalledWith(
        GetPromptRequestSchema,
        expect.any(Function)
      );
      expect(mockServer.setRequestHandler).toHaveBeenCalledWith(
        ListPromptsRequestSchema,
        expect.any(Function)
      );
    });

    test("getPrompt handler forwards to client", async () => {
      const serverCapabilities = { prompts: {} };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      const getPromptHandler = (
        mockServer.setRequestHandler as jest.Mock
      ).mock.calls.find(
        (call: any[]) => call[0] === GetPromptRequestSchema
      )?.[1];

      expect(getPromptHandler).toBeDefined();

      const promptArgs = { params: { arguments: {}, name: "test-prompt" } };
      const result = await (getPromptHandler as any)(promptArgs);

      expect(mockClient.getPrompt).toHaveBeenCalledWith(promptArgs.params);
      expect(result).toEqual({
        messages: [
          { content: { text: "Test prompt", type: "text" }, role: "user" },
        ],
      });
    });

    test("listPrompts handler forwards to client", async () => {
      const serverCapabilities = { prompts: {} };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      const listPromptsHandler = (
        mockServer.setRequestHandler as jest.Mock
      ).mock.calls.find(
        (call: any[]) => call[0] === ListPromptsRequestSchema
      )?.[1];

      expect(listPromptsHandler).toBeDefined();

      const listArgs = { params: { cursor: "test" } };
      const result = await (listPromptsHandler as any)(listArgs);

      expect(mockClient.listPrompts).toHaveBeenCalledWith(listArgs.params);
      expect(result).toEqual({
        prompts: [{ description: "Test prompt", name: "test-prompt" }],
      });
    });

    test("does not set up prompt handlers when prompts capability is absent", async () => {
      const serverCapabilities = {};

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      expect(mockServer.setRequestHandler).not.toHaveBeenCalledWith(
        GetPromptRequestSchema,
        expect.any(Function)
      );
      expect(mockServer.setRequestHandler).not.toHaveBeenCalledWith(
        ListPromptsRequestSchema,
        expect.any(Function)
      );
    });
  });

  describe("Resources Capabilities", () => {
    test("sets up basic resource handlers when resources capability is present", async () => {
      const serverCapabilities = { resources: {} };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      expect(mockServer.setRequestHandler).toHaveBeenCalledWith(
        ListResourcesRequestSchema,
        expect.any(Function)
      );
      expect(mockServer.setRequestHandler).toHaveBeenCalledWith(
        ListResourceTemplatesRequestSchema,
        expect.any(Function)
      );
      expect(mockServer.setRequestHandler).toHaveBeenCalledWith(
        ReadResourceRequestSchema,
        expect.any(Function)
      );
    });

    test("sets up subscription handlers when subscribe capability is enabled", async () => {
      const serverCapabilities = { resources: { subscribe: true } };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      expect(mockServer.setNotificationHandler).toHaveBeenCalledWith(
        ResourceUpdatedNotificationSchema,
        expect.any(Function)
      );
      expect(mockServer.setRequestHandler).toHaveBeenCalledWith(
        SubscribeRequestSchema,
        expect.any(Function)
      );
      expect(mockServer.setRequestHandler).toHaveBeenCalledWith(
        UnsubscribeRequestSchema,
        expect.any(Function)
      );
    });

    test("listResources handler forwards to client", async () => {
      const serverCapabilities = { resources: {} };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      const listResourcesHandler = (
        mockServer.setRequestHandler as jest.Mock
      ).mock.calls.find(
        (call: any[]) => call[0] === ListResourcesRequestSchema
      )?.[1];

      expect(listResourcesHandler).toBeDefined();

      const listArgs = { params: { cursor: "test" } };
      const result = await (listResourcesHandler as any)(listArgs);

      expect(mockClient.listResources).toHaveBeenCalledWith(listArgs.params);
      expect(result).toEqual({
        resources: [{ name: "Test Resource", uri: "test://resource" }],
      });
    });

    test("readResource handler forwards to client", async () => {
      const serverCapabilities = { resources: {} };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      const readResourceHandler = (
        mockServer.setRequestHandler as jest.Mock
      ).mock.calls.find(
        (call: any[]) => call[0] === ReadResourceRequestSchema
      )?.[1];

      expect(readResourceHandler).toBeDefined();

      const readArgs = { params: { uri: "test://resource" } };
      const result = await (readResourceHandler as any)(readArgs);

      expect(mockClient.readResource).toHaveBeenCalledWith(readArgs.params);
      expect(result).toEqual({
        contents: [{ text: "Resource content", type: "text" }],
      });
    });

    test("subscribe handler forwards to client", async () => {
      const serverCapabilities = { resources: { subscribe: true } };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      const subscribeHandler = (
        mockServer.setRequestHandler as jest.Mock
      ).mock.calls.find(
        (call: any[]) => call[0] === SubscribeRequestSchema
      )?.[1];

      expect(subscribeHandler).toBeDefined();

      const subscribeArgs = { params: { uri: "test://resource" } };
      const result = await (subscribeHandler as any)(subscribeArgs);

      expect(mockClient.subscribeResource).toHaveBeenCalledWith(
        subscribeArgs.params
      );
      expect(result).toEqual({});
    });

    test("resource updated notification forwards to client", async () => {
      const serverCapabilities = { resources: { subscribe: true } };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      const updateHandler = (
        mockServer.setNotificationHandler as jest.Mock
      ).mock.calls.find(
        (call: any[]) => call[0] === ResourceUpdatedNotificationSchema
      )?.[1];

      expect(updateHandler).toBeDefined();

      const updateArgs = {
        method: "notifications/resources/updated",
        params: { uri: "test://resource" },
      };
      await (updateHandler as any)(updateArgs);

      expect(mockClient.notification).toHaveBeenCalledWith(updateArgs);
    });
  });

  describe("Tools Capabilities", () => {
    test("sets up tool handlers when tools capability is present", async () => {
      const serverCapabilities = { tools: {} };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      expect(mockServer.setRequestHandler).toHaveBeenCalledWith(
        CallToolRequestSchema,
        expect.any(Function)
      );
      expect(mockServer.setRequestHandler).toHaveBeenCalledWith(
        ListToolsRequestSchema,
        expect.any(Function)
      );
    });

    test("callTool handler forwards to client", async () => {
      const serverCapabilities = { tools: {} };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      const callToolHandler = (
        mockServer.setRequestHandler as jest.Mock
      ).mock.calls.find(
        (call: any[]) => call[0] === CallToolRequestSchema
      )?.[1];

      expect(callToolHandler).toBeDefined();

      const toolArgs = { params: { arguments: {}, name: "test-tool" } };
      const result = await (callToolHandler as any)(toolArgs);

      expect(mockClient.callTool).toHaveBeenCalledWith(toolArgs.params);
      expect(result).toEqual({
        content: [{ text: "Tool response", type: "text" }],
      });
    });

    test("listTools handler forwards to client", async () => {
      const serverCapabilities = { tools: {} };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      const listToolsHandler = (
        mockServer.setRequestHandler as jest.Mock
      ).mock.calls.find(
        (call: any[]) => call[0] === ListToolsRequestSchema
      )?.[1];

      expect(listToolsHandler).toBeDefined();

      const listArgs = { params: { cursor: "test" } };
      const result = await (listToolsHandler as any)(listArgs);

      expect(mockClient.listTools).toHaveBeenCalledWith(listArgs.params);
      expect(result).toEqual({
        tools: [{ description: "Test tool", name: "test-tool" }],
      });
    });
  });

  describe("Completion Capability", () => {
    test("always sets up completion handler", async () => {
      const serverCapabilities = {};

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      expect(mockServer.setRequestHandler).toHaveBeenCalledWith(
        CompleteRequestSchema,
        expect.any(Function)
      );
    });

    test("complete handler forwards to client", async () => {
      const serverCapabilities = {};

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      const completeHandler = (
        mockServer.setRequestHandler as jest.Mock
      ).mock.calls.find(
        (call: any[]) => call[0] === CompleteRequestSchema
      )?.[1];

      expect(completeHandler).toBeDefined();

      const completeArgs = {
        params: {
          argument: { name: "arg", value: "test-value" },
          ref: { name: "test", type: "ref/prompt" as const },
        },
      };
      const result = await (completeHandler as any)(completeArgs);

      expect(mockClient.complete).toHaveBeenCalledWith(completeArgs.params);
      expect(result).toEqual({
        completion: {
          hasMore: false,
          total: 1,
          values: ["test completion"],
        },
      });
    });
  });

  describe("getClient Parameter", () => {
    test("uses getClient function when provided", async () => {
      const alternateClient = {
        ...mockClient,
        listTools: jest.fn(async () => ({
          tools: [{ name: "alternate-tool" }],
        })),
      };

      const getClient = jest.fn().mockReturnValue(alternateClient) as jest.Mock<
        () => Client
      >;

      await proxyServer({
        client: mockClient,
        getClient,
        server: mockServer,
        serverCapabilities: { tools: {} },
      });

      const listToolsHandler = (
        mockServer.setRequestHandler as jest.Mock
      ).mock.calls.find(
        (call: any[]) => call[0] === ListToolsRequestSchema
      )?.[1];

      const result = await (listToolsHandler as any)({ params: {} });

      expect(getClient).toHaveBeenCalled();
      expect(alternateClient.listTools).toHaveBeenCalled();
      expect(mockClient.listTools).not.toHaveBeenCalled();
      expect(result).toEqual({ tools: [{ name: "alternate-tool" }] });
    });

    test("falls back to original client when getClient returns null", async () => {
      const getClient = jest.fn().mockReturnValue(null) as unknown as jest.Mock<
        () => Client
      >;

      await proxyServer({
        client: mockClient,
        getClient,
        server: mockServer,
        serverCapabilities: { tools: {} },
      });

      const listToolsHandler = (
        mockServer.setRequestHandler as jest.Mock
      ).mock.calls.find(
        (call: any[]) => call[0] === ListToolsRequestSchema
      )?.[1];

      await (listToolsHandler as any)({ params: {} });

      expect(getClient).toHaveBeenCalled();
      expect(mockClient.listTools).toHaveBeenCalled();
    });

    test("falls back to original client when getClient is not provided", async () => {
      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities: { tools: {} },
      });

      const listToolsHandler = (
        mockServer.setRequestHandler as jest.Mock
      ).mock.calls.find(
        (call: any[]) => call[0] === ListToolsRequestSchema
      )?.[1];

      await (listToolsHandler as any)({ params: {} });

      expect(mockClient.listTools).toHaveBeenCalled();
    });
  });

  describe("Complex Capability Combinations", () => {
    test("handles all capabilities enabled", async () => {
      const serverCapabilities = {
        logging: {},
        prompts: {},
        resources: { subscribe: true },
        tools: {},
      };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      // Should set up all handlers
      expect(mockServer.setRequestHandler).toHaveBeenCalledTimes(10); // All request handlers
      expect(mockServer.setNotificationHandler).toHaveBeenCalledTimes(2); // Logging + resource updates
      expect(mockClient.setNotificationHandler).toHaveBeenCalledTimes(1); // Logging
    });

    test("handles no capabilities", async () => {
      const serverCapabilities = {};

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      // Should only set up completion handler
      expect(mockServer.setRequestHandler).toHaveBeenCalledTimes(1);
      expect(mockServer.setNotificationHandler).toHaveBeenCalledTimes(0);
      expect(mockClient.setNotificationHandler).toHaveBeenCalledTimes(0);
    });

    test("handles resources without subscribe capability", async () => {
      const serverCapabilities = { resources: {} };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      // Should set up basic resource handlers but not subscription handlers
      expect(mockServer.setRequestHandler).toHaveBeenCalledWith(
        ListResourcesRequestSchema,
        expect.any(Function)
      );
      expect(mockServer.setRequestHandler).not.toHaveBeenCalledWith(
        SubscribeRequestSchema,
        expect.any(Function)
      );
    });

    test("handles resources with subscribe disabled", async () => {
      const serverCapabilities = { resources: { subscribe: false } };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      // Should not set up subscription handlers
      expect(mockServer.setNotificationHandler).not.toHaveBeenCalledWith(
        ResourceUpdatedNotificationSchema,
        expect.any(Function)
      );
    });
  });

  describe("Error Handling", () => {
    test("handles client method failures gracefully", async () => {
      const error = new Error("Client method failed");
      (mockClient.listTools as jest.Mock).mockImplementation(async () => {
        throw error;
      });

      const serverCapabilities = { tools: {} };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      const listToolsHandler = (
        mockServer.setRequestHandler as jest.Mock
      ).mock.calls.find(
        (call: any[]) => call[0] === ListToolsRequestSchema
      )?.[1];

      await expect((listToolsHandler as any)({ params: {} })).rejects.toThrow(
        "Client method failed"
      );
    });

    test("handles notification failures gracefully", async () => {
      const error = new Error("Notification failed");
      (mockClient.notification as jest.Mock).mockImplementation(async () => {
        throw error;
      });

      const serverCapabilities = { logging: {} };

      await proxyServer({
        client: mockClient,
        server: mockServer,
        serverCapabilities,
      });

      const serverLogHandler = (
        mockServer.setNotificationHandler as jest.Mock
      ).mock.calls.find(
        (call: any[]) => call[0] === LoggingMessageNotificationSchema
      )?.[1];

      const logArgs = {
        method: "notifications/message",
        params: { level: "info", message: "test" },
      };
      await expect((serverLogHandler as any)(logArgs)).rejects.toThrow(
        "Notification failed"
      );
    });
  });
});
