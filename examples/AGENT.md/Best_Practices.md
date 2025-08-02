

## Overview
This is guide for creating effective AGENT.md files that enable AI coding tools like Amp to understand and work with your codebase.
When you open up an empty project, Amp will ask you to generate an `AGENT.md` file. 
This universal configuration file serves allows Amp or any agent using `AGENT.md`  file reference to understand your project's structure, conventions, and requirements.

## Core Principles

| Principle | Description |
|-----------|-------------|
| **Think Like Onboarding Documentation** | Write your `AGENT.md` as if you're onboarding a new team member on their first day. Include everything they'd need to know to start contributing effectively. |
| **Be Explicit and Comprehensive** | AI agents work best with clear, detailed instructions. Don't assume the AI will guess your preferences—state them explicitly. |
| **Keep It Current** | An outdated `AGENT.md` is worse than no `AGENT.md`. Make updating this file part of your development workflow when processes or conventions change. |

## Essential Sections

### Project Overview

Include these key elements:

- **Purpose**: Brief description of what the project does
- **Architecture**: High-level architecture overview  
- **Key directories**: Map out your folder structure
- **Tech stack**: List primary technologies, frameworks, and tools

### Build & Commands

> **Critical for AI agents** - This section enables effective automated assistance.

Document all essential commands:

- **Development commands**: How to start local servers, run in development mode
- **Testing commands**: Unit tests, integration tests, specific test files  
- **Build commands**: Production builds, typecheck, linting
- **Deployment commands**: If applicable
- **Common debugging commands**: Log viewing, database access, etc.

### Example:
```


Build & Commands

Development
- Start development: `npm run dev`
- Hot reload: `npm run dev --watch`

Testing  
- Run all tests: `npm test`
- Run specific test: `npm test src/components/Button.test.ts`
- Test coverage: `npm run test:coverage`

Build & Deploy
- Typecheck: `npm run type-check`
- Lint and fix: `npm run lint:fix`  
- Build for production: `npm run build`
- Deploy: `npm run deploy`
```

### Tech Stack
- **Languages**: TypeScript, JavaScript
- **Frameworks**: React, Node.js, Express/Fastify
- **State Management**: Zustand / Redux Toolkit / Context API
- **Database**: PostgreSQL + Prisma
- **Tooling**: ESLint, Prettier, Vitest/Jest, Playwright, Docker, pnpm


### Code Style & Conventions

| Category         | Guidelines                                                                 |
|------------------|---------------------------------------------------------------------------|
| **Formatting**   | 2-space indentation, single quotes, semicolons required, max line: 100 chars |
| **Naming**       | `camelCase` for vars/functions, `PascalCase` for components, kebab-case files |
| **Imports**      | Absolute imports preferred (`@/utils/foo.ts`), grouped & ordered alphabetically |
| **Comments**     | Use inline comments sparingly. Use `/** JSDoc */` for all exported functions/types |
| **TypeScript**   | Use `strict` mode, no `any`, prefer `unknown` over `any`, define shared types in `@/types/` |


### Testing Guidelines

- **Frameworks**: Unit tests with Vitest or Jest; integration + E2E with Playwright or Supertest.
- **Test Structure**: Mirror source directory; test files next to source or in `/tests`.
- **Naming**: Use `.test.ts` suffix. Example: `Button.test.ts`, `api/user.test.ts`
- **Mocking**: Use `vi.mock()` or `jest.mock()` for services, API clients, and DB calls.
- **Coverage**: Maintain ≥ 80% coverage; no PR merged without tests unless explicitly approved.


### Architecture & Patterns

- **Design Patterns**: Feature-based folder structure, dependency injection via service layers.
- **State Management**: Use Zustand or Redux Toolkit; colocate state with components when possible.
- **Data Flow**: Uni-directional data flow; APIs return normalized data; hydration via SWR or React Query.
- **API Conventions**: RESTful endpoints; snake_case in DB, camelCase in API/Frontend.
- **Database Patterns**: Prisma migrations in `db/migrations/`; seed scripts in `db/seed.ts`


### Security Considerations

