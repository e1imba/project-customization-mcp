/**
 * Resource providers for MCP server
 * Exposes project data as resources that Copilot can access
 */

import * as path from 'path';
import { FileHandler } from './utils/fileHandler.js';
import { ProjectScanner } from './utils/projectScanner.js';
import { logger } from './utils/logger.js';
import { ProjectMetadata, ProjectStructure } from './types.js';

export interface Resource {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
}

export class ResourceProviders {
  /**
   * Get project metadata resource
   */
  static async getProjectMetadataResource(projectPath?: string): Promise<Resource & { content: string }> {
    try {
      const root = projectPath || (await FileHandler.getProjectRoot());
      const metadata = await ProjectScanner.getProjectMetadata(root);

      const content = JSON.stringify(metadata, null, 2);

      return {
        uri: 'project-config://metadata',
        name: 'Project Metadata',
        description: 'Project metadata including name, type, frameworks, and languages',
        mimeType: 'application/json',
        content,
      };
    } catch (error) {
      logger.error('Error getting project metadata resource', error);
      throw error;
    }
  }

  /**
   * Get project structure resource
   */
  static async getProjectStructureResource(projectPath?: string): Promise<Resource & { content: string }> {
    try {
      const root = projectPath || (await FileHandler.getProjectRoot());
      const structure = await ProjectScanner.scanProjectStructure(root);

      const content = JSON.stringify(structure, null, 2);

      return {
        uri: 'project-config://structure',
        name: 'Project Structure',
        description: 'Scanned project directory structure and file organization',
        mimeType: 'application/json',
        content,
      };
    } catch (error) {
      logger.error('Error getting project structure resource', error);
      throw error;
    }
  }

  /**
   * Get current customization guidelines resource
   */
  static async getGuidelinesResource(projectPath?: string): Promise<Resource & { content: string }> {
    try {
      const root = projectPath || (await FileHandler.getProjectRoot());
      const guidelinesPath = path.join(root, '.github', 'copilot-instructions.md');

      let content = '';
      const exists = await FileHandler.fileExists(guidelinesPath);

      if (exists) {
        content = await FileHandler.readFile(guidelinesPath);
      } else {
        content = 'No custom instructions file found. Create one to guide Copilot behavior.';
      }

      return {
        uri: 'project-config://guidelines',
        name: 'Current Guidelines',
        description: 'Current Copilot custom instructions and project guidelines',
        mimeType: 'text/markdown',
        content,
      };
    } catch (error) {
      logger.error('Error getting guidelines resource', error);
      throw error;
    }
  }

  /**
   * Get README resource
   */
  static async getReadmeResource(projectPath?: string): Promise<Resource & { content: string }> {
    try {
      const root = projectPath || (await FileHandler.getProjectRoot());
      const readmePath = path.join(root, 'README.md');

      let content = '';
      const exists = await FileHandler.fileExists(readmePath);

      if (exists) {
        content = await FileHandler.readFile(readmePath);
      } else {
        content = 'No README.md file found in project root.';
      }

      return {
        uri: 'project-config://readme',
        name: 'Project README',
        description: 'Current project README documentation',
        mimeType: 'text/markdown',
        content,
      };
    } catch (error) {
      logger.error('Error getting README resource', error);
      throw error;
    }
  }

  /**
   * List all available resources
   */
  static async listResources(): Promise<Resource[]> {
    return [
      {
        uri: 'project-config://metadata',
        name: 'Project Metadata',
        description: 'Project metadata including name, type, frameworks, and languages',
        mimeType: 'application/json',
      },
      {
        uri: 'project-config://structure',
        name: 'Project Structure',
        description: 'Scanned project directory structure and file organization',
        mimeType: 'application/json',
      },
      {
        uri: 'project-config://guidelines',
        name: 'Current Guidelines',
        description: 'Current Copilot custom instructions and project guidelines',
        mimeType: 'text/markdown',
      },
      {
        uri: 'project-config://readme',
        name: 'Project README',
        description: 'Current project README documentation',
        mimeType: 'text/markdown',
      },
    ];
  }

  /**
   * Get resource by URI
   */
  static async getResource(uri: string, projectPath?: string): Promise<{ content: string; mimeType: string }> {
    switch (uri) {
      case 'project-config://metadata':
        const metaResource = await this.getProjectMetadataResource(projectPath);
        return {
          content: metaResource.content,
          mimeType: metaResource.mimeType,
        };

      case 'project-config://structure':
        const structResource = await this.getProjectStructureResource(projectPath);
        return {
          content: structResource.content,
          mimeType: structResource.mimeType,
        };

      case 'project-config://guidelines':
        const guideResource = await this.getGuidelinesResource(projectPath);
        return {
          content: guideResource.content,
          mimeType: guideResource.mimeType,
        };

      case 'project-config://readme':
        const readmeRes = await this.getReadmeResource(projectPath);
        return {
          content: readmeRes.content,
          mimeType: readmeRes.mimeType,
        };

      default:
        throw new Error(`Unknown resource URI: ${uri}`);
    }
  }
}
