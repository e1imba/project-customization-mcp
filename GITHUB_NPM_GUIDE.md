# GitHub & npm Publishing Guide

Step-by-step guide to publish your MCP server to GitHub and npm.

## Prerequisites

- GitHub account (free at https://github.com)
- npm account (free at https://npmjs.com) - optional but recommended
- Git installed on your machine
- Access to command line/PowerShell

## Step 1: Initialize Git Repository

```powershell
cd c:\Users\iv.arsenovic\Projects\MCP\Server

# Initialize git
git init

# Configure git (one time)
git config --global user.name "Ivan Arsenovic"
git config --global user.email "your.email@example.com"

# Add all files
git add .

# Initial commit
git commit -m "Initial release: project-customization-mcp v0.1.0"
```

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Fill in:
   - **Repository name**: `project-customization-mcp`
   - **Description**: `An MCP server for automating project customization based on best practices`
   - **Visibility**: Public (for open source) or Private
   - **Initialize repository**: Do NOT check (we already have files)

3. Click "Create repository"

4. GitHub will show commands. Run these:

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/project-customization-mcp.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Create First Release on GitHub

```powershell
# Create a tag for version
git tag v0.1.0
git push origin v0.1.0
```

Then on GitHub:

1. Go to your repository
2. Click "Releases" on the right sidebar
3. Click "Create a new release"
4. Fill in:
   - **Tag**: v0.1.0
   - **Release title**: Version 0.1.0
   - **Description**:

     ```
     ## Initial Release

     First public release of project-customization-mcp!

     ### Features
     - 🔍 Intelligent project analysis
     - 📝 Automated customization file generation
     - 🎯 4 powerful tools for project customization
     - 💬 3 prompt templates for guided workflows

     ### Installation
     \`\`\`
     npm install -g project-customization-mcp
     \`\`\`

     See README for configuration and usage.
     ```

5. Click "Publish release"

## Step 4: Publish to npm (Optional but Recommended)

### First Time Setup

1. Create npm account at https://npmjs.com (if you don't have one)

2. Login to npm from terminal:

```powershell
npm login
# You'll be prompted for:
# - username
# - password
# - email
```

3. Verify login worked:

```powershell
npm whoami
```

### Publish

```powershell
cd c:\Users\iv.arsenovic\Projects\MCP\Server

# Make sure code is built
npm run build

# Test what will be published
npm pack

# This creates a tarball. You can extract it to verify contents.
# Check that:
# - build/ folder is there
# - node_modules/ is NOT there
# - src/ is NOT there

# When ready, publish:
npm publish
```

### Verify Publication

1. Go to https://npmjs.com/package/project-customization-mcp
2. Your package should be listed there
3. Users can now install with: `npm install -g project-customization-mcp`

## Step 5: Future Updates

### Update Version

1. Edit `package.json` - increase version:
   - Patch: `0.1.0` → `0.1.1` (bug fixes)
   - Minor: `0.1.0` → `0.2.0` (new features, backward compatible)
   - Major: `0.1.0` → `1.0.0` (breaking changes)

2. Commit and push:

```powershell
git add .
git commit -m "Version 0.2.0: Add new features"
git push
```

3. Tag and release:

```powershell
git tag v0.2.0
git push origin v0.2.0
npm publish
```

## What Users Will See

### On GitHub

```
https://github.com/YOUR_USERNAME/project-customization-mcp

Visitors see:
- README.md (displayed on repository page)
- Code browser
- Releases page with version history
- Issues and Discussions
```

### On npm

```
https://npmjs.com/package/project-customization-mcp

Visitors see:
- Package metadata
- Installation instructions
- README content
- Version history
- Download statistics
```

### Installation Command

Users will install with:

```powershell
npm install -g project-customization-mcp
```

Or use without installing:

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

## Troubleshooting

### npm publish fails

```
Error: You must be logged in to publish packages
```

Solution: Run `npm login` and enter credentials

### npm publish fails with version error

```
Error: You cannot publish over the previously published version
```

Solution: Update version in package.json to be higher

### Git push fails

```
Error: remote: Repository not found
```

Solution: Check that your GitHub URL is correct (should have YOUR_USERNAME)

### Files not included in npm package

Check `.npmignore` file - make sure you're not excluding important files

## Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [GitHub Docs](https://docs.github.com)
- [Semantic Versioning](https://semver.org/)
- [MCP Specification](https://modelcontextprotocol.io/)

## Checklist

Before publishing:

- [ ] Code builds without errors: `npm run build`
- [ ] README.md is complete and accurate
- [ ] LICENSE file exists
- [ ] package.json has correct name and version
- [ ] Git initialized and first commit made
- [ ] GitHub repository created
- [ ] All files pushed to GitHub
- [ ] npm account created (if publishing to npm)
- [ ] `npm pack` shows correct files
- [ ] `npm publish` succeeds

After publishing:

- [ ] Package appears on npmjs.com
- [ ] GitHub releases page has version
- [ ] Installation instructions work
- [ ] Test installation on clean machine/environment