- **Authentication**: JWTs via `Authorization` header; use HTTP-only cookies for frontend.
- **Input Validation**: All inputs validated with Zod or Joi before DB access.
- **Env Variables**: Stored in `.env`, accessed via `process.env`; secrets never committed.
- **Dependencies**: Use `pnpm audit`; dependabot alerts must be addressed within 3 days.

### Others Considerations
- **MCP Tooling guidelines**: Specific tool usage via MCP for integration with third party services.
- **SDLC Guideline**: Guidelines on which tools are used in SDLC.
- **Dev Practices**: How your team works and is organised, to make your code more maintanable.
---

## Advanced Features

### File References
See our API documentation in [@docs/api.md](docs/api.md) and coding standards in [@CONTRIBUTING.md](CONTRIBUTING.md)

### Hierarchical Structure
For larger projects, consider multiple AGENT.md files:
```
project-root/
├── AGENT.md              # General project guidance
├── frontend/
│   └── AGENT.md          # Frontend-specific rules
├── api/
│   └── AGENT.md          # API-specific rules
└── ~/.config/AGENT.md    # Personal preferences
```
### Working in large code bases
If you are working on a large mono we generally recommend splitting into several `AGENT.md` files.

Amp is selective about AGENT.md files based on a hierarchy:
- Always loaded: ~/.config/AGENT.md, workspace root AGENT.md and parent directory `AGENT.md` files up to `$HOME`
- Conditionally loaded:  AGENT.md files in subdirectories only when Amp reads files from those specific directories. Amp discovers them contextually as it works in different parts of your project.
  
For instance, we have several AGENT.md in Amp codebase:
```asridhar@Mac amp % find . -name AGENT.md
./AGENT.md
./external-api/types/AGENT.md
./core/AGENT.md
./web/AGENT.md
./server/AGENT.md
./server/src/routes/api/(external)/AGENT.md
./server/src/routes/(agentmd)/AGENT.md
./cli/AGENT.md
./cli/src/tui/AGENT.md
```



### Environment-Specific Info

#### Development Environment
- Frontend: http://localhost:3000  
- Backend API: http://localhost:3001  
- DB: PostgreSQL `localhost:5432`  
- Redis: `localhost:6379`  
- Email previewer: http://localhost:8025

#### Staging Environment  
- Frontend: https://staging.example.com  
- API: https://api-staging.example.com  
- DB: Managed PostgreSQL (Neon/AWS RDS)  
- Secrets: Managed via GitHub Actions → AWS SSM


---

## Common Mistakes

| Mistake                      | Problem                                   | Better Approach                                            |
|-----------------------------|-------------------------------------------|------------------------------------------------------------|
| ❌ Too vague commands        | “Run tests”                               | ✅ `pnpm test --run --no-color`                            |
| ❌ Missing error handling    | No instructions for failed builds         | ✅ "If build fails, check Node version (18+), try `pnpm install` again" |
| ❌ Unclear formatting rules  | “Use prettier”                            | ✅ “Prettier config: single quotes, trailing commas, 100-char line max” |
| ❌ Stale commands            | Breaks CI/CD after tool updates           | ✅ AGENT.md reviewed every sprint, updated via PR checklist |

---

## Maintenance

### Regular Reviews

- Review AGENT.md regularly during sprint planning or retrospectives
- Update when onboarding new team members (they'll spot gaps)
- Check during major dependency updates or architecture changes

### Version Control Integration

- Make AGENT.md updates part of pull requests when changing processes
- Include AGENT.md reviews in your code review checklist
- Consider requiring AGENT.md updates for certain types of changes

### Team Collaboration

- Discuss AGENT.md contents in team meetings
- Encourage team members to suggest improvements
- Use the file as a living document that evolves with your team
---
## Quality Checklist
Before finalizing your AGENT.md, verify:

- Could a new developer start contributing using only this file?
- Are all essential commands documented with exact syntax?
- Do you specify both what to do AND what not to do?
- Are file paths and directory structures clearly explained?
- Is the coding style specific enough to be actionable?
- Are testing practices clearly defined?
- Is security guidance included where relevant?
- Are environment setup steps complete?
- Is the information current and accurate?

