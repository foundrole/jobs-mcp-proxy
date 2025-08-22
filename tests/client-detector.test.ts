/**
 * client-detector functionality tests
 * Tests process detection and client identification with cross-platform support
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

// Mock external dependencies
const mockFindProcess = jest.fn() as jest.Mock;
jest.mock("find-process", () => ({
  default: mockFindProcess,
}));

// Mock version extractor
const mockVersionExtractor = {
  extractVersion: jest.fn() as jest.Mock,
};
jest.mock("../src/version-extractor.js", () => ({
  VersionExtractor: mockVersionExtractor,
}));

// Mock constants
jest.mock("../src/constants.js", () => ({
  PROXY_NAME: "test-proxy",
  PROXY_VERSION: "1.0.0",
}));

import { extractClientInfoFromParent } from "../src/client-detector.js";

const originalPlatform = process.platform;
const originalPpid = process.ppid;

describe("client-detector Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();

    // Set default mocks
    mockFindProcess.mockResolvedValue([]);
    mockVersionExtractor.extractVersion.mockResolvedValue({
      source: "executable",
      version: "1.2.3",
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    // Restore process properties
    Object.defineProperty(process, "platform", {
      configurable: true,
      value: originalPlatform,
    });
    Object.defineProperty(process, "ppid", {
      configurable: true,
      value: originalPpid,
    });
  });

  describe("extractClientInfoFromParent", () => {
    test("returns proxy identity when no parent PID available", async () => {
      Object.defineProperty(process, "ppid", {
        configurable: true,
        value: undefined,
      });

      const result = await extractClientInfoFromParent();

      expect(result).toEqual({
        name: "test-proxy",
        version: "1.0.0",
      });
      expect(console.error).toHaveBeenCalledWith(
        "[CLIENT-DETECTOR] No parent PID available"
      );
    });

    test("returns proxy identity when parent process not found", async () => {
      Object.defineProperty(process, "ppid", {
        configurable: true,
        value: 12345,
      });
      mockFindProcess.mockResolvedValue([]);

      const result = await extractClientInfoFromParent();

      expect(result).toEqual({
        name: "test-proxy",
        version: "1.0.0",
      });
      expect(console.error).toHaveBeenCalledWith(
        "[CLIENT-DETECTOR] Process 12345 not found at depth 0"
      );
    });

    test("successfully identifies macOS application", async () => {
      Object.defineProperty(process, "platform", {
        configurable: true,
        value: "darwin",
      });
      Object.defineProperty(process, "ppid", {
        configurable: true,
        value: 12345,
      });

      mockFindProcess.mockResolvedValue([
        {
          cmd: "/Applications/Claude.app/Contents/MacOS/Claude",
          name: "Claude",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      const result = await extractClientInfoFromParent();

      expect(result).toEqual({
        name: "macOS//Claude",
        version: "1.2.3",
      });
      expect(mockVersionExtractor.extractVersion).toHaveBeenCalledWith(
        "/Applications/Claude.app",
        "Claude"
      );
    });

    test("successfully identifies Windows application", async () => {
      Object.defineProperty(process, "platform", {
        configurable: true,
        value: "win32",
      });
      Object.defineProperty(process, "ppid", {
        configurable: true,
        value: 12345,
      });

      mockFindProcess.mockResolvedValue([
        {
          cmd: "C:\\Program Files\\Microsoft VS Code\\Code.exe",
          name: "code.exe",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      const result = await extractClientInfoFromParent();

      expect(result).toEqual({
        name: "Windows//Code",
        version: "1.2.3",
      });
      expect(mockVersionExtractor.extractVersion).toHaveBeenCalledWith(
        "Code\\Code.exe",
        "code.exe"
      );
    });

    test("successfully identifies Linux application", async () => {
      Object.defineProperty(process, "platform", {
        configurable: true,
        value: "linux",
      });
      Object.defineProperty(process, "ppid", {
        configurable: true,
        value: 12345,
      });

      mockFindProcess.mockResolvedValue([
        {
          cmd: "/usr/bin/firefox",
          name: "firefox",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      const result = await extractClientInfoFromParent();

      expect(result).toEqual({
        name: "Linux//firefox",
        version: "1.2.3",
      });
    });

    test("handles version extraction failure", async () => {
      Object.defineProperty(process, "ppid", {
        configurable: true,
        value: 12345,
      });

      mockFindProcess.mockResolvedValue([
        {
          cmd: "/Applications/TestApp.app/Contents/MacOS/TestApp",
          name: "TestApp",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      mockVersionExtractor.extractVersion.mockResolvedValue({
        error: "Version not found",
        source: "fallback",
      });

      const result = await extractClientInfoFromParent();

      expect(result).toEqual({
        name: "macOS//TestApp",
        version: "unknown",
      });
    });

    test("falls back to command line version extraction", async () => {
      Object.defineProperty(process, "ppid", {
        configurable: true,
        value: 12345,
      });

      mockFindProcess.mockResolvedValue([
        {
          cmd: "/usr/bin/TestApp --version 2.5.1 --debug",
          name: "TestApp",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      mockVersionExtractor.extractVersion.mockResolvedValue({
        error: "Version not found",
        source: "fallback",
      });

      const result = await extractClientInfoFromParent();

      expect(result.version).toBe("2.5.1");
    });

    test("handles find-process error", async () => {
      Object.defineProperty(process, "ppid", {
        configurable: true,
        value: 12345,
      });

      mockFindProcess.mockRejectedValue(new Error("Process lookup failed"));

      const result = await extractClientInfoFromParent();

      expect(result).toEqual({
        name: "test-proxy",
        version: "1.0.0",
      });
      expect(console.error).toHaveBeenCalledWith(
        "[CLIENT-DETECTOR] Error during traversal at depth 0: Error: Process lookup failed"
      );
    });
  });

  describe("macOS App Bundle Detection", () => {
    beforeEach(() => {
      Object.defineProperty(process, "platform", {
        configurable: true,
        value: "darwin",
      });
      Object.defineProperty(process, "ppid", {
        configurable: true,
        value: 12345,
      });
    });

    test("detects standard .app bundle", async () => {
      mockFindProcess.mockResolvedValue([
        {
          cmd: "/Applications/Claude.app/Contents/MacOS/Claude",
          name: "Claude",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      await extractClientInfoFromParent();

      expect(mockVersionExtractor.extractVersion).toHaveBeenCalledWith(
        "/Applications/Claude.app",
        "Claude"
      );
    });

    test("detects .xpc service bundle", async () => {
      mockFindProcess.mockResolvedValue([
        {
          cmd: "/Library/Application Support/TestService.xpc/Contents/MacOS/TestService",
          name: "TestService",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      await extractClientInfoFromParent();

      expect(mockVersionExtractor.extractVersion).toHaveBeenCalledWith(
        "/Library/Application Support/TestService.xpc",
        "TestService"
      );
    });

    test("handles app with spaces in name", async () => {
      mockFindProcess.mockResolvedValue([
        {
          cmd: "/Applications/Visual Studio Code.app/Contents/MacOS/Electron",
          name: "Visual Studio Code",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      await extractClientInfoFromParent();

      expect(mockVersionExtractor.extractVersion).toHaveBeenCalledWith(
        "/Applications/Visual Studio Code.app",
        "Visual Studio Code"
      );
    });

    test("handles nested bundle paths", async () => {
      mockFindProcess.mockResolvedValue([
        {
          cmd: "/Applications/Main App.app/Contents/Frameworks/Helper.app/Contents/MacOS/Helper",
          name: "Helper",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      const result = await extractClientInfoFromParent();

      expect(result.name).toBe("macOS//Main App");
    });
  });

  describe("Windows Executable Detection", () => {
    beforeEach(() => {
      Object.defineProperty(process, "platform", {
        configurable: true,
        value: "win32",
      });
      Object.defineProperty(process, "ppid", {
        configurable: true,
        value: 12345,
      });
    });

    test("detects standard .exe file", async () => {
      mockFindProcess.mockResolvedValue([
        {
          cmd: "C:\\Program Files\\Microsoft VS Code\\Code.exe",
          name: "code.exe",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      await extractClientInfoFromParent();

      expect(mockVersionExtractor.extractVersion).toHaveBeenCalledWith(
        "Code\\Code.exe",
        "code.exe"
      );
    });

    test("handles path with spaces", async () => {
      mockFindProcess.mockResolvedValue([
        {
          cmd: "C:\\Program Files (x86)\\Windows NT\\Accessories\\notepad.exe",
          name: "notepad.exe",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      const result = await extractClientInfoFromParent();

      expect(result.name).toBe("Windows//notepad");
    });

    test("handles mixed case extensions", async () => {
      mockFindProcess.mockResolvedValue([
        {
          cmd: "C:\\Apps\\App.EXE",
          name: "App.EXE",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      const result = await extractClientInfoFromParent();

      expect(result.name).toBe("Windows//App");
    });
  });

  describe("Linux Executable Detection", () => {
    beforeEach(() => {
      Object.defineProperty(process, "platform", {
        configurable: true,
        value: "linux",
      });
      Object.defineProperty(process, "ppid", {
        configurable: true,
        value: 12345,
      });
    });

    test("detects standard Linux executable", async () => {
      mockFindProcess.mockResolvedValue([
        {
          cmd: "/usr/bin/firefox",
          name: "firefox",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      await extractClientInfoFromParent();

      expect(mockVersionExtractor.extractVersion).toHaveBeenCalledWith(
        "/usr/bin/firefox",
        "firefox"
      );
    });

    test("handles snap applications", async () => {
      mockFindProcess.mockResolvedValue([
        {
          cmd: "/snap/code/current/usr/share/code/code",
          name: "code",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      const result = await extractClientInfoFromParent();

      expect(result.name).toBe("Linux//code");
    });

    test("handles AppImage applications", async () => {
      mockFindProcess.mockResolvedValue([
        {
          cmd: "/home/user/Downloads/MyApp.AppImage",
          name: "MyApp.AppImage",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      const result = await extractClientInfoFromParent();

      expect(result.name).toBe("Linux//MyApp.AppImage");
    });
  });

  describe("Version Extraction Edge Cases", () => {
    beforeEach(() => {
      Object.defineProperty(process, "ppid", {
        configurable: true,
        value: 12345,
      });
    });

    test("handles version extractor exception", async () => {
      mockFindProcess.mockResolvedValue([
        {
          cmd: "/usr/bin/TestApp",
          name: "TestApp",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      mockVersionExtractor.extractVersion.mockRejectedValue(
        new Error("Extractor failed")
      );

      const result = await extractClientInfoFromParent();

      expect(result.version).toBe("unknown");
      expect(console.error).toHaveBeenCalledWith(
        "[CLIENT-DETECTOR] Version extraction error: Error: Extractor failed"
      );
    });

    test("extracts version from command line when extractor fails", async () => {
      mockFindProcess.mockResolvedValue([
        {
          cmd: "/usr/bin/TestApp --version=3.2.1 --config=test",
          name: "TestApp",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      mockVersionExtractor.extractVersion.mockRejectedValue(
        new Error("Extractor failed")
      );

      const result = await extractClientInfoFromParent();

      expect(result.version).toBe("3.2.1");
    });

    test("handles no version information available", async () => {
      mockFindProcess.mockResolvedValue([
        {
          cmd: "/usr/bin/TestApp --debug --verbose",
          name: "TestApp",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      mockVersionExtractor.extractVersion.mockResolvedValue({
        error: "No version found",
        source: "fallback",
      });

      const result = await extractClientInfoFromParent();

      expect(result.version).toBe("unknown");
    });
  });

  describe("Command Line Version Patterns", () => {
    test("extracts version from --version flag", async () => {
      const testCases = [
        { cmd: "app --version 1.2.3", expected: "1.2.3" },
        { cmd: "app --version=2.4.6", expected: "2.4.6" },
        { cmd: "app -v 3.1.4", expected: "3.1.4" },
        { cmd: "app -v=5.0.1", expected: "5.0.1" },
        { cmd: "app version 1.0.0-beta", expected: "1.0.0" },
        { cmd: "app version: 2.1.0", expected: "2.1.0" },
      ];

      Object.defineProperty(process, "ppid", {
        configurable: true,
        value: 12345,
      });

      mockVersionExtractor.extractVersion.mockResolvedValue({
        error: "No version found",
        source: "fallback",
      });

      for (const { cmd, expected } of testCases) {
        jest.clearAllMocks();
        mockFindProcess.mockResolvedValue([
          {
            cmd,
            name: "TestApp",
            pid: 12345,
            ppid: 1234,
          },
        ]);

        const result = await extractClientInfoFromParent();
        expect(result.version).toBe(expected);
      }
    });

    test("handles generic semver patterns", async () => {
      Object.defineProperty(process, "ppid", {
        configurable: true,
        value: 12345,
      });

      mockFindProcess.mockResolvedValue([
        {
          cmd: "TestApp-1.5.2-release build",
          name: "TestApp",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      mockVersionExtractor.extractVersion.mockResolvedValue({
        error: "No version found",
        source: "fallback",
      });

      const result = await extractClientInfoFromParent();

      expect(result.version).toBe("1.5.2");
    });
  });

  describe("Cross-Platform OS Names", () => {
    const platforms = [
      { expectedOS: "macOS", platform: "darwin" },
      { expectedOS: "Windows", platform: "win32" },
      { expectedOS: "Linux", platform: "linux" },
      { expectedOS: "freebsd", platform: "freebsd" },
    ];

    platforms.forEach(({ expectedOS, platform }) => {
      test(`returns correct OS name for ${platform}`, async () => {
        Object.defineProperty(process, "platform", {
          configurable: true,
          value: platform,
        });
        Object.defineProperty(process, "ppid", {
          configurable: true,
          value: 12345,
        });

        mockFindProcess.mockResolvedValue([
          {
            cmd: "/usr/bin/TestApp",
            name: "TestApp",
            pid: 12345,
            ppid: 1234,
          },
        ]);

        const result = await extractClientInfoFromParent();

        expect(result.name).toBe(`${expectedOS}//TestApp`);
      });
    });
  });

  describe("Error Recovery", () => {
    test("recovers from no executable path", async () => {
      Object.defineProperty(process, "ppid", {
        configurable: true,
        value: 12345,
      });

      mockFindProcess.mockResolvedValue([
        {
          cmd: "TestApp", // No path, just process name
          name: "TestApp",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      const result = await extractClientInfoFromParent();

      expect(result).toEqual({
        name: "test-proxy",
        version: "1.0.0",
      });
      expect(console.error).toHaveBeenCalledWith(
        "[CLIENT-DETECTOR] Could not extract executable path, using proxy identity"
      );
    });

    test("handles complete identification failure", async () => {
      Object.defineProperty(process, "ppid", {
        configurable: true,
        value: 12345,
      });

      mockFindProcess.mockResolvedValue([
        {
          cmd: "/usr/bin/TestApp",
          name: "TestApp",
          pid: 12345,
          ppid: 1234,
        },
      ]);

      // Simulate complete failure in identification by making process lookup fail
      mockFindProcess.mockRejectedValue(new Error("Complete failure"));

      const result = await extractClientInfoFromParent();

      expect(result).toEqual({
        name: "test-proxy",
        version: "1.0.0",
      });
    });
  });
});
