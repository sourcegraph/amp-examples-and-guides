# SonarQube Fix Implementation Prompt Template

## Template Usage
Replace the placeholders below with your specific values:

- `{PLAN_FOLDER}`: Path to the amp-sonarqube-processor folder with progress files
- `{REPO_LOCATION}`: Full path to your repository


## Prompt Template

```markdown
Implement SonarQube issue fixes from plan folder {PLAN_FOLDER} in repository {REPO_LOCATION}.

**Project Details:**
- Plan Folder: {PLAN_FOLDER}
- Repository: {REPO_LOCATION}
- Base Branch: {BASE_BRANCH}
- SonarQube URL: {SONARQUBE_URL}
- SonarQube Project: {SONARQUBE_PROJECT_KEY}

**Implementation Workflow:**
For each NOT-STARTED progress file in {PLAN_FOLDER}:

Run through the following steps for each NOT-STARTED progress file in {PLAN_FOLDER} sequentally. Do not use git worktrees.  

0. **Preparation**
   - Update the progress file status from NOT-STARTED to IN-PROGRESS


1. **Branch Creation**
   - Extract issue key from filename (e.g., NOT-STARTED-{ISSUE_KEY}-progress.md)
   - Create new branch: `fix/sonar-{ISSUE_KEY}`
   - Switch to the new branch

2. **Pre-Fix Validation**
   - Run build command to ensure clean starting state
   - Run test suite to verify current functionality
   - Document any existing test failures

3. **Issue Resolution**
   - Follow the step-by-step resolution plan from the progress file
   - Apply the fix according to the implementation steps
   - Update the progress file status from NOT-STARTED to IN-PROGRESS

4. **Post-Fix Validation**
   - Run build command to verify fix doesn't break compilation
   - Run full test suite to ensure no regressions
   - Run any additional verification steps from the progress file

5. **Pull Request Creation**
   - Commit changes with descriptive message referencing issue key
   - Push branch to origin
   - Use `gh pr create --body-file pr-description.md` to create PR with detailed description

6. Cleanup
   - Update progress filename status from IN-PROGRESS to COMPLETED
   - If the plan had issues or is blocked, update the status to BLOCKED in the filename, include why the project is blocked in the plan markdown file.
   - Update of the progress within the plan markdown file
   

   
   

**PR Description Template:**
Create a temporary `pr-description.md` file for each PR with:

```markdown
## SonarQube Issue Fix: {ISSUE_KEY}

### Issue Details
- **SonarQube Link**: {SONARQUBE_URL}/project/issues?id={SONARQUBE_PROJECT_KEY}&issues={ISSUE_KEY}
- **Issue Type**: [Bug/Code Smell/Vulnerability/Security Hotspot]
- **Severity**: [Critical/Major/Minor/Info]
- **File(s) Affected**: [List of files]

### Problem Description
[Brief description of the issue and why it needed fixing]

### Solution Implemented
[Description of the fix applied]

### Technical Notes
[Implementation details for developers]

### Testing
- [ ] Build passes
- [ ] All existing tests pass
- [ ] New tests added (if applicable)
- [ ] Manual testing completed

### SonarQube Verification
- [ ] Issue resolved in SonarQube after merge
- [ ] No new issues introduced


```

**Commands to Execute:**
1. `cd {REPO_LOCATION}`
2. `git checkout {BASE_BRANCH}`
3. `git pull origin {BASE_BRANCH}`
4. For each issue: `git checkout -b fix/sonar-{ISSUE_KEY}`
5. [Apply fix]
6. `git add .`
7. `git commit -m "fix: resolve SonarQube issue {ISSUE_KEY}"`
8. `git push origin fix/sonar-{ISSUE_KEY}`
9. `gh pr create --title "Fix SonarQube Issue {ISSUE_KEY}" --body-file pr-description.md`

**Progress Tracking:**
- Update progress file status: NOT-STARTED → IN-PROGRESS → COMPLETED
- Mark implementation steps as completed in the progress file
- Record PR number in the progress file once created

Process each issue systematically, ensuring thorough testing and comprehensive PR documentation.
```text

## Example Usage

```markdown
Implement SonarQube issue fixes from plan folder ./amp-sonarqube-processor in repository /Users/dev/my-project.

**Project Details:**
- Plan Folder: ./amp-sonarqube-processor
- Repository: /Users/dev/my-project
- Base Branch: main
- SonarQube URL: <https://sonarqube.company.com>
- SonarQube Project: my-app-frontend

**Implementation Workflow:**
For each NOT-STARTED progress file in ./amp-sonarqube-processor:

1. **Branch Creation**
   - Extract issue key from filename (e.g., NOT-STARTED-AX123-progress.md)
   - Create new branch: `fix/sonar-AX123`
   - Switch to the new branch
...
```
