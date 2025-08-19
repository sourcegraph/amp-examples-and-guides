# SonarQube Issue Processor Prompt Template

## Template Usage
Replace the placeholders below with your specific values:

- `{REPO_LOCATION}`: Full path to your repository
- `{BASE_BRANCH}`: The branch to work from (e.g., main, develop)
- `{SONARQUBE_PROJECT_KEY}`: Your SonarQube project identifier
- `{PLAN_DESCRIPTION}`: Brief description of your remediation plan

## Prompt Template

```text
Process SonarQube issues for repository at {REPO_LOCATION} on branch {BASE_BRANCH}.

**Project Details:**
- Repository: {REPO_LOCATION}
- Base Branch: {BASE_BRANCH}
- SonarQube Project: {SONARQUBE_PROJECT_KEY}
- Plan: {PLAN_DESCRIPTION}

**Tasks:**
1. Fetch all SonarQube issues for project key: {SONARQUBE_PROJECT_KEY}
2. Create directory `./amp-sonarqube-processor/{SONARQUBE_PROJECT_KEY}` in the current working directory (not in the repo location)
3. For each SonarQube issue found:
   - Create a progress file named: `NOT-STARTED-{ISSUE_KEY}-progress.md`
   - Include issue details, resolution instructions, and progress tracking steps
   - Structure each file with:
     * Issue overview and severity
     * Root cause analysis
     * Step-by-step resolution plan
     * Progress checklist
     * Acceptance criteria

**File Structure:**
./amp-sonarqube-processor/
├── NOT-STARTED-{ISSUE_KEY_1}-progress.md
├── NOT-STARTED-{ISSUE_KEY_2}-progress.md
└── NOT-STARTED-{ISSUE_KEY_N}-progress.md

**Progress File Template:**
Each progress file should follow this structure:
- **Issue Summary**: Type, severity, file location
- **Problem Description**: What the issue is and why it's problematic
- **Resolution Strategy**: High-level approach to fix
- **Implementation Steps**: Detailed action items with checkboxes
- **Testing Requirements**: How to verify the fix
- **Status Tracking**: Progress indicators and completion criteria

Process all issues systematically and create comprehensive remediation plans for effective issue resolution tracking.
```

## Example Usage

```text
Process SonarQube issues for repository at /Users/dev/my-project on branch main.

**Project Details:**
- Repository: /Users/dev/my-project
- Base Branch: main
- SonarQube Project: my-app-frontend
- Plan: Systematic remediation of all critical and high severity issues

**Tasks:**
1. Fetch all SonarQube issues for project key: my-app-frontend
2. Create directory `./amp-sonarqube-processor` in the current working directory (not in the repo location)
3. For each SonarQube issue found:
   - Create a progress file named: `NOT-STARTED-{ISSUE_KEY}-progress.md`
   - Include issue details, resolution instructions, and progress tracking steps
...
```
