/**
 * File I/O operations utility
 */

import * as fs from 'fs';
import * as path from 'path';
import { logger } from './logger.js';

export class FileHandler {
  /**
   * Read a file asynchronously
   */
  static async readFile(filePath: string): Promise<string> {
    try {
      return await fs.promises.readFile(filePath, 'utf-8');
    } catch (error) {
      logger.error(`Failed to read file: ${filePath}`, error);
      throw error;
    }
  }

  /**
   * Write content to a file asynchronously
   */
  static async writeFile(filePath: string, content: string): Promise<void> {
    try {
      const dir = path.dirname(filePath);
      await fs.promises.mkdir(dir, { recursive: true });
      await fs.promises.writeFile(filePath, content, 'utf-8');
      logger.info(`File written successfully: ${filePath}`);
    } catch (error) {
      logger.error(`Failed to write file: ${filePath}`, error);
      throw error;
    }
  }

  /**
   * Append content to a file
   */
  static async appendFile(filePath: string, content: string): Promise<void> {
    try {
      const dir = path.dirname(filePath);
      await fs.promises.mkdir(dir, { recursive: true });
      await fs.promises.appendFile(filePath, content, 'utf-8');
      logger.info(`Content appended to file: ${filePath}`);
    } catch (error) {
      logger.error(`Failed to append to file: ${filePath}`, error);
      throw error;
    }
  }

  /**
   * Check if file exists
   */
  static async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.promises.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if path is a directory
   */
  static async isDirectory(dirPath: string): Promise<boolean> {
    try {
      const stats = await fs.promises.stat(dirPath);
      return stats.isDirectory();
    } catch {
      return false;
    }
  }

  /**
   * List files in a directory
   */
  static async listFiles(dirPath: string, recursive: boolean = false): Promise<string[]> {
    try {
      const files: string[] = [];

      const traverse = async (currentPath: string, relativePath: string = '') => {
        const entries = await fs.promises.readdir(currentPath);

        for (const entry of entries) {
          const fullPath = path.join(currentPath, entry);
          const relPath = relativePath ? `${relativePath}/${entry}` : entry;

          const stat = await fs.promises.stat(fullPath);

          if (stat.isDirectory()) {
            if (recursive && !this.isIgnoredFolder(relPath)) {
              await traverse(fullPath, relPath);
            }
          } else {
            files.push(relPath);
          }
        }
      };

      await traverse(dirPath);
      return files;
    } catch (error) {
      logger.error(`Failed to list files in ${dirPath}`, error);
      return [];
    }
  }

  /**
   * Get file stats
   */
  static async getFileStats(filePath: string): Promise<fs.Stats | null> {
    try {
      return await fs.promises.stat(filePath);
    } catch {
      return null;
    }
  }

  /**
   * Check if folder should be ignored
   */
  private static isIgnoredFolder(folderName: string): boolean {
    const ignoredFolders = ['node_modules', '.git', 'dist', 'build', '.next', '__pycache__', '.venv', 'venv'];
    return ignoredFolders.some((ignored) => folderName.includes(ignored));
  }

  /**
   * Find git root directory
   */
  static async findGitRoot(startPath: string): Promise<string | null> {
    let currentPath = startPath;

    while (currentPath !== path.dirname(currentPath)) {
      const gitPath = path.join(currentPath, '.git');
      if (await this.fileExists(gitPath)) {
        return currentPath;
      }
      currentPath = path.dirname(currentPath);
    }

    return null;
  }

  /**
   * Get project root (git root or starting directory)
   */
  static async getProjectRoot(startPath: string = process.cwd()): Promise<string> {
    const gitRoot = await this.findGitRoot(startPath);
    return gitRoot || startPath;
  }
}
