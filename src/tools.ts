/**
 * Tools implementation for MCP server
 * Handles project analysis, instruction generation, and documentation updates
 */

import * as path from 'path';
import { FileHandler } from './utils/fileHandler.js';
import { ProjectScanner } from './utils/projectScanner.js';
import { generateCopilotInstructions, generateReadmeContent, generateRecommendations } from './utils/bestPractices.js';
import { logger } from './utils/logger.js';
import { AnalysisResult, GeneratedContent } from './types.js';

export class ToolHandlers {
  /**
   * Analyze project tool handler
   */
  static async analyzeProject(projectPath?: string): Promise<AnalysisResult> {
    try {
      const root = projectPath || (await FileHandler.getProjectRoot());
      logger.info(`Analyzing project at: ${root}`);

      const metadata = await ProjectScanner.getProjectMetadata(root);
      const structure = await ProjectScanner.scanProjectStructure(root);
      const recommendations = generateRecommendations(metadata);

      // Detect issues
      const issues = [];
      if (!metadata.hasReadme) {
        issues.push({
          severity: 'high' as const,
          category: 'missing' as const,
          message: 'README.md file is missing',
        });
      }
      if (!metadata.hasCopilotInstructions) {
        issues.push({
          severity: 'high' as const,
          category: 'missing' as const,
          message: '.github/copilot-instructions.md file is missing',
        });
      }

      return {
        metadata,
        structure,
        issues,
        recommendations,
      };
    } catch (error) {
      logger.error('Error analyzing project', error);
      throw new Error(`Failed to analyze project: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Generate Copilot Instructions tool handler
   */
  static async generateCopilotInstructions(projectPath?: string, analysisData?: any): Promise<GeneratedContent> {
    try {
      const root = projectPath || (await FileHandler.getProjectRoot());
      logger.info(`Generating Copilot instructions for: ${root}`);

      // Use provided analysis data or perform new analysis
      const analysis = analysisData || (await this.analyzeProject(root));

      // Generate instructions content
      const content = generateCopilotInstructions(analysis.metadata);

      // Create .github directory if it doesn't exist
      const githubDir = path.join(root, '.github');
      await FileHandler.writeFile(path.join(githubDir, 'copilot-instructions.md'), content);

      return {
        filename: '.github/copilot-instructions.md',
        content,
        description: 'Generated Copilot custom instructions based on project analysis',
      };
    } catch (error) {
      logger.error('Error generating Copilot instructions', error);
      throw new Error(
        `Failed to generate Copilot instructions: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Update README tool handler
   */
  static async updateReadme(projectPath?: string, guidelines?: string, analysisData?: any): Promise<GeneratedContent> {
    try {
      const root = projectPath || (await FileHandler.getProjectRoot());
      logger.info(`Updating README for: ${root}`);

      // Use provided analysis data or perform new analysis
      const analysis = analysisData || (await this.analyzeProject(root));

      // Generate README content
      const content = generateReadmeContent(analysis.metadata, guidelines);

      // Write or update README
      const readmePath = path.join(root, 'README.md');
      const existingReadme = await FileHandler.fileExists(readmePath);

      if (existingReadme) {
        // Backup existing README
        const backupPath = path.join(root, 'README.md.backup');
        const existingContent = await FileHandler.readFile(readmePath);
        await FileHandler.writeFile(backupPath, existingContent);
        logger.info(`Backed up existing README to: ${backupPath}`);
      }

      await FileHandler.writeFile(readmePath, content);

      return {
        filename: 'README.md',
        content,
        description: 'Generated or updated README.md with project guidelines',
      };
    } catch (error) {
      logger.error('Error updating README', error);
      throw new Error(`Failed to update README: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get customization recommendations tool handler
   */
  static async getRecommendations(projectPath?: string, analysisData?: any): Promise<any> {
    try {
      const root = projectPath || (await FileHandler.getProjectRoot());
      logger.info(`Getting recommendations for: ${root}`);

      // Use provided analysis data or perform new analysis
      const analysis = analysisData || (await this.analyzeProject(root));
      return {
        projectName: analysis.metadata.name,
        recommendations: analysis.recommendations,
        issues: analysis.issues,
        metadata: {
          projectType: analysis.metadata.projectType,
          frameworks: analysis.metadata.frameworks,
          languages: analysis.metadata.programmingLanguages,
        },
      };
    } catch (error) {
      logger.error('Error getting recommendations', error);
      throw new Error(`Failed to get recommendations: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
