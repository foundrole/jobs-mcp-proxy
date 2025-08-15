# CLAUDE.md - Jobs MCP Proxy Project Development Rules

This document defines the comprehensive rules and guidelines for working with the jobs-mcp-proxy project. Always follow these rules when contributing to or maintaining this codebase.

## Project Overview

The jobs-mcp-proxy project is a **basic MCP stdio server** that provides a foundation for building MCP (Model Context Protocol) applications with efficient AI toolchain integration. It's designed as a simple, extensible server with minimal overhead:

- **MCP SDK Version**: @modelcontextprotocol/sdk@1.17.3
- **Transport**: stdio server transport
- **Primary Function**: Basic MCP server foundation ready for extension
- **Architecture**: Simple MCP server with TypeScript support
- **Code Quality**: Strict TypeScript, comprehensive linting, and modern development tooling
- **Development**: Hot reload and comprehensive development environment

The server provides a basic MCP stdio server that can be extended to connect AI clients to various services.

## Table of Contents

1. [Package Manager](#package-manager)
2. [Available Scripts](#available-scripts)
3. [Development Workflow](#development-workflow)
4. [Code Quality Standards](#code-quality-standards)
5. [Project Structure](#project-structure)
6. [TypeScript Configuration](#typescript-configuration)
7. [Import/Export Standards](#importexport-standards)
8. [JSON Formatting Rules](#json-formatting-rules)
9. [MCP Server Development](#mcp-server-development)
10. [Environment Setup](#environment-setup)
11. [Build and Deployment](#build-and-deployment)
12. [Git Workflow](#git-workflow)
13. [Troubleshooting](#troubleshooting)

## Package Manager

**ALWAYS use Yarn instead of npm or node directly for all package management operations.**

```bash
# ✅ Correct
yarn install
yarn add package-name
yarn remove package-name
yarn dev
yarn build

# ❌ Incorrect
npm install
npm run dev
node src/index.ts
```

## Available Scripts

The project provides several yarn scripts defined in `package.json`. Always use these scripts instead of running commands directly.

### Development Commands

```bash
# Start development server with hot reload
yarn dev

# Start development with debugging
yarn dev:debug

# Build the project for production
yarn build

# Start the production server
yarn start
```

### Code Quality Commands

```bash
# Check for linting errors
yarn lint

# Fix auto-fixable linting errors
yarn lint:fix

# Check if files are properly formatted
yarn prettier:check

# Format all files automatically
yarn prettier:write

# Run TypeScript type checking
yarn type-check
```

### Pull Request Commands

```bash
# Create a pull request with auto-generated title and body from last commit
yarn pr:create

# Open the current branch's pull request in browser
yarn pr:open
```

## Development Workflow

### Starting Development

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Set up environment variables (if needed):

   ```bash
   # Set MCP_TARGET_URL to your hosted MCP server
   export MCP_TARGET_URL=http://localhost:3002/mcp
   ```

3. Start development server:

   ```bash
   yarn dev
   ```

### Before Committing Code

Always run these commands before committing:

```bash
# Fix linting issues
yarn lint:fix

# Format code
yarn prettier:write

# Check types
yarn type-check

# Build to verify compilation
yarn build
```

### Adding New Features

1. Create new files following the project structure
2. Follow TypeScript and ESLint rules
3. Add proper types and interfaces
4. Test your changes
5. Run linting and formatting
6. Commit with descriptive messages
7. Create pull request: `yarn pr:create`
8. Open pull request in browser: `yarn pr:open`

## Code Quality Standards

### ESLint Rules

This project uses strict TypeScript ESLint rules. Always follow these rules:

#### Import/Export Standards

- **Consistent Type Imports**: Always use `import type` for type-only imports

  ```typescript
  // ✅ Correct
  import type { McpProxy } from "mcp-proxy";
  import { createProxy } from "mcp-proxy";

  // ❌ Incorrect
  import { McpProxy, createProxy } from "mcp-proxy";
  ```

#### Import Sorting (Perfectionist Plugin)

Imports must be sorted in this exact order:

1. Side-effect imports
2. Built-in modules and types
3. External dependencies and types
4. Parent directory imports and types
5. Sibling/index imports and types
6. Style imports
7. Object imports

```typescript
// ✅ Correct import order
import "dotenv/config";

import type { Request, Response } from "express";
import express from "express";

import type { Config } from "~/types";
import { logger } from "~/utils";

import type { ProxyConfig } from "./config";
import { validateConfig } from "./validator";
```

#### Restricted Imports

- **Lodash is forbidden**: Do not import from `lodash` or `lodash/fp`
- Use native JavaScript methods or create utility functions instead

```typescript
// ❌ Forbidden
import { map, filter } from "lodash";
import { map } from "lodash/fp";

// ✅ Correct
const result = data.map((item) => item.name).filter((name) => name.length > 0);
```

#### Code Style Rules

- Always use parentheses around single parameters in arrow functions
- Always use curly braces for control structures
- Template expressions are restricted but numbers are allowed

### Prettier Formatting

Follow the configuration from `.prettierrc`:

#### Core Settings

- **Print Width**: 80 characters maximum line length
- **Tab Width**: 2 spaces for indentation
- **Trailing Comma**: ES5 style (adds trailing commas where valid in ES5)
- **Bracket Same Line**: Put the `>` of a multi-line JSX element at the end of the last line
- **End of Line**: LF (Unix-style line endings)

#### Formatting Examples

```typescript
// ✅ Correct (ES5 trailing commas)
const config = {
  targetUrl: "http://localhost:3002/mcp",
  stdio: true,
};

const args = ["arg1", "arg2"];

// ✅ Correct (2 spaces indentation)
function startProxy() {
  if (condition) {
    doSomething();
  }
}
```

## Project Structure

### Source Code (`src/`)

- **`src/index.ts`** - Main application entry point and proxy setup
- **`src/types/`** - Custom type definitions (if needed)
- **`src/config/`** - Configuration files (if needed)
- **`src/utils/`** - Utility functions (if needed)

### Configuration Files

- **`tsconfig.json`** - TypeScript configuration
- **`eslint.config.js`** - ESLint configuration
- **`.prettierrc`** - Prettier configuration
- **`package.json`** - Project dependencies and scripts
- **`.nvmrc`** - Node.js version specification
- **`.husky/pre-commit`** - Pre-commit hook script

### File Naming Conventions

#### TypeScript Files

- Use `.ts` extension for TypeScript files
- Use kebab-case for file names: `proxy-config.ts`
- Use PascalCase for class names: `ProxyServer.ts`

#### Configuration Files

- Use standard configuration file names: `tsconfig.json`, `eslint.config.js`
- Use dot-prefixed files for tool configurations: `.prettierrc`, `.gitignore`

## TypeScript Configuration

### Path Mapping

The project uses path mapping for clean imports:

```typescript
// ✅ Correct - Using path mapping
import { config } from "~/config";
import type { ServerOptions } from "~/types";

// ❌ Incorrect - Relative imports for project files
import { config } from "../config";
```

### Module Resolution

- **Module**: ESNext
- **Module Resolution**: Bundler
- **Target**: ES2022
- **Base URL**: `./src`

### Strict Type Checking

The project uses strict TypeScript settings:

- `strict: true`
- `noImplicitAny: true`
- `noImplicitReturns: true`
- `noUncheckedIndexedAccess: true`
- `strictNullChecks: true`

Always provide explicit types and handle null/undefined cases properly.

## Import/Export Standards

### Import Order

Follow the strict import order defined in the ESLint configuration:

1. Side-effect imports
2. Built-in modules
3. External dependencies
4. Internal modules (using path mapping)
5. Relative imports
6. Style imports

### Type Imports

Always use `import type` for type-only imports:

```typescript
// ✅ Correct
import type { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// ❌ Incorrect
import {
  Server,
  StdioServerTransport,
} from "@modelcontextprotocol/sdk/server/index.js";
```

### Export Sorting

- All exports must be sorted alphabetically
- Use named exports over default exports when possible

### Interface Sorting

Interface properties must be sorted in this order:

1. Required properties
2. Optional properties
3. Required methods
4. Optional methods
5. Required multiline properties
6. Optional multiline properties
7. Required index signatures
8. Optional index signatures

## JSON Formatting Rules

This project enforces strict JSON formatting rules using `eslint-plugin-jsonc`:

### Key Rules

- **Sort Keys**: All object keys must be sorted alphabetically
- **Object Property Newlines**: Each object property must be on its own line
- **No Unicode Codepoint Escapes**: Do not use Unicode codepoint escapes
- **No Useless Escapes**: Do not escape characters unnecessarily

### Example

```json
// ✅ Correct
{
  "description": "A basic MCP stdio server",
  "name": "jobs-mcp-proxy",
  "version": "1.0.0"
}

// ❌ Incorrect
{
  "version": "1.0.0",
  "name": "jobs-mcp-proxy", "description": "A basic MCP stdio server"
}
```

## MCP Server Development

This project implements a basic MCP stdio server using the @modelcontextprotocol/sdk that provides a foundation for building MCP applications.

### MCP Server Architecture

#### Core Components

1. **Main Entry Point** (`src/index.ts`) - MCP server initialization and startup
2. **@modelcontextprotocol/sdk** - Official MCP SDK for server implementation
3. **Environment Configuration** - Basic server configuration

#### MCP Server Implementation

The current implementation provides a basic MCP server using the official SDK:

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// ✅ Current implementation - Basic MCP server
const server = new Server(
  {
    name: "jobs-mcp-proxy",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

### Configuration

#### Environment Variables

- **MCP_TARGET_URL**: Currently logged but not used in implementation
- Default: `http://localhost:3002/mcp`

#### Server Options

```typescript
interface ServerInfo {
  name: string; // Server name
  version: string; // Server version
}

interface ServerCapabilities {
  tools: {}; // Tool capabilities (empty in basic implementation)
}
```

### Extending the Server

#### 1. Adding Tools

To extend this basic server with actual MCP tools:

```typescript
// Add tool registration
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  // Tool implementation logic
  return {
    content: [
      {
        type: "text",
        text: "Tool response",
      },
    ],
  };
});
```

#### 2. Adding Resources

```typescript
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      // Resource definitions
    ],
  };
});
```

#### 3. Error Handling

- Handle server startup errors gracefully
- Log connection issues appropriately
- Exit cleanly on failure

#### 4. Development

- Use hot reload for development
- Provide debugging options
- Maintain clean logging

### Development Commands

```bash
# Start development server
yarn dev

# Start with debugging
yarn dev:debug

# Build for production
yarn build

# Start production server
yarn start
```

### Testing the Server

Test your MCP server with MCP clients:

```bash
# Start the server
yarn dev

# Connect MCP client to the server stdio interface
# The server will accept MCP protocol messages via stdin/stdout
```

### Troubleshooting Server Issues

#### Common Problems

1. **Server Startup Errors**: Check TypeScript compilation and dependencies
2. **Transport Issues**: Ensure stdio transport is properly configured
3. **Client Connection**: Verify client is using MCP protocol correctly
4. **Message Handling**: Check request/response message formatting

#### Debug Logging

Enable debug logging for server operations:

```typescript
console.error(`Starting MCP stdio proxy, forwarding to: ${targetUrl}`);
console.error("MCP proxy server started successfully");
```

#### Health Checks

Monitor server status:

```bash
# Verify server startup
yarn dev

# Check server process
ps aux | grep node
```

## Environment Setup

### Node.js Version

- Use Node.js >= 22.17.0 (specified in `package.json`)
- Use the version specified in `.nvmrc`: v22.17.0

### Package Manager

- Use Yarn as the package manager
- Lock file: `yarn.lock`

### Environment Variables

- Use `.env` file for environment variables (ignored by git)
- Never commit sensitive information
- Set `MCP_TARGET_URL` if extending the server for proxy functionality

## Build and Deployment

### Build Process

1. Run `yarn build` to compile TypeScript
2. Output goes to `dist/` directory
3. Generated files are excluded from linting

### Production Deployment

```bash
# Build for production
yarn build

# Start production server
yarn start
```

### Docker Support (if needed)

- Can be containerized for deployment
- Use multi-stage build for smaller images
- Include environment variable configuration

## Git Workflow

### Pre-commit Hooks

- Husky is configured for pre-commit hooks
- Ensures code quality before commits
- Runs: type-check, prettier:check, lint, build

### Ignored Files

- `.gitignore` specifies ignored files
- `node_modules/`, `dist/`, `.env`, logs are ignored

### Branch Strategy

- Follow conventional commit messages
- Run quality checks before pushing

## Troubleshooting

### Common Issues

1. **Type errors**: Run `yarn type-check` and fix type issues
2. **Linting errors**: Run `yarn lint:fix` to auto-fix issues
3. **Formatting issues**: Run `yarn prettier:write` to format code
4. **Build failures**: Check TypeScript compilation errors
5. **Proxy connection issues**: Verify target URL and network connectivity

### Development Tips

- Use VS Code with TypeScript and ESLint extensions
- Enable format on save for Prettier
- Use the integrated terminal for running commands
- Check the `README.md` for additional project information
- Monitor logs for proxy connection status

### Debugging

- **Error logging**: Check console output for proxy errors
- **Network issues**: Verify target server accessibility
- **Configuration**: Validate environment variables
- **Build issues**: Check TypeScript compilation output

## Project Dependencies

### Core Dependencies

- **@modelcontextprotocol/sdk@1.17.3** - Official MCP protocol implementation

### Development Dependencies

- **typescript@^5.8.3** - TypeScript compiler
- **eslint@^9.29.0** - Linting with TypeScript support
- **@typescript-eslint/eslint-plugin@^8.36.0** - TypeScript ESLint plugin
- **@typescript-eslint/parser@^8.36.0** - TypeScript ESLint parser
- **prettier@^3.6.1** - Code formatting
- **eslint-config-prettier@^10.1.5** - Prettier ESLint config
- **eslint-plugin-perfectionist@^4.15.0** - Import sorting
- **eslint-plugin-jsonc@^2.20.1** - JSON linting
- **husky@^9.1.7** - Git hooks
- **nodemon@^3.1.10** - Development server
- **tsx@^4.19.2** - TypeScript execution
- **tsc-alias@1.8.8** - TypeScript path mapping

## Important Reminders

**Basic MCP stdio server** foundation for building MCP applications.

### Development Standards

1. **Always use Yarn** - Never use npm or node directly for package management
2. **Run comprehensive quality checks** - Always run linting, formatting, and type checking before committing
3. **Follow TypeScript strict mode** - Provide explicit types and handle null/undefined cases
4. **Use path mapping** - Import using `~/*` instead of relative paths for consistency
5. **Keep it simple** - Focus on basic MCP server functionality

### Code Standards and Formatting

6. **Follow import sorting** - Use the perfectionist plugin rules for import order
7. **Sort JSON keys** - All JSON objects must have alphabetically sorted keys
8. **Use consistent formatting** - Follow Prettier rules for 80-character lines and 2-space indentation

### MCP Server Development Requirements

9. **Handle errors gracefully** - Implement proper error handling for server operations
10. **Maintain simplicity** - Keep server logic minimal and focused on core functionality
11. **Follow MCP protocol** - Ensure compliance with MCP specification
12. **Test server functionality** - Verify server startup and basic protocol handling

## Quality Assurance Checklist

Before committing any changes, ensure:

### Code Quality Requirements

- [ ] `yarn lint:fix` passes without errors (ESLint compliance)
- [ ] `yarn prettier:write` has been run (formatting consistency)
- [ ] `yarn type-check` passes without errors (TypeScript strict mode)
- [ ] `yarn build` succeeds (compilation verification)

### Code Standards Requirements

- [ ] All imports are sorted correctly (perfectionist plugin)
- [ ] All JSON files have sorted keys (alphabetical order)
- [ ] TypeScript strict mode compliance (no implicit any)
- [ ] Proper error handling and logging

### MCP Server Requirements

- [ ] Server startup and error handling tested
- [ ] MCP protocol compliance verified
- [ ] Server capabilities properly defined
- [ ] Environment variable configuration documented

Always follow these workflows to maintain code quality, simplicity, and reliable MCP server functionality.
