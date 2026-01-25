# VS Code Customization MCP Server

An MCP (Model Context Protocol) server that helps automate VS Code project customization by analyzing projects and generating configuration files based on best practices.

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

## Installation

1. Build the server:

```powershell
npm install
npm run build
```

2. Configure in VS Code:
   - Open VS Code Command Palette (`Ctrl+Shift+P`)
   - Run: "MCP: Open User Configuration"
   - Add the server configuration:

```json
{
  "mcpServers": {
    "vs-code-customization": {
      "command": "node",
      "args": ["c:\\Users\\iv.arsenovic\\Projects\\MCP\\Server\\build\\index.js"]
    }
  }
}
```

3. Restart VS Code or reload the window

## Usage

### Option 1: Free-form Chat (Recommended)

Open Copilot Chat and type:

```
Analyze my project and set up Copilot customization based on best practices
```

The server will automatically:

1. Scan your project structure
2. Detect frameworks and languages
3. Generate `.github/copilot-instructions.md`
4. Create/update README.md
5. Provide recommendations

### Option 2: Using Prompts

Use slash commands to trigger specific workflows:

```
/analyze-and-customize
/generate-instructions-only
/review-and-improve
```

### Option 3: Access Resources

Add project context to your chat:

- Add Context > MCP Resources > Project Metadata
- Add Context > MCP Resources > Project Structure
- Add Context > MCP Resources > Current Guidelines

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

## Development

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

## How It Works

1. **Project Analysis**: Scans project directory, detects:
   - Project type (Node.js, Python, .NET)
   - Frameworks (React, Vue, Next.js, etc.)
   - Programming languages
   - Existing customization files

2. **Best Practices Application**: Uses official VS Code documentation to generate:
   - Custom instructions tailored to project type
   - Framework-specific coding standards
   - Project structure guidelines
   - Git workflow recommendations

3. **File Generation**: Creates/updates:
   - `.github/copilot-instructions.md`
   - `README.md`
   - Project documentation

4. **Recommendations**: Provides actionable suggestions for:
   - Missing documentation
   - Configuration improvements
   - Best practice adoption

## Example Workflow

```
User: "Analyze my React TypeScript project and set up customization"

MCP Server Actions:
1. analyze_project → Detects React + TypeScript
2. generate_copilot_instructions → Creates instructions with:
   - React functional components guidance
   - TypeScript strict mode requirements
   - ESLint/Prettier standards
3. update_readme → Adds:
   - Project setup instructions
   - Development guidelines
4. get_customization_recommendations → Suggests:
   - Enable TypeScript strict mode
   - Add unit tests
   - Configure git hooks
```

## Next Steps

1. Try the server with your projects
2. Customize `bestPractices.ts` for your organization
3. Add more tools for specific workflows
4. Extend with custom prompts for your team

## Contributing

Feel free to extend the server with:

- Additional tools for specific frameworks
- Custom prompt templates
- Organization-specific best practices
- Integration with other development tools

## License

MIT
