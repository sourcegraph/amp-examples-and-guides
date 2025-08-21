# GitHub Code Review Bot with Amp

Automated pull request reviews using GitHub Actions and Amp CLI to analyze code diffs and provide inline comments.

**Stack:** GitHub Actions, Node.js, GitHub API  
**Thread:** [GitHub Review Bot Example](https://github.com/Isuru-F/demo-latest-audiobooks/pull/82)

## Amp Prompt

The bot analyzes PR diffs with a structured prompt:

```bash
amp -x "Analyze this diff for security vulnerabilities, performance issues, code quality problems, and missing tests. Format response with severity levels and specific file/line references."
```

## Result

- Automated inline comments on pull requests
- Categorized feedback by severity (🔴 HIGH, 🟡 MEDIUM, 🟢 LOW)
- Auto-cleanup of previous bot reviews
- Only comments on changed lines in the PR

## Try it locally

### 1. Add the Workflow File

Create `.github/workflows/amp-review-bot.yml` in your repository with the provided workflow configuration.

### 2. Configure GitHub Secrets

Add these secrets in your repository settings:

- **`AMP_API_KEY`** - Your Amp API key from Sourcegraph
- **`AMP_REVIEW_GH_TOKEN`** - GitHub Personal Access Token with permissions:
  - `contents: read`
  - `pull-requests: write`

### 3. Customize Review Focus

Edit the workflow prompt to focus on specific areas:

```yaml
- Missing or insufficient unit tests
- Security vulnerabilities  
- Performance issues
- Code quality problems
- Architecture concerns
```

### Requirements

- Node.js 22+
- Valid Amp API key
- GitHub repository with Actions enabled
- GitHub token with proper permissions
