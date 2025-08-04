# SonarQube Issue Automation with Amp

Automatically process SonarQube issues by fetching them from your organization, analyzing problematic code, and creating pull requests with AI-powered fixes.

## Overview

Both approaches follow the same core workflow:

1. **Fetch issues** from SonarQube organization using MCP tools
2. **Auto-clone repositories** that don't exist locally  
3. **Analyze and fix** issues using Amp CLI with AI assistance
4. **Create pull requests** via GitHub CLI with descriptive titles and descriptions

## Choose Your Approach

We provide two different implementation strategies, each optimized for different scenarios:

### Approach Comparison

| Feature | Parallel Worktree | Sequential Simple |
|---------|------------------|-------------------|
| **Processing** | Concurrent (3+ issues at once) | One issue at a time |
| **Git Strategy** | Git worktrees (isolated workspaces) | Branch switching |
| **Complexity** | Advanced | Beginner-friendly |
| **Speed** | Fast for many issues | Slower but reliable |
| **Resource Usage** | Higher (disk space and memory) | Lower |
| **Debugging** | Complex (multiple concurrent logs) | Simple (linear logs) |
| **System Requirements** | More disk space, git worktree support | Standard git setup |

### Decision Guide

**Use Parallel Worktree when:**
- Processing 20+ issues across multiple repositories
- You have sufficient disk space and memory available
- You can clone, init, build and test your project via the CLI. Instructions should be in the readme so Amp can figure it out.
- Comfortable with advanced git concepts and debugging concurrent processes
- Need maximum throughput for large-scale issue processing

**Use Sequential Simple when:**
- New to automation or git worktrees
- Processing fewer issues (less than 10)
- It's hard to get your project up and running after cloning, or it takes a long time. You have the repo setup running locally already.
- Limited system resources or disk space
- Want easier debugging and monitoring
- Need guaranteed sequential processing
- Prefer simpler, more predictable behavior

### Recommendations

- **First-time users**: Start with Sequential Simple to understand the workflow
- **Production environments**: Use Parallel Worktree for efficiency with proper monitoring
- **Mixed scenarios**: Use Sequential Simple for critical issues, Parallel Worktree for bulk processing

## Implementation Options

### Parallel Worktree (Advanced)

**Best for: High-volume processing, experienced users**

[Get Started with Parallel Worktree →](./parallel-worktree/)

- Processes multiple issues concurrently using git worktrees
- Maximum efficiency for large-scale automation
- Advanced git operations and concurrent processing
- Comprehensive progress tracking and monitoring

### Sequential Simple (Recommended for beginners)

**Best for: Learning, small-scale processing, reliability**

[Get Started with Sequential Simple →](./sequential-simple/)

- Processes issues one at a time with simple branch switching
- Easier to understand, debug, and monitor
- Lower resource requirements
- Straightforward error handling and recovery

## Prerequisites

Both approaches require the same prerequisites:

| Tool | Purpose | Installation | Authentication |
|------|---------|--------------|----------------|
| **Amp CLI** | AI code analysis and fixing | `npm install -g @sourcegraph/amp` | Built-in authentication |
| **GitHub CLI** | Creating pull requests | `gh auth login` | `gh auth login` |
| **Git** | Repository operations | System package manager | `git config` user setup |
| **Node.js** | Running TypeScript | nodejs.org | Not required |
| **SonarQube MCP** | Fetching issues | See MCP setup below | Token-based |

### SonarQube MCP Setup

Both scripts integrate with SonarQube through MCP (Model Context Protocol) tools:

1. **Install SonarQube MCP Server** (follow the [setup guide](https://github.com/SonarSource/sonarqube-mcp-server))
2. **Configure Amp settings.json** to include the SonarQube MCP server

If SonarQube MCP is not configured, the scripts will automatically use demo data for testing purposes.

## Getting Help

1. **Start with dry-run** - Both approaches support `--dry-run` to preview what would be processed
2. **Check the logs** - Both scripts provide detailed logging for debugging
3. **Review output files** - Progress files are created for tracking status
4. **Verify prerequisites** - Ensure all required tools are installed and authenticated
5. **Test components individually** - Test Amp CLI, GitHub CLI, and git operations separately

## Next Steps

Choose your preferred approach above and follow the specific implementation guide. Both approaches can be used together - you might use Sequential Simple for learning and critical issues, then switch to Parallel Worktree for bulk processing once comfortable with the workflow.
