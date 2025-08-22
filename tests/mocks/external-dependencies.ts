/**
 * Mocks for external dependencies used across the codebase
 */

import { jest } from "@jest/globals";

// Mock find-process
export const findProcess = {
  default: jest.fn().mockImplementation((type: any, value: any) => {
    if (type === "pid" && value === 12345) {
      return Promise.resolve([
        {
          cmd: "/Applications/TestApp.app/Contents/MacOS/TestApp",
          name: "TestApp",
          pid: 12345,
          ppid: 1234,
        },
      ]);
    }
    return Promise.resolve([]);
  }),
};

// Mock elfy
export const elfy = {
  parse: jest.fn().mockReturnValue({
    body: {
      sections: [
        {
          data: Buffer.from("version 1.2.3 test data"),
          name: ".rodata",
        },
      ],
    },
  }),
};

// Mock plist
export const plist = {
  default: {
    parse: jest.fn().mockReturnValue({
      CFBundleIdentifier: "com.example.testapp",
      CFBundleShortVersionString: "1.2.3",
      CFBundleVersion: "123",
    }),
  },
  parse: jest.fn().mockReturnValue({
    CFBundleIdentifier: "com.example.testapp",
    CFBundleShortVersionString: "1.2.3",
    CFBundleVersion: "123",
  }),
};

// Mock win-version-info
export const winVersionInfo = {
  default: jest.fn().mockReturnValue({
    CompanyName: "Test Company",
    FileDescription: "Test Application",
    FileVersion: "1.2.3.0",
    ProductVersion: "1.2.3",
  }),
};

// Node.js built-in mocks
export const fs = {
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
  statSync: jest.fn(),
};

export const path = {
  dirname: jest.fn(),
  join: jest.fn(),
  resolve: jest.fn(),
};

// Process mocks
export const mockProcess = {
  env: {},
  exit: jest.fn(),
  on: jest.fn(),
  platform: "darwin",
  ppid: 12345,
};
