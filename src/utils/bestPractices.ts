/**
 * VS Code customization best practices and templates
 */

import { ProjectMetadata } from '../types.js';

/**
 * Generate Copilot Instructions based on project metadata
 */
export function generateCopilotInstructions(metadata: ProjectMetadata): string {
  const sections: string[] = [];

  sections.push('# Copilot Custom Instructions');
  sections.push('');
  sections.push(`*Auto-generated for ${metadata.name}*`);
  sections.push('');

  // Project Overview
  sections.push('## Project Overview');
  sections.push(`- **Project Name**: ${metadata.name}`);
  if (metadata.description) {
    sections.push(`- **Description**: ${metadata.description}`);
  }
  sections.push(`- **Type**: ${metadata.projectType}`);
  if (metadata.frameworks.length > 0) {
    sections.push(`- **Frameworks**: ${metadata.frameworks.join(', ')}`);
  }
  if (metadata.programmingLanguages.length > 0) {
    sections.push(`- **Languages**: ${metadata.programmingLanguages.join(', ')}`);
  }
  sections.push('');

  // Code Style and Standards
  sections.push('## Code Style and Standards');
  sections.push('');

  if (metadata.frameworks.some((f) => f.includes('React') || f.includes('TypeScript'))) {
    sections.push('### TypeScript/React Standards');
    sections.push('- Use functional components with hooks');
    sections.push('- Maintain strict TypeScript types (no `any`)');
    sections.push('- Use ESLint and Prettier for code formatting');
    sections.push('- Follow naming conventions: camelCase for variables/functions, PascalCase for components');
    sections.push('');
  }

  if (metadata.frameworks.some((f) => f.includes('Node.js') || f.includes('Backend'))) {
    sections.push('### Backend Standards');
    sections.push('- Use async/await for asynchronous operations');
    sections.push('- Implement proper error handling with try/catch');
    sections.push('- Write unit tests for all utility functions');
    sections.push('- Follow RESTful API design principles');
    sections.push('');
  }

  // Project Structure
  sections.push('## Project Structure');
  sections.push('');
  sections.push('The project should maintain the following directory structure:');
  sections.push('');

  if (metadata.frameworks.some((f) => f.includes('React'))) {
    sections.push('```');
    sections.push('src/');
    sections.push('  ├── components/    # React components');
    sections.push('  ├── pages/         # Page components');
    sections.push('  ├── utils/         # Utility functions');
    sections.push('  ├── hooks/         # Custom hooks');
    sections.push('  ├── types/         # TypeScript types');
    sections.push('  └── App.tsx        # Main app component');
    sections.push('```');
  } else if (metadata.projectType === 'nodejs') {
    sections.push('```');
    sections.push('src/');
    sections.push('  ├── routes/        # API routes');
    sections.push('  ├── controllers/   # Request handlers');
    sections.push('  ├── services/      # Business logic');
    sections.push('  ├── utils/         # Utility functions');
    sections.push('  └── types/         # TypeScript types');
    sections.push('```');
  }

  sections.push('');

  // Documentation Requirements
  sections.push('## Documentation');
  sections.push('');
  sections.push('- Maintain an up-to-date README.md with setup instructions');
  sections.push('- Document API endpoints with examples');
  sections.push('- Include JSDoc comments for complex functions');
  sections.push('- Add comments for non-obvious logic');
  sections.push('');

  // Git Workflow
  sections.push('## Git Workflow');
  sections.push('');
  sections.push('- Use descriptive commit messages following conventional commits');
  sections.push('- Create feature branches for new features (feature/*)');
  sections.push('- Create bugfix branches for fixes (bugfix/*)');
  sections.push('- Request code review before merging to main');
  sections.push('');

  // Testing
  sections.push('## Testing');
  sections.push('');
  sections.push('- Write unit tests for all utility functions');
  sections.push('- Maintain test coverage above 80%');
  sections.push('- Use descriptive test names that explain what is being tested');
  sections.push('- Mock external dependencies in tests');
  sections.push('');

  // Performance
  sections.push('## Performance');
  sections.push('');
  sections.push('- Optimize bundle size for frontend projects');
  sections.push('- Use lazy loading for components when appropriate');
  sections.push('- Implement proper caching strategies');
  sections.push('- Monitor and log performance metrics');
  sections.push('');

  // Security
  sections.push('## Security');
  sections.push('');
  sections.push('- Never commit secrets or API keys');
  sections.push('- Use environment variables for sensitive configuration');
  sections.push('- Validate and sanitize user inputs');
  sections.push('- Keep dependencies up-to-date');
  sections.push('');

  return sections.join('\n');
}

