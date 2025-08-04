# Parallel Worktree SonarQube Processor

**Advanced, high-performance approach for concurrent issue processing**

This implementation uses git worktrees to process multiple SonarQube issues concurrently, providing maximum efficiency for large-scale automation.

## How It Works

1. **Fetches issues** from SonarQube organization using MCP tools
2. **Auto-clones repositories** that don't exist locally  
3. **Creates git worktrees** for isolated issue processing
4. **Processes multiple issues concurrently** (configurable, default: 3 per repo)
5. **Spawns Amp CLI threads** to fix issues with AI assistance
6. **Creates pull requests** via GitHub CLI

## Key Features

- **Organization-based filtering**: Only processes issues from your specified SonarQube organization
- **Multi-repo support**: Automatically clones and processes issues across multiple repositories
- **Concurrent processing**: Handles multiple issues per repository using git worktrees
- **SonarQube integration**: Fetches real issues from your SonarQube instance
- **PR automation**: Creates pull requests with proper titles and descriptions
- **Progress tracking**: Comprehensive logging and progress reporting
- **Configurable paths**: Uses environment variables for flexible deployment

## When to Use This Approach

**Perfect for:**
- Processing 10+ issues across multiple repositories
- High-volume automation scenarios
- When time efficiency is critical
- Users comfortable with advanced git concepts

**Requirements:**
- Sufficient disk space for multiple worktrees
- Adequate system memory for concurrent processing
- Familiarity with git worktrees and concurrent operations

## Download & Setup

1. **Download the script**: [`amp-sonarqube-worker.ts`](./amp-sonarqube-worker.ts)
2. **Install dependencies**: `npm install -g tsx` (for running TypeScript files)

## Quick Start

```bash
# Run the processor
npx tsx amp-sonarqube-worker.ts <your-sonar-org> --dry-run
npx tsx amp-sonarqube-worker.ts <your-sonar-org>
```

## Prerequisites

Ensure you have these tools installed and authenticated:

| Tool | Purpose | Installation | Authentication |
|------|---------|--------------|----------------|
| **Amp CLI** | AI code analysis and fixing | `npm install -g @sourcegraph/amp` | Built-in authentication |
| **GitHub CLI** | Creating pull requests | `gh auth login` | `gh auth login` |
| **Git** | Repository operations | System package manager | `git config` user setup |
| **Node.js** | Running TypeScript | nodejs.org | Not required |
| **SonarQube MCP** | Fetching issues | See MCP setup below | Token-based |

## Usage

```bash
# Process all issues from your SonarQube organization (default: 3 concurrent per repo)
npx tsx amp-sonarqube-worker.ts <sonar-org>

# Process specific projects with custom concurrency
npx tsx amp-sonarqube-worker.ts <sonar-org> "project1,project2" <max-concurrent-per-repo>

# Dry run - see what would be processed without making changes
npx tsx amp-sonarqube-worker.ts <sonar-org> --dry-run

# Show help
npx tsx amp-sonarqube-worker.ts --help

# Examples
npx tsx amp-sonarqube-worker.ts isuru-f-1
npx tsx amp-sonarqube-worker.ts isuru-f-1 "my-app,my-api" 5
npx tsx amp-sonarqube-worker.ts isuru-f-1 --dry-run
```

### Parameters

- `<sonar-org>`: **Required** - Your SonarQube organization name (e.g., "isuru-f-1")
- `"project1,project2"`: **Optional** - Comma-separated list of specific project keys to process  
- `<max-concurrent-per-repo>`: **Optional** - Maximum concurrent issues per repository (default: 3)

### Options

- `--dry-run`: Show what would be processed without making any changes
- `--help, -h`: Display help information and usage examples

### Example PR Output 
Example PRs created by this script:
![alt text](<../../../images/sonarqube-prs.png>)

Example progress files created by this script:
![alt text](<../../../images/sonarqube-progress-files.png>)

In the event a file is skipped,started,completed or blocked you can see the progress files in the `./output/` directory.
Each issue is tracked in it's own file in the `./output/` directory with the SonarQube issue key as the filename.


## Configuration

The script supports flexible configuration through the `CONFIG` object at the top of the file. Simply edit these values in `amp-sonarqube-worker.ts`:

```typescript
const CONFIG = {
	// Directory where repositories will be cloned
	baseRepoPath: join(process.cwd(), 'repos'),
	
	// Directory where progress files will be written  
	outputPath: join(process.cwd(), 'output'),
	
	// Temporary directory for git worktrees
	worktreeParentDir: tmpdir(),
	
	// Maximum number of concurrent issues to process per repository
	maxConcurrentPerRepo: 3,
	
	// Timeout for Amp CLI operations in milliseconds (5 minutes)
	ampTimeout: 300000
}
```

You can also override these settings with environment variables if needed:

| Environment Variable | Purpose | Default Value |
|---------------------|---------|---------------|
| `REPOS_DIR` | Directory where repositories are cloned | `./repos` |
| `OUTPUT_DIR` | Directory where progress files are written | `./output` |
| `WORKTREE_PARENT_DIR` | Temporary directory for git worktrees | System temp directory |
| `MAX_CONCURRENT_PER_REPO` | Maximum concurrent issues per repository | `3` |
| `AMP_TIMEOUT_MS` | Timeout for Amp CLI operations | `300000` (5 minutes) |

### File Structure & Output

