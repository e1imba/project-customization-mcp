/**
 * TypeScript interfaces and types for the MCP server
 */

export interface ProjectMetadata {
  name: string;
  description: string;
  projectRoot: string;
  projectType: 'nodejs' | 'python' | 'dotnet' | 'unknown';
  hasGitHub: boolean;
  hasPackageJson: boolean;
  hasPythonProject: boolean;
  hasReadme: boolean;
  hasCopilotInstructions: boolean;
  frameworks: string[];
  programmingLanguages: string[];
}

export interface ProjectStructure {
  root: string;
  folders: FolderInfo[];
  files: FileInfo[];
  totalFiles: number;
  keyDirectories: string[];
}

export interface FolderInfo {
  path: string;
  name: string;
  depth: number;
  fileCount: number;
}

export interface FileInfo {
  path: string;
  name: string;
  extension: string;
  size: number;
}

export interface AnalysisResult {
  metadata: ProjectMetadata;
  structure: ProjectStructure;
  issues: ProjectIssue[];
  recommendations: Recommendation[];
}

export interface ProjectIssue {
  severity: 'low' | 'medium' | 'high';
  category: 'missing' | 'outdated' | 'inconsistent';
  message: string;
}

export interface Recommendation {
  title: string;
  description: string;
  category: 'documentation' | 'guidelines' | 'structure' | 'best-practices';
  priority: 'low' | 'medium' | 'high';
  action: string;
}

export interface GeneratedContent {
  filename: string;
  content: string;
  description: string;
}

export interface ToolInput {
  projectPath?: string;
  options?: Record<string, any>;
}
