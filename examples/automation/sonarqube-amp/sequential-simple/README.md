# Sequential SonarQube Issue Processor

## Simple, beginner-friendly approach for processing SonarQube issues one at a time

This implementation uses a two-step prompt-based approach to process SonarQube issues sequentially, making it ideal for learning the automation workflow or handling smaller batches of issues with full control and visibility.

## Overview

This sequential approach breaks the automation into two clear steps:

1. **Step 1: Analysis & Planning** - Fetch issues from SonarQube and create execution plans
2. **Step 2: Sequential Execution** - Process each issue according to the plan, one at a time

## When to Use This Approach

**Perfect for:**
- Learning SonarQube automation workflows
- Processing fewer than 10 issues
- Systems with limited resources
- Situations requiring careful review before execution
- Users who want full visibility into each step
- Manual oversight and control over the process

**Advantages:**
- Simple to understand and debug
- Full visibility into planning before execution
- Manual review points between steps
- Easy error recovery and intervention
- Clear progress tracking
- No complex git worktree management

## Prerequisites

- **Amp CLI**: `npm install -g @sourcegraph/amp`
- **GitHub CLI**: `gh auth login` 
- **Git**: Standard git installation with configured user
- **SonarQube MCP**: Configured in your Amp settings for fetching issues

## Step 1: Issue Analysis & Planning

### Step 1 Overview

The first step fetches SonarQube issues and creates detailed execution plans for each issue, including analysis of the code problems and step-by-step fix instructions.

### How to Execute

Execute this from the **parent directory** where your repositories already exist:

```bash
# Navigate to your workspace directory (where repos are located) 

#copy the step_1_sonarqube-analysis-prompt-template.md file [from the sequential-simple folder] to the parent directory
cd /path/to/parent-dir-above-your-target-repo 

# launch Amp
amp

# use this prompt referencing the template and fill in your variables 
using @sonarqube-issue-processor-prompt-template.md generate a plan to fix the issues
┃
┃ REPO_LOCATION = ./demo-latest-audiobooks
┃ BASE_BRANCH = main
┃ SONARQUBE_PROJECT_KEY = Isuru-F_demo-latest-audiobooks
```

Example thread <https://ampcode.com/threads/T-b199e3db-3261-4e4d-bb7c-db7951799366?q=sonarqube>


**Template Reference**: [`step_1_sonarqube-analysis-prompt-template.md`](./step_1_sonarqube-analysis-prompt-template.md)

**Example Thread**: [View Step 1 Analysis Example →](LINK_TO_STEP_1_THREAD)

### Output Files

After Step 1 completes, you'll have:
- Individual analysis files for each SonarQube issue
- Detailed execution plans with specific steps
- Repository and file location information
- Priority and complexity assessments

## Step 2: Fix Implementation & Execution

### Step 2 Overview

The second step takes the plans created in Step 1 and sequentially executes them, processing one issue at a time with full testing and PR creation.

### Step 2 Execution

Execute this from the same directory after Step 1 completes:

```bash
# Run Step 2 sequential execution
amp -x "Use the SonarQube fix implementation template to sequentially process all planned issues. Follow the step_2_sonarqube-fix-implementation-prompt-template.md template."
```

### Example Execution

```bash
# Execute the planned fixes
amp -x "Use the SonarQube fix implementation template to sequentially process all planned issues from Step 1. Follow the step_2_sonarqube-fix-implementation-prompt-template.md template and process issues one by one."
```

**Template Reference**: [`step_2_sonarqube-fix-implementation-prompt-template.md`](./step_2_sonarqube-fix-implementation-prompt-template.md)

**Example Thread**: [View Step 2 Execution Example →](LINK_TO_STEP_2_THREAD)

### What Happens During Execution

For each issue, Step 2 will:
1. Navigate to the correct repository
2. Create a new branch for the fix
3. Implement the planned solution
4. Build and test the code
5. Commit changes with descriptive messages
6. Create a pull request via GitHub CLI
7. Update progress tracking
8. Move to the next issue

## Complete Workflow Example

Here's a complete example of using both steps:

```bash
# 1. Navigate to your workspace (where repos exist)
cd ~/my-workspace

# 2. Run Step 1: Analysis & Planning
amp -x "Use the SonarQube issue analysis template to fetch issues from organization 'my-sonarqube-org' and create execution plans. Follow the step_1_sonarqube-analysis-prompt-template.md template."

# 3. Review the generated plans (optional but recommended)
ls -la sonar-issue-*.md

# 4. Run Step 2: Sequential Execution  
amp -x "Use the SonarQube fix implementation template to sequentially process all planned issues from Step 1. Follow the step_2_sonarqube-fix-implementation-prompt-template.md template."
```

## File Structure After Execution

```text
your-workspace/
├── repo-1/                     # Your existing repositories
├── amp-sonarqube-processor
    ├── repo-1
        ├── NOT_STARTED-sonar-issue-ABC123.md       # Generated analysis files
        ├── NOT_STARTED-sonar-issue-DEF456.md
        ├── COMPLETED-sonar-execution-log.md      # Overall progress tracking
```

## Monitoring Progress

Both steps provide detailed logging and progress tracking:

- **Step 1**: Creates analysis files you can review before execution
- **Step 2**: Updates progress in real-time, moves completed issues to `sonar-completed/`
- **Error Handling**: Clear error messages with recovery instructions
- **PR Links**: All created PRs are tracked in `sonar-completed/pr-links.md`

## Error Recovery

If Step 2 encounters issues:

1. **Review the logs** in the generated files
2. **Fix any blocking issues** manually if needed
3. **Re-run Step 2** - it will skip already completed issues
4. **Continue from where it left off**

## Advantages Over Parallel Approach

- **Manual Review Points**: Inspect plans before execution
- **Easy local Debugging**: Debug locally if needed, using your preferred tools that you already use
- **Intervention Possible**: Stop and resume at any point
- **Learning Friendly**: See exactly what happens at each step
- **Resource Efficient**: No concurrent processing overhead
- **Controlled Execution**: Full visibility and control over each step


## Getting Help

1. **Review Template Files**: Check the referenced template files for detailed instructions
2. **Check Example Threads**: Follow the linked example executions
3. **Monitor Output Files**: Review generated analysis and log files
4. **Start Small**: Try with a single repository first

## Next Steps

1. Ensure your repositories are already cloned in your workspace
2. Configure SonarQube MCP in your Amp settings
3. Run Step 1 to analyze and plan
4. Review the generated plans
5. Run Step 2 to execute sequentially
