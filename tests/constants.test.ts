/**
 * Constants functionality tests
 * Tests actual implementation of package discovery and constant values
 */

import fs from "node:fs";
import path from "node:path";

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

// Mock fs and path modules to control file system behavior
jest.mock("node:fs");
jest.mock("node:path");

// Import the actual functions to test
import {
  findPackageJson,
  getPackageInfo,
  MCP_PROTOCOL_VERSION,
  PROXY_NAME,
  PROXY_VERSION,
  USER_AGENT,
} from "../src/constants.js";

const mockFs = fs as jest.Mocked<typeof fs>;
const mockPath = path as jest.Mocked<typeof path>;

// Store original process values to restore after tests
const originalCwd = process.cwd;
const originalArgv = process.argv;

// Create a mock function type for process.cwd
type MockedProcessCwd = jest.MockedFunction<() => string>;

describe("Constants Implementation Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset process methods
    process.cwd = originalCwd;
    process.argv = [...originalArgv];

    // Set up default path mocks
    mockPath.resolve.mockImplementation((dir, file) => `${dir}/${file}`);
    mockPath.join.mockImplementation((...parts) => parts.join("/"));
    mockPath.dirname.mockImplementation((p) => {
      const parts = p.split("/");
      parts.pop();
      return parts.join("/") || "/";
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    process.cwd = originalCwd;
    process.argv = [...originalArgv];
  });

  describe("findPackageJson - Strategy 1: Current Working Directory", () => {
    test("finds package.json in current working directory", () => {
      // Mock current working directory
      process.cwd = jest.fn().mockReturnValue("/project") as MockedProcessCwd;
      mockPath.resolve.mockReturnValue("/project/package.json");
      mockFs.existsSync.mockImplementation(
        (filePath) => String(filePath) === "/project/package.json"
      );

      const result = findPackageJson();

      expect(result).toBe("/project/package.json");
      expect(process.cwd).toHaveBeenCalled();
      expect(mockPath.resolve).toHaveBeenCalledWith("/project", "package.json");
      expect(mockFs.existsSync).toHaveBeenCalledWith("/project/package.json");
    });

    test("proceeds to strategy 2 when package.json not in CWD", () => {
      // Mock CWD strategy failing, then finding in parent directory
      process.cwd = jest
        .fn()
        .mockReturnValue("/project/subdir") as MockedProcessCwd;
      mockPath.resolve.mockReturnValue("/project/subdir/package.json");
      mockFs.existsSync.mockImplementation((filePath) => {
        const pathStr = String(filePath);
        if (pathStr === "/project/subdir/package.json") return false;
        if (pathStr === "/project/package.json") return true;
        return false;
      });

      const result = findPackageJson();

      expect(result).toBe("/project/package.json");
      expect(mockFs.existsSync).toHaveBeenCalledWith(
        "/project/subdir/package.json"
      );
      expect(mockFs.existsSync).toHaveBeenCalledWith("/project/package.json");
    });
  });

  describe("findPackageJson - Strategy 2: Directory Traversal from CWD", () => {
    test("finds package.json by traversing up from CWD", () => {
      process.cwd = jest
        .fn()
        .mockReturnValue("/project/deep/nested") as MockedProcessCwd;
      mockPath.resolve.mockReturnValue("/project/deep/nested/package.json");

      // Mock directory traversal
      mockPath.dirname.mockImplementation((p) => {
        if (p === "/project/deep/nested") return "/project/deep";
        if (p === "/project/deep") return "/project";
        if (p === "/project") return "/";
        return "/";
      });

      mockFs.existsSync.mockImplementation((filePath) => {
        const pathStr = String(filePath);
        // Strategy 1 fails
        if (pathStr === "/project/deep/nested/package.json") return false;
        // Strategy 2 - traverse up until found
        if (pathStr === "/project/deep/nested/package.json") return false;
        if (pathStr === "/project/deep/package.json") return false;
        if (pathStr === "/project/package.json") return true;
        return false;
      });

      const result = findPackageJson();

      expect(result).toBe("/project/package.json");
      expect(mockFs.existsSync).toHaveBeenCalledWith("/project/package.json");
    });

    test("stops traversal at filesystem root", () => {
      process.cwd = jest.fn().mockReturnValue("/deep") as MockedProcessCwd;
      mockPath.resolve.mockReturnValue("/deep/package.json");

      mockPath.dirname.mockImplementation((p) => {
        if (p === "/deep") return "/";
        return "/";
      });

      mockFs.existsSync.mockReturnValue(false);
      process.argv = ["/usr/bin/node", "/deep/script.js"];

      // Should proceed to strategy 3 since strategy 2 reaches root without finding package.json
      expect(() => findPackageJson()).toThrow(
        "package.json not found - using fallback values"
      );
    });
  });

  describe("findPackageJson - Strategy 3: Script Path Traversal", () => {
    test("finds package.json by traversing up from script location", () => {
      // Both CWD strategies fail
      process.cwd = jest
        .fn()
        .mockReturnValue("/different/location") as MockedProcessCwd;
      mockPath.resolve.mockReturnValue("/different/location/package.json");

      // Set script path
      process.argv = ["/usr/bin/node", "/project/bin/script.js"];

      mockPath.dirname.mockImplementation((p) => {
        if (p === "/project/bin/script.js") return "/project/bin";
        if (p === "/project/bin") return "/project";
        if (p === "/project") return "/";
        if (p === "/different/location") return "/different";
        if (p === "/different") return "/";
        return "/";
      });

      mockFs.existsSync.mockImplementation((filePath) => {
        const pathStr = String(filePath);
        // Strategy 1 & 2 fail
        if (pathStr.includes("/different/location")) return false;
        // Strategy 3 succeeds
        if (pathStr === "/project/package.json") return true;
        return false;
      });

      const result = findPackageJson();

      expect(result).toBe("/project/package.json");
    });

    test("handles missing process.argv[1]", () => {
      process.cwd = jest.fn().mockReturnValue("/project") as MockedProcessCwd;
      mockPath.resolve.mockReturnValue("/project/package.json");
      mockFs.existsSync.mockReturnValue(false);

      // No script path
      process.argv = ["/usr/bin/node"];

      expect(() => findPackageJson()).toThrow(
        "package.json not found - using fallback values"
      );
    });
  });

  describe("findPackageJson - Error Handling", () => {
    test("throws error when package.json not found anywhere", () => {
      process.cwd = jest.fn().mockReturnValue("/nowhere") as MockedProcessCwd;
      mockPath.resolve.mockReturnValue("/nowhere/package.json");
      mockFs.existsSync.mockReturnValue(false);
      process.argv = ["/usr/bin/node", "/nowhere/script.js"];

      mockPath.dirname.mockImplementation((p) => {
        if (p === "/nowhere" || p === "/nowhere/script.js") return "/";
        return "/";
      });

      expect(() => findPackageJson()).toThrow(
        "package.json not found - using fallback values"
      );
    });
  });

  describe("getPackageInfo Function", () => {
    test("successfully reads and parses package.json", () => {
      // Mock findPackageJson to succeed
      process.cwd = jest.fn().mockReturnValue("/project") as MockedProcessCwd;
      mockPath.resolve.mockReturnValue("/project/package.json");
      mockFs.existsSync.mockReturnValue(true);

      const mockPackageContent = {
        description: "Test package",
        name: "@foundrole/ai-job-search-mcp",
        version: "1.1.0",
      };

      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockPackageContent));

      const result = getPackageInfo();

      expect(result).toEqual({
        name: "@foundrole/ai-job-search-mcp",
        version: "1.1.0",
      });
      expect(mockFs.readFileSync).toHaveBeenCalledWith(
        "/project/package.json",
        "utf-8"
      );
    });

    test("returns fallback values when package.json cannot be found", () => {
      // Mock findPackageJson to throw
      process.cwd = jest.fn().mockReturnValue("/nowhere") as MockedProcessCwd;
      mockFs.existsSync.mockReturnValue(false);
      process.argv = ["/usr/bin/node"];

      const result = getPackageInfo();

      expect(result).toEqual({
        name: "@foundrole/ai-job-search-mcp",
        version: "1.0.0",
      });
    });

    test("returns fallback values when package.json is invalid JSON", () => {
      // Mock findPackageJson to succeed but readFileSync to return invalid JSON
      process.cwd = jest.fn().mockReturnValue("/project") as MockedProcessCwd;
      mockPath.resolve.mockReturnValue("/project/package.json");
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue("invalid json content");

      const result = getPackageInfo();

      expect(result).toEqual({
        name: "@foundrole/ai-job-search-mcp",
        version: "1.0.0",
      });
    });

    test("returns fallback values when readFileSync throws error", () => {
      // Mock findPackageJson to succeed but readFileSync to throw
      process.cwd = jest.fn().mockReturnValue("/project") as MockedProcessCwd;
      mockPath.resolve.mockReturnValue("/project/package.json");
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error("Permission denied");
      });

      const result = getPackageInfo();

      expect(result).toEqual({
        name: "@foundrole/ai-job-search-mcp",
        version: "1.0.0",
      });
    });
  });

  describe("Exported Constants Integration", () => {
    test("constants reflect actual package.json when found", () => {
      // Note: These tests will use the fallback values since we can't re-run module initialization
      // But we verify the constants are properly defined
      expect(typeof PROXY_NAME).toBe("string");
      expect(typeof PROXY_VERSION).toBe("string");
      expect(typeof USER_AGENT).toBe("string");
      expect(typeof MCP_PROTOCOL_VERSION).toBe("string");

      expect(PROXY_NAME.length).toBeGreaterThan(0);
      expect(PROXY_VERSION.length).toBeGreaterThan(0);
      expect(USER_AGENT.length).toBeGreaterThan(0);
      expect(MCP_PROTOCOL_VERSION.length).toBeGreaterThan(0);
    });

    test("user agent is constructed from name and version", () => {
      expect(USER_AGENT).toBe(`${PROXY_NAME}/${PROXY_VERSION}`);
    });

    test("MCP protocol version has expected format", () => {
      expect(MCP_PROTOCOL_VERSION).toMatch(/^\d{4}-\d{2}-\d{2}$/);

      const date = new Date(MCP_PROTOCOL_VERSION);
      expect(date.getTime()).not.toBeNaN();
    });

    test("package name follows npm naming conventions", () => {
      expect(PROXY_NAME).toMatch(
        /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/
      );
    });

    test("version follows semantic versioning", () => {
      expect(PROXY_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });

  describe("Real-world Package.json Scenarios", () => {
    test("handles scoped package names correctly", () => {
      process.cwd = jest
        .fn()
        .mockReturnValue("/scoped-project") as MockedProcessCwd;
      mockPath.resolve.mockReturnValue("/scoped-project/package.json");
      mockFs.existsSync.mockReturnValue(true);

      const scopedPackage = {
        name: "@company/my-package",
        version: "2.0.0",
      };

      mockFs.readFileSync.mockReturnValue(JSON.stringify(scopedPackage));

      const result = getPackageInfo();

      expect(result.name).toBe("@company/my-package");
      expect(result.version).toBe("2.0.0");
    });

    test("handles package.json with extra fields", () => {
      process.cwd = jest
        .fn()
        .mockReturnValue("/full-project") as MockedProcessCwd;
      mockPath.resolve.mockReturnValue("/full-project/package.json");
      mockFs.existsSync.mockReturnValue(true);

      const fullPackage = {
        author: "Developer",
        dependencies: {},
        description: "A full package",
        license: "MIT",
        name: "my-package",
        scripts: {},
        version: "1.5.0",
      };

      mockFs.readFileSync.mockReturnValue(JSON.stringify(fullPackage));

      const result = getPackageInfo();

      expect(result).toEqual({
        name: "my-package",
        version: "1.5.0",
      });
    });

    test("handles minimal package.json", () => {
      process.cwd = jest
        .fn()
        .mockReturnValue("/minimal-project") as MockedProcessCwd;
      mockPath.resolve.mockReturnValue("/minimal-project/package.json");
      mockFs.existsSync.mockReturnValue(true);

      const minimalPackage = {
        name: "minimal-package",
        version: "0.1.0",
      };

      mockFs.readFileSync.mockReturnValue(JSON.stringify(minimalPackage));

      const result = getPackageInfo();

      expect(result).toEqual({
        name: "minimal-package",
        version: "0.1.0",
      });
    });
  });

  describe("Edge Cases and Error Scenarios", () => {
    test("handles deeply nested project structure", () => {
      const deepPath = "/very/deep/nested/project/structure/src/lib";
      process.cwd = jest.fn().mockReturnValue(deepPath) as MockedProcessCwd;
      mockPath.resolve.mockReturnValue(`${deepPath}/package.json`);

      // Mock traversal up the directory tree
      const pathMap: Record<string, string> = {
        "/": "/",
        "/very": "/",
        "/very/deep": "/very",
        "/very/deep/nested": "/very/deep",
        "/very/deep/nested/project": "/very/deep/nested",
        "/very/deep/nested/project/structure": "/very/deep/nested/project",
        "/very/deep/nested/project/structure/src":
          "/very/deep/nested/project/structure",
        [deepPath]: "/very/deep/nested/project/structure/src",
      };

      mockPath.dirname.mockImplementation((p) => pathMap[p] || "/");

      mockFs.existsSync.mockImplementation(
        (filePath) =>
          String(filePath) === "/very/deep/nested/project/package.json"
      );

      const mockPackage = {
        name: "deep-nested-package",
        version: "3.0.0",
      };

      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockPackage));

      const result = getPackageInfo();

      expect(result).toEqual({
        name: "deep-nested-package",
        version: "3.0.0",
      });
    });

    test("handles package.json with missing required fields", () => {
      process.cwd = jest
        .fn()
        .mockReturnValue("/incomplete-project") as MockedProcessCwd;
      mockPath.resolve.mockReturnValue("/incomplete-project/package.json");
      mockFs.existsSync.mockReturnValue(true);

      // Package missing name field
      const incompletePackage = {
        description: "Missing name field",
        version: "1.0.0",
      };

      mockFs.readFileSync.mockReturnValue(JSON.stringify(incompletePackage));

      const result = getPackageInfo();

      // Should fall back to defaults due to type assertion failing
      expect(result).toEqual({
        name: "@foundrole/ai-job-search-mcp",
        version: "1.0.0",
      });
    });

    test("handles empty package.json", () => {
      process.cwd = jest
        .fn()
        .mockReturnValue("/empty-project") as MockedProcessCwd;
      mockPath.resolve.mockReturnValue("/empty-project/package.json");
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue("{}");

      const result = getPackageInfo();

      // Should fall back to defaults
      expect(result).toEqual({
        name: "@foundrole/ai-job-search-mcp",
        version: "1.0.0",
      });
    });
  });
});
