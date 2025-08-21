---
title: "Documentation with Amp"
description: "Strategic documentation planning and intelligent documentation pipelines using Amp's oracle tool and agentic capabilities."
category: "Development Workflow"
order: 4
---

# Documentation with Amp

## Strategic documentation planning with the oracle tool

Use Amp's `oracle` tool to explore the code base and provide an implementation plan to update documentation

```bash
find . -name "*.md" -o -name "*.js" -o -name "*.ts" | grep -E "(README|docs|comments)" | amp -x "Use the oracle to assess current documentation completeness and create a comprehensive improvement strategy"
```

## Intelligent documentation pipelines

Send the output of one Amp command to another, chaining together multiple steps, each enhanced with Amp's agentic capabilities

```bash
git log --oneline --since="1 week ago" | amp -x "Analyze recent changes and spawn subagents to: 1) identify undocumented features, 2) generate changelog entries, 3) update API documentation, 4) validate documentation accuracy" | amp -x "Orchestrate documentation updates and create PR"
```

## Cross-repository documentation analysis

```bash
for repo in frontend backend mobile; do echo "=== $repo ===" && find $repo -name "README.md" -exec cat {} \;; done | amp -x "Analyze documentation across repositories, spawn subagents to: 1) ensure consistency in setup instructions, 2) identify gaps in cross-service documentation, 3) recommend unified documentation strategy"
```
