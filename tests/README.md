# Testing Strategy and Documentation

## Overview

This document provides comprehensive testing strategy, implementation details, and best practices for the jobs-mcp-proxy project. The testing framework ensures thorough validation of MCP proxy functionality while maintaining code quality and reliability.

## Table of Contents

1. [Testing Framework Setup](#testing-framework-setup)
2. [Test Structure and Organization](#test-structure-and-organization)
3. [Testing Strategy](#testing-strategy)
4. [Test Categories](#test-categories)
5. [Running Tests](#running-tests)
6. [Code Coverage](#code-coverage)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)
9. [Adding New Tests](#adding-new-tests)

## Testing Framework Setup

### Core Dependencies

- **Jest 30.0.5**: Primary testing framework with extensive TypeScript support
- **ts-jest 29.4.1**: TypeScript preprocessor for Jest
- **@jest/globals**: Global Jest functions with TypeScript types
- **@types/jest**: TypeScript definitions for Jest

### Configuration Files

#### Jest Configuration (`jest.config.js`)

```javascript
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/__tests__/**/*.(ts|tsx|js)", "**/*.(test|spec).(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tests/tsconfig.json",
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
  extensionsToTreatAsEsm: [".ts"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  // Enhanced error handling and debugging
  errorOnDeprecated: true,
  detectOpenHandles: true,
  forceExit: true,
};
```

#### TypeScript Configuration (`tests/tsconfig.json`)

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "target": "ES2022",
    "types": ["node", "jest"],
    "moduleResolution": "Bundler"
  },
  "exclude": [],
  "extends": "../tsconfig.json",
  "include": ["**/*", "../src/**/*"]
}
```

### Test Setup (`tests/setup.ts`)

The setup file provides:

- Environment variable isolation
- Console method mocking
- Custom Jest matchers
- Global test utilities

## Test Structure and Organization

### Directory Structure

```
tests/
├── setup.ts                 # Global test setup and configuration
├── types/
│   └── jest.d.ts            # Custom Jest matcher type definitions
├── utils/
│   └── test-helpers.ts      # Reusable test utilities and helpers
├── basic.test.ts            # Basic functionality verification
├── config.test.ts           # Configuration functionality tests
├── comprehensive.test.ts    # Complete test suite (all functionality)
├── proxy-config.test.ts     # ProxyConfig specific tests
├── proxy-server.test.ts     # Server integration tests
├── error-handling.test.ts   # Error scenarios and edge cases
├── main-execution.test.ts   # Main function and script execution tests
└── README.md               # This documentation
```

### File Naming Conventions

- **`*.test.ts`**: Test files
- **`*.d.ts`**: TypeScript type definitions
- **`test-helpers.ts`**: Utility functions and mock helpers
- **`setup.ts`**: Global test configuration

## Testing Strategy

### 1. **Unit Testing**

Tests individual functions and components in isolation:

- `getProxyConfig()` function
- Configuration parsing logic
- Environment variable handling
- Boolean conversion logic

### 2. **Integration Testing**

Tests interaction between components:

- MCP proxy server startup
- Configuration + server integration
- Environment to proxy workflow

### 3. **Error Handling Testing**

Validates error scenarios:

- Network failures (DNS, timeout, connection refused)
- Invalid configurations
- Server startup failures
- Error propagation and logging

### 4. **Edge Case Testing**

Tests boundary conditions:

- Empty/undefined environment variables
- Very long URLs
- Special characters in URLs
- Malformed inputs

### 5. **Mock Testing**

Uses Jest mocks for external dependencies:

- `mcp-proxy` library
- Console methods
- Process environment
- File system operations

## Test Categories

### Configuration Tests (`config.test.ts`, `proxy-config.test.ts`)

**Coverage:**

- Default configuration values
- Environment variable parsing
- URL validation
- Debug mode logic
- Configuration immutability
- Edge cases and special characters

**Key Test Cases:**

```typescript
// Default configuration
expect(getProxyConfig()).toEqual({
  debugMode: false,
  targetUrl: "https://www.foundrole.com/mcp",
});

// Custom configuration
process.env.MCP_TARGET_URL = "http://localhost:3002/mcp";
expect(getProxyConfig()).toEqual({
  debugMode: true,
  targetUrl: "http://localhost:3002/mcp",
});
```

### Server Integration Tests (`proxy-server.test.ts`)

**Coverage:**

- Proxy server startup
- Connection handling
- Error scenarios
- Console output validation
- Server type configuration

**Key Test Cases:**

```typescript
// Successful startup
await startProxy(config);
expect(mockStartStdioServer).toHaveBeenCalledWith({
  serverType: "HTTPStream",
  url: config.targetUrl,
});

// Error handling
const error = new Error("Connection failed");
mockStartStdioServer.mockRejectedValue(error);
await expect(startProxy(config)).rejects.toThrow("Connection failed");
```

### Error Handling Tests (`error-handling.test.ts`)

**Coverage:**

- Network errors (DNS, timeout, connection refused)
- HTTP errors (404, 500)
- SSL/TLS certificate errors
- Configuration errors
- Async error handling

**Key Test Cases:**

```typescript
// DNS resolution failure
const dnsError = new Error("ENOTFOUND unknown-domain.example.com");
mockStartStdioServer.mockRejectedValue(dnsError);
await expect(startProxy(config)).rejects.toThrow("ENOTFOUND");

// Connection timeout
const timeoutError = new Error("ETIMEDOUT");
mockStartStdioServer.mockRejectedValue(timeoutError);
await expect(startProxy(config)).rejects.toThrow("ETIMEDOUT");
```

### Main Execution Tests (`main-execution.test.ts`)

**Coverage:**

- Script entry point behavior
- Process exit handling
- Command-line execution detection
- Module loading and imports
- Environment isolation

## Running Tests

### Basic Commands

```bash
# Run all tests
yarn test

# Run tests with coverage
yarn test:coverage

# Run tests in watch mode
yarn test:watch

# Run specific test file
yarn test tests/config.test.ts

# Run tests matching a pattern
yarn test --testNamePattern="ProxyConfig"
```

### Advanced Options

```bash
# Run tests with verbose output
yarn test --verbose

# Run tests without coverage
yarn test --no-coverage

# Run tests with debugging
yarn test --detectOpenHandles --forceExit

# Run tests for specific functionality
yarn test tests/proxy-config.test.ts tests/config.test.ts
```

## Code Coverage

### Coverage Thresholds

The project maintains high coverage standards:

- **Branches**: 85%
- **Functions**: 85%
- **Lines**: 85%
- **Statements**: 85%

### Coverage Reports

Coverage reports are generated in multiple formats:

- **HTML**: `coverage/lcov-report/index.html` (visual browser report)
- **LCOV**: `coverage/lcov.info` (for CI/CD integration)
- **JSON**: `coverage/coverage-final.json` (programmatic access)
- **Text**: Console output during test runs

### Viewing Coverage

```bash
# Generate coverage report
yarn test:coverage

# Open HTML coverage report (macOS)
open coverage/lcov-report/index.html

# View coverage summary
yarn test:coverage --verbose
```

## Best Practices

### 1. **Test Organization**

- Group related tests using `describe` blocks
- Use descriptive test names that explain the scenario
- Follow the AAA pattern: Arrange, Act, Assert

```typescript
describe("ProxyConfig", () => {
  describe("getProxyConfig", () => {
    test("returns default configuration when no environment variables are set", () => {
      // Arrange
      delete process.env.MCP_TARGET_URL;

      // Act
      const config = getProxyConfig();

      // Assert
      expect(config).toEqual({
        debugMode: false,
        targetUrl: "https://www.foundrole.com/mcp",
      });
    });
  });
});
```

### 2. **Environment Isolation**

Always clean up environment variables:

```typescript
beforeEach(() => {
  process.env = { ...originalEnv };
});

afterEach(() => {
  process.env = originalEnv;
});
```

### 3. **Mock Management**

- Clear mocks between tests
- Use specific mock implementations
- Verify mock calls and arguments

```typescript
beforeEach(() => {
  jest.clearAllMocks();
  mockStartStdioServer = jest.fn();
});

// Verify specific calls
expect(mockStartStdioServer).toHaveBeenCalledWith({
  serverType: "HTTPStream",
  url: expectedUrl,
});
```

### 4. **Error Testing**

Test both successful and failure scenarios:

```typescript
// Test success case
mockStartStdioServer.mockResolvedValue(undefined);
await expect(startProxy(config)).resolves.toBeUndefined();

// Test failure case
const error = new Error("Connection failed");
mockStartStdioServer.mockRejectedValue(error);
await expect(startProxy(config)).rejects.toThrow("Connection failed");
```

### 5. **Type Safety**

Use proper TypeScript types for mocks:

```typescript
let mockStartStdioServer: jest.MockedFunction<(...args: any[]) => Promise<any>>;

mockStartStdioServer = jest.fn() as jest.MockedFunction<
  (...args: any[]) => Promise<any>
>;
```

## Troubleshooting

### Common Issues

#### 1. **Module Import Errors**

**Problem**: Cannot import modules or resolve paths
**Solution**: Check `moduleNameMapper` in Jest config:

```javascript
moduleNameMapper: {
  "^~/(.*)$": "<rootDir>/src/$1",
}
```

#### 2. **TypeScript Compilation Errors**

**Problem**: TypeScript errors during test compilation
**Solution**: Verify test-specific tsconfig.json:

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "target": "ES2022",
    "types": ["node", "jest"]
  }
}
```

#### 3. **ESM/CommonJS Issues**

**Problem**: Import/export module format conflicts
**Solution**: Use appropriate Jest preset:

```javascript
preset: "ts-jest/presets/default-esm",
extensionsToTreatAsEsm: [".ts"],
```

#### 4. **Mock Persistence**

**Problem**: Mocks affecting other tests
**Solution**: Proper cleanup in setup:

```typescript
beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.dontMock("module-name");
});
```

#### 5. **Environment Variable Pollution**

**Problem**: Tests affecting each other through env vars
**Solution**: Environment isolation:

```typescript
const originalEnv = process.env;

beforeEach(() => {
  process.env = { ...originalEnv };
});

afterEach(() => {
  process.env = originalEnv;
});
```

### Debug Commands

```bash
# Run with detailed error output
yarn test --verbose --no-cache

# Debug specific test
yarn test tests/config.test.ts --verbose

# Run with Jest debugging
yarn test --detectOpenHandles --forceExit

# Clear Jest cache
yarn test --clearCache
```

## Adding New Tests

### 1. **Creating a New Test File**

Follow the naming convention and structure:

```typescript
/**
 * Description of what this test file covers
 */

import { describe, expect, test, beforeEach, afterEach } from "@jest/globals";

describe("Feature Name", () => {
  beforeEach(() => {
    // Setup for each test
  });

  afterEach(() => {
    // Cleanup after each test
  });

  describe("specific functionality", () => {
    test("should do something specific", () => {
      // Test implementation
    });
  });
});
```

### 2. **Adding Test Utilities**

Add reusable utilities to `tests/utils/test-helpers.ts`:

```typescript
export function createTestConfig(
  overrides: Partial<ProxyConfig> = {}
): ProxyConfig {
  return {
    debugMode: false,
    targetUrl: "https://www.foundrole.com/mcp",
    ...overrides,
  };
}
```

### 3. **Custom Matchers**

Add custom Jest matchers to `tests/setup.ts`:

```typescript
expect.extend({
  toBeValidUrl(received: string) {
    let pass = false;
    try {
      new URL(received);
      pass = true;
    } catch {
      pass = false;
    }

    return {
      message: () =>
        pass
          ? `Expected ${received} not to be a valid URL`
          : `Expected ${received} to be a valid URL`,
      pass,
    };
  },
});
```

### 4. **Type Definitions**

Add type definitions to `tests/types/jest.d.ts`:

```typescript
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidUrl(): R;
    }
  }
}
```

## Test Maintenance

### Regular Tasks

1. **Update Coverage Thresholds**: As code coverage improves, increase thresholds
2. **Review Test Performance**: Ensure tests run efficiently
3. **Update Dependencies**: Keep Jest and related packages current
4. **Refactor Common Patterns**: Extract reusable test utilities
5. **Documentation Updates**: Keep this README current

### Quality Metrics

Monitor these metrics regularly:

- Test execution time
- Coverage percentages
- Test reliability (flaky tests)
- Mock complexity
- Test maintenance overhead

## Conclusion

This comprehensive testing strategy ensures:

- **High Code Quality**: Through strict coverage requirements
- **Reliable Functionality**: Through extensive error testing
- **Maintainable Tests**: Through clear structure and documentation
- **Developer Productivity**: Through helpful utilities and clear guidelines
- **CI/CD Integration**: Through proper reporting and thresholds

The testing framework provides a solid foundation for developing and maintaining the jobs-mcp-proxy project with confidence in its reliability and quality.
