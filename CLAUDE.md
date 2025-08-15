# CLAUDE.md - Jobs MCP Proxy Project Development Rules

This document defines the comprehensive rules and guidelines for working with the jobs-mcp-proxy project. Always follow these rules when contributing to or maintaining this codebase.

## Project Overview

The jobs-mcp-proxy project is a **lightweight MCP stdio proxy server** that seamlessly forwards all client requests to a hosted Streamable HTTP MCP server for efficient AI toolchain integration. It's designed as a simple, efficient proxy with minimal overhead:

- **MCP SDK Version**: 1.17.2 with mcp-proxy package
- **Transport**: stdio proxy forwarding to HTTP MCP server
- **Primary Function**: Transparent request forwarding
- **Architecture**: Minimal proxy server with TypeScript support
- **Code Quality**: Strict TypeScript, comprehensive linting, and modern development tooling
- **Development**: Hot reload and comprehensive development environment

The proxy server connects AI clients to a hosted job search service through seamless forwarding of all MCP client requests.

## Table of Contents

1. [Package Manager](#package-manager)
2. [Available Scripts](#available-scripts)
3. [Development Workflow](#development-workflow)
4. [Code Quality Standards](#code-quality-standards)
5. [Project Structure](#project-structure)
6. [TypeScript Configuration](#typescript-configuration)
7. [Import/Export Standards](#importexport-standards)
8. [JSON Formatting Rules](#json-formatting-rules)
9. [MCP Proxy Development](#mcp-proxy-development)
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
import type { ProxyOptions } from "~/types";

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
import type { McpProxy } from "mcp-proxy";
import { createProxy } from "mcp-proxy";

// ❌ Incorrect
import { McpProxy, createProxy } from "mcp-proxy";
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
  "description": "A lightweight MCP proxy",
  "name": "jobs-mcp-proxy",
  "version": "1.0.0"
}

// ❌ Incorrect
{
  "version": "1.0.0",
  "name": "jobs-mcp-proxy", "description": "A lightweight MCP proxy"
}
```

## MCP Proxy Development

This project implements a lightweight MCP stdio proxy that forwards all client requests to a hosted Streamable HTTP MCP server.

### MCP Proxy Architecture

#### Core Components

1. **Main Entry Point** (`src/index.ts`) - Proxy initialization and startup
2. **mcp-proxy Package** - Handles stdio to HTTP forwarding
3. **Environment Configuration** - Target URL configuration

#### MCP Proxy Implementation

Use the mcp-proxy package for seamless forwarding:

```typescript
import { McpProxy } from "mcp-proxy";

// ✅ Correct - Simple proxy setup
const proxy = new McpProxy({
  targetUrl: process.env.MCP_TARGET_URL || "http://localhost:3002/mcp",
  stdio: true,
});

await proxy.start();
```

### Configuration

#### Environment Variables

- **MCP_TARGET_URL**: The URL of the hosted MCP server to forward requests to
- Default: `http://localhost:3002/mcp`

#### Proxy Options

```typescript
interface ProxyOptions {
  targetUrl: string; // Target MCP server URL
  stdio: boolean; // Use stdio transport
}
```

### Best Practices

#### 1. Keep It Simple

- Minimal configuration and setup
- Focus on transparent forwarding
- Avoid unnecessary complexity

#### 2. Error Handling

- Handle proxy startup errors gracefully
- Log connection issues appropriately
- Exit cleanly on failure

#### 3. Environment Configuration

- Use environment variables for configuration
- Provide sensible defaults
- Validate configuration on startup

#### 4. Development

- Use hot reload for development
- Provide debugging options
- Maintain clean logging

### Development Commands

```bash
# Start development proxy
yarn dev

# Start with debugging
yarn dev:debug

# Build for production
yarn build

# Start production proxy
yarn start
```

### Testing the Proxy

Test your proxy with MCP clients:

```bash
# Set target URL
export MCP_TARGET_URL=http://your-hosted-mcp-server.com/mcp

# Start proxy
yarn dev

# Connect MCP client to the proxy stdio interface
```

### Troubleshooting Proxy Issues

#### Common Problems

1. **Connection Refused**: Check if target MCP server is running
2. **Invalid Target URL**: Verify MCP_TARGET_URL environment variable
3. **stdio Issues**: Ensure client is connecting to proxy stdio interface
4. **Forwarding Errors**: Check network connectivity to target server

#### Debug Logging

Enable debug logging for proxy operations:

```typescript
console.error("Failed to start MCP proxy:", error);
```

#### Health Checks

Monitor proxy connectivity:

```bash
# Check if target server is accessible
curl $MCP_TARGET_URL

# Verify proxy startup
yarn dev
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
- Set `MCP_TARGET_URL` for the hosted MCP server

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

- **@modelcontextprotocol/sdk@1.17.2** - MCP protocol implementation
- **mcp-proxy@^1.0.0** - MCP stdio to HTTP proxy package

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

**Lightweight MCP stdio proxy** for seamless forwarding to hosted HTTP MCP servers.

### Development Standards

1. **Always use Yarn** - Never use npm or node directly for package management
2. **Run comprehensive quality checks** - Always run linting, formatting, and type checking before committing
3. **Follow TypeScript strict mode** - Provide explicit types and handle null/undefined cases
4. **Use path mapping** - Import using `~/*` instead of relative paths for consistency
5. **Keep it simple** - Focus on transparent proxy functionality

### Code Standards and Formatting

6. **Follow import sorting** - Use the perfectionist plugin rules for import order
7. **Sort JSON keys** - All JSON objects must have alphabetically sorted keys
8. **Use consistent formatting** - Follow Prettier rules for 80-character lines and 2-space indentation

### Proxy Development Requirements

9. **Configure target URL** - Always set MCP_TARGET_URL environment variable
10. **Handle errors gracefully** - Implement proper error handling for proxy operations
11. **Maintain simplicity** - Keep proxy logic minimal and focused on forwarding
12. **Test connectivity** - Verify target server accessibility during development

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

### Proxy Requirements

- [ ] Target URL configuration is properly set
- [ ] Proxy startup and error handling tested
- [ ] Environment variable validation implemented
- [ ] Connection to target server verified

Always follow these workflows to maintain code quality, simplicity, and reliable proxy functionality.
