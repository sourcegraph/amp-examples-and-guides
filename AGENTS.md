# Amp Examples and Guides Repository

## Tech Stack
- **Framework**: Astro v5.13.2 with Svelte integration
- **Language**: TypeScript (strict config extends astro/tsconfigs/strict)
- **Package Manager**: pnpm
- **Task Runner**: Task (via Taskfile.yml)
- **Linting**: markdownlint for documentation
- **Build Output**: Static site generation to `dist/`

## Repository Structure
```
├── src/                    # Astro source files
│   ├── components/         # Svelte/Astro components  
│   ├── content/           # Content collections
│   │   ├── examples/      # Language/framework-specific examples
│   │   └── guides/        # High-level workflow guides
│   ├── layouts/           # Page layouts
│   ├── pages/             # File-based routing
│   └── styles/            # CSS/styling
├── public/                # Static assets
├── images/                # Documentation images
└── dist/                  # Build output (generated)
```

## Build & Commands
- **Install Dependencies**: `task install` or `pnpm install`
- **Lint Markdown**: `task lint` (using Taskfile.yml)
- **Fix Markdown**: `task lint:fix` (auto-fix markdown issues)

### Astro Development Site
- **Start Dev Server**: `tmux new-session -d -s astro-dev 'pnpm run dev'` (runs on <http://localhost:4321>)
- **Build Static Site**: `pnpm run build`
- **Preview Build**: `pnpm run preview`
- **View Running Sessions**: `tmux list-sessions`
- **Attach to Session**: `tmux attach-session -t astro-dev`
- **View Server Logs**: `tmux capture-pane -t astro-dev -p` (prints current pane content)
- **View Last N Lines**: `tmux capture-pane -t astro-dev -S -50 -p` (last 50 lines)
- **Kill Session**: `tmux kill-session -t astro-dev`

