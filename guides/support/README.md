# SUPPORT Phase - Maintenance, Security & Collaboration

Maintain, secure, and collaborate on your deployed applications with ongoing optimization.

## Overview

The SUPPORT phase focuses on maintaining production applications, ensuring security, facilitating team collaboration, and continuously optimizing performance and user experience.

## Workflows

### Documentation Generation

Automate the creation and maintenance of comprehensive documentation.

**Example Workflow:**
> User: "Generate API documentation for all Express routes in src/routes/ and create comprehensive user guides based on the current application features"

**Generic Prompts:**
- "Analyze all components and generate a style guide with usage examples"
- "Create deployment documentation including environment setup and troubleshooting"
- "Generate changelog from git history with feature highlights and breaking changes"

### Security and Code Quality

Maintain robust security posture and code quality standards.

**Example Workflow:**
> User: "Scan for potential security vulnerabilities in our authentication code and provide a prioritized remediation plan"

**Generic Prompts:**
- "Audit dependencies for known vulnerabilities and suggest upgrade paths"
- "Review code for common security anti-patterns and provide fixes"
- "Analyze authentication flows for potential security weaknesses"

### Batch File Operations

Process and manage large sets of files efficiently.

**Example Workflow:**
> User: "Analyze all log files from the last week and create a summary report of error patterns and performance issues"

**Generic Prompts:**
- "Process all configuration files and ensure consistency across environments"
- "Organize project assets by type and remove unused files"
- "Update copyright headers across all source files"

### Development Environment Debugging

Troubleshoot and optimize development environments.

**Example Workflow:**
> User: "Analyze package.json and package-lock.json to identify version conflicts and dependency issues"

**Generic Prompts:**
- "Diagnose build performance issues and suggest optimizations"
- "Troubleshoot Docker containerization problems"
- "Resolve IDE configuration conflicts across team members"

### Review & Cleanup Changes

Automated code review with actionable improvement suggestions.

**Example Workflow:**
> User: "Run git diff on the current branch and identify any debug code, temporary logs, commented-out blocks, or other potentially unsafe or non-production-ready code (e.g., console.log, debugger, test stubs). Clean up or flag these issues to ensure the code is production-ready. Focus on quality, clarity, and security."

**Generic Prompts:**
- "Review my last 3 commits and suggest performance improvements"
- "Find all TODO comments and prioritise them by impact"
- "Scan for security vulnerabilities in authentication code"

### Thread History & Contextual Documentation

Leverage Amp's thread history to provide rich context in documentation and team communications.

**Example Workflow:**
> User: "Reference our previous discussion thread about the auth middleware refactor and include the key decisions in this PR description"

**Generic Prompts:**
- "Link the database migration thread in this PR to show our rollback strategy discussion"
- "Include the performance optimization thread URL in the JIRA ticket for context"
- "Add the API versioning discussion thread to the Confluence documentation"

### Team Knowledge Sharing & Collaboration

Facilitate effective team collaboration and knowledge transfer.

**Example Workflow:**
> User: "Create a team knowledge base entry documenting our React debugging strategies based on recent thread discussions"

**Generic Prompts:**
- "Generate onboarding documentation for new team members"
- "Create troubleshooting guides based on common support tickets"
- "Document architectural decisions and their rationale"

### Cross-Platform Thread Sharing

Share Amp conversation threads across team collaboration tools.

**Example Workflow:**
> User: "Share this React debugging thread in our #frontend Slack channel and create a Linear ticket referencing it"

**Generic Prompts:**
- "Post this database optimization thread to the team Slack with a summary"
- "Create a JIRA ticket linking this AWS deployment troubleshooting thread"
- "Add this API integration thread to our Confluence knowledge base with proper tagging"

## CLI Examples for SUPPORT Phase

```bash
# Security audit with intelligent vulnerability assessment
amp -x "Scan for potential security vulnerabilities in our authentication code"

# Strategic security planning with Oracle
npm audit --json | amp -x "Use Amp Oracle to create comprehensive security improvement strategy with prioritized action plan"

# Content processing with intelligent pattern recognition
cat *.log | amp -x "Analyze these logs for error patterns and create a summary report"

# Strategic log analysis planning with Oracle
find . -name "*.log" -mtime -7 | amp -x "Use Amp Oracle to create comprehensive log analysis strategy including pattern recognition, alerting, and monitoring improvements"

# Intelligent file organization with automated cleanup
find . -type f -size +100M | amp -x "Analyze large files and spawn subagents to: 1) identify archival candidates, 2) suggest compression opportunities, 3) validate file dependencies before cleanup" | amp -x "Create automated cleanup script with safety checks"

# API documentation with comprehensive analysis
amp -x "Analyze all Express routes in src/routes/ and generate OpenAPI documentation"

# Cross-repository documentation analysis
for repo in frontend backend mobile; do echo "=== $repo ===" && find $repo -name "README.md" -exec cat {} \;; done | amp -x "Analyze documentation across repositories, spawn subagents to: 1) ensure consistency in setup instructions, 2) identify gaps in cross-service documentation, 3) recommend unified documentation strategy"
```

## Maintenance Best Practices

### Monitoring and Alerting
- **Application Performance**: Monitor response times, error rates, and resource usage
- **Business Metrics**: Track user engagement and conversion rates
- **Infrastructure Health**: Monitor server resources and service availability
- **Security Events**: Alert on suspicious activities and potential breaches

### Performance Optimization
- **Code Profiling**: Regular performance analysis and optimization
- **Database Tuning**: Query optimization and index management
- **Caching Strategies**: Implement and maintain effective caching layers
- **Resource Scaling**: Monitor and adjust resource allocation

### Security Maintenance
- **Dependency Updates**: Regular security patches and updates
- **Access Control**: Review and update user permissions
- **Audit Trails**: Maintain comprehensive logging for security analysis
- **Vulnerability Scanning**: Regular security assessments

## Knowledge Management

### Documentation Strategy
- **Living Documentation**: Keep documentation current with code changes
- **Searchable Knowledge Base**: Organize information for easy retrieval
- **Video Tutorials**: Create visual guides for complex processes
- **Decision Records**: Document architectural and technical decisions

### Team Collaboration
- **Code Reviews**: Systematic review processes with learning opportunities
- **Pair Programming**: Knowledge sharing through collaborative development
- **Tech Talks**: Regular sharing of new technologies and techniques
- **Retrospectives**: Regular process improvement meetings

## Incident Response

### Preparation
- **Runbooks**: Documented procedures for common issues
- **Contact Lists**: Up-to-date emergency contact information
- **Access Controls**: Proper permissions for incident responders
- **Tools Access**: Ensure responders have necessary tool access

### Response Process
- **Issue Detection**: Automated monitoring and alerting
- **Impact Assessment**: Quickly determine severity and scope
- **Communication**: Clear status updates to stakeholders
- **Resolution**: Systematic troubleshooting and fixes
- **Post-Mortem**: Analysis and improvement planning

## Tips for Effective Support

- **Proactive Monitoring**: Catch issues before they impact users
- **Clear Documentation**: Make troubleshooting information easily accessible
- **Regular Maintenance**: Schedule routine maintenance and updates
- **Team Knowledge Sharing**: Ensure knowledge isn't siloed
- **Continuous Improvement**: Learn from incidents and optimize processes

## Related Phases

- **PLAN**: Use support insights to inform future architectural decisions
- **BUILD**: Incorporate maintainability requirements into development
- **DEPLOY**: Ensure deployment processes support maintenance needs
