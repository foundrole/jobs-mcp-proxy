/**
 * TypeScript interface and type definition tests
 * Tests type safety and interface compliance
 */

import { describe, expect, test } from "@jest/globals";

import type {
  ApplicationInfo,
  ClientInfo,
  ProxyConfig,
  VersionExtractionResult,
} from "../src/types.js";

describe("Type Definitions Tests", () => {
  describe("ProxyConfig Interface", () => {
    test("accepts valid ProxyConfig objects", () => {
      const validConfigs: ProxyConfig[] = [
        {
          debugMode: true,
          targetUrl: "https://example.com/mcp",
        },
        {
          debugMode: false,
          targetUrl: "http://localhost:3000",
        },
      ];

      validConfigs.forEach((config) => {
        expect(typeof config.debugMode).toBe("boolean");
        expect(typeof config.targetUrl).toBe("string");
        expect(config.targetUrl.length).toBeGreaterThan(0);
      });
    });

    test("has required properties", () => {
      const config: ProxyConfig = {
        debugMode: true,
        targetUrl: "https://test.com",
      };

      expect(config).toHaveProperty("debugMode");
      expect(config).toHaveProperty("targetUrl");
      expect(Object.keys(config)).toHaveLength(2);
    });

    test("debugMode is boolean type", () => {
      const config: ProxyConfig = {
        debugMode: false,
        targetUrl: "https://test.com",
      };

      expect(typeof config.debugMode).toBe("boolean");
      expect([true, false]).toContain(config.debugMode);
    });

    test("targetUrl is string type", () => {
      const config: ProxyConfig = {
        debugMode: true,
        targetUrl: "https://api.example.com/mcp",
      };

      expect(typeof config.targetUrl).toBe("string");
      expect(config.targetUrl.length).toBeGreaterThan(0);
    });
  });

  describe("ClientInfo Interface", () => {
    test("accepts valid ClientInfo objects", () => {
      const validClients: ClientInfo[] = [
        {
          name: "TestApp",
          version: "1.0.0",
        },
        {
          customField: "additional data",
          name: "macOS//Claude",
          version: "2.1.3",
        },
        {
          metadata: { build: "abc123" },
          name: "Windows//VSCode",
          version: "1.85.0",
        },
      ];

      validClients.forEach((client) => {
        expect(typeof client.name).toBe("string");
        expect(typeof client.version).toBe("string");
        expect(client.name.length).toBeGreaterThan(0);
        expect(client.version.length).toBeGreaterThan(0);
      });
    });

    test("has required properties", () => {
      const client: ClientInfo = {
        name: "TestClient",
        version: "1.0.0",
      };

      expect(client).toHaveProperty("name");
      expect(client).toHaveProperty("version");
    });

    test("allows additional properties", () => {
      const client: ClientInfo = {
        buildNumber: "123",
        metadata: {
          userAgent: "custom-agent",
        },
        name: "TestClient",
        platform: "darwin",
        version: "1.0.0",
      };

      expect(client.buildNumber).toBe("123");
      expect(client.platform).toBe("darwin");
      expect(client.metadata).toEqual({ userAgent: "custom-agent" });
    });

    test("name and version are strings", () => {
      const client: ClientInfo = {
        name: "App Name",
        version: "2.5.1-beta",
      };

      expect(typeof client.name).toBe("string");
      expect(typeof client.version).toBe("string");
    });

    test("supports client name with platform prefix", () => {
      const clients: ClientInfo[] = [
        { name: "macOS//Claude", version: "1.0.0" },
        { name: "Windows//VSCode", version: "1.85.0" },
        { name: "Linux//Firefox", version: "120.0" },
      ];

      clients.forEach((client) => {
        expect(client.name).toMatch(/^.+\/\/.+$/);
        expect(client.name.split("//")).toHaveLength(2);
      });
    });
  });

  describe("VersionExtractionResult Interface", () => {
    test("accepts valid VersionExtractionResult objects", () => {
      const validResults: VersionExtractionResult[] = [
        {
          source: "executable",
          version: "1.0.0",
        },
        {
          source: "plist",
          version: "2.1.3",
        },
        {
          error: "No version found",
          source: "fallback",
        },
        {
          error: "Partial extraction",
          source: "executable",
          version: "1.5.0",
        },
      ];

      validResults.forEach((result) => {
        expect(["executable", "plist", "fallback"]).toContain(result.source);
        if (result.version) {
          expect(typeof result.version).toBe("string");
        }
        if (result.error) {
          expect(typeof result.error).toBe("string");
        }
      });
    });

    test("source field accepts valid values", () => {
      const sources: VersionExtractionResult["source"][] = [
        "executable",
        "plist",
        "fallback",
      ];

      sources.forEach((source) => {
        const result: VersionExtractionResult = { source };
        expect(result.source).toBe(source);
      });
    });

    test("version field is optional string", () => {
      const resultWithVersion: VersionExtractionResult = {
        source: "executable",
        version: "1.2.3",
      };

      const resultWithoutVersion: VersionExtractionResult = {
        error: "Failed to extract",
        source: "fallback",
      };

      expect(resultWithVersion.version).toBe("1.2.3");
      expect(resultWithoutVersion.version).toBeUndefined();
    });

    test("error field is optional string", () => {
      const resultWithError: VersionExtractionResult = {
        error: "Executable not found",
        source: "fallback",
      };

      const resultWithoutError: VersionExtractionResult = {
        source: "executable",
        version: "1.0.0",
      };

      expect(resultWithError.error).toBe("Executable not found");
      expect(resultWithoutError.error).toBeUndefined();
    });

    test("can have both version and error", () => {
      const result: VersionExtractionResult = {
        error: "Partial extraction warning",
        source: "plist",
        version: "1.0.0",
      };

      expect(result.version).toBe("1.0.0");
      expect(result.error).toBe("Partial extraction warning");
    });
  });

  describe("ApplicationInfo Interface", () => {
    test("accepts valid ApplicationInfo objects", () => {
      const validApps: ApplicationInfo[] = [
        {
          name: "TestApp",
          version: "1.0.0",
        },
        {
          bundlePath: "/Applications/Claude.app",
          name: "Claude",
          version: "2.1.3",
        },
        {
          executablePath: "/usr/bin/code",
          name: "VSCode",
          version: "1.85.0",
        },
        {
          bundlePath: "/Applications/CompleteApp.app",
          executablePath:
            "/Applications/CompleteApp.app/Contents/MacOS/CompleteApp",
          name: "CompleteApp",
          version: "3.0.0",
        },
      ];

      validApps.forEach((app) => {
        expect(typeof app.name).toBe("string");
        expect(typeof app.version).toBe("string");
        if (app.bundlePath) {
          expect(typeof app.bundlePath).toBe("string");
        }
        if (app.executablePath) {
          expect(typeof app.executablePath).toBe("string");
        }
      });
    });

    test("has required properties", () => {
      const app: ApplicationInfo = {
        name: "TestApp",
        version: "1.0.0",
      };

      expect(app).toHaveProperty("name");
      expect(app).toHaveProperty("version");
    });

    test("optional properties work correctly", () => {
      const appMinimal: ApplicationInfo = {
        name: "MinimalApp",
        version: "1.0.0",
      };

      const appWithBundle: ApplicationInfo = {
        bundlePath: "/Applications/BundleApp.app",
        name: "BundleApp",
        version: "1.0.0",
      };

      const appWithExecutable: ApplicationInfo = {
        executablePath: "/usr/local/bin/exeapp",
        name: "ExeApp",
        version: "1.0.0",
      };

      expect(appMinimal.bundlePath).toBeUndefined();
      expect(appMinimal.executablePath).toBeUndefined();
      expect(appWithBundle.bundlePath).toBe("/Applications/BundleApp.app");
      expect(appWithExecutable.executablePath).toBe("/usr/local/bin/exeapp");
    });

    test("supports macOS app bundle paths", () => {
      const macApp: ApplicationInfo = {
        bundlePath: "/Applications/MacApp.app",
        executablePath: "/Applications/MacApp.app/Contents/MacOS/MacApp",
        name: "MacApp",
        version: "1.0.0",
      };

      expect(macApp.bundlePath).toMatch(/\.app$/);
      expect(macApp.executablePath).toMatch(/\/Contents\/MacOS\//);
    });

    test("supports various executable path formats", () => {
      const apps: ApplicationInfo[] = [
        {
          executablePath: "/usr/bin/linuxapp",
          name: "LinuxApp",
          version: "1.0.0",
        },
        {
          executablePath: "C:\\Program Files\\WindowsApp\\app.exe",
          name: "WindowsApp",
          version: "1.0.0",
        },
        {
          executablePath: "./bin/app",
          name: "RelativeApp",
          version: "1.0.0",
        },
      ];

      apps.forEach((app) => {
        expect(app.executablePath).toBeDefined();
        expect(typeof app.executablePath).toBe("string");
      });
    });
  });

  describe("Type Relationships and Consistency", () => {
    test("ClientInfo can be constructed from ApplicationInfo", () => {
      const appInfo: ApplicationInfo = {
        bundlePath: "/Applications/TestApp.app",
        name: "TestApp",
        version: "1.2.3",
      };

      const clientInfo: ClientInfo = {
        name: `macOS//${appInfo.name}`,
        version: appInfo.version,
      };

      expect(clientInfo.name).toContain(appInfo.name);
      expect(clientInfo.version).toBe(appInfo.version);
    });

    test("VersionExtractionResult can provide version to ApplicationInfo", () => {
      const versionResult: VersionExtractionResult = {
        source: "plist",
        version: "1.5.0",
      };

      const appInfo: ApplicationInfo = {
        name: "TestApp",
        version: versionResult.version || "unknown",
      };

      expect(appInfo.version).toBe("1.5.0");
    });

    test("all interfaces support string-based identification", () => {
      const config: ProxyConfig = {
        debugMode: true,
        targetUrl: "https://example.com/mcp",
      };

      const client: ClientInfo = {
        name: "TestClient",
        version: "1.0.0",
      };

      const versionResult: VersionExtractionResult = {
        source: "executable",
        version: "1.0.0",
      };

      const appInfo: ApplicationInfo = {
        name: "TestApp",
        version: "1.0.0",
      };

      // All should have meaningful string representations
      expect(typeof config.targetUrl).toBe("string");
      expect(typeof client.name).toBe("string");
      expect(typeof versionResult.source).toBe("string");
      expect(typeof appInfo.name).toBe("string");
    });
  });

  describe("Edge Cases and Error Scenarios", () => {
    test("handles empty strings gracefully", () => {
      const config: ProxyConfig = {
        debugMode: false,
        targetUrl: "", // Empty string should be handled by application logic
      };

      const client: ClientInfo = {
        name: "",
        version: "",
      };

      expect(typeof config.targetUrl).toBe("string");
      expect(typeof client.name).toBe("string");
      expect(typeof client.version).toBe("string");
    });

    test("version extraction can represent failure states", () => {
      const failureResults: VersionExtractionResult[] = [
        {
          error: "File not found",
          source: "fallback",
        },
        {
          error: "Parse error",
          source: "executable",
          version: undefined,
        },
      ];

      failureResults.forEach((result) => {
        expect(result.error).toBeDefined();
        expect(typeof result.error).toBe("string");
      });
    });

    test("supports various version string formats", () => {
      const versions = [
        "1.0.0",
        "2.1.3-beta.1",
        "1.0.0-alpha+build.123",
        "10.15.7",
        "unknown",
        "dev-build",
      ];

      versions.forEach((version) => {
        const client: ClientInfo = {
          name: "TestApp",
          version,
        };
        expect(client.version).toBe(version);
      });
    });
  });
});
