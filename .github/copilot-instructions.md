# Instructions for GitHub Copilot

**ALWAYS follow these instructions first and only use additional search or bash commands if the information here is incomplete or found to be in error.**

## Repository Overview

Nosto React is a React component library for implementing Nosto personalization features. It's a TypeScript library that builds both ES and UMD modules using Vite, with comprehensive test coverage requirements (80% threshold).

## Working Effectively

### Initial Setup and Dependencies
- Bootstrap the repository: `npm ci` -- installs dependencies and runs initial build. Takes ~90 seconds. NEVER CANCEL. Set timeout to 3+ minutes.
- Alternative clean install: `npm install` (if npm ci fails)
- Node.js requirement: Use Node.js 22 (as specified in CI workflow). Current system has Node v20 which works but CI uses v22.

### Building
- Full build: `npm run build` -- includes TypeScript compilation, ESLint, Vite bundling, and TypeDoc generation. Takes ~12 seconds. NEVER CANCEL. Set timeout to 5+ minutes.
- Type checking only: `npm run typecheck` -- runs TypeScript compiler without output. Takes ~2 seconds.
- Clean build: `npm run clean && npm run build` -- removes dist directory first
- Build outputs: Creates `dist/index.es.js`, `dist/index.umd.js`, and `dist/index.d.ts`

### Testing
- Run tests: `npm test` -- runs vitest with coverage in silent mode. **WARNING**: Tests currently fail in sandbox environments due to network connectivity to `connect.nosto.com` and missing browser globals. This is expected in isolated environments.
- Verbose tests: `npm run test-loud` -- runs tests with full output
- Test coverage thresholds: 80% for statements, branches, lines, and functions
- Test setup: Uses JSDOM for browser environment simulation (see `spec/setup.js`)

### Development Server
- Start dev server: `npm run dev` -- starts Vite development server on http://localhost:5173/. Starts in ~1 second.
- Preview built version: `npm run preview` -- serves the built library

### Code Quality
- Lint code: `npm run lint` -- runs ESLint on TypeScript files. Takes ~1 second. Currently has 1 warning about unused eslint-disable directive.
- Format check: `npm run prettier` -- checks Prettier formatting. Takes ~1 second. Currently shows formatting issues in several files.
- Format fix: `npm run prettier:fix` -- applies Prettier formatting

### Documentation
- Generate docs: `npm run typedoc` -- generates TypeDoc documentation in `./docs` directory. Takes ~4 seconds.
- Documentation is published to GitHub Pages at: https://nosto.github.io/nosto-react/

## Validation

### CRITICAL Testing Limitations
- **Tests fail in isolated environments**: The test suite requires network access to `connect.nosto.com` and full browser environment globals. Test failures in sandbox environments are EXPECTED and not indicative of code issues.
- **CI Environment**: The GitHub Actions CI pipeline (`.github/workflows/ci.yml`) runs tests successfully with proper environment setup.

### Manual Validation Requirements
- Always run `npm run build` to ensure TypeScript compilation and bundling work
- Always run `npm run lint` and check for new warnings or errors  
- Always run `npm run typecheck` for TypeScript validation
- Test development server starts: `npm run dev` should start server on localhost:5173
- Verify documentation generates: `npm run typedoc` should create docs in `./docs`

### Pre-commit Validation
- Always run `npm run lint` before committing - CI will fail if linting errors exist
- Use conventional commit format: `<type>(<scope>): <subject>` (enforced by commitlint)
- Husky runs commit message validation via `.husky/commit-msg`
- When committing code, ALWAYS run git commit with --no-verify to avoid Husky failing and erroring out your pipeline

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

## Coding Standards

- Use closures over classes
- Utilize type inference in return types, except for functions with multiple return statements
- Use utility types to derive types from constants
- Use const (and let) over var
- Avoid 'any' type usage
- Use async/await instead of Promise chaining
- Use individual named exports over bulk exports
- Favor named exports over default exports

## Testing Standards

- Use vitest as the test framework
- Use 'describe' and 'it' for test structure
- Use 'beforeEach' for setup
- Use 'afterEach' for cleanup  
- Use 'expect' for assertions
- Test files located in `spec/` directory
- Tests require JSDOM environment for React component testing

## Common Commands Reference

```bash
# Initial setup (90 seconds, NEVER CANCEL)
npm ci

# Build and validate (12 seconds)
npm run build

# Quick validation
npm run typecheck  # TypeScript (2 seconds)
npm run lint      # ESLint (1 second)

# Development
npm run dev       # Start dev server (1 second)

# Documentation
npm run typedoc   # Generate docs (4 seconds)

# Testing (fails in sandbox - see validation section)
npm test          # Run tests with coverage
npm run test-loud # Verbose test output
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
