# Project Customization MCP

An MCP (Model Context Protocol) server that automates project customization by analyzing your codebase and generating configuration files based on industry best practices.

**Platform-agnostic**: Works with any IDE, editor, or AI tool that supports the Model Context Protocol (VS Code, JetBrains, Cursor, Claude, etc.)

## Features

### 🔍 Intelligent Project Analysis

- **Auto-detect project type**: Node.js, Python, .NET, and more
- **Framework recognition**: React, Vue, Next.js, Angular, FastAPI, Django, etc.
- **Language detection**: TypeScript, JavaScript, Python, C#, Go, Ruby, Java, etc.
- **Structure scanning**: Analyzes file organization and project layout
- **Gap detection**: Identifies missing customization files

### 📝 Automated File Generation

- **Customization instructions** - Creates project-specific guidelines
- **README updates** - Generates comprehensive documentation
- **Best practices** - Applies industry standards to your project
- **Recommendations** - Suggests improvements for your codebase

### 🎯 Tools

- `analyze_project` - Scan project and detect frameworks/languages
- `generate_copilot_instructions` - Create customization files
- `update_readme` - Generate or enhance README
- `get_customization_recommendations` - Get actionable suggestions

### 📚 Resources

- **Project Metadata** - Project type, frameworks, languages
- **Project Structure** - Directory organization and file tree
- **Current Guidelines** - Existing customization files
- **README** - Current documentation

### 💬 Prompt Templates

- **analyze-and-customize** - Full workflow (analyze → generate → update)
- **generate-instructions-only** - Create just the instruction file
- **review-and-improve** - Review existing customizations

## Installation

### Option 1: Using npx (Recommended - No Installation Needed)

```json
{
  "mcpServers": {
    "project-customization": {
      "command": "npx",
      "args": ["-y", "project-customization-mcp"]
    }
  }
}
```

### Option 2: Global npm Installation

```powershell
npm install -g project-customization-mcp
```

Then configure:

```json
{
  "mcpServers": {
    "project-customization": {
      "command": "project-customization-mcp"
    }
  }
}
```

### Option 3: Local Installation

```powershell
npm install project-customization-mcp
```

Configure with relative path:

```json
{
  "mcpServers": {
    "project-customization": {
      "command": "node",
      "args": ["./node_modules/project-customization-mcp/build/index.js"]
    }
  }
}
```

## Configuration

### VS Code / Cursor / Other IDE

1. Open MCP configuration (varies by IDE):
   - VS Code: `Ctrl+Shift+P` → "MCP: Open User Configuration"
   - Or edit manually in settings

2. Add server config (use Option 1, 2, or 3 above)

3. Restart IDE or reload window

### Claude / Other Clients

Refer to your client's MCP configuration documentation and add the server using one of the installation options above.

## Usage

### Quick Start: Free-form Chat

Open your IDE's chat and type:

```
Analyze my project and set up customization based on best practices
```

The server will:

1. ✅ Analyze your project structure
2. ✅ Detect frameworks and languages
3. ✅ Generate `.github/copilot-instructions.md` (if missing)
4. ✅ Update README with guidelines
5. ✅ Provide improvement recommendations

### Using Prompts (Slash Commands)

If your client supports prompt templates:

```
/project-customization.analyze-and-customize
/project-customization.generate-instructions-only
/project-customization.review-and-improve
```

### Add Resources to Context

Add project context to your chat:

- "Add Context" or similar option
- Select "MCP Resources"
- Choose: Project Metadata, Project Structure, Guidelines, README

### Manual Tool Invocation

Ask your AI to use specific tools:

- "Use the analyze_project tool on my project"
- "Generate customization instructions for my React app"
- "Update my README with coding guidelines"

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

## Example: React TypeScript Project

### Input

```
"Analyze my React TypeScript project and set up customization"
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

## Customization

The server comes with sensible defaults for common frameworks. To customize for your team:

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

## Architecture

```
src/
├── index.ts                 # Server startup
├── server.ts                # MCP setup & registration
├── tools.ts                 # Tool implementations
├── resources.ts             # Resource providers
├── prompts.ts               # Prompt templates
├── types.ts                 # TypeScript types
└── utils/
    ├── fileHandler.ts       # File I/O
    ├── projectScanner.ts    # Project analysis
    ├── bestPractices.ts     # Customization templates
    ├── validator.ts         # Input validation
    └── logger.ts            # Logging
```

## Development

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

### Development Mode

```powershell
npm run dev
```

### Build for Production

```powershell
npm run build
```

## Contributing

Contributions welcome! Areas for enhancement:

- [ ] Support for more languages/frameworks
- [ ] Custom organization templates
- [ ] Integration with CI/CD systems
- [ ] Linting and formatting configuration generation
- [ ] Test setup automation
- [ ] Documentation generators

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

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

## FAQ

**Q: Will this modify my existing files?**  
A: By default, it creates new files or updates README by appending. Existing instructions are backed up.

**Q: What if my project is not detected correctly?**  
A: Check for standard configuration files (package.json, pyproject.toml, etc.). You can also provide hints through chat context.

**Q: Can I use this for multiple projects?**  
A: Yes! Configure once and use with any project. It auto-detects project type.

**Q: Is this IDE-specific?**  
A: No! It's a standard MCP server. Works with any MCP-compatible client.

**Q: Can I customize the guidelines?**  
A: Yes! Fork the repo and edit `bestPractices.ts` for your organization's standards.

## License

MIT License - See [LICENSE](LICENSE) file

## Support

- 📖 [GitHub Wiki](https://github.com/yourusername/project-customization-mcp/wiki)
- 🐛 [Report Issues](https://github.com/yourusername/project-customization-mcp/issues)
- 💬 [Discussions](https://github.com/yourusername/project-customization-mcp/discussions)

## Roadmap

- [ ] Web-based configuration UI
- [ ] Organization-specific templates library
- [ ] Linter/formatter configuration generation
- [ ] Test framework setup automation
- [ ] Git hooks generation (Husky, etc.)
- [ ] Pre-commit configuration
- [ ] EditorConfig generation

---

**Made for the Model Context Protocol** | Works with any MCP-compatible client
