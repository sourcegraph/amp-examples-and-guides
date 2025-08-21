---
title: "PLAN Phase - Analysis, Exploration & Strategy"
description: "Analyse, explore, and strategize your development approach with intelligent codebase understanding"
phase: "PLAN"
category: "SDLC Phase"
order: 1
---

# PLAN Phase - Analysis, Exploration & Strategy

Analyse, explore, and strategize your development approach with intelligent codebase understanding.

## Overview

The PLAN phase focuses on understanding your codebase, analyzing requirements, and strategizing your development approach before implementation. This phase helps you make informed decisions about architecture, dependencies, and implementation strategies.

## Workflows

### Codebase Exploration & Understanding

Navigate and understand complex codebases through intelligent analysis and relationship mapping.

**Example Workflow:**
> User: "Locate where the AutoScroller logic is implemented in the codebase. Provide a summary of its functionality and key responsibilities. Then, explain how it interacts with or connects to the ViewUpdater component/module—describe the flow of data or control between them, including any shared state, events, or dependencies."

**Generic Prompts:**
- "Find all components that use the authentication context and show their relationships"
- "Locate the error handling logic and explain how errors bubble up"
- "Map the data flow from API calls to UI components for the user dashboard"

### Search & Contextual Analysis Across Codebase

Use intelligent search to understand code relationships and dependencies.

**Example Workflow:**
> User: "Search for all database connection patterns in the codebase and analyze how connection pooling is implemented across different services"

**Generic Prompts:**
- "Find all instances of [specific pattern] and explain their usage context"
- "Locate configuration management code and show how settings are propagated"
- "Search for all API endpoints and group them by functionality"

### Git History Exploration & Feature Evolution

Understand codebase evolution and decision-making context through version control analysis.

**Example Workflow:**
> User: "Please identify who introduced the caching layer into the system and provide the reasoning or context behind its implementation (e.g., performance, scalability, cost). Additionally, list the services or modules that utilize this caching layer, and illustrate the relationships and data flow using a Mermaid diagram."

**Generic Prompts:**
- "Show me the evolution of our API integration over the last 6 months"
- "Find the commit that introduced TypeScript and summarise the migration strategy"
- "Trace the bug fix history for the payment processing module"

### Learning and Discovery

Accelerate learning through hands-on exploration of new technologies and patterns.

**Example Workflow:**
> User: "I'm new to GraphQL. Show me how to implement a simple schema with queries and mutations"

**Generic Prompts:**
- "Learn [technology] by building a simple [project type] with best practices"
- "Explore [framework/library] by creating a [specific functionality] example"
- "Understand [concept] by implementing a practical example in this codebase"

### Feature Implementation Planning

Plan feature implementation from concept to deployment strategy.

**Example Workflow:**
> User: "Plan the implementation of a user notification system that supports email, SMS, and in-app notifications. Include architecture decisions, technology choices, and rollout strategy."

**Generic Prompts:**
- "Plan the architecture for [feature] including database design and API endpoints"
- "Create an implementation strategy for [requirement] with risk assessment"
- "Design a rollout plan for [feature] with feature flags and gradual deployment"

## CLI Examples for PLAN Phase

```bash
# Architecture analysis
git log --oneline --since="3 months ago" src/ | amp -x "Analyze commit patterns and identify architectural evolution"

# Strategic planning with Oracle
amp -x "Use Amp Oracle to create a comprehensive technical debt assessment and prioritization strategy"

# Dependency analysis
find . -name "package.json" -o -name "*.lock" | amp -x "Analyze dependency patterns and identify potential upgrade paths"
```

## Tips for Effective Planning

- **Start Broad:** Begin with high-level architectural understanding before diving into specifics
- **Document Assumptions:** Keep track of architectural decisions and their reasoning
- **Use Diagrams:** Leverage Mermaid diagrams to visualize relationships and data flows
- **Consider Non-Functional Requirements:** Think about performance, security, and scalability early
- **Validate with Stakeholders:** Use Amp to generate clear explanations for technical decisions

## Related Phases

- **BUILD**: Use planning insights to guide implementation decisions
- **DEPLOY**: Consider deployment complexity during planning
- **SUPPORT**: Plan for maintainability and debugging from the start
