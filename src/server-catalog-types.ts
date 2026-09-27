import type {
  ListPromptsResult,
  ListResourcesResult,
  ListResourceTemplatesResult,
  ListToolsResult,
} from "@modelcontextprotocol/sdk/types.js";

export interface ServerCatalog {
  prompts: ListPromptsResult;
  resources: ListResourcesResult;
  resourceTemplates: ListResourceTemplatesResult;
  tools: ListToolsResult;
}
