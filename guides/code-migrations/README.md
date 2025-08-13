# Code Migrations

Methodologies and strategies for migrating codebases, frameworks, and architecture using AI-guided planning and execution.

## Available Migration Guides

| Migration | Description |
|:----------|:-----------|
| [Multi-Repository Upgrade](multi-repo-upgrade/README.md) | Upgrade multiple repositories simultaneously using AI-guided planning and parallel sub-agents |
| [.NET Framework to .NET Core](dotnet48-to-dotnet8core-rebuild/README.md) | Migrate from .NET Framework 4.8 to .NET 8 Core with comprehensive rebuild strategy |

## General Migration Strategy

When planning any code migration with Amp:

1. **Analysis Phase**: Let Amp analyze the current state and identify migration requirements
2. **Planning Phase**: Generate a comprehensive migration plan with checkpoints
3. **Template Development**: Create a template by migrating one representative component first
4. **Batch Processing**: Use the template to migrate similar components across the codebase
5. **Validation**: Test and validate each migration step
6. **Review**: Use Oracle for thorough code review of migration changes

## Best Practices

- Start with a small, representative subset to establish patterns
- Use AGENT.md files to document migration-specific conventions
- Leverage sub-agents for parallel processing of independent components
- Set up validation hooks to catch common migration errors
- Document lessons learned for future migrations
