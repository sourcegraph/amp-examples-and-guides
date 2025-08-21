---
title: "Multi-Repository Upgrade with Amp"
description: "Upgrade multiple repositories simultaneously using Amp's parallel processing with AI-guided planning and execution"
category: "Migration"
order: 2
---

# Multi-Repository Upgrade with Amp

Upgrade multiple repositories simultaneously using Amp's parallel processing with AI-guided planning and execution.

## Quick Overview

![Multi-Repository Migration Flow](/images/migration-diagram.png)

**Two phases**: Plan the migration → Execute across repositories  
**Result**: Automated PRs with tested upgrades across all your repos  


## When to Use This Approach

This method works best when you have:

### **Ideal Scenarios**
- **Local Repository Access**: All target repositories are cloned locally
- **Local Build Capability**: You can compile and build projects on your machine
- **Small to Medium Scale**: Upgrading small-medium number of repositories (varies by API limits and machine resources)
- **Standard Migrations**: Framework upgrades, dependency updates, configuration changes that are well documented

### **API Limit Considerations**
- **Code Host Limits**: GitHub/GitLab API limits vary by plan and setup
- **Limited Interactions**: Only hits APIs for cloning/fetching and creating PRs
- **Retry Capability**: If you hit limits, ask Amp to retry later


### **Not Suitable For**
- Repositories you can't build locally (.NET 4 project on Mac OS host)
- Complex migrations requiring manual intervention
- Very large scale (1000s+ repositories) without enterprise API limits
- Migrations requiring external service coordination

## Your First Migration

### Step 1: Prerequisites Checklist
- [ ] Amp CLI or VS Code extension installed
- [ ] GitHub/GitLab CLI logged in with write access
- [ ] Target repositories cloned locally in one directory (you can ask Amp to do this)
- [ ] Migration documentation URL ready

### Step 2: Use the example Migration Template

Copy this template and replace the `{variables}`:

```text
Analyze all projects in this folder and create a migration plan to upgrade from {PURPOSE}

Requirements:
- Generate a detailed spec plan in {SPEC_FILENAME}.md
- Use subagents for execution
- Build and test projects before migration
- Execute the migration
- Build and test projects after migration
- Document all results

Reference: {MIGRATION_URL}

Output Requirements:
Create {PROGRESS_FILENAME}.md with:
- Build status (before/after)
- Branch name and commit messages
- Migration steps executed
- Any issues encountered including blockers
- Summary of what was changed and why

Use GitHub CLI to create a pull request
Include build verification results in PR description

Do not start the migration yet, only generate the spec plan.

Once completed ask the oracle to review your plan and adjust the spec based on the oracle's advice.
```

### Step 3: Fill in Your Variables

**Example - React Upgrade:**
```text
{PURPOSE}: React 17 to React 18
{SPEC_FILENAME}: react-18-upgrade
{PROGRESS_FILENAME}: react-migration-progress
{MIGRATION_URL}: https://react.dev/blog/2022/03/29/react-v18
```

### Step 4: Review and Execute

1. **Generate Plan**: Amp analyzes your repositories and creates migration plan
2. **AI Review**: AI reviewer validates and optimizes the plan
3. **Your Review**: Confirm the plan looks correct
4. **Execute**: Amp deploys parallel workers to upgrade each repository
5. **Monitor**: Track progress and review created PRs

## Real Example

**Migration**: [System.Data.SqlClient to Microsoft.Data.SqlClient](https://ampcode.com/threads/T-e5f31274-832a-492f-b50e-63908d25c411)

**Template Variables Used:**
```text
{PURPOSE}: System.Data.SqlClient to Microsoft.Data.SqlClient
{SPEC_FILENAME}: sqldata-migration
{PROGRESS_FILENAME}: progress
{MIGRATION_URL}: https://github.com/dotnet/SqlClient/blob/main/porting-cheat-sheet.md
```

**Result Amp Output from VS Code**: ![15 repositories upgraded with automated PRs](/images/multi-repo-upgrade-output.png)

**Sample PR**: <https://github.com/amp-example-org/bank-app-15/pull/1>

## Understanding the Process

### Phase 1: Planning
1. **Repository Analysis**: Amp scans all local repositories for current versions and dependencies
2. **Migration Plan**: Creates detailed upgrade strategy based on official documentation
3. **AI Review**: AI reviewer identifies potential issues and optimizes the approach
4. **Your Approval**: You review and confirm the plan before execution

### Phase 2: Execution  
1. **Parallel Workers**: Amp creates one worker per repository
2. **For Each Repository**:
   - Create feature branch (`feature/migrate-{framework}-{version}`)
   - Apply upgrades (dependencies, code changes, configs)
   - Run tests and builds
   - Create PR with results

### What Amp Does Automatically
- **Dependency Analysis**: Identifies which files need updating
- **Breaking Change Detection**: Reviews migration docs for potential issues  
- **Test Validation**: Runs your existing test suite to verify changes
- **Build Verification**: Ensures projects compile after migration
- **PR Creation**: Generates detailed pull requests with test results

### What You Control
- **Repository Selection**: Choose which repos to include
- **Migration Scope**: Define what gets upgraded
- **Success Criteria**: Set requirements for test coverage, build times, etc.
- **Final Approval**: Review and merge PRs when ready

## Template Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `{PURPOSE}` | What you're migrating | `"React 17 to React 18"` |
| `{SPEC_FILENAME}` | Name for plan file | `"react-18-upgrade"` |
| `{PROGRESS_FILENAME}` | Name for progress file | `"migration-progress"` |
| `{MIGRATION_URL}` | Official documentation | `"https://react.dev/blog/..."` |


## Advanced Usage

<details>
<summary>Custom Success Criteria</summary>

Add specific requirements to your template:
```text
Success criteria:
- All tests pass with same coverage (±2%)
- Build time increases no more than 20%
- No new linting errors introduced
- Performance tests within 5% of baseline
```
</details>


<details>
<summary>Custom Branch Strategy</summary>

Modify branch naming and strategy:
```text
Git strategy:
- Branch name: feature/react-18-{date}
- Base branch: develop (not main)
- PR target: staging branch for review
```
</details>

## Best Practices

### Before Starting
- Test the migration on one repository manually first
- Ensure all repositories build successfully locally
- Start with smaller, less critical repositories before you scale it out


### After Migration
- Review all PRs before merging
- Run integration tests across updated repositories
- Plan follow-up for any blocked repositories