/**
 * Generate README content with guidelines
 */
export function generateReadmeContent(metadata: ProjectMetadata, additionalGuidelines?: string): string {
  const sections: string[] = [];

  sections.push(`# ${metadata.name}`);
  sections.push('');

  if (metadata.description) {
    sections.push(metadata.description);
    sections.push('');
  }

  sections.push('## Getting Started');
  sections.push('');

  if (metadata.projectType === 'nodejs') {
    sections.push('### Prerequisites');
    sections.push('- Node.js (v16 or higher)');
    sections.push('- npm or yarn');
    sections.push('');

    sections.push('### Installation');
    sections.push('');
    sections.push('```bash');
    sections.push('npm install');
    sections.push('```');
    sections.push('');

    sections.push('### Running the Project');
    sections.push('');
    sections.push('```bash');
    sections.push('npm run dev');
    sections.push('```');
    sections.push('');
  } else if (metadata.projectType === 'python') {
    sections.push('### Prerequisites');
    sections.push('- Python 3.8 or higher');
    sections.push('- pip or conda');
    sections.push('');

    sections.push('### Installation');
    sections.push('');
    sections.push('```bash');
    sections.push('pip install -r requirements.txt');
    sections.push('```');
    sections.push('');
  }

  if (additionalGuidelines) {
    sections.push('## Development Guidelines');
    sections.push('');
    sections.push(additionalGuidelines);
    sections.push('');
  }

  sections.push('## Contributing');
  sections.push('');
  sections.push('Please read our contributing guidelines before submitting pull requests.');
  sections.push('');

  sections.push('## License');
  sections.push('');
  sections.push('This project is licensed under the MIT License.');
  sections.push('');

  return sections.join('\n');
}

/**
 * Generate recommendations based on project analysis
 */
export function generateRecommendations(metadata: ProjectMetadata) {
  const recommendations: any[] = [];

  // Missing documentation
  if (!metadata.hasReadme) {
    recommendations.push({
      priority: 'high' as const,
      title: 'Missing README.md',
      description: 'Add a comprehensive README.md file to document the project',
      category: 'documentation' as const,
      action: 'Create README.md with project overview, setup instructions, and development guidelines',
    });
  }

  // Missing copilot instructions
  if (!metadata.hasCopilotInstructions) {
    recommendations.push({
      priority: 'high' as const,
      title: 'Missing Copilot Instructions',
      description: 'Create .github/copilot-instructions.md to guide Copilot behavior',
      category: 'guidelines' as const,
      action: 'Generate copilot-instructions.md with project-specific guidelines',
    });
  }

  // Missing GitHub configuration
  if (!metadata.hasGitHub) {
    recommendations.push({
      priority: 'medium' as const,
      title: 'Initialize Git Repository',
      description: 'Initialize a Git repository to enable version control',
      category: 'structure' as const,
      action: 'Run git init and set up .gitignore',
    });
  }

  // Framework-specific recommendations
  if (metadata.frameworks.some((f) => f.includes('TypeScript'))) {
    recommendations.push({
      priority: 'medium' as const,
      title: 'TypeScript Configuration',
      description: 'Ensure strict TypeScript configuration is enabled',
      category: 'best-practices' as const,
      action: 'Update tsconfig.json with strict mode enabled',
    });
  }

  if (metadata.frameworks.some((f) => f.includes('React'))) {
    recommendations.push({
      priority: 'medium' as const,
      title: 'React Best Practices',
      description: 'Follow React best practices and hooks patterns',
      category: 'guidelines' as const,
      action: 'Ensure use of functional components and hooks throughout the project',
    });
  }

  return recommendations;
}
