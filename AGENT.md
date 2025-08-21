# Amp Examples and Guides Repository

## Build & Commands
- **Install Dependencies**: `task install` or `npm install`
- **Lint Markdown**: `task lint` (using Taskfile.yml)
- **Fix Markdown**: `task lint:fix` (auto-fix markdown issues)

### Astro Development Site
- **Start Dev Server**: `cd docs-site && npm run dev` (runs on http://localhost:4321)
- **Build Static Site**: `cd docs-site && npm run build`
- **Preview Build**: `cd docs-site && npm run preview`

### Development Server Management (tmux)
- **Start in Background**: `tmux new-session -d -s astro-dev -c /path/to/docs-site 'npm run dev'`
- **View Running Sessions**: `tmux list-sessions`
- **Attach to Session**: `tmux attach-session -t astro-dev`
- **View Server Logs**: `tmux capture-pane -t astro-dev -p` (prints current pane content)
- **View Last N Lines**: `tmux capture-pane -t astro-dev -S -50 -p` (last 50 lines)
- **Kill Session**: `tmux kill-session -t astro-dev`
- **Detach from Session**: `Ctrl+B, then D`

## Architecture & Structure
- **examples/**: Language, framework, and tool-specific use cases with Thread links
- **guides/**: High-level workflow guidance, language and framework agnostic  
- **docs-site/**: Astro + Svelte static site for documentation
  - **src/content/**: Markdown content collections (guides/ and examples/)
  - **src/components/**: Svelte components for interactive features
  - **src/pages/**: Astro pages with dynamic routing
  - **src/layouts/**: Reusable page layouts

## Code Style & Conventions
- **Markdown**: [Github Markdown syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- **Documentation**: Self-documenting code, avoid inline comments
- **Table Synchronization**: Always keep the guides and examples tables in the root README.md in sync with guides/README.md and examples/README.md. When adding, removing, or modifying entries in either guides/ or examples/, update all three files to maintain consistency.

## Tools & Dependencies
- **Node.js**: Version 24 (managed by mise)
- **Task**: Task runner for build commands (Taskfile.yml)
- **markdownlint-cli**: v0.45.0 for markdown linting

