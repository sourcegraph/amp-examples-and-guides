---
title: "Managing Development Servers with tmux"
description: "Guide agents on managing development servers in background tmux sessions"
category: "Development Workflow"
order: 4
---

## tmux

[tmux](https://github.com/tmux/tmux/wiki) is a terminal multiplexer. It lets you switch easily between
several programs in one terminal, detach them (they keep running in the background) and reattach them to a different terminal.

Instructing your agent to execute long-running, non-interactive, processes in the background allows the
agent to continue with its work without being blocked. It also allows the agent to retrieve logs whenever necessary with the same command or tool call.

## Project specific guidance

```markdown
# Amp Examples and Guides Repository

## Development Server

Use `tmux` to manage development server processes in the background,
scraping pane contents when log or output collection is necessary.

- **Start Dev Server**: `tmux new-session -d -s astro-dev 'pnpm run dev'` (runs on <http://localhost:4321>)
- **Attach to Session**: `tmux attach-session -t astro-dev`
- **View Server Logs**: `tmux capture-pane -t astro-dev -p` (prints current pane content)
- **View Last N Lines**: `tmux capture-pane -t astro-dev -S -50 -p` (last 50 lines)
```

## Global agent guidance

Using `$HOME/.config/AGENTS.md` you can provide guidance to any Amp agent you're interacting with.

```markdown
# Agent Preferences

## Development Servers

Always use `tmux` to manage development servers as background processes
and to gather logs or console output.

- **Start Development Server**: ` tmux` new-session -d -s {{ repository_name }} '{{ dev server command }}'
- **Attach to Session**: `tmux attach -t {{ repository_name }}`
- **Capture Logs**: `tmux capture-pane -t {{ repository_name }} -p`
- **View Last N Lines**: `tmux capture-pane -t {{ repository_name }} -S -50 -p`
```

