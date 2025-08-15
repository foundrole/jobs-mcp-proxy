# jobs-mcp-proxy

This MCP stdio proxy server connects AI clients to a hosted job search service.

🔧 **For developers**: Lightweight proxy enabling seamless forwarding of all MCP client requests for efficient AI toolchain integration.

👔 **For job seekers**: Easy-to-use server allowing straightforward access to a powerful job search MCP service, making job discovery simple and efficient.

## Features

- **Lightweight stdio proxy**: Minimal overhead MCP proxy server
- **Seamless forwarding**: All client requests are transparently forwarded to hosted HTTP MCP server
- **Easy integration**: Simple setup for AI toolchains and applications
- **TypeScript support**: Full type safety and modern development experience

## Quick Start

```bash
# Install dependencies
yarn install

# Run in development mode
yarn run dev

# Build for production
yarn run build

# Start production server
yarn start
```

## Development

```bash
# Type checking
yarn run type-check

# Linting
yarn run lint
yarn run lint:fix

# Code formatting
yarn run prettier:check
yarn run prettier:write
```
