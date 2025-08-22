/**
 * version-extractor functionality tests
 * Tests cross-platform version extraction from executables
 */

// @ts-nocheck - Disable TypeScript checks for this test file due to complex mocking

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

// Mock fs
const mockFs = {
  readFileSync: jest.fn(),
};
jest.mock("node:fs", () => mockFs);

// Mock path
const mockPath = {
  dirname: jest.fn(),
  join: jest.fn(),
  resolve: jest.fn(),
};
jest.mock("node:path", () => mockPath);

// Mock external dependencies
const mockWinVersionInfo = jest.fn();
jest.mock("win-version-info", () => mockWinVersionInfo);

const mockElfy = {
  parse: jest.fn(),
};
jest.mock("elfy", () => mockElfy);

const mockPlist = {
  parse: jest.fn(),
};
jest.mock("plist", () => mockPlist);

import { VersionExtractor } from "../src/version-extractor.js";

const originalPlatform = process.platform;

describe("version-extractor Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();

    // Set up path mocks
    mockPath.dirname.mockReturnValue("/some/path");
    mockPath.resolve.mockReturnValue("/resolved/path");
    mockPath.join.mockReturnValue("/joined/path/Info.plist");
  });

  afterEach(() => {
    jest.resetAllMocks();
    // Restore platform
    Object.defineProperty(process, "platform", {
      configurable: true,
      value: originalPlatform,
    });
  });

  describe("extractVersion", () => {
    test("routes to correct platform handler", async () => {
      const testCases = ["darwin", "win32", "linux", "unsupported-platform"];

      for (const platform of testCases) {
        Object.defineProperty(process, "platform", {
          configurable: true,
          value: platform,
        });

        const result = await VersionExtractor.extractVersion("/test/path");
        expect(result).toHaveProperty("source");
      }
    });

    test("handles unsupported platform", async () => {
      Object.defineProperty(process, "platform", {
        configurable: true,
        value: "unsupported",
      });

      const result = await VersionExtractor.extractVersion("/test/path");

      expect(result).toEqual({
        error: "Unsupported platform: unsupported",
        source: "fallback",
      });
    });

    test("handles extraction error", async () => {
      Object.defineProperty(process, "platform", {
        configurable: true,
        value: "darwin",
      });

      // Mock an error in the extraction process
      mockPath.dirname.mockImplementation(() => {
        throw new Error("Path error");
      });

      const result = await VersionExtractor.extractVersion("/test/path");

      expect(result.source).toBe("fallback");
      expect(result.error).toContain("Path error");
    });
  });

  describe("macOS Version Extraction", () => {
    beforeEach(() => {
      Object.defineProperty(process, "platform", {
        configurable: true,
        value: "darwin",
      });
    });

    test("extracts version from .app bundle", async () => {
      mockPath.dirname.mockReturnValueOnce(
        "/Applications/Test.app/Contents/MacOS"
      );
      mockPath.dirname.mockReturnValueOnce("/Applications/Test.app/Contents");
      mockPath.dirname.mockReturnValueOnce("/Applications/Test.app");
      mockPath.dirname.mockReturnValueOnce("/Applications");

      mockFs.readFileSync
        .mockReturnValue(`<?xml version="1.0" encoding="UTF-8"?>
        <plist><dict><key>CFBundleShortVersionString</key><string>1.2.3</string></dict></plist>`);

      mockPlist.parse.mockReturnValue({
        CFBundleShortVersionString: "1.2.3",
      });

      // Mock the findMacOSAppBundle method to return the expected app bundle path
      jest
        .spyOn(VersionExtractor as any, "findMacOSAppBundle")
        .mockReturnValue("/Applications/Test.app");
      jest
        .spyOn(VersionExtractor as any, "extractFromPlist")
        .mockResolvedValue({
          source: "plist",
          version: "1.2.3",
        });

      const result = await VersionExtractor.extractVersion(
        "/Applications/Test.app/Contents/MacOS/Test"
      );

      expect(result).toEqual({
        source: "plist",
        version: "1.2.3",
      });
    });

    test("extracts version from .xpc bundle", async () => {
      mockPath.dirname.mockReturnValueOnce(
        "/Library/Services/Test.xpc/Contents/MacOS"
      );
      mockPath.dirname.mockReturnValueOnce(
        "/Library/Services/Test.xpc/Contents"
      );
      mockPath.dirname.mockReturnValueOnce("/Library/Services/Test.xpc");
      mockPath.dirname.mockReturnValueOnce("/Library/Services");

      mockFs.readFileSync.mockReturnValue(
        `<?xml version="1.0"?><plist><dict></dict></plist>`
      );

      mockPlist.parse.mockReturnValue({
        CFBundleVersion: "456",
      });

      // Mock the findMacOSAppBundle method to return the expected app bundle path
      jest
        .spyOn(VersionExtractor as any, "findMacOSAppBundle")
        .mockReturnValue("/Library/Services/Test.xpc");
      jest
        .spyOn(VersionExtractor as any, "extractFromPlist")
        .mockResolvedValue({
          source: "plist",
          version: "456",
        });

      const result = await VersionExtractor.extractVersion(
        "/Library/Services/Test.xpc/Contents/MacOS/Test"
      );

      expect(result).toEqual({
        source: "plist",
        version: "456",
      });
    });

    test("falls back to process name version", async () => {
      mockPath.dirname.mockReturnValue("/usr/bin");

      const result = await VersionExtractor.extractVersion(
        "/usr/bin/test-app",
        "test-app-2.1.0"
      );

      expect(result).toEqual({
        source: "fallback",
        version: "2.1.0",
      });
    });

    test("handles plist read error", async () => {
      mockPath.dirname.mockReturnValueOnce(
        "/Applications/Test.app/Contents/MacOS"
      );
      mockPath.dirname.mockReturnValueOnce("/Applications/Test.app/Contents");
      mockPath.dirname.mockReturnValueOnce("/Applications/Test.app");

      // Mock the findMacOSAppBundle method to return the expected app bundle path but fail on plist extraction
      jest
        .spyOn(VersionExtractor as any, "findMacOSAppBundle")
        .mockReturnValue("/Applications/Test.app");
      jest
        .spyOn(VersionExtractor as any, "extractFromPlist")
        .mockRejectedValue(new Error("File not found"));

      const result = await VersionExtractor.extractVersion(
        "/Applications/Test.app/Contents/MacOS/Test"
      );

      expect(result.source).toBe("fallback");
      expect(result.error).toContain("File not found");
    });
  });

  describe("Windows Version Extraction", () => {
    beforeEach(() => {
      Object.defineProperty(process, "platform", {
        configurable: true,
        value: "win32",
      });
    });

    test("extracts FileVersion from PE file", async () => {
      mockWinVersionInfo.mockReturnValue({
        FileVersion: "1.2.3.4",
        ProductVersion: "1.2.3",
      });

      const result = await VersionExtractor.extractVersion(
        "C:\\Program Files\\Test\\test.exe"
      );

      expect(result).toEqual({
        source: "executable",
        version: "1.2.3.4",
      });
    });

    test("falls back to ProductVersion", async () => {
      mockWinVersionInfo.mockReturnValue({
        ProductVersion: "2.1.0",
      });

      const result =
        await VersionExtractor.extractVersion("C:\\Apps\\test.exe");

      expect(result).toEqual({
        source: "executable",
        version: "2.1.0",
      });
    });

    test("handles no version info", async () => {
      mockWinVersionInfo.mockReturnValue({});

      const result =
        await VersionExtractor.extractVersion("C:\\Apps\\test.exe");

      expect(result).toEqual({
        error: "No version information found in PE file",
        source: "fallback",
      });
    });

    test("handles win-version-info error", async () => {
      mockWinVersionInfo.mockImplementation(() => {
        throw new Error("Failed to read PE file");
      });

      const result =
        await VersionExtractor.extractVersion("C:\\Apps\\test.exe");

      expect(result.source).toBe("fallback");
      expect(result.error).toContain("Failed to read PE file");
    });
  });

  describe("Linux Version Extraction", () => {
    beforeEach(() => {
      Object.defineProperty(process, "platform", {
        configurable: true,
        value: "linux",
      });
    });

    test("extracts version from ELF .rodata section", async () => {
      mockFs.readFileSync.mockReturnValue(Buffer.from("dummy"));
      mockElfy.parse.mockReturnValue({
        body: {
          sections: [
            {
              data: Buffer.from("some data version 3.2.1 more data"),
              name: ".rodata",
            },
          ],
        },
      });

      const result = await VersionExtractor.extractVersion("/usr/bin/test");

      expect(result).toEqual({
        source: "executable",
        version: "3.2.1",
      });
    });

    test("extracts version from .comment section", async () => {
      mockFs.readFileSync.mockReturnValue(Buffer.from("dummy"));
      mockElfy.parse.mockReturnValue({
        body: {
          sections: [
            {
              data: Buffer.from("compiled with version 1.0.5"),
              name: ".comment",
            },
          ],
        },
      });

      const result = await VersionExtractor.extractVersion("/usr/bin/test");

      expect(result).toEqual({
        source: "executable",
        version: "1.0.5",
      });
    });

    test("handles no version in ELF sections", async () => {
      mockFs.readFileSync.mockReturnValue(Buffer.from("dummy"));
      mockElfy.parse.mockReturnValue({
        body: {
          sections: [
            {
              data: Buffer.from("no version info here"),
              name: ".text",
            },
          ],
        },
      });

      const result = await VersionExtractor.extractVersion("/usr/bin/test");

      expect(result).toEqual({
        error: "No version information found in ELF file",
        source: "fallback",
      });
    });

    test("handles ELF parsing error", async () => {
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error("File read error");
      });

      const result = await VersionExtractor.extractVersion("/usr/bin/test");

      expect(result.source).toBe("fallback");
      expect(result.error).toContain("File read error");
    });
  });

  describe("getApplicationInfo", () => {
    test("combines version extraction with app info", async () => {
      Object.defineProperty(process, "platform", {
        configurable: true,
        value: "linux",
      });

      mockFs.readFileSync.mockReturnValue(Buffer.from("dummy"));
      mockElfy.parse.mockReturnValue({
        body: {
          sections: [
            {
              data: Buffer.from("version 2.3.4"),
              name: ".rodata",
            },
          ],
        },
      });

      const result = await VersionExtractor.getApplicationInfo(
        "/usr/bin/myapp",
        "myapp",
        "fallback-1.0.0"
      );

      expect(result).toEqual({
        executablePath: "/usr/bin/myapp",
        name: "myapp",
        version: "2.3.4",
      });
    });

    test("uses fallback version when extraction fails", async () => {
      Object.defineProperty(process, "platform", {
        configurable: true,
        value: "unsupported",
      });

      const result = await VersionExtractor.getApplicationInfo(
        "/test/app",
        "testapp",
        "1.0.0-fallback"
      );

      expect(result).toEqual({
        executablePath: "/test/app",
        name: "testapp",
        version: "1.0.0-fallback",
      });
    });

    test("includes bundle path for macOS", async () => {
      Object.defineProperty(process, "platform", {
        configurable: true,
        value: "darwin",
      });

      // Mock the findMacOSAppBundle method to return the expected app bundle path
      jest
        .spyOn(VersionExtractor as any, "findMacOSAppBundle")
        .mockReturnValue("/Applications/Test.app");
      jest
        .spyOn(VersionExtractor as any, "extractFromPlist")
        .mockResolvedValue({
          source: "plist",
          version: "1.0.0",
        });

      const result = await VersionExtractor.getApplicationInfo(
        "/Applications/Test.app/Contents/MacOS/Test",
        "Test"
      );

      expect(result).toHaveProperty("bundlePath", "/Applications/Test.app");
    });
  });
});
