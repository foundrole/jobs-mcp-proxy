/** @type {import('jest').Config} */
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/stdio-server.test.(ts|tsx|js)"],
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
    "^(.*)\\.js$": "$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@modelcontextprotocol|find-process|elfy|plist|win-version-info)/)",
  ],
  extensionsToTreatAsEsm: [".ts"],
  // No setupFilesAfterEnv to avoid global mock conflicts
  verbose: true,
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,
  maxWorkers: 1,
  testTimeout: 15000,
};
