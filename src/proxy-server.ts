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
  client?: Client;
  server: Server;
  serverCapabilities: ServerCapabilities;
  getClient?: () => Client | null | Promise<Client | null>;
}): Promise<void> => {
  const getCurrentClient = async (): Promise<Client> => {
    const current = (await getClient?.()) ?? client;
    if (!current) throw new Error("FoundRole MCP server is not connected");
    return current;
  };

  if (serverCapabilities?.logging) {
    server.setNotificationHandler(
      LoggingMessageNotificationSchema,
      async (args) => {
        return (await getCurrentClient()).notification(args);
      }
    );
    (await getCurrentClient()).setNotificationHandler(
      LoggingMessageNotificationSchema,
      async (args) => {
        return server.notification(args);
      }
    );
  }

  if (serverCapabilities?.prompts) {
    server.setRequestHandler(GetPromptRequestSchema, async (args) => {
      return (await getCurrentClient()).getPrompt(args.params);
    });

    server.setRequestHandler(ListPromptsRequestSchema, async (args) => {
      return (await getCurrentClient()).listPrompts(args.params);
    });
  }

  if (serverCapabilities?.resources) {
    server.setRequestHandler(ListResourcesRequestSchema, async (args) => {
      return (await getCurrentClient()).listResources(args.params);
    });

    server.setRequestHandler(
      ListResourceTemplatesRequestSchema,
      async (args) => {
        return (await getCurrentClient()).listResourceTemplates(args.params);
      }
    );

    server.setRequestHandler(ReadResourceRequestSchema, async (args) => {
      return (await getCurrentClient()).readResource(args.params);
    });

    if (serverCapabilities?.resources.subscribe) {
      server.setNotificationHandler(
        ResourceUpdatedNotificationSchema,
        async (args) => {
          return (await getCurrentClient()).notification(args);
        }
      );

      server.setRequestHandler(SubscribeRequestSchema, async (args) => {
        return (await getCurrentClient()).subscribeResource(args.params);
      });

      server.setRequestHandler(UnsubscribeRequestSchema, async (args) => {
        return (await getCurrentClient()).unsubscribeResource(args.params);
      });
    }
  }

  if (serverCapabilities?.tools) {
    server.setRequestHandler(CallToolRequestSchema, async (args) => {
      return (await getCurrentClient()).callTool(args.params);
    });

    server.setRequestHandler(ListToolsRequestSchema, async (args) => {
      return (await getCurrentClient()).listTools(args.params);
    });
  }

  server.setRequestHandler(CompleteRequestSchema, async (args) => {
    return (await getCurrentClient()).complete(args.params);
  });
};
