# Amp - Common Use Cases & Workflows

This document outlines workflows and example prompts to help guide you through your Amp eval.

## Table of Contents

- [🚀 Getting Started Tips](#-getting-started-tips)
- [🛠️ End-to-End Development Workflows](#️-end-to-end-development-workflows)
  - [Feature Implementation from Concept to Deployment](#feature-implementation-from-concept-to-deployment)
  - [UI Iteration with Visual Feedback](#ui-iteration-with-visual-feedback)
  - [Integrated Development with MCP Tooling](#integrated-development-with-mcp-tooling)
- [📋 Code Quality & Maintenance](#-code-quality--maintenance)
  - [Review & Cleanup Changes](#review--cleanup-changes)
  - [Automated Refactoring & Standards Enforcement](#automated-refactoring--standards-enforcement)
- [🧠 Codebase Exploration & Understanding](#-codebase-exploration--understanding)
  - [Search & Contextual Analysis Across Codebase](#search--contextual-analysis-across-codebase)
  - [Git History Exploration & Feature Evolution](#git-history-exploration--feature-evolution)
- [⚡ Rapid Issue-to-PR Flow](#-rapid-issue-to-pr-flow)
  - [From Bug Report to Draft PR](#from-bug-report-to-draft-pr)
  - [Automated Pull Request Generation](#automated-pull-request-generation)
- [👥 Team Knowledge Sharing & Collaboration](#-team-knowledge-sharing--collaboration)
  - [Thread History & Contextual Documentation](#thread-history--contextual-documentation)
  - [Cross-Platform Thread Sharing](#cross-platform-thread-sharing)
- [🧪 Testing & Debugging Automation](#-testing--debugging-automation)
  - [End-to-End Test Generation](#end-to-end-test-generation)
  - [Automate Debugging Loops](#automate-debugging-loops)
- [💡 Personal Productivity & Learning](#-personal-productivity--learning)
  - [Learning and Discovery](#learning-and-discovery)
  - [IDE Completions and Context-Aware Development](#ide-completions-and-context-aware-development)
- [📚 Additional Resources](#-additional-resources)

---

## 🚀 **Getting Started Tips**

- **Be Specific:** The more context you provide, the better Amp can assist you
- **Iterate:** Start with basic requests and refine based on Amp's output
- **Combine Workflows:** Mix and match patterns from different sections
- **Save Useful Threads:** Bookmark successful workflows for team sharing
- **Experiment with MCP:** Extend Amp's capabilities with custom integrations

---

## 🛠️ **End-to-End Development Workflows**

### **Feature Implementation from Concept to Deployment**
Transform high-level requirements into production-ready code with iterative refinement.

**Example Workflow:**
> User: "Build a responsive User Profile component using [React/Tailwind CSS/etc.], which displays the user's avatar, full name, and email address. Include an "Edit" button that allows the user to update their information. The layout should be clean and accessible, with clear separation of elements. Add placeholder data for demonstration and ensure the component is reusable."

- "Create a checkout flow component with payment integration, then test it with mock data"
- "Build a dashboard widget for analytics data, include responsive design and run tests"
- "Implement OAuth login flow, handle edge cases, and prepare for deployment"

### **UI Iteration with Visual Feedback**
Leverage Playwright MCP for screenshot-driven UI development.

**Example Workflow:**
> User: "Visit http://localhost:3000/dashboard, take a full-page screenshot, and analyze the current design. Then, create a simplified, minimal version of the dashboard layout. Focus on reducing visual clutter, limiting the color palette, using clean typography, and improving spacing. Preserve core functionality but streamline UI components for clarity and usability."

- "Screenshot the login page, then make it match our design system guidelines"
- "Capture the mobile view and optimise it for better touch targets"
- "Take screenshots of all form states and ensure consistent styling"

### **Integrated Development with MCP Tooling**
Extend Amp's capabilities with custom MCP servers for your tech stack.

**Example Workflow:**
> User: "I have an AWS RDS instance running [PostgreSQL/MySQL/etc.], and I want to generate migration scripts for changes to the users table.
> Inspect the current schema, and produce SQL migration scripts based on the following changes:
> [List of schema changes here, e.g., add profile_picture, rename name to full_name, etc.]
> Make sure the script is reversible (supports rollback), follows best practices, and is compatible with [tool name, e.g., raw SQL, Flyway, Prisma, Sequelize]."

- "Deploy this feature branch to staging via our Kubernetes MCP server"
- "Use the Stripe MCP to test payment flows with webhooks"
- "Connect to Firebase and sync user authentication state"

---

## 📋 **Code Quality & Maintenance**

### **Review & Cleanup Changes**
Automated code review with actionable improvement suggestions.

**Example Workflow:**
> User: "Run git diff on the current branch and identify any debug code, temporary logs, commented-out blocks, or other potentially unsafe or non-production-ready code (e.g., console.log, debugger, test stubs). Clean up or flag these issues to ensure the code is production-ready. Focus on quality, clarity, and security."

- "Review my last 3 commits and suggest performance improvements"
- "Find all TODO comments and prioritise them by impact"
- "Scan for security vulnerabilities in authentication code"

### **Automated Refactoring & Standards Enforcement**
Maintain consistency across your codebase whilst preserving functionality.

**Example Workflow:**
> User: "Refactor the UserService class to align with our team's coding standards (e.g., clean architecture, SOLID principles, consistent naming, error handling, etc.). Improve readability, remove any code smells, and ensure it's modular and testable.
Then, write comprehensive unit tests for all public methods using [your test framework, e.g., Jest, JUnit, etc.]. Focus on meaningful test coverage, covering edge cases and error scenarios where appropriate"

- "Convert this class component to hooks and ensure all props are typed"
- "Refactor these utility functions to be more functional and add JSDoc"
- "Apply ESLint rules across the entire components directory"

---

## 🧠 **Codebase Exploration & Understanding**

### **Search & Contextual Analysis Across Codebase**
Navigate complex codebases with intelligent search and relationship mapping.

**Example Workflow:**
> User: "Locate where the AutoScroller logic is implemented in the codebase. Provide a summary of its functionality and key responsibilities. Then, explain how it interacts with or connects to the ViewUpdater component/module—describe the flow of data or control between them, including any shared state, events, or dependencies."

- "Find all components that use the authentication context and show their relationships"
- "Locate the error handling logic and explain how errors bubble up"
- "Map the data flow from API calls to UI components for the user dashboard"

### **Git History Exploration & Feature Evolution**
Understand codebase evolution and decision-making context.

**Example Workflow:**
> User: "Please identify who introduced the caching layer into the system and provide the reasoning or context behind its implementation (e.g., performance, scalability, cost).
Additionally, list the services or modules that utilize this caching layer, and illustrate the relationships and data flow using a Mermaid diagram."

- "Show me the evolution of our API integration over the last 6 months"
- "Find the commit that introduced TypeScript and summarise the migration strategy"
- "Trace the bug fix history for the payment processing module"

---

## ⚡ **Rapid Issue-to-PR Flow**

### **From Bug Report to Draft PR**
Streamline bug resolution from report to ready-for-review PR.

**Example Workflow:**
> User: Fix [Pastes stack trace] 
OR 
> "Fix TypeError: Cannot read property 'length' of undefined at UserList.render line 42"

- "Fix this CORS error and create a PR with proper error handling"
- "Resolve the memory leak in the WebSocket connection and add monitoring"
- "Debug why the form validation isn't working and implement a robust solution"

### **Automated Pull Request Generation**
Convert requirements directly into review-ready pull requests.

**Example Workflow:**
> User: "Create a GitLab pull request that adds a 200ms debounce to the search input field. The debounce should reduce excessive calls while typing, improving performance and UX. Include a clear title and a concise description explaining why this change is needed and how it works."

- "Implement lazy loading for images and create a PR with performance benchmarks"
- "Add dark mode support and generate PR with design system documentation"
- "Create pagination for the user table and prepare PR with API changes"

---

## 👥 **Team Knowledge Sharing & Collaboration**

### **Thread History & Contextual Documentation**
Leverage Amp's thread history stored on ampcode.com to provide rich context in PRs and team communications.

**Example Workflow:**
> User: "Reference our previous discussion thread about the auth middleware refactor and include the key decisions in this PR description"

- "Link the database migration thread in this PR to show our rollback strategy discussion"
- "Include the performance optimization thread URL in the JIRA ticket for context"
- "Add the API versioning discussion thread to the Confluence documentation"

### **Cross-Platform Thread Sharing**
Share Amp conversation threads across team collaboration tools for seamless knowledge transfer.

**Example Workflow:**
> User: "Share this React debugging thread in our #frontend Slack channel and create a Linear ticket referencing it"

- "Post this database optimization thread to the team Slack with a summary for the backend team"
- "Create a JIRA ticket linking this AWS deployment troubleshooting thread for the DevOps team"
- "Add this API integration thread to our Confluence knowledge base with proper tagging"
- "Share this debugging session thread in Linear as a reference for similar future issues"

---

## 🧪 **Testing & Debugging Automation**

### **End-to-End Test Generation**
Automate comprehensive test coverage from user stories.
> **Tip:** Remember to provide specific instructions to write tests in your AGENT.md file. For reference see [Testing Principles](../AGENT.md_Examples/AGENT.md#testing-principles).

**Example Workflow:**
> User: "Develop Playwright test scripts for the user registration flow, covering both successful registrations and validation error scenarios."

- "Generate Cypress tests for the e-commerce checkout process"
- "Create unit tests for all utility functions with edge case coverage"
- "Write integration tests for the API authentication middleware"

### **Automate Debugging Loops**
Systematic debugging with documentation for future reference.

**Example Workflow:**
> User: "I'm getting this error intermittently in production:
> 
> ```
> TypeError: Cannot read properties of undefined (reading 'map')
>     at UserDashboard.render (UserDashboard.jsx:127)
>     at finishClassComponent (react-dom.js:2485)
>     at updateClassComponent (react-dom.js:2439)
>     at beginWork (react-dom.js:4072)
> ```
> 
> It happens about 20% of the time when users navigate to /dashboard. The component loads fine locally but fails randomly in production. Can you analyze this stack trace, identify the root cause, and implement a fix with proper error handling?"

- "Debug this performance issue and create a monitoring dashboard"
- "Investigate why tests are flaky and implement reliable alternatives"
- "Reproduce this production error locally and create preventive measures"

---

## 💡 **Personal Productivity & Learning**

### **Learning and Discovery**
Accelerate learning through hands-on exploration.

**Example Workflow:**
> User: "I'm new to GraphQL. Show me how to implement a simple schema with queries and mutations"

- "Learn Docker by containerising my Node.js app with multi-stage builds"
- "Explore React Server Components by building a blog with dynamic content"
- "Understand WebAssembly by creating a performance-critical image processing function"

### **IDE Completions and Context-Aware Development**
Leverage Amp tab for intelligent code completions in VS Code.

**Example Workflow:**
> User: [Types partial class in VS Code]  
> ```javascript
> class UserAnalytics {
>   constructor(
> ```

- "Complete this API client class with all CRUD operations and error handling"
- "Generate a complete React hook for managing form state with validation"
- "Build a complete test suite scaffold for this service class"

---

## 📚 **Additional Resources**

For more information about Amp and advanced configurations, visit **ampcode.com**.

This guide is continuously updated based on community feedback and new Amp capabilities. Contribute improvements via GitHub issues or pull requests.
