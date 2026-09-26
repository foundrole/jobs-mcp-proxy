# Installing the FoundRole MCP server

FoundRole is a hosted remote MCP server. There is nothing to clone, build, or run locally, and no API key.

## Configuration

Add this entry to the MCP settings file (in Cline: MCP Servers → Configure → Configure MCP Servers, which opens `cline_mcp_settings.json`):

```json
{
  "mcpServers": {
    "foundrole": {
      "type": "streamableHttp",
      "url": "https://www.foundrole.com/mcp",
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

Keep any servers already in the file; add `foundrole` next to them.

## Sign-in

The server answers unauthenticated requests with HTTP 401 and an OAuth challenge. The client registers itself automatically (OAuth 2.1 dynamic client registration with PKCE) and opens a FoundRole sign-in page in the browser. The user signs in or creates a free account and approves access; after that the tools appear. Do not ask the user for an API key or token — none exists.

## Verify

After sign-in the server lists tools such as `jobs_search`, `jobs_details`, `tracker_list` and `resume_check`. A quick check is a search, for example `jobs_search` with `query` set to `Software Engineer` and `location` set to `Toronto`.

## Clients without remote MCP

If the client only supports local stdio servers, use the npm bridge instead (Node.js 24.12 or newer):

```json
{
  "mcpServers": {
    "foundrole": {
      "command": "npx",
      "args": ["-y", "@foundrole/ai-job-search-mcp"]
    }
  }
}
```

The bridge connects to the same hosted endpoint and opens the same browser sign-in.