```
amp-thread-processor/
├── repos/                    # Cloned repositories (configurable)
│   └── owner-repo-name/     # Individual repository folders
├── output/                   # Progress tracking (configurable)
│   └── project-name/        # Project-specific progress files
│       ├── started-SQ_ISSUE_KEY.md   # Issue processing started
│       ├── fixed-SQ_ISSUE_KEY.md     # Successfully resolved + PR created
│       ├── failed-SQ_ISSUE_KEY.md    # Failed to fix
│       ├── blocked-SQ_ISSUE_KEY.md   # Needs manual intervention
│       └── skipped-SQ_ISSUE_KEY.md   # Already has existing fix/PR
└── /tmp/worktree-*/         # Temporary git worktrees (configurable)
```

**Output Files Explained:**
- **`started-SQ_ISSUE_KEY.md`**: Created when processing begins, contains issue details and real-time progress
- **`fixed-SQ_ISSUE_KEY.md`**: Issue successfully fixed, code committed, PR created
- **`failed-SQ_ISSUE_KEY.md`**: Technical failure (Amp CLI error, git issues, etc.)
- **`blocked-SQ_ISSUE_KEY.md`**: Amp CLI requests manual intervention or human input
- **`skipped-SQ_ISSUE_KEY.md`**: Issue already has existing fix or open PR

Each file contains:
- Issue details (key, severity, message, file, line)
- Processing progress with timestamps
- Amp CLI output and actions taken
- Final status and any error messages

### SonarQube MCP Setup

The script integrates with SonarQube through MCP (Model Context Protocol) tools. To set this up:

1. **Install SonarQube MCP Server** (follow the [setup guide](https://github.com/SonarSource/sonarqube-mcp-server))

2. **Configure Amp settings.json** to include the SonarQube MCP server

**Note**: If SonarQube MCP is not configured, the script will automatically use demo data for testing purposes.

The script will then automatically:
- Fetch real projects from your SonarQube organization
- Get actual open issues from those projects  
- Extract repository information from SonarQube data
- Clone and process real repositories

### Amp CLI Integration
Each issue spawns an Amp CLI thread with a detailed prompt that:
- Analyzes the specific SonarQube issue
- Uses SonarQube MCP tools for additional context
- Locates and fixes the problematic code
- Commits changes and creates a PR via gh CLI

## Dry-Run vs Live Execution

### **Always start with a dry-run first!**

```bash
# First, see what would be processed
npx tsx amp-sonarqube-worker.ts your-org --dry-run
```

**Dry-run mode (`--dry-run`)**:
- ✅ Fetches real SonarQube issues
- ✅ Shows detailed summary of what would be processed
- ✅ Groups issues by project and repository
- ✅ Shows severity breakdown
- ❌ **No repositories cloned**
- ❌ **No files modified**
- ❌ **No PRs created**
- ❌ **No git operations performed**

**Live execution** (without `--dry-run`):
- ✅ Fetches SonarQube issues
- ✅ **Clones repositories** to `./repos/` directory
- ✅ **Creates git worktrees** for isolated processing
- ✅ **Spawns Amp CLI** to analyze and fix issues
- ✅ **Creates git branches** like `fix/sonar-<issue-key>`
- ✅ **Commits changes** with descriptive messages
- ✅ **Creates pull requests** using GitHub CLI
- ✅ **Writes progress files** to `./output/<project>/`

## Example Workflow

**Live execution steps:**
1. Script fetches SonarQube issues for specified projects
2. Groups issues by repository  
3. **Clears previous output** for each project in `./output/`
4. **Clones missing repositories** to `./repos/` directory
5. For each issue:
   - **Creates progress file**: `./output/<project>/started-<issue-key>.md`
   - **Creates git worktree** for isolation
   - **Creates new branch**: `fix/sonar-<issue-key>`
   - **Spawns Amp CLI** with detailed issue-specific prompt
   - **Amp analyzes, fixes, commits** the changes
   - **Creates pull request** via GitHub CLI
   - **Updates progress file**: renamed to `fixed-<issue-key>.md`, `failed-<issue-key>.md`, etc.
   - **Cleans up worktree**

## Architecture

- **ThreadProcessor**: Main class handling issue processing
- **SonarIssue**: Interface for issue data structure
- **RepoInfo**: Interface for repository information
- **Git worktrees**: Enable concurrent processing on same repo
- **Concurrent execution**: Limited per-repo to avoid conflicts

## Logging

Comprehensive logging includes:
- Issue fetching progress
- Repository cloning/updating status  
- Worktree creation/cleanup
- Amp CLI execution details
- PR creation results
- Summary statistics

## Error Handling

- Graceful handling of missing repositories
- Automatic worktree cleanup on failures
- Detailed error logging with context
- Process isolation prevents failures from affecting other issues

## Troubleshooting

### Common Issues

**"Amp CLI is not working properly"**
- Ensure Amp CLI is installed: `npm install -g @sourcegraph/amp`
- Test manually: `amp -x "Hello, test message"`
- Check for latest version: `npm update -g @sourcegraph/amp`

**"SonarQube MCP tools not available"**
- Verify SonarQube MCP server is installed and configured
- Check your Amp settings.json includes the SonarQube MCP configuration
- Test MCP connection: `amp -x "Use mcp__sonarqube__search_my_sonarqube_projects tool"`

**"Permission denied" or SSH errors**
- Ensure GitHub CLI is authenticated: `gh auth login`
- For private repositories, verify your GitHub token has appropriate permissions
- Check SSH keys are configured: `ssh -T git@github.com`

**"Worktree creation failed"**
- Ensure the worktree parent directory is writable
- Check disk space in the configured temp directory
- Verify git is properly installed and configured

**Process hangs or times out**
- Increase the timeout by editing `ampTimeout` in the CONFIG object
- Check network connectivity to GitHub and SonarQube
- Monitor system resources (CPU, memory, disk)

