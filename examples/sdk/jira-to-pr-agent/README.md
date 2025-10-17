# Amp SDK JIRA Automation Agent

An automated workflow agent that takes a JIRA ticket, clones the repository, creates a worktree, implements the ticket, and creates a pull request.

## Workflow

This agent automates the complete development workflow:

1. **Fetch JIRA Ticket** - Retrieves ticket details using custom JIRA toolbox tools
2. **Clone Repository** - Clones the mapped repository into `./repos` if not already present
3. **Create Worktree** - Creates a git worktree with branch name `{TICKET}-{TIMESTAMP}`
4. **Implement Solution** - Uses AI to implement the JIRA ticket requirements
5. **Commit Changes** - Commits with meaningful message referencing the ticket
6. **Push Branch** - Pushes the new branch to remote
7. **Create PR** - Opens a pull request with title and description from JIRA issue

## Prerequisites

### Required Tools (must be installed)
- **Git** - Version control
- **GitHub CLI (`gh`)** - For repository operations and PR creation
- **Node.js** - Runtime environment
- **pnpm/npm** - Package manager

### Custom Toolbox Tools
- **jira_tool** - Custom MCP tool for accessing JIRA tickets

## Configuration

### JIRA Credentials

1. Copy [sample.jira.env](sample.jira.env) and populate your JIRA credentials:
   - `JIRA_BASE_URL` - Your JIRA instance URL (e.g., https://yourcompany.atlassian.net)
   - `JIRA_EMAIL` - Your JIRA email address
   - `JIRA_API_TOKEN` - Generate from https://id.atlassian.com/manage-profile/security/api-tokens

2. Rename the file to `jira.env` to enable the `jira_tool`

### JIRA to Repository Mapping

Edit the `JIRA_TO_REPO` mapping in [execute-agent.ts](execute-agent.ts) to map JIRA board prefixes to repository URLs:

```typescript
const JIRA_TO_REPO: Record<string, string> = {
    'KAN': 'https://github.com/Isuru-F/demo-latest-audiobooks/',
    // Add more mappings as needed
}
```

## Usage

Run the agent with a JIRA ticket number:

```bash
npx tsx ./execute-agent.ts KAN-1
```

The agent will show output as it executes each step of the workflow.

## Example Output

```
Processing JIRA ticket: KAN-1
Repository: https://github.com/Isuru-F/demo-latest-audiobooks/
Branch name: KAN-1-2025-10-09T14-30-45
Started thread: T-xxxxx view at https://www.ampcode.com/threads/T-xxxxx
[Agent execution steps...]
Execution completed successfully
```

## How It Works

The agent uses the [Amp SDK](https://ampcode.com) to orchestrate the workflow. It:
- Leverages existing system tools (git, gh CLI)
- Integrates custom MCP toolbox tools (JIRA integration)
- Streams execution progress in real-time
- Provides thread URLs for monitoring in Amp

## Project Structure

```
.
├── execute-agent.ts    # Main agent implementation
├── repos/              # Cloned repositories and worktrees
├── toolbox/            # Custom MCP tools (e.g., JIRA)
└── package.json        # Dependencies
```
