# Amp Usage Tool 

Access and analyze your team's Amp usage metrics through code using the experimental Amp Metrics API.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Required Exports](#required-exports)
- [Basic Usage](#basic-usage)

---

## Overview

The `amp-usage` tool provides programmatic access to Amp usage analytics for your team. This tool leverages the experimental Amp Metrics API to retrieve usage data, generate reports, and analyze patterns.

> [WARNING]
> **Experimental Feature:** This tool depends on the Amp Metrics API which is currently unsupported/alpha and may be deprecated without notice. This is using an experimental API that could change or be removed at any time.
> **CLI Only:** This tool only works via the Amp CLI. It cannot be used in the VS code extension
---

## Prerequisites

### Amp Admin Access Required

- **You must be an Amp workspace admin** for your team to access usage metrics
- Admin permissions are required to query analytics data and generate reports

### Installation & Setup

1. **Amp CLI Required:** Ensure you have the latest Amp CLI installed
2. **Tool Setup:** Make a copy of [agents/tools/amp-usage.js](../../agents/tools/amp-usage.js) to put in that folder agents/tools in the root of your repo
3. Set the `AMP_API_KEY` and `AMP_WORKSPACE_NAME` environment variable to your Amp API key and workspace name respectively
4. **Tool Setup:** Make a copy of [agents/tools/amp-usage.js](../../agents/tools/amp-usage.js) to put in that folder agents/tools in the root of your repo
5. Open Amp and prompt for usage data  `Using amp-usage tool, show me the users who have spend more than $450 USD since 14-AUG-2025`

---

## Required Exports

You must export the following environment variables before using the `amp-usage` tool:

```bash
export AMP_API_KEY="your-api-key"           # API key from ampcode.com/settings (admin required)
export AMP_WORKSPACE_NAME="your-team-name" # Your workspace/team name
```

### Environment Variables

- **`AMP_API_KEY`**: Your personal API key from [ampcode.com/settings](https://ampcode.com/settings) - you must be an Amp workspace admin to access usage metrics
- **`AMP_WORKSPACE_NAME`**: The name of your workspace/team for which you want to retrieve usage data

---

## Basic Usage

### Simple Analytics Query

```bash
amp -x "Using amp-usage tool, show me the users who have spend more than $450 USD since 14-AUG-2025
```


Example output 

```
Here are all users with Amp usage over $450 since August 14, 2025:

   1. Mario  - $2,298.67
   2. Luigi - $1,625.48
   3. Peach - $1,171.55
   4. Bowser - $1,108.49
   5. Yoshi - $1,003.31
   6. Toad - $922.47
   7. Koopa - $894.86


Total: 7 users with usage over $450 since August 14.
```