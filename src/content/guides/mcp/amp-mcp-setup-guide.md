# Amp MCP Setup Guide

This guide shows you how to set up MCP (Model Context Protocol) servers with Amp in VS Code. MCP servers give Amp access to external tools like Playwright for browser automation, Lighthouse for performance testing, and services like Linear and Atlassian.

## MCP vs CLI Tools

MCP servers provide seamless integration with external services, but CLI tools are also available as an alternative option. Try both to see which works best for your workflow.

**MCP servers provide:**
- Simplified, guided access to services
- Seamless integration with a service's API
- Structured tool access that Amp can easily use

**CLI tools are also available:**
- **GitHub CLI**: Access to more workflows and features than GitHub MCP server. See [GitHub CLI with Amp guide](https://ampcode.com/patterns/github-cli) for detailed usage.
- **Standard CLI tools**: You can use CLI tools directly: "Use the GitHub CLI to create a pull request"
- **Internal tools**: Your organization's custom CLI tools work too

## Prerequisites

- VS Code with Amp extension installed OR Amp CLI installed
- Node.js and npm installed (for npx commands)

## Finding MCP Servers

- Search online for "[vendor name] MCP server" to find official implementations
- Check <https://mcpmarket.com/> for available servers
- **Important**: Only use vendor-supported MCP servers that are officially provided by the service vendors themselves.
- **Note**: Some MCP servers require you to setup a local Docker/Podman server (e.g., [SonarQube MCP server](https://github.com/SonarSource/sonarqube-mcp-server)). They'll provide instructions on what to populate in the Command or URL fields.

## Setup Steps

### 1. Access VS Code Settings

Open VS Code and go to **Settings** → **Extensions** → **Amp** → **MCP Servers**

![VS Code MCP Settings](/images/amp-mcp-vscode-settings.png)

### 2. Add MCP Servers

Click **`Add MCP Server`** and configure example servers:

**Playwright** (browser automation):
- Server Name: `playwright`
- Command or URL: `npx`
- Arguments: `@playwright/mcp@latest`

**Lighthouse** (performance testing):
- Server Name: `lighthouse`
- Command or URL: `npx`
- Arguments: `@mcp-lighthouse/server@latest`

**Atlassian** (Jira/Confluence):
- Server Name: `atlassian`
- Command or URL: `npx`
- Arguments: `@atlassian/mcp@latest`

**Linear** (issue tracking):
- Server Name: `linear`
- Command or URL: `npx`
- Arguments: `@linear/mcp@latest`

![MCP Server Configuration](/images/amp-mcp-server-configuration.png)

### 3. Configure Tool Access

After adding servers, you'll see available tools listed. Click on individual tools to disable ones you don't want (e.g., if you don't want Linear to create new issues, uncheck `create_issue`).

![MCP Tool Access Configuration](/images/amp-mcp-tool-access.png)

### 4. Alternative: CLI Configuration

You can also configure MCP servers directly in the config file:

- **Windows**: `%APPDATA%\amp\settings.json`
- **macOS**: `~/.config/amp/settings.json`
- **Linux**: `~/.config/amp/settings.json`

Example `settings.json` configuration:

```json
{
  "amp.mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest"
      ]
    },
    "Lighthouse": {
      "command": "lighthouse-mcp",
      "env": {}
    },
    "linear": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.linear.app/sse"
      ],
      "disabled": false
    }, 
    "jira": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.jira.com/sse"
      ],
      "disabled": false
    }
  }
}
```

More info at [https://ampcode.com/manual#core-settings](https://ampcode.com/manual#core-settings)

## Testing the Integration

To verify MCP tools work:

Ask Amp to use one of the new MCP tools, to test the Playwright MCP, ask Amp to do the following;
1. Open a web page in your browser
2. Ask Amp: "Use Playwright to take a screenshot of <https://example.com>"
3. Or: "Run a Lighthouse audit on this website and show me the performance score"

Amp will automatically use the configured MCP tools. Be explicit in your prompts about which tools to use. 

## Best Practices & Troubleshooting

### Context Management
- Don't enable all tools at once - start slow and add only the tools that you know will be useful for your workflow. 
- Use specific prompts like "Use Linear to create an issue" rather than assuming Amp will know when you ask it to create an issue, to do so in Linear. 



### Troubleshooting
- If MCP servers aren't working, first try running the command manually in terminal (e.g., `npx @atlassian/mcp@latest`) - this will prompt you to log in if needed
- After manual setup, retry adding the MCP server in VS Code
- Restart VS Code and Amp CLI after making changes


