# Amp Examples and Guides

## How to use this resource library

This repository is intended to be supplemental to the [Amp Manual](https://ampcode.com/manual).

## [Guides](./guides/)

Guides are intended to provide high-level guidance on using Amp with various development workflows and patterns. They shouldn't focus specifically on any given language or framework and should apply to workflows regardless of tools, languages, or frameworks in use.

### Development Workflow Guides

|Guide|Description|
|:---|:---|
|[Agent File](guides/agent-file/README.md)|Using AGENT.md files to provide Amp with codebase structure, build/test commands, and conventions|
|[Command Piping](guides/command-piping/README.md)|Using the output of other commands to provide input to an Amp prompt|
|[Context Management](guides/context-management/Context%20Engineering%20-%20Amp.md)|High-level guidance on context engineering for agentic AI workflows|
|[Code Migrations](guides/code-migrations/)|Methodologies for migrations and upgrades using AI-guided planning|
|[Documentation Workflows](guides/documentation/README.md)|Strategic approaches to documentation generation and maintenance|
|[MCP Setup](guides/mcp/amp-mcp-setup-guide.md)|General workflow guidance for Model Context Protocol integration|
|[Day 0 Operations](guides/day-0/README.md)|Initial project setup and onboarding workflows|
|[CLI Guide](guides/cli/README.md)|Complete guide to using Amp from the command line|
|[Tips & Tricks](guides/tips/README.md)|Community-contributed tips and power-user insights|

### SDLC Phase-Specific Guides

The following guides are organized by software development lifecycle phases to help you leverage Amp
effectively throughout your development process:

#### PLAN Phase
**[Planning Guide](guides/plan/README.md)** - Analyse, explore, and strategize your development approach
with intelligent codebase understanding
- Codebase Exploration & Understanding  
- Search & Contextual Analysis Across Codebase
- Git History Exploration & Feature Evolution
- Learning and Discovery
- Feature Implementation Planning

#### BUILD Phase  
**[Building Guide](guides/build/README.md)** - Implement, refactor, and enhance your code with AI-assisted development and testing
- Code Analysis and Refactoring
- UI Iteration with Visual Feedback  
- MCP Integration
- IDE Completions and Context-Aware Development
- Automated Refactoring & Standards Enforcement
- End-to-End Test Generation
- Automate Debugging Loops
- From Bug Report to Draft PR

#### DEPLOY Phase
**[Deployment Guide](guides/deploy/README.md)** - Streamline your deployment pipeline with automated workflows and quality gates
- Git Workflow Enhancement
- Build and Test Automation  
- Automated Pull Request Generation
- End-to-End Development Workflows
- Database Operations

#### SUPPORT Phase
**[Support Guide](guides/support/README.md)** - Maintain, secure, and collaborate on your deployed applications
with ongoing optimisation  
- Documentation Generation
- Security and Code Quality
- Batch File Operations
- Development Environment Debugging
- Review & Cleanup Changes  
- Thread History & Contextual Documentation
- Team Knowledge Sharing & Collaboration
- Cross-Platform Thread Sharing

## [Examples](./examples/)

Examples are intended to address specific use-cases with languages, frameworks, or tools. Examples should be concise, focused, and should always contain a Thread link to provide additional context on how Amp solved an example use-case.

|Example|Description|
|:---|:---|
|[Amp + Code Search](examples/amp+codesearch/README.md)|Utilizing Sourcegraph code search to make targeted changes across multiple repositories|
|[Multi-root Workspaces](examples/multi-root-workspaces/README.md)|Working with multiple projects in a single workspace|
|[OpenAPI Spec Generation](examples/openapi-spec-generation/README.md)|Generating and maintaining OpenAPI specifications|
|[GitHub Review Bot](examples/automation/github-review-bot/README.md)|Automated code review bot using GitHub Actions and Amp CLI|
|[GitLab Review Bot](examples/automation/gitlab-review-bot/README.md)|Automated merge request reviews with GitLab CI and Amp|
|[JetBrains IDE Setup](examples/ide/jetbrains/jetbrains-amp-cli-setup.md)|Setting up Amp with JetBrains IDEs for enhanced context|
|[SonarQube Automation](examples/automation/sonarqube-amp/README.md)|Automated SonarQube issue processing and PR creation|

## Repository Layout

Below is a general example of how content should be organized within the repository.

```text
.
├── examples
│   └── amp+codesearch
│       └── README.md
├── guides
│   └── command-piping
│       └── README.md
└── README.md
```

