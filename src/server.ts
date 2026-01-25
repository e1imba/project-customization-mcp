/**
 * MCP Server configuration and setup
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { ToolHandlers } from './tools.js';
import { ResourceProviders } from './resources.js';
import { PROMPT_TEMPLATES, getPromptContent, isValidPromptName } from './prompts.js';
import { logger } from './utils/logger.js';

/**
 * Initialize and configure the MCP server
 */
export function initializeServer(): McpServer {
  const server = new McpServer({
    name: 'project-customization-mcp',
    version: '0.1.0',
  });

  // Register tools
  registerTools(server);

  // Register resources
  registerResources(server);

  // Register prompts
  registerPrompts(server);

  logger.info('MCP Server initialized successfully');

  return server;
}

/**
 * Register all tools with the server
 */
function registerTools(server: McpServer): void {
  logger.info('Registering tools...');

  // Tool 1: Analyze Project
  const analyzeProjectSchema = z.object({
    projectPath: z.string().optional(),
  }).shape;
  server.tool(
    'analyze_project',
    'Analyze a VS Code project structure and detect project type, frameworks, languages, and customization opportunities',
    analyzeProjectSchema,
    async (args) => {
      try {
        const result = await ToolHandlers.analyzeProject((args as any).projectPath);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${message}`,
            },
          ],
          isError: true,
        };
      }
    },
  );

  // Tool 2: Generate Copilot Instructions
  const generateInstructionsSchema = z.object({
    projectPath: z.string().optional(),
    analysisData: z.record(z.any()).optional(),
  }).shape;
  server.tool(
    'generate_copilot_instructions',
    'Generate a .github/copilot-instructions.md file based on project analysis and best practices',
    generateInstructionsSchema,
    async (args) => {
      try {
        const input = args as any;
        const result = await ToolHandlers.generateCopilotInstructions(input.projectPath, input.analysisData);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  success: true,
                  file: result.filename,
                  message: result.description,
                  preview: result.content.substring(0, 500) + '...',
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${message}`,
            },
          ],
          isError: true,
        };
      }
    },
  );

  // Tool 3: Update README
  const updateReadmeSchema = z.object({
    projectPath: z.string().optional(),
    guidelines: z.string().optional(),
    analysisData: z.record(z.any()).optional(),
  }).shape;
  server.tool(
    'update_readme',
    'Update or create README.md with project guidelines and best practices',
    updateReadmeSchema,
    async (args) => {
      try {
        const input = args as any;
        const result = await ToolHandlers.updateReadme(input.projectPath, input.guidelines, input.analysisData);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  success: true,
                  file: result.filename,
                  message: result.description,
                  preview: result.content.substring(0, 500) + '...',
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${message}`,
            },
          ],
          isError: true,
        };
      }
    },
  );

  // Tool 4: Get Recommendations
  const recommendationsSchema = z.object({
    projectPath: z.string().optional(),
    analysisData: z.record(z.any()).optional(),
  }).shape;
  server.tool(
    'get_customization_recommendations',
    'Get recommendations for customizing VS Code settings, instruction files, and project guidelines',
    recommendationsSchema,
    async (args) => {
      try {
        const input = args as any;
        const result = await ToolHandlers.getRecommendations(input.projectPath, input.analysisData);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${message}`,
            },
          ],
          isError: true,
        };
      }
    },
  );

  logger.info('Tools registered successfully');
}

/**
 * Register all resources with the server
 */
function registerResources(server: McpServer): void {
  logger.info('Registering resources...');

  // Register all resources with proper return format
  server.resource('Project Metadata', 'project-config://metadata', { mimeType: 'application/json' }, async () => {
    const resource = await ResourceProviders.getProjectMetadataResource();
    return {
      contents: [
        {
          uri: 'project-config://metadata',
          text: resource.content,
          mimeType: 'application/json',
        },
      ],
    };
  });

  server.resource('Project Structure', 'project-config://structure', { mimeType: 'application/json' }, async () => {
    const resource = await ResourceProviders.getProjectStructureResource();
    return {
      contents: [
        {
          uri: 'project-config://structure',
          text: resource.content,
          mimeType: 'application/json',
        },
      ],
    };
  });

  server.resource('Current Guidelines', 'project-config://guidelines', { mimeType: 'text/markdown' }, async () => {
    const resource = await ResourceProviders.getGuidelinesResource();
    return {
      contents: [
        {
          uri: 'project-config://guidelines',
          text: resource.content,
          mimeType: 'text/markdown',
        },
      ],
    };
  });

  server.resource('Project README', 'project-config://readme', { mimeType: 'text/markdown' }, async () => {
    const resource = await ResourceProviders.getReadmeResource();
    return {
      contents: [
        {
          uri: 'project-config://readme',
          text: resource.content,
          mimeType: 'text/markdown',
        },
      ],
    };
  });

  logger.info('Resources registered successfully');
}

/**
 * Register all prompts with the server
 */
function registerPrompts(server: McpServer): void {
  logger.info('Registering prompts...');

  for (const template of PROMPT_TEMPLATES) {
    const promptArgs: Record<string, { description: string; required?: boolean }> = {};

    if (template.arguments) {
      for (const arg of template.arguments) {
        promptArgs[arg.name] = {
          description: arg.description,
          required: arg.required || false,
        };
      }
    }

    server.prompt(template.name, template.description, promptArgs as any, async (_args: any) => {
      try {
        if (!isValidPromptName(template.name)) {
          return {
            messages: [
              {
                role: 'user' as const,
                content: {
                  type: 'text' as const,
                  text: `Unknown prompt: ${template.name}`,
                },
              },
            ],
          };
        }

        const content = getPromptContent(template.name);

        return {
          messages: [
            {
              role: 'user' as const,
              content: {
                type: 'text' as const,
                text: content,
              },
            },
          ],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          messages: [
            {
              role: 'user' as const,
              content: {
                type: 'text' as const,
                text: `Error loading prompt: ${message}`,
              },
            },
          ],
        };
      }
    });
  }

  logger.info('Prompts registered successfully');
}

/**
 * Export initialization function
 */
export { initializeServer as setupMcpServer };
