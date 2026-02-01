# VS Code Customization MCP Server - Implementation Guide

Complete documentation for developers and implementers of the Project Customization MCP server.

## Features

### Tools

- **analyze_project**: Analyze project structure, detect frameworks, languages, and identify customization opportunities
- **generate_copilot_instructions**: Generate `.github/copilot-instructions.md` based on project analysis and VS Code best practices
- **update_readme**: Create or update README.md with project guidelines
- **get_customization_recommendations**: Get recommendations for customizing VS Code settings and project guidelines

### Resources

- **Project Metadata**: Exposes project name, type, frameworks, and languages
- **Project Structure**: Provides scanned directory structure and file organization
- **Current Guidelines**: Access to existing Copilot custom instructions
- **Project README**: Current README documentation

### Prompts

- **analyze-and-customize**: Complete workflow to analyze and set up all customizations
- **generate-instructions-only**: Generate only Copilot instructions
- **review-and-improve**: Review existing customizations and suggest improvements

## How It Works

```
Your Code
    ↓
analyze_project (scans structure, detects type/frameworks)
    ↓
Project Analysis (type, frameworks, languages, issues)
    ↓
generate_copilot_instructions (creates customization file)
    ↓
update_readme (adds guidelines and setup instructions)
    ↓
get_customization_recommendations (suggests improvements)
    ↓
Generated Files + Recommendations
```

## Example Workflow

### Input

```
User: "Analyze my React TypeScript project and set up customization"
```

### Generated Files

**`.github/copilot-instructions.md`:**

```markdown
# Project Guidelines

## Overview

- **Type**: Node.js
- **Framework**: React
- **Language**: TypeScript

## Code Style

- Use functional components with hooks
- Maintain strict TypeScript (no `any`)
- ESLint + Prettier for formatting
- camelCase for variables/functions, PascalCase for components

## Structure

- src/components - React components
- src/pages - Page components
- src/utils - Utilities
- src/hooks - Custom hooks
- src/types - TypeScript types

[... more guidelines ...]
```

**`README.md`** (updated with):

- Project description
- Prerequisites and setup
- Installation commands
- Development guidelines
- Best practices for the framework

### Recommendations Provided

- "Enable strict TypeScript mode"
- "Add unit testing framework"
- "Configure git hooks for commits"
- "Set up CI/CD pipeline"

## Architecture

```
src/
  ├── index.ts              # Server startup & transport
  ├── server.ts             # McpServer instance & initialization
  ├── tools.ts              # Tool definitions
  ├── resources.ts          # Resource providers
  ├── prompts.ts            # Prompt templates
  ├── types.ts              # TypeScript interfaces
  └── utils/
      ├── fileHandler.ts      # File I/O operations
      ├── projectScanner.ts   # Project analysis logic
      ├── validator.ts        # Input validation & schemas
      ├── bestPractices.ts    # VS Code customization guidelines
      └── logger.ts           # Logging utility
```

## Installation for Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

```powershell
git clone https://github.com/yourusername/project-customization-mcp.git
cd project-customization-mcp
npm install
npm run build
```

### Production Installation

1. Build the server:

```powershell
npm install
npm run build
```

2. Configure in VS Code or your IDE:
   - Open MCP configuration
   - Add the server configuration using one of the methods from README.md

3. Restart your IDE or reload the window

## Development Workflow

### Run in development mode:

```powershell
npm run dev
```

### Build for production:

```powershell
npm run build
```

### Start the server:

```powershell
npm start
```

## Customization

The server comes with sensible defaults for common frameworks. To customize for your team or organization:

1. Fork/clone the repository
2. Edit `src/utils/bestPractices.ts`:
   - Modify `generateCopilotInstructions()` for your standards
   - Adjust `generateReadmeContent()` for your format
   - Customize `generateRecommendations()` for your priorities

3. Build: `npm run build`
4. Publish: `npm publish` (or use locally with path)

## Supported Project Types

| Type          | Status             |
| ------------- | ------------------ |
| Node.js / npm | ✅ Full Support    |
| TypeScript    | ✅ Full Support    |
| React         | ✅ Full Support    |
| Vue.js        | ✅ Full Support    |
| Next.js       | ✅ Full Support    |
| Python        | ✅ Full Support    |
| .NET          | ✅ Full Support    |
| Other         | ✅ Generic Support |

## Troubleshooting

### Server not connecting

1. Check MCP configuration syntax
2. Verify command path is correct
3. Ensure `build/index.js` exists (run `npm run build`)
4. Check IDE logs for errors

### Tools not appearing

1. Reload IDE window
2. Restart IDE completely
3. Verify MCP server is running (check IDE status)
4. Check server logs for errors

### File permissions

- Ensure write access to project directory
- Check that `.github/` directory can be created

## Authorization (Tools Only)

Tool execution is gated by an API key configured via the MCP server `env` variable `MCP_API_KEY`. If the key is missing, tool handlers return an authorization error. Prompts and resources are not protected.

Example config:

```json
{
  "mcpServers": {
    "project-customization": {
      "command": "project-customization-mcp",
      "env": {
        "MCP_API_KEY": "YOUR_KEY"
      }
    }
  }
}
```

## Memory (GitHub Copilot Hosted)

This server does not implement its own memory store. Use GitHub Copilot's hosted memory feature for long-lived context.

## Contributing

Contributions welcome! Areas for enhancement:

- [ ] Support for more languages/frameworks
- [ ] Custom organization templates
- [ ] Integration with CI/CD systems
- [ ] Linting and formatting configuration generation
- [ ] Test setup automation
- [ ] Documentation generators

### Development Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Build and test locally (`npm run build`)
5. Commit your changes with clear messages
6. Push to your branch
7. Open a Pull Request

## Publishing

See [PUBLISHING_CHECKLIST.md](PUBLISHING_CHECKLIST.md) and [QUICK_START_PUBLISH.md](QUICK_START_PUBLISH.md) for NPM publishing instructions.

## Roadmap

- [ ] Web-based configuration UI
- [ ] Organization-specific templates library
- [ ] Linter/formatter configuration generation
- [ ] Test framework setup automation
- [ ] Git hooks generation (Husky, etc.)
- [ ] Pre-commit configuration
- [ ] EditorConfig generation

## License

MIT License - See [LICENSE](LICENSE) file

---

**For user documentation**, see [README.md](README.md)
