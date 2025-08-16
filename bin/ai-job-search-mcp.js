#!/usr/bin/env node

// Import and run the main proxy server
import("../dist/cli.js").catch((error) => {
  console.error("Failed to start ai-job-search-mcp:", error);
  console.error("The package may be corrupted. Please try reinstalling it.");
  console.error("  npm install -g @foundrole/ai-job-search-mcp");
  process.exit(1);
});
