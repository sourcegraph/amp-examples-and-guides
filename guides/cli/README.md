# Amp CLI Guide

Complete guide to using Amp from the command line for all phases of software development.

## Table of Contents

- [Introduction](#introduction)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
- [Basic Usage](#basic-usage)
- [Thread Management](#thread-management)
- [Intermediate Features](#intermediate-features)
- [Configuration](#configuration)
- [Tools & Extensions](#tools--extensions)
- [Real-World Use Cases & Examples](#real-world-use-cases--examples)
- [Troubleshooting](#troubleshooting)

---

## Introduction

Amp is designed for developers who want to stay in their command-line workflow. Amp can be run anywhere - from your terminal, IDE, CI/CD pipelines, Docker container or anywhere with a terminal.

---

## Quick Start

### Installation

```bash
# Using pnpm (recommended)
pnpm add -g @sourcegraph/amp

# Using npm
npm install -g @sourcegraph/amp

# Using yarn
yarn global add @sourcegraph/amp
```

### First Run

You can get started in two ways:

**Option 1: Interactive Authentication**

1. **Start Amp:** `amp`
2. **Authenticate:** Follow the automatic authentication prompt or run `amp login`
3. **Try a simple request:** "Show me the structure of this project"
4. **Get help:** `amp --help`

**Option 2: Environment Variables (CI/CD & Automation)**

Set up environment variables for automated workflows, GitHub pipelines, or any environment where an executable can run:

```bash
export AMP_API_KEY="your-api-key"              # API key from ampcode.com/settings
export AMP_LOG_LEVEL="info"                    # Set log level (error, warn, info, debug)
export AMP_SETTINGS_FILE="/custom/path/settings.json"  # Custom settings location
```

---

## Core Concepts

### Threads
Threads are persistent conversations that maintain context across interactions. Your threads sync to [ampcode.com](https://ampcode.com), allowing you to continue conversations across devices.

### AGENT.md Files
Add an `AGENT.md` file in your project root to provide context about your codebase structure, build commands, and coding standards. This helps Amp understand your project better.

### Tools
Amp comes with built-in tools for coding tasks and can be extended with custom MCP (Model Context Protocol) servers.

### Execution Modes

| Mode | Description | Usage |
|------|-------------|--------|
| **Interactive Mode** | Ongoing conversations with the AI | `amp` (default) |
| **Execute Mode** | Non-interactive, single-shot responses | `amp -x "command"` |
| **Piping/Streaming Mode** | Pipe commands and data from streams | `command \| amp` |

---

## Basic Usage

### Interactive Mode

```bash
amp  # Start interactive session
```

**Interactive Features:**

- **File Mentions:** Type `@` followed by a pattern for fuzzy file search
- **Full Screen Navigation:** Hit `Ctrl+R` to enter full screen mode
  - `Space`: Navigate between pages
  - `J/K`: Move line by line  
  - `G/Shift+G`: Jump to top/bottom
  - `Q`: Quit full screen mode
- **Slash Commands:** Use `/compact` to compress conversation history

### Execute Mode

```bash
# Single command
amp -x "commit all my unstaged changes"

# From file
amp < prompt.txt > output.txt

# Piping
echo "analyze this code for bugs" | amp
```

### File References

- **Mention Files:** Type `@` followed by a pattern to fuzzy-search files

---

## Thread Management

### Basic Thread Operations

```bash
# Create new thread
amp threads new

# Continue existing thread (if threadId provided, previous thread is continued)
amp threads continue [threadId]

# List all threads
amp threads list

# Fork existing thread (if threadId provided, previous thread is forked)
amp threads fork [threadId]

# Share thread
amp threads share [threadId]

# Compact thread (reduce token usage)
amp threads compact [threadId]
```

### Thread Workflows

**Feature Development (Linear Workflow):**  
This example shows a continuous thread where each command builds on the previous context:

```bash
# Start a feature development thread
amp threads new -x "Plan implementation of user authentication feature"

# Continue working on the same feature
amp threads continue -x "Implement the login endpoint"
```

**Bug Investigation (Thread Resumption):**  
This example shows how to resume a specific thread from days or weeks ago by specifying its threadID:

```bash
# Start debugging thread
amp threads new -x "Investigate why users can't log in on mobile devices"

# Deep dive into the issue
amp threads continue [threadId] -x "Check mobile-specific CSS and JavaScript errors"
```

---

## Intermediate Features

### Slash Commands in Interactive Mode

| Command | Description |
|---------|-------------|
| `/editor` | Open your `$EDITOR` to write longer prompts |
| `/agent` | Generate an AGENT.md file in the current workspace |
| `/compact` | Compress conversation history to save tokens |
| `/help` | Show help and hotkeys |
| `/quit` | Quit Amp |

### Piping and Redirection

```bash
# Process command output
ls -la | amp -x "organize these files by type and suggest cleanup"

# Save results to file
amp -x "generate a project readme" > README.md

# Chain commands
git log --oneline -10 | amp -x "summarize recent changes" | tee summary.txt
```

### Environment Variables

```bash
export AMP_API_KEY="your-api-key"              # API key from ampcode.com/settings
export AMP_LOG_LEVEL="info"                    # Set log level (error, warn, info, debug)
export AMP_SETTINGS_FILE="/custom/path/settings.json"  # Custom settings location
```

---

## Configuration

### Settings File Location

Configure Amp using a JSON settings file at `~/.config/amp/settings.json`:

```json
{
  "amp.notifications.enabled": true,
  "amp.mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]
    }
  },
  "amp.tools.disable": ["browser_navigate"],
  "amp.commands.allowlist": ["git status", "npm run build"],
  "amp.commands.strict": false,
  "amp.dangerouslyAllowAll": false
}
```

### Command Allowlisting

> [!IMPORTANT]
> For security, Amp uses command allowlisting. Add safe commands to your allowlist:

```json
"amp.commands.allowlist": [
  "pnpm exec tsc --build",
  "pnpm -C web check", 
  "make build",
  "npm run * --test"
]
```

### Environment Configuration

```json
{
  "amp.commands.loadUserEnvironment": true
}
```

This loads variables from `.bashrc`, `.zshrc`, `.envrc` before running MCP servers.

---

## Tools & Extensions

### Built-in Tools (16 available)

- **Bash** - Execute shell commands with safety controls
- **codebase_search_agent** - Intelligent codebase search with AI assistant
- **create_file** - Create or overwrite files in workspace
- **edit_file** - Make precise edits to existing files
- **glob** - Fast file pattern matching and discovery
- **Grep** - Search for exact text patterns using ripgrep
- **list_directory** - List files and directories
- **mermaid** - Generate flowcharts and architecture diagrams
- **oracle** - Consult AI advisor for planning and code reviews
- **Read** - Read files from filesystem (supports images)
- **read_web_page** - Read and analyze web page contents
- **Task** - Spawn independent sub-agents for complex tasks
- **todo_read** - Read current session todo list
- **todo_write** - Update and track session todos
- **undo_edit** - Revert last file edit
- **web_search** - Search the web for current information

### Managing Tools

```bash
# View available tools
amp tools show
```

**Disable specific tools** (in settings.json):

```json
{
  "amp.tools.disable": [
    "browser_navigate",
    "builtin:edit_file"
  ]
}
```

### MCP (Model Context Protocol) Servers

#### Adding Local MCP Servers

```json
{
  "amp.mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-filesystem",
        "/path/to/allowed/directory"
      ]
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest", "--headless", "--isolated"]
    },
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--read-only",
        "--project-ref=your-project-ref"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

#### Remote MCP Servers

```json
{
  "amp.mcpServers": {
    "semgrep": {
      "url": "https://mcp.semgrep.ai/mcp"
    },
    "linear": {
      "command": "npx",
      "args": ["mcp-remote", "https://mcp.linear.app/sse"]
    }
  }
}
```

#### MCP Best Practices

- [x] **Selective Tool Use:** Be selective with tools to maintain model performance
- [x] **Security Configuration:** Use read-only modes when possible
- [x] **Project-Specific Setup:** Document required MCP servers in your `AGENT.md` file
- [x] **Tool Discovery:** Use `amp tools show` to see all available tools 

---

## Real-World Use Cases & Examples

### 1. Code Analysis and Refactoring

```bash
# Complex analysis using multiple tools and piping
git log --oneline --since="3 months ago" src/ | amp -x "Analyze commit patterns and identify files with high churn rate"

# Deep security analysis with tool chaining
amp -x "Run git blame on all files in src/auth/ and src/security/, then analyze the code for potential vulnerabilities, cross-reference with recent CVE databases, and generate a security risk assessment report"

# Comprehensive refactoring analysis
find . -name "*.js" -o -name "*.ts" | head -20 | amp -x "Analyze these files for code duplication, suggest refactoring opportunities, and estimate the impact of proposed changes"

# Strategic refactoring planning with Amp Oracle
amp -x "Use Amp Oracle to create a comprehensive refactoring plan for this codebase, including architectural debt assessment, effort estimation, and risk analysis" | tee refactoring-plan.md
```

### 2. Git Workflow Enhancement

```bash
# Smart commit messages with context analysis
git diff --staged | amp -x "Generate a conventional commit message based on these changes"

# Strategic git workflow planning with Oracle
git log --graph --oneline -20 | amp -x "Use Amp Oracle to analyze this git history and create a comprehensive branching strategy optimization plan"

# Parallel git analysis with subagents
amp -x "Spawn subagents to: 1) identify merge conflict patterns, 2) suggest branch naming conventions, 3) recommend automated workflow improvements" | amp -x "Create integrated git workflow improvement strategy"

# Complex release preparation with multi-stage pipeline
git diff HEAD~10..HEAD --name-only | amp -x "Analyze changed files for this release" | amp -x "Spawn subagents to: validate changelog completeness, check for breaking changes, and generate release notes"

# Intelligent commit analysis and team insights
git log --since="1 month ago" --pretty=format:"%h %an %s" | amp -x "Analyze commit patterns by author, spawn subagents to: 1) identify code review bottlenecks, 2) suggest mentoring opportunities, 3) recommend process improvements" | tee team-insights.md
```

### 3. Build and Test Automation

```bash
# Fix build errors with intelligent debugging
npm run build 2>&1 | amp -x "Parse these build errors and fix all TypeScript issues"

# Strategic CI/CD planning with Oracle
npm run test -- --reporter=json | amp -x "Use Amp Oracle to analyze test results and create a comprehensive test improvement strategy"

# Parallel CI/CD analysis with subagents
amp -x "Spawn subagents to: 1) identify flaky tests, 2) suggest performance optimizations, 3) recommend test coverage improvements"

# Multi-environment validation pipeline
for env in dev staging prod; do echo "Environment: $env"; cat "config/$env.json"; done | amp -x "Analyze environment configurations, spawn subagents to validate: 1) security settings consistency, 2) performance parameter optimization, 3) feature flag alignment" | amp -x "Generate environment-specific deployment recommendations"
```

### 4. Database Operations

```bash
# Schema analysis with intelligent recommendations
amp -x "Using MCP database tools and staging environment settings from AGENT.md, connect to the database and analyze the user table schema for potential optimizations"

# Complex data migration planning with risk assessment
pg_dump --schema-only database_name | amp -x "Analyze this schema and spawn subagents to: 1) plan data migration strategy, 2) identify potential data integrity issues, 3) estimate downtime requirements" | amp -x "Create detailed migration runbook with rollback procedures"

# Multi-database performance analysis
for db in users products orders; do echo "=== $db Database ===" && psql -d $db -c "\dt+"; done | amp -x "Use Amp Oracle to analyze database schemas across services and create optimization strategy covering: 1) data duplication patterns, 2) microservice boundary optimizations, 3) caching strategies"
```

### 5. Documentation Generation

```bash
# API documentation with comprehensive analysis
amp -x "Analyze all Express routes in src/routes/ and generate OpenAPI documentation"

# Strategic documentation planning with Oracle
find . -name "*.md" -o -name "*.js" -o -name "*.ts" | grep -E "(README|docs|comments)" | amp -x "Use Amp Oracle to assess documentation completeness and create comprehensive improvement strategy"

# Intelligent documentation pipeline with auto-generation
git log --oneline --since="1 week ago" | amp -x "Analyze recent changes and spawn subagents to: 1) identify undocumented features, 2) generate changelog entries, 3) update API documentation, 4) validate documentation accuracy" | amp -x "Orchestrate documentation updates and create PR"

# Cross-repository documentation analysis
for repo in frontend backend mobile; do echo "=== $repo ===" && find $repo -name "README.md" -exec cat {} \;; done | amp -x "Analyze documentation across repositories, spawn subagents to: 1) ensure consistency in setup instructions, 2) identify gaps in cross-service documentation, 3) recommend unified documentation strategy"
```

### 6. Security and Code Quality

```bash
# Security audit with intelligent vulnerability assessment
amp -x "Scan for potential security vulnerabilities in our authentication code"

# Strategic security planning with Oracle
npm audit --json | amp -x "Use Amp Oracle to create comprehensive security improvement strategy with prioritized action plan"

# Continuous security monitoring with intelligent alerts
git diff HEAD~1 --name-only | amp -x "Analyze changed files for security implications, spawn subagents to: 1) validate secure coding practices, 2) check for credential leaks, 3) assess potential attack vectors" | amp -x "Generate security review summary and action items"
```

### 7. Batch File Operations

```bash
# Content processing with intelligent pattern recognition
cat *.log | amp -x "Analyze these logs for error patterns and create a summary report"

# Strategic log analysis planning with Oracle
find . -name "*.log" -mtime -7 | amp -x "Use Amp Oracle to create comprehensive log analysis strategy including pattern recognition, alerting, and monitoring improvements"

# Intelligent file organization with automated cleanup
find . -type f -size +100M | amp -x "Analyze large files and spawn subagents to: 1) identify archival candidates, 2) suggest compression opportunities, 3) validate file dependencies before cleanup" | amp -x "Create automated cleanup script with safety checks"
```

### 8. Development Environment Debugging

```bash
# Dependency analysis with conflict resolution
amp -x "Analyze package.json and package-lock.json to identify version conflicts"

# Strategic environment planning with Oracle
amp -x "Use Amp Oracle to diagnose development environment issues and create comprehensive optimization strategy"
```

---

## Troubleshooting

### Common Issues

#### Authentication Issues

```bash
amp logout
amp login
```

#### Thread context is full

```bash
amp threads compact [threadId]
```

#### Command Permission Denied

> [!WARNING]
> Add commands to your allowlist or use `--dangerously-allow-all` (use with caution)

#### MCP Troubleshooting

- **Server not starting:** Test directly with `npx @modelcontextprotocol/server-filesystem /path/to/dir`
- **Tools not available:** Check that Amp can access config files and they are in the correct place (`~/.config/amp/settings.json`). If using alternative config location, check that the correct path is set in `AMP_SETTINGS_FILE` environment variable
- **Permission errors:** Check file paths, API tokens, and command allowlisting

### Get Support

```bash
amp doctor  # Generate support bundle
```
