---
title: "GitLab Code Review Bot with Amp"
description: "Automated code review bot that creates discussions on merge requests using Amp AI analysis."
tags: ["automation", "gitlab", "code-review", "ci-cd", "nodejs", "bot", "merge-request"]
order: 4
---

# GitLab Code Review Bot with Amp

Automated code review bot that creates discussions on merge requests using Amp AI analysis.

**Stack:** GitLab CI/CD, Node.js, GitLab API  
**Thread:** [GitLab Review Bot Example](https://gitlab.com/Isuru-F/demo-latest-audiobooks/-/merge_requests/78)

## Amp Prompt

The bot analyzes merge request diffs with a structured prompt:

```bash
amp -x "Analyze this diff for security vulnerabilities, performance issues, code quality problems, and missing tests. Format response with severity levels and specific file/line references."
```

## Result

- Automated inline discussions on merge requests
- Categorized feedback by severity (🔴 HIGH, 🟡 MEDIUM, 🟢 LOW)
- Auto-cleanup of previous bot discussions
- Only comments on changed lines in the MR

## Try it locally

### 1. Add the CI Configuration

Add `.gitlab-ci.yml` in your repository with the provided configuration.

### 2. Add the Discussion Script

Add `create_gitlab_discussions.js` to your repository - this script handles parsing Amp output and creating GitLab discussions.

### 3. Configure CI/CD Variables

Add these variables in your GitLab project's CI/CD settings:

- **`GITLAB_TOKEN`** - Personal/Project Access Token with `api` scope
- **`AMP_API_KEY`** - Your Amp API key from Sourcegraph

### 4. Customize Review Focus

Edit the prompt in your CI script to focus on specific areas:

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
- GitLab project with CI/CD enabled
- GitLab token with `api` scope permissions
