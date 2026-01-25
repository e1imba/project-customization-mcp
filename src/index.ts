import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { setupMcpServer } from './server.js';
import { logger } from './utils/logger.js';

/**
 * Main entry point for the MCP server
 * Sets up stdio transport and starts the server
 */
async function main(): Promise<void> {
  try {
    logger.info('Starting VS Code Customization MCP Server...');

    // Initialize server with tools, resources, and prompts
    const server = setupMcpServer();

    // Set up stdio transport for local communication with VS Code
    const transport = new StdioServerTransport();

    // Connect server to transport
    await server.connect(transport);

    logger.info('MCP Server is running and ready to accept connections');
  } catch (error) {
    logger.error('Fatal error starting MCP server', error);
    process.exit(1);
  }
}

// Start the server
main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
