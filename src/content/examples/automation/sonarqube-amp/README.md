---
title: "SonarQube Issue Automation with Amp"
description: "Automatically process SonarQube issues by fetching them from your organization, analyzing code, and creating pull requests with AI-powered fixes."
tags: ["automation", "sonarqube", "code-quality", "pull-request", "ci-cd", "git", "static-analysis"]
order: 5
---

# SonarQube Issue Automation with Amp

Automatically process SonarQube issues by fetching them from your organization, analyzing code, and creating pull 
requests with AI-powered fixes.

**Stack:** SonarQube API, Amp CLI, GitHub CLI, Git  
**Thread:** TODO

## Amp Prompt

```bash
amp -x "Process SonarQube issues: fetch from organization, analyze code, fix issues, and create pull requests with descriptive titles and commit messages"
```

## Result

- Automated issue processing from SonarQube organizations
- AI-powered code fixes for identified problems
- Auto-generated pull requests with proper descriptions
- Support for parallel processing (advanced) or sequential processing (simple)

## Try it locally

We provide two implementation strategies:

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

#### Use Parallel Worktree for

- High-volume processing (20+ issues)
- When you have sufficient disk space and resources
- Production automation environments

#### Use Sequential Simple for

- Learning and first-time setup
- Smaller scale processing (less than 10 issues)  
- Limited system resources
- Easier debugging and monitoring

## Implementation Options

### Parallel Worktree (Advanced)

[Get Started with Parallel Worktree →](./parallel-worktree/)

- Processes multiple issues concurrently using git worktrees
- Maximum efficiency for large-scale automation
- Advanced git operations and concurrent processing
- Comprehensive progress tracking and monitoring

### Sequential Simple (Recommended for beginners)

[Get Started with Sequential Simple →](./sequential-simple/)

- Processes issues one at a time with simple branch switching
- Easier to understand, debug, and monitor
- Lower resource requirements
- Straightforward error handling and recovery

### Prerequisites

| Tool | Installation |
|------|-------------|
| **Amp CLI** | `npm install -g @sourcegraph/amp` |
| **GitHub CLI** | `gh auth login` |
| **Git** | System package manager |
| **SonarQube MCP** | Follow [setup guide](https://github.com/SonarSource/sonarqube-mcp-server) |

Choose your preferred approach above and follow the specific implementation guide.
