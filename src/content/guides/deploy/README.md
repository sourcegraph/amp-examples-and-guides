# DEPLOY Phase - Streamlined Deployment & Automation

Streamline your deployment pipeline with automated workflows and quality gates.

## Overview

The DEPLOY phase focuses on getting your code from development to production safely and efficiently. This includes git workflows, automated testing, pull request generation, and deployment automation.

## Workflows

### Git Workflow Enhancement

Optimize your version control processes with intelligent commit messages and branch management.

**Example Workflow:**
> User: "Analyze our current git workflow and suggest improvements for better collaboration and release management"

**Generic Prompts:**
- "Generate a conventional commit message based on these changes"
- "Create a branching strategy that supports both hotfixes and feature development"
- "Analyze merge conflicts and suggest workflow improvements"

### Build and Test Automation

Automate your CI/CD pipeline with intelligent error handling and optimization.

**Example Workflow:**
> User: "Set up a CI/CD pipeline that runs tests, builds the application, and deploys to staging automatically on merge to develop branch"

**Generic Prompts:**
- "Fix build errors and optimize build performance"
- "Create a test automation strategy that catches regressions early"
- "Set up deployment health checks and rollback procedures"

### Automated Pull Request Generation

Convert requirements directly into review-ready pull requests.

**Example Workflow:**
> User: "Create a GitLab pull request that adds a 200ms debounce to the search input field. The debounce should reduce excessive calls while typing, improving performance and UX. Include a clear title and a concise description explaining why this change is needed and how it works."

**Generic Prompts:**
- "Implement lazy loading for images and create a PR with performance benchmarks"
- "Add dark mode support and generate PR with design system documentation"
- "Create pagination for the user table and prepare PR with API changes"

### End-to-End Development Workflows

Transform high-level requirements into production-ready code with iterative refinement.

**Example Workflow:**
> User: "Build a responsive User Profile component using [React/Tailwind CSS/etc.], which displays the user's avatar, full name, and email address. Include an 'Edit' button that allows the user to update their information. The layout should be clean and accessible, with clear separation of elements. Add placeholder data for demonstration and ensure the component is reusable."

**Generic Prompts:**
- "Create a checkout flow component with payment integration, then test it with mock data"
- "Build a dashboard widget for analytics data, include responsive design and run tests"
- "Implement OAuth login flow, handle edge cases, and prepare for deployment"

### Database Operations

Manage database schemas, migrations, and data operations safely.

**Example Workflow:**
> User: "Create a database migration that adds a new 'subscription_status' column to the users table, with appropriate indexes and data backfill strategy"

**Generic Prompts:**
- "Generate migration scripts for schema changes with rollback procedures"
- "Optimize database queries and add proper indexing"
- "Create data seeding scripts for different environments"

## CLI Examples for DEPLOY Phase

```bash
# Smart commit messages with context analysis
git diff --staged | amp -x "Generate a conventional commit message based on these changes"

# Strategic git workflow planning with Oracle
git log --graph --oneline -20 | amp -x "Use Amp Oracle to analyze this git history and create a comprehensive branching strategy optimization plan"

# Complex release preparation with multi-stage pipeline
git diff HEAD~10..HEAD --name-only | amp -x "Analyze changed files for this release" | amp -x "Spawn subagents to: validate changelog completeness, check for breaking changes, and generate release notes"

# Multi-environment validation pipeline
for env in dev staging prod; do echo "Environment: $env"; cat "config/$env.json"; done | amp -x "Analyze environment configurations, spawn subagents to validate: 1) security settings consistency, 2) performance parameter optimization, 3) feature flag alignment" | amp -x "Generate environment-specific deployment recommendations"

# Schema analysis with intelligent recommendations
amp -x "Using MCP database tools and staging environment settings from AGENT.md, connect to the database and analyze the user table schema for potential optimizations"

# Complex data migration planning with risk assessment
pg_dump --schema-only database_name | amp -x "Analyze this schema and spawn subagents to: 1) plan data migration strategy, 2) identify potential data integrity issues, 3) estimate downtime requirements" | amp -x "Create detailed migration runbook with rollback procedures"
```

## Deployment Best Practices

### Pre-Deployment Checklist
- **Code Quality**: All tests passing, linting rules satisfied
- **Security**: No secrets in code, security scans completed
- **Performance**: Load testing completed, monitoring in place
- **Documentation**: Deployment instructions, rollback procedures documented
- **Database**: Migration scripts tested, backup procedures verified

### Deployment Strategies
- **Blue-Green Deployments**: Zero-downtime deployments with instant rollback
- **Canary Deployments**: Gradual rollout to subset of users
- **Feature Flags**: Safe feature toggles for controlled releases
- **Rolling Updates**: Gradual replacement of instances

### Post-Deployment Monitoring
- **Health Checks**: Automated monitoring of application health
- **Performance Metrics**: Response times, error rates, resource usage
- **Business Metrics**: User engagement, conversion rates
- **Alert Systems**: Automated notifications for issues

## Environment Management

### Configuration Management
- **Environment Variables**: Secure handling of environment-specific settings
- **Secrets Management**: Proper storage and rotation of sensitive data
- **Feature Flags**: Dynamic configuration without deployments

### Infrastructure as Code
- **Declarative Infrastructure**: Version-controlled infrastructure definitions
- **Automated Provisioning**: Consistent environment setup
- **Resource Optimization**: Cost-effective resource allocation

## Tips for Effective Deployment

- **Automate Everything**: Reduce human error through automation
- **Test Early and Often**: Catch issues before production
- **Monitor Continuously**: Know when something goes wrong immediately
- **Plan for Failure**: Always have a rollback strategy
- **Document Processes**: Ensure team members can handle deployments

## Related Phases

- **PLAN**: Use deployment constraints to influence architectural decisions
- **BUILD**: Ensure code is built with deployment best practices
- **SUPPORT**: Set up monitoring and alerting for post-deployment support
