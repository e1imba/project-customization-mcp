/**
 * Input validation using Zod
 */

import { z } from 'zod';

/**
 * Schema for project analysis tool input
 */
export const AnalyzeProjectInputSchema = z.object({
  projectPath: z.string().optional().describe('Path to the project to analyze'),
});

/**
 * Schema for generating copilot instructions
 */
export const GenerateCopilotInstructionsInputSchema = z.object({
  projectPath: z.string().optional().describe('Path to the project'),
  analysisData: z.record(z.any()).optional().describe('Previously analyzed project data'),
});

/**
 * Schema for updating README
 */
export const UpdateReadmeInputSchema = z.object({
  projectPath: z.string().optional().describe('Path to the project'),
  guidelines: z.string().optional().describe('Custom guidelines to add to README'),
  analysisData: z.record(z.any()).optional().describe('Previously analyzed project data'),
});

/**
 * Schema for getting project customization recommendations
 */
export const GetRecommendationsInputSchema = z.object({
  projectPath: z.string().optional().describe('Path to the project'),
  analysisData: z.record(z.any()).optional().describe('Previously analyzed project data'),
});

/**
 * Validate and parse input using provided schema
 */
export function validateInput<T>(schema: z.ZodSchema, input: unknown): T {
  try {
    return schema.parse(input) as T;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(', ')}`);
    }
    throw error;
  }
}

/**
 * Generate tool definitions for MCP server
 */
export const TOOL_DEFINITIONS = [
  {
    name: 'analyze_project',
    description:
      'Analyze a VS Code project structure and detect project type, frameworks, languages, and customization opportunities',
    inputSchema: {
      type: 'object',
      properties: {
        projectPath: {
          type: 'string',
          description: 'Path to the project directory (defaults to current working directory)',
        },
      },
    },
  },
  {
    name: 'generate_copilot_instructions',
    description: 'Generate a .github/copilot-instructions.md file based on project analysis and best practices',
    inputSchema: {
      type: 'object',
      properties: {
        projectPath: {
          type: 'string',
          description: 'Path to the project directory',
        },
        analysisData: {
          type: 'object',
          description: 'Previously analyzed project data (from analyze_project tool)',
        },
      },
    },
  },
  {
    name: 'update_readme',
    description: 'Update or create README.md with project guidelines and best practices',
    inputSchema: {
      type: 'object',
      properties: {
        projectPath: {
          type: 'string',
          description: 'Path to the project directory',
        },
        guidelines: {
          type: 'string',
          description: 'Custom guidelines to include in README',
        },
        analysisData: {
          type: 'object',
          description: 'Previously analyzed project data',
        },
      },
    },
  },
  {
    name: 'get_customization_recommendations',
    description: 'Get recommendations for customizing VS Code settings, instruction files, and project guidelines',
    inputSchema: {
      type: 'object',
      properties: {
        projectPath: {
          type: 'string',
          description: 'Path to the project directory',
        },
        analysisData: {
          type: 'object',
          description: 'Previously analyzed project data',
        },
      },
    },
  },
];
