# Project Customization MCP

An open-source MCP (Model Context Protocol) server that automates project customization by analyzing your codebase and generating AI-ready configuration files based on industry best practices. Perfect for teams and individual developers who want consistent, framework-aware project guidelines.

**Platform-agnostic**: Works with any IDE, editor, or AI tool that supports the Model Context Protocol (VS Code, JetBrains, Cursor, Claude, etc.)

## What You Get

This tool automatically:

- 🔍 **Analyzes your project** - Detects frameworks, languages, and project structure
- 📝 **Generates guidelines** - Creates `.github/copilot-instructions.md` for consistent development
- ✍️ **Updates documentation** - Enhances README with best practices
- 💡 **Provides recommendations** - Suggests improvements for your codebase

## 🎯 Tools Available

- 🔎 **`analyze_project`** - Scan your project and detect frameworks/languages
- 📋 **`generate_copilot_instructions`** - Create customization guidelines for your project
- 📄 **`update_readme`** - Generate or enhance README with standards
- 🚀 **`get_customization_recommendations`** - Get actionable improvement suggestions

## 📚 Resources Available

- 📦 **Project Metadata** - Your project type, frameworks, languages
- 📁 **Project Structure** - Directory organization and files
- 📖 **Current Guidelines** - Existing customization files
- 📝 **README** - Your current documentation

## 💬 Prompts Available

- ⚡ **`analyze-and-customize`** - Full workflow (analyze → generate → update)
- ✨ **`generate-instructions-only`** - Create just the instruction file
- 🔄 **`review-and-improve`** - Review existing customizations

## 📦 Installation

### ⚙️ Option 1: Using npx (Recommended - No Installation Needed)

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

### 🌍 Option 2: Global npm Installation

```powershell
npm install -g project-customization-mcp
```

Then configure:

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

## 🔐 Authorization (Tools Only)

Tool execution requires an API key configured via `MCP_API_KEY` in the MCP server configuration `env`. If the key is missing, tool calls return an authorization error. Prompts and resources remain available without any key.

Example configuration:

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

## 🧠 Memory (GitHub Copilot Hosted)

This MCP server does not store memory. Use GitHub Copilot's hosted memory feature for long-lived context, per GitHub's Copilot memory documentation.

## 🚀 How to Use

### 1️⃣ Configure in Your IDE

- **VS Code**: `Ctrl+Shift+P` → "MCP: Open User Configuration"
- **Cursor**: Settings → MCP Servers
- **Other IDEs**: Refer to your IDE's MCP documentation

Add one of the configurations above and restart your IDE.

### 2️⃣ Use in Chat

Open your chat and type:

```
Analyze my project and set up customization based on best practices
```

Or use specific prompts:

```
/analyze-and-customize
/generate-instructions-only
/review-and-improve
```

### 3. Add Resources to Chat

Add project context:

- Select "Add Context" → "MCP Resources"
- Choose: Project Metadata, Project Structure, Guidelines, README

## 📋 What Gets Generated

The tool creates or updates:

- ✅ **`.github/copilot-instructions.md`** - Project-specific guidelines and standards
- ✅ **`README.md`** - Enhanced with setup and development guidelines
- ✅ **Recommendations** - Suggestions for framework-specific improvements

## 📊 Example Output

For a React TypeScript project, you get:

```markdown
# Project Guidelines

## Code Style

- Use functional components with hooks
- Maintain strict TypeScript (no `any`)
- ESLint + Prettier for formatting

## Project Structure

- src/components - React components
- src/pages - Page components
- src/utils - Utilities
- src/hooks - Custom hooks
```

## 📄 License

MIT License - See [LICENSE](LICENSE) file

---

🎉 **Made for the Model Context Protocol** | Works with any MCP-compatible client
