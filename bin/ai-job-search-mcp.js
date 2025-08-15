#!/usr/bin/env node

// Import and run the main proxy server
import("../dist/index.js").catch((error) => {
  console.error("Failed to start ai-job-search-mcp:", error);
  console.error("Make sure the package is properly built. Try running:");
  console.error("  npm run build");
  process.exit(1);
});
