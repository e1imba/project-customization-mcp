#!/usr/bin/env node

// Lightweight launcher that executes the compiled MCP server entry.
import('../build/index.js').catch((err) => {
  console.error('Failed to start project-customization-mcp:', err);
  process.exit(1);
});
