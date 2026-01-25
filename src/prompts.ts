/**
 * Prompt templates for MCP server
 * Pre-built prompts to guide the customization workflow
 */

export interface PromptTemplate {
  name: string;
  description: string;
  arguments?: PromptArgument[];
}

export interface PromptArgument {
  name: string;
  description: string;
  required?: boolean;
}

/**
 * Available prompt templates
 */
export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    name: 'analyze-and-customize',
    description:
      'Comprehensive prompt to analyze a VS Code project and set up customization files (instructions, README, guidelines)',
    arguments: [
      {
        name: 'projectPath',
        description: 'Path to the project to analyze and customize',
        required: false,
      },
    ],
  },
  {
    name: 'generate-instructions-only',
    description: 'Generate only the Copilot custom instructions file based on project analysis',
    arguments: [
      {
        name: 'projectPath',
        description: 'Path to the project',
        required: false,
      },
    ],
  },
  {
    name: 'review-and-improve',
    description: 'Review existing project customizations and suggest improvements',
    arguments: [
      {
        name: 'projectPath',
        description: 'Path to the project',
        required: false,
      },
    ],
  },
];

/**
 * Get prompt content by name
 */
export function getPromptContent(promptName: string): string {
  switch (promptName) {
    case 'analyze-and-customize':
      return `You are a VS Code customization expert. Your task is to analyze the provided project and help customize it for optimal Copilot experience.

Use the following tools in sequence:
1. First, analyze the project using the \`analyze_project\` tool to understand its structure, type, and current customization status
2. Review the analysis results to identify gaps and opportunities
3. Generate Copilot custom instructions using the \`generate_copilot_instructions\` tool
4. Update or create a README with guidelines using the \`update_readme\` tool
5. Explain what was done and provide recommendations for further improvements

The goal is to establish a solid foundation of project customization that will improve developer experience when using Copilot.`;

    case 'generate-instructions-only':
      return `You are a VS Code customization expert focused on Copilot instructions.

Your task:
1. Analyze the project using the \`analyze_project\` tool
2. Generate appropriate Copilot custom instructions using the \`generate_copilot_instructions\` tool
3. Provide a summary of what instructions were created and why they're important for this project

Focus on creating clear, actionable guidelines that reflect the project's technology stack and best practices.`;

    case 'review-and-improve':
      return `You are a code quality and customization expert.

Your task:
1. Analyze the project using the \`analyze_project\` tool
2. Get customization recommendations using the \`get_customization_recommendations\` tool
3. Review existing customization files (README, instructions) by reading the project resources
4. Provide detailed recommendations for:
   - What customization improvements are needed
   - How to enhance existing guidelines
   - Best practices that aren't yet documented
   - Potential issues or gaps in the current setup

Be constructive and provide actionable advice.`;

    default:
      return `Unknown prompt: ${promptName}`;
  }
}

/**
 * Get all prompt templates
 */
export function getAllPrompts(): PromptTemplate[] {
  return PROMPT_TEMPLATES;
}

/**
 * Validate prompt name
 */
export function isValidPromptName(name: string): boolean {
  return PROMPT_TEMPLATES.some((p) => p.name === name);
}
