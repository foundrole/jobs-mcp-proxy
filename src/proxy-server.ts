import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import type { Server } from "@modelcontextprotocol/sdk/server/index.js";
import type { ServerCapabilities } from "@modelcontextprotocol/sdk/types.js";
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

export const proxyServer = async ({
  client,
  getClient,
  server,
  serverCapabilities,
}: {
  client: Client;
  server: Server;
  serverCapabilities: ServerCapabilities;
  getClient?: () => Client;
}): Promise<void> => {
  const getCurrentClient = () => getClient?.() || client;
  if (serverCapabilities?.logging) {
    server.setNotificationHandler(
      LoggingMessageNotificationSchema,
      async (args) => {
        return getCurrentClient().notification(args);
      }
    );
    getCurrentClient().setNotificationHandler(
      LoggingMessageNotificationSchema,
      async (args) => {
        return server.notification(args);
      }
    );
  }

  if (serverCapabilities?.prompts) {
    server.setRequestHandler(GetPromptRequestSchema, async (args) => {
      return getCurrentClient().getPrompt(args.params);
    });

    server.setRequestHandler(ListPromptsRequestSchema, async (args) => {
      return getCurrentClient().listPrompts(args.params);
    });
  }

  if (serverCapabilities?.resources) {
    server.setRequestHandler(ListResourcesRequestSchema, async (args) => {
      return getCurrentClient().listResources(args.params);
    });

    server.setRequestHandler(
      ListResourceTemplatesRequestSchema,
      async (args) => {
        return getCurrentClient().listResourceTemplates(args.params);
      }
    );

    server.setRequestHandler(ReadResourceRequestSchema, async (args) => {
      return getCurrentClient().readResource(args.params);
    });

    if (serverCapabilities?.resources.subscribe) {
      server.setNotificationHandler(
        ResourceUpdatedNotificationSchema,
        async (args) => {
          return getCurrentClient().notification(args);
        }
      );

      server.setRequestHandler(SubscribeRequestSchema, async (args) => {
        return getCurrentClient().subscribeResource(args.params);
      });

      server.setRequestHandler(UnsubscribeRequestSchema, async (args) => {
        return getCurrentClient().unsubscribeResource(args.params);
      });
    }
  }

  if (serverCapabilities?.tools) {
    server.setRequestHandler(CallToolRequestSchema, async (args) => {
      return getCurrentClient().callTool(args.params);
    });

    server.setRequestHandler(ListToolsRequestSchema, async (args) => {
      return getCurrentClient().listTools(args.params);
    });
  }

  server.setRequestHandler(CompleteRequestSchema, async (args) => {
    return getCurrentClient().complete(args.params);
  });
};
