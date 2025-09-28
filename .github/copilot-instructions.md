# Instructions for GitHub Copilot

**ALWAYS follow these instructions first and only use additional search or bash commands if the information here is incomplete or found to be in error.**

**Note**: Detailed coding and testing instructions are organized in separate files with specific file patterns:
- **Coding standards**: See `.github/instructions/coding.instructions.md` (applies to TypeScript/TSX files)
- **Testing standards**: See `.github/instructions/testing.instructions.md` (applies to test files)

## Repository Overview

Nosto React is a React component library for implementing Nosto personalization features. It's a TypeScript library that builds both ES and UMD modules using Vite, with comprehensive test coverage requirements (80% threshold).

## Essential Setup Requirements

### Node.js Version
- **Node.js 22 or higher required** (as specified in `package.json` engines field)
- CI environment uses Node.js 22 (see `.github/workflows/ci.yml`)
- Current system may have Node v20 which works but CI requires v22

### Installation
- **Always use**: `npm ci` for dependency installation
- Takes ~90 seconds, **NEVER CANCEL** - set timeout to 3+ minutes
- Alternative: `npm install` (if npm ci fails)
- Bootstrap includes initial build via husky prepare script

### Core Validation Commands
- **Type checking**: `npm run typecheck` - runs TypeScript compiler (~2 seconds)
- **Linting**: `npm run lint` - runs ESLint on TypeScript files (~1 second)  
- **Testing**: `npm test` - runs vitest with coverage (~varies, may fail in sandbox environments)
- **Full build**: `npm run build` - complete build pipeline (~12 seconds)

### Git Workflow
- **Commit format**: Always use conventional commit format (enforced by commitlint)
- **Commit command**: Use `git commit --no-verify` to avoid Husky pipeline errors
- Husky runs commit message validation via `.husky/commit-msg`

## Working Effectively

### Building
- Full build: `npm run build` -- includes TypeScript compilation, ESLint, Vite bundling, and TypeDoc generation. Takes ~12 seconds. NEVER CANCEL. Set timeout to 5+ minutes.
- Type checking only: `npm run typecheck` -- runs TypeScript compiler without output. Takes ~2 seconds.
- Clean build: `npm run clean && npm run build` -- removes dist directory first
- Build outputs: Creates `dist/index.es.js`, `dist/index.umd.js`, and `dist/index.d.ts`

### Development Server
- Start dev server: `npm run dev` -- starts Vite development server on http://localhost:5173/. Starts in ~1 second.
- Preview built version: `npm run preview` -- serves the built library

### Code Quality
- Lint code: `npm run lint` -- runs ESLint on TypeScript files. Takes ~1 second.
- Format check: `npm run prettier` -- checks Prettier formatting. Takes ~1 second.
- Format fix: `npm run prettier:fix` -- applies Prettier formatting

### Documentation
- Generate docs: `npm run typedoc` -- generates TypeDoc documentation in `./docs` directory. Takes ~4 seconds.
- Documentation is published to GitHub Pages at: https://nosto.github.io/nosto-react/

## Validation Requirements

### CRITICAL Testing Limitations
- **Tests fail in isolated environments**: The test suite requires network access to `connect.nosto.com` and full browser environment globals. Test failures in sandbox environments are EXPECTED and not indicative of code issues.
- **CI Environment**: The GitHub Actions CI pipeline (`.github/workflows/ci.yml`) runs tests successfully with proper environment setup.

### Manual Validation Requirements
- Always run `npm run build` to ensure TypeScript compilation and bundling work
- Always run `npm run lint` and check for new warnings or errors  
- Always run `npm run typecheck` for TypeScript validation
- Always run `npm test` as part of validation (expect failures in sandbox)
- Test development server starts: `npm run dev` should start server on localhost:5173
- Verify documentation generates: `npm run typedoc` should create docs in `./docs`

### Pre-commit Validation Process
- Run all validation commands: `npm run lint`, `npm run typecheck`, `npm test`
- Use conventional commit format (enforced by commitlint)
- **Important**: Use `git commit --no-verify` to avoid Husky pipeline errors
- CI will fail if linting errors exist

## Repository Structure

### Key Directories
- `src/` - Source code
  - `src/components/` - React components (NostoProvider, NostoPlacement, etc.)
  - `src/hooks/` - React hooks (useNosto*, useLoadClientScript, etc.)
  - `src/utils/` - Utility functions and types
  - `src/context.ts` - React context for Nosto
  - `src/index.ts` - Main export file
- `spec/` - Test files (vitest)
- `dist/` - Build output (ES/UMD modules + TypeScript definitions)
- `docs/` - Generated TypeDoc documentation

### Important Files
- `package.json` - Dependencies and scripts
- `vite.config.js` - Vite configuration for building
- `tsconfig.json` - TypeScript configuration  
- `eslint.config.mjs` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `.github/workflows/ci.yml` - CI pipeline configuration

## Quick Reference Commands

```bash
# Initial setup - Node.js 22 required
npm ci  # 90 seconds, NEVER CANCEL

# Validation pipeline
npm run typecheck  # TypeScript validation (2 seconds)
npm run lint      # ESLint validation (1 second)
npm test          # Test with coverage (may fail in sandbox)
npm run build     # Full build pipeline (12 seconds)

# Development
npm run dev       # Start dev server (1 second)
npm run typedoc   # Generate docs (4 seconds)

# Git workflow
git commit --no-verify -m "feat: conventional commit message"
```

## GitHub Action Plugins – Review Checklist

When reviewing pull requests that add or update GitHub Action plugins, Copilot should check each item and output this checklist in its review comment or summary.  
If scan results are not yet available, mark as pending and update after results are attached or after invoking `@copilot` for scanning.

- **Pinning:**
  - [ ] Are all GitHub Actions pinned to a specific commit SHA (not a tag such as `@v3`, `@main`, or `@latest`)?
- **Vulnerability Scanning:**
  - [ ] Has a vulnerability scan been performed for each new/updated Action SHA?
    - If not available, mark as ⬜ Pending.
- **No Critical Vulnerabilities:**
  - [ ] Has it been confirmed that no Action at the specified SHA has critical vulnerabilities?
    - If not available, mark as ⬜ Pending.

**Note:** If a SHA for a plugin was previously scanned in a Nosto repo `[Nosto/REPO]`, you may reference that result here.
