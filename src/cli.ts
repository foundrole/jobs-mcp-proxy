#!/usr/bin/env node

import { main } from "./index.js";

// Run the main function when this file is executed directly
main().catch((error) => {
  console.error("Unexpected error starting MCP proxy:", error);
  process.exit(1);
});
