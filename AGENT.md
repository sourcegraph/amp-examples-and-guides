# Amp Examples and Guides Repository

## Build & Commands
- **Install Dependencies**: `task install` or `npm install`
- **Lint Markdown**: `task lint` (using Taskfile.yml)
- **Fix Markdown**: `task lint:fix` (auto-fix markdown issues)

## Architecture & Structure
- **examples/**: Language, framework, and tool-specific use cases with Thread links
- **guides/**: High-level workflow guidance, language and framework agnostic

## Code Style & Conventions
- **Markdown**: [Github Markdown syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- **Documentation**: Self-documenting code, avoid inline comments
- **Table Synchronization**: Always keep the guides and examples tables in the root README.md in sync with guides/README.md and examples/README.md. When adding, removing, or modifying entries in either guides/ or examples/, update all three files to maintain consistency.

## Tools & Dependencies
- **Node.js**: Version 24 (managed by mise)
- **Task**: Task runner for build commands (Taskfile.yml)
- **markdownlint-cli**: v0.45.0 for markdown linting

