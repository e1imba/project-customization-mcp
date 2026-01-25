/**
 * Project analysis and scanning utility
 */

import * as path from 'path';
import { FileHandler } from './fileHandler.js';
import { logger } from './logger.js';
import { ProjectMetadata, ProjectStructure, FolderInfo, FileInfo } from '../types.js';

export class ProjectScanner {
  /**
   * Detect project type based on files
   */
  static async detectProjectType(projectRoot: string): Promise<'nodejs' | 'python' | 'dotnet' | 'unknown'> {
    const packageJsonExists = await FileHandler.fileExists(path.join(projectRoot, 'package.json'));
    const pipfileExists = await FileHandler.fileExists(path.join(projectRoot, 'Pipfile'));
    const pyprojectExists = await FileHandler.fileExists(path.join(projectRoot, 'pyproject.toml'));
    const csProjectExists = await FileHandler.listFiles(projectRoot).then((files) =>
      files.some((f) => f.endsWith('.csproj')),
    );

    if (packageJsonExists) return 'nodejs';
    if (pipfileExists || pyprojectExists) return 'python';
    if (csProjectExists) return 'dotnet';
    return 'unknown';
  }

  /**
   * Detect frameworks and languages
   */
  static async detectFrameworks(projectRoot: string): Promise<string[]> {
    const frameworks: string[] = [];

    try {
      const packageJsonPath = path.join(projectRoot, 'package.json');
      if (await FileHandler.fileExists(packageJsonPath)) {
        const content = await FileHandler.readFile(packageJsonPath);
        const packageJson = JSON.parse(content);
        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

        if (deps.react) frameworks.push('React');
        if (deps.vue) frameworks.push('Vue');
        if (deps.angular) frameworks.push('Angular');
        if (deps.next) frameworks.push('Next.js');
        if (deps.nuxt) frameworks.push('Nuxt');
        if (deps.express || deps['@nestjs/core']) frameworks.push('Node.js Backend');
        if (deps.typescript) frameworks.push('TypeScript');
      }
    } catch (error) {
      logger.warn('Error detecting frameworks', error);
    }

    return [...new Set(frameworks)];
  }

  /**
   * Detect programming languages in the project
   */
  static async detectLanguages(projectRoot: string): Promise<string[]> {
    const languages = new Set<string>();

    try {
      const files = await FileHandler.listFiles(projectRoot, true);

      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (ext === '.ts') languages.add('TypeScript');
        if (ext === '.tsx') languages.add('TypeScript/JSX');
        if (ext === '.js') languages.add('JavaScript');
        if (ext === '.jsx') languages.add('JavaScript/JSX');
        if (ext === '.py') languages.add('Python');
        if (ext === '.cs') languages.add('C#');
        if (ext === '.java') languages.add('Java');
        if (ext === '.go') languages.add('Go');
        if (ext === '.rb') languages.add('Ruby');
      }
    } catch (error) {
      logger.warn('Error detecting languages', error);
    }

    return Array.from(languages);
  }

  /**
   * Scan project structure
   */
  static async scanProjectStructure(projectRoot: string, maxDepth: number = 3): Promise<ProjectStructure> {
    const folders: FolderInfo[] = [];
    const files: FileInfo[] = [];
    let totalFiles = 0;

    try {
      const traverse = async (currentPath: string, depth: number = 0) => {
        if (depth > maxDepth) return;

        const entries = await FileHandler.listFiles(currentPath);

        for (const entry of entries) {
          const fullPath = path.join(currentPath, entry);
          const stat = await FileHandler.getFileStats(fullPath);

          if (!stat) continue;

          if (stat.isDirectory()) {
            const fileCount = await FileHandler.listFiles(fullPath).then((f) => f.length);
            folders.push({
              path: fullPath,
              name: path.basename(fullPath),
              depth,
              fileCount,
            });
            await traverse(fullPath, depth + 1);
          } else {
            totalFiles++;
            files.push({
              path: fullPath,
              name: path.basename(fullPath),
              extension: path.extname(fullPath),
              size: stat.size,
            });
          }
        }
      };

      await traverse(projectRoot);
    } catch (error) {
      logger.error('Error scanning project structure', error);
    }

    return {
      root: projectRoot,
      folders,
      files: files.slice(0, 100), // Limit to first 100 files in response
      totalFiles,
      keyDirectories: ['src', 'lib', 'components', 'pages', 'utils', 'tests', 'docs'],
    };
  }

  /**
   * Collect project metadata
   */
  static async getProjectMetadata(projectRoot: string): Promise<ProjectMetadata> {
    let projectName = path.basename(projectRoot);
    let description = '';

    try {
      const packageJsonPath = path.join(projectRoot, 'package.json');
      if (await FileHandler.fileExists(packageJsonPath)) {
        const content = await FileHandler.readFile(packageJsonPath);
        const packageJson = JSON.parse(content);
        projectName = packageJson.name || projectName;
        description = packageJson.description || '';
      }
    } catch (error) {
      logger.warn('Error reading package.json', error);
    }

    const projectType = await this.detectProjectType(projectRoot);
    const frameworks = await this.detectFrameworks(projectRoot);
    const programmingLanguages = await this.detectLanguages(projectRoot);

    const hasGitHub = await FileHandler.fileExists(path.join(projectRoot, '.git'));
    const hasPackageJson = await FileHandler.fileExists(path.join(projectRoot, 'package.json'));
    const hasPythonProject = await FileHandler.fileExists(path.join(projectRoot, 'pyproject.toml'));
    const hasReadme = await FileHandler.fileExists(path.join(projectRoot, 'README.md'));
    const hasCopilotInstructions = await FileHandler.fileExists(
      path.join(projectRoot, '.github', 'copilot-instructions.md'),
    );

    return {
      name: projectName,
      description,
      projectRoot,
      projectType,
      hasGitHub,
      hasPackageJson,
      hasPythonProject,
      hasReadme,
      hasCopilotInstructions,
      frameworks,
      programmingLanguages,
    };
  }
}
