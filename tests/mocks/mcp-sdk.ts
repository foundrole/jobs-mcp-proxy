/**
 * Comprehensive mocks for @modelcontextprotocol/sdk
 */

import { jest } from "@jest/globals";

// Mock transport classes - ensure they behave like constructors
export const StdioServerTransport = jest.fn().mockImplementation(function (
  this: any,
  ...args: any[]
) {
  const instance = {
    close: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
    send: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
    start: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
  };

  // Assign instance to this if called with new
  if (this instanceof StdioServerTransport) {
    Object.assign(this as object, instance);
    return this;
  }

  return instance;
});

export const StreamableHTTPClientTransport = jest
  .fn()
  .mockImplementation(function (this: any, ...args: any[]) {
    const instance = {
      close: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
      send: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
      start: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
    };

    // Assign instance to this if called with new
    if (this instanceof StreamableHTTPClientTransport) {
      Object.assign(this as object, instance);
      return this;
    }

    return instance;
  });

// Mock client class - use constructor function format
export const Client = jest.fn().mockImplementation(function (
  this: any,
  ...args: any[]
) {
  const instance = {
    callTool: jest.fn<any>().mockResolvedValue({
      content: [
        {
          text: "Mock tool response",
          type: "text",
        },
      ],
    }),
    complete: jest.fn<any>().mockResolvedValue({
      completion: {
        hasMore: false,
        total: 0,
        values: [],
      },
    }),
    connect: jest.fn<any>().mockResolvedValue(undefined),
    disconnect: jest.fn<any>().mockResolvedValue(undefined),
    getPrompt: jest.fn<any>().mockResolvedValue({
      messages: [],
    }),
    getServerCapabilities: jest.fn<any>().mockReturnValue({
      logging: {},
      prompts: {},
      resources: {
        subscribe: true,
      },
      tools: {},
    }),
    getServerVersion: jest.fn<any>().mockReturnValue({
      name: "test-server",
      version: "1.0.0",
    }),
    listPrompts: jest.fn<any>().mockResolvedValue({
      prompts: [],
    }),
    listResources: jest.fn<any>().mockResolvedValue({
      resources: [],
    }),
    listResourceTemplates: jest.fn<any>().mockResolvedValue({
      resourceTemplates: [],
    }),
    listTools: jest.fn<any>().mockResolvedValue({
      tools: [
        {
          description: "Test tool for mocking",
          inputSchema: {
            properties: {},
            type: "object",
          },
          name: "test-tool",
        },
      ],
    }),
    notification: jest.fn<any>().mockResolvedValue(undefined),
    readResource: jest.fn<any>().mockResolvedValue({
      contents: [],
    }),
    setNotificationHandler: jest.fn<any>(),
    subscribeResource: jest.fn<any>().mockResolvedValue({}),
    unsubscribeResource: jest.fn<any>().mockResolvedValue({}),
  };

  // Assign instance to this if called with new
  if (this instanceof Client) {
    Object.assign(this as object, instance);
    return this;
  }

  return instance;
});

// Mock server class - use constructor function format
export const Server = jest.fn().mockImplementation(function (
  this: any,
  ...args: any[]
) {
  const instance = {
    close: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
    connect: jest.fn<any>().mockResolvedValue(undefined),
    notification: jest.fn<any>().mockResolvedValue(undefined),
    setNotificationHandler: jest.fn<any>(),
    setRequestHandler: jest.fn<any>(),
  };

  // Assign instance to this if called with new
  if (this instanceof Server) {
    Object.assign(this as object, instance);
    return this;
  }

  return instance;
});

// Mock schema objects
export const CallToolRequestSchema = {
  method: "tools/call",
  type: "request",
};

export const ListToolsRequestSchema = {
  method: "tools/list",
  type: "request",
};

export const ListPromptsRequestSchema = {
  method: "prompts/list",
  type: "request",
};

export const GetPromptRequestSchema = {
  method: "prompts/get",
  type: "request",
};

export const ListResourcesRequestSchema = {
  method: "resources/list",
  type: "request",
};

export const ListResourceTemplatesRequestSchema = {
  method: "resources/templates/list",
  type: "request",
};

export const ReadResourceRequestSchema = {
  method: "resources/read",
  type: "request",
};

export const SubscribeRequestSchema = {
  method: "resources/subscribe",
  type: "request",
};

export const UnsubscribeRequestSchema = {
  method: "resources/unsubscribe",
  type: "request",
};

export const CompleteRequestSchema = {
  method: "completion/complete",
  type: "request",
};

export const LoggingMessageNotificationSchema = {
  method: "notifications/message",
  type: "notification",
};

export const ResourceUpdatedNotificationSchema = {
  method: "notifications/resources/updated",
  type: "notification",
};

export const ProgressNotificationSchema = {
  method: "notifications/progress",
  type: "notification",
};

export const PromptListChangedNotificationSchema = {
  method: "notifications/prompts/list_changed",
  type: "notification",
};

export const ResourceListChangedNotificationSchema = {
  method: "notifications/resources/list_changed",
  type: "notification",
};

export const ToolListChangedNotificationSchema = {
  method: "notifications/tools/list_changed",
  type: "notification",
};

export const InitializedNotificationSchema = {
  method: "notifications/initialized",
  type: "notification",
};

export const SetLevelRequestSchema = {
  method: "logging/setLevel",
  type: "request",
};

// Export default mocks for different import patterns
export default {
  CallToolRequestSchema,
  Client,
  CompleteRequestSchema,
  GetPromptRequestSchema,
  InitializedNotificationSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ListToolsRequestSchema,
  LoggingMessageNotificationSchema,
  ProgressNotificationSchema,
  PromptListChangedNotificationSchema,
  ReadResourceRequestSchema,
  ResourceListChangedNotificationSchema,
  ResourceUpdatedNotificationSchema,
  Server,
  SetLevelRequestSchema,
  StdioServerTransport,
  StreamableHTTPClientTransport,
  SubscribeRequestSchema,
  ToolListChangedNotificationSchema,
  UnsubscribeRequestSchema,
};
