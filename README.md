# Field Engineering: Amp Examples and Guides

## How to use this resource library

This repository is intended to be supplemental to the [Amp Manual](https://ampcode.com/manual).

## Guides

Guides are intended to be provide high-level guidance on using Amp with specific workflows and development patterns.

## Examples

Examples are intended to be used to address specific use-cases with languages, frameworks, or tools.

## Repository Layout

The repository is organized in such a way as to allow easy access to guides and examples for specific languages, frameworks, workflows, etc.

Below is a general example of how content should be organized within the repository.

```
 .
├──  AGENT.md_Examples
│   ├──  AGENT.md
│   ├──  AGENT.md-AmpPersonas
│   └── 󰂺 README.md
├──  examples
│   ├──  amp+codesearch
│   ├──  code-search-amp-x.md
│   └──  multi-root-workspaces
├──  guides
│   ├──  AGENT.md_Best_Practices.md
│   ├──  amp-context.png
│   ├──  amp-mcp-setup-guide.md
│   ├──  amp-x
│   ├──  'Common Use Cases & Workflows.md'
│   ├──  'Context Engineering - Amp.md'
│   ├──  github-code-review-bot
│   ├──  gitlab-code-review-bot
│   ├──  jetbrains-amp-cli-setup.md
│   └──  migrations
├──  images
│   ├──  amp-cli-terminal-startup.png
│   ├──  amp-integration-testing-example.png
│   ├──  amp-mcp-server-configuration.png
│   ├──  amp-mcp-tool-access.png
│   ├──  amp-mcp-vscode-settings.png
│   ├──  'CleanShot 2025-07-16 at 15.54.37@2x.png'
│   ├──  jetbrains-mcp-server-plugin-installation.png
│   ├──  jetbrains-terminal-settings.png
│   ├──  migration-diagram.png
│   └──  multi-repo-upgrade-output.png
```

---

### Setup

- [JetBrains + Amp CLI Setup](guides/jetbrains-amp-cli-setup.md) - Give Amp context and awareness about which file is open or text selection in JetBrains IDEs
- [Amp MCP Setup Guide](guides/amp-mcp-setup-guide.md) - Give Amp access to the tools you already use via MCP servers. Example configs for Playwright, Lighthouse, Linear, and Atlassian tools

### Code Review

- [Amp GitHub Code Review Bot](guides/github-code-review-bot/README.md) - GitHub workflow action to review code changes with Amp and provide feedback inline as comments
- [GitLab Code Review Bot](guides/gitlab-code-review-bot/README.md) - GitLab CI/CD job to review code changes with Amp and provide feedback inline as comments

### Migrations

- [Multi-Repository Upgrade with Amp](guides/migrations/multi-repo-upgrade/README.md) - Plan and execute upgrades across multiple repositories simultaneously using AI-guided planning and parallel sub-agents

