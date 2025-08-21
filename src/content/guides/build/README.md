---
title: "BUILD Phase - Implementation, Refactoring & Enhancement"
description: "Implement, refactor, and enhance your code with AI-assisted development and testing"
phase: "BUILD"
category: "SDLC Phase"
order: 2
---

# BUILD Phase - Implementation, Refactoring & Enhancement

Implement, refactor, and enhance your code with AI-assisted development and testing.

## Overview

The BUILD phase focuses on the actual implementation of features, refactoring existing code, and enhancing your application with robust testing and quality assurance practices.

## Workflows

### Code Analysis and Refactoring

Maintain consistency across your codebase whilst preserving functionality.

**Example Workflow:**
> User: "Refactor the UserService class to align with our team's coding standards (e.g., clean architecture, SOLID principles, consistent naming, error handling, etc.). Improve readability, remove any code smells, and ensure it's modular and testable. Then, write comprehensive unit tests for all public methods using [your test framework, e.g., Jest, JUnit, etc.]. Focus on meaningful test coverage, covering edge cases and error scenarios where appropriate"

**Generic Prompts:**
- "Convert this class component to hooks and ensure all props are typed"
- "Refactor these utility functions to be more functional and add JSDoc"
- "Apply ESLint rules across the entire components directory"

### UI Iteration with Visual Feedback

Leverage Playwright MCP for screenshot-driven UI development.

**Example Workflow:**
> User: "Visit <http://localhost:3000/dashboard>, take a full-page screenshot, and analyze the current design. Then, create a simplified, minimal version of the dashboard layout. Focus on reducing visual clutter, limiting the color palette, using clean typography, and improving spacing. Preserve core functionality but streamline UI components for clarity and usability."

**Generic Prompts:**
- "Screenshot the login page, then make it match our design system guidelines"
- "Capture the mobile view and optimise it for better touch targets"
- "Take screenshots of all form states and ensure consistent styling"

### MCP Integration

Extend Amp's capabilities with custom MCP servers for your tech stack.

**Example Workflow:**
> User: "I have an AWS RDS instance running [PostgreSQL/MySQL/etc.], and I want to generate migration scripts for changes to the users table. Inspect the current schema, and produce SQL migration scripts based on the following changes: [List of schema changes here, e.g., add profile_picture, rename name to full_name, etc.] Make sure the script is reversible (supports rollback), follows best practices, and is compatible with [tool name, e.g., raw SQL, Flyway, Prisma, Sequelize]."

**Generic Prompts:**
- "Deploy this feature branch to staging via our Kubernetes MCP server"
- "Use the Stripe MCP to test payment flows with webhooks"
- "Connect to Firebase and sync user authentication state"

### IDE Completions and Context-Aware Development

Leverage Amp tab for intelligent code completions in VS Code.

**Example Workflow:**
> User: [Types partial class in VS Code]  
> ```javascript
> class UserAnalytics {
>   constructor(
> ```

**Generic Prompts:**
- "Complete this API client class with all CRUD operations and error handling"
- "Generate a complete React hook for managing form state with validation"
- "Build a complete test suite scaffold for this service class"

### Automated Refactoring & Standards Enforcement

Apply consistent coding standards and patterns across your codebase.

**Example Workflow:**
> User: "Apply our TypeScript strict mode settings across all components and fix any type errors. Ensure all components have proper prop types and error boundaries where appropriate."

**Generic Prompts:**
- "Convert all JavaScript files in src/ to TypeScript with proper typing"
- "Apply consistent error handling patterns across all API calls"
- "Refactor all React components to use modern hooks patterns"

### End-to-End Test Generation

Automate comprehensive test coverage from user stories.

**Example Workflow:**
> User: "Develop Playwright test scripts for the user registration flow, covering both successful registrations and validation error scenarios."

**Generic Prompts:**
- "Generate Cypress tests for the e-commerce checkout process"
- "Create unit tests for all utility functions with edge case coverage"
- "Write integration tests for the API authentication middleware"

### Automate Debugging Loops

Systematic debugging with documentation for future reference.

**Example Workflow:**
> User: "I'm getting this error intermittently in production:
> 
> ```text
> TypeError: Cannot read properties of undefined (reading 'map')
>     at UserDashboard.render (UserDashboard.jsx:127)
>     at finishClassComponent (react-dom.js:2485)
>     at updateClassComponent (react-dom.js:2439)
>     at beginWork (react-dom.js:4072)
> ```
> 
> It happens about 20% of the time when users navigate to /dashboard. The component loads fine locally but fails randomly in production. Can you analyze this stack trace, identify the root cause, and implement a fix with proper error handling?"

**Generic Prompts:**
- "Debug this performance issue and create a monitoring dashboard"
- "Investigate why tests are flaky and implement reliable alternatives"
- "Reproduce this production error locally and create preventive measures"

### From Bug Report to Draft PR

Streamline bug resolution from report to ready-for-review PR.

**Example Workflow:**
> User: Fix [Pastes stack trace] 
> OR 
> "Fix TypeError: Cannot read property 'length' of undefined at UserList.render line 42"

**Generic Prompts:**
- "Fix this CORS error and create a PR with proper error handling"
- "Resolve the memory leak in the WebSocket connection and add monitoring"
- "Debug why the form validation isn't working and implement a robust solution"

## CLI Examples for BUILD Phase

```bash
# Fix build errors with intelligent debugging
npm run build 2>&1 | amp -x "Parse these build errors and fix all TypeScript issues"

# Comprehensive refactoring analysis
find . -name "*.js" -o -name "*.ts" | head -20 | amp -x "Analyze these files for code duplication, suggest refactoring opportunities, and estimate the impact of proposed changes"

# Test generation and analysis
amp -x "Analyze test coverage and spawn subagents to: 1) identify untested code paths, 2) generate missing unit tests, 3) suggest integration test scenarios"
```

## Tips for Effective Building

- **Test-Driven Development:** Write tests alongside or before implementation
- **Incremental Refactoring:** Make small, focused improvements rather than large rewrites
- **Code Review Integration:** Use Amp to generate PR descriptions and review checklists
- **Performance Monitoring:** Include performance considerations in every implementation
- **Documentation as Code:** Keep documentation updated with code changes

## Related Phases

- **PLAN**: Use architectural decisions to guide implementation
- **DEPLOY**: Ensure code is deployment-ready with proper CI/CD integration
- **SUPPORT**: Build with maintainability and debugging in mind
