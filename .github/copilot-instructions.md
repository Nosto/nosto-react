# Instructions for GitHub Copilot

**ALWAYS follow these instructions first and only use additional search or bash commands if the information here is incomplete or found to be in error.**

## Repository Overview

Nosto React is a React component library for implementing Nosto personalization features. It's a TypeScript library that builds both ES and UMD modules using Vite, with comprehensive test coverage requirements (80% threshold).

## Essential Setup Requirements

### Core Validation Commands
- **Type checking**: `npm run typecheck` - runs TypeScript compiler (~2 seconds)
- **Linting**: `npm run lint` - runs ESLint on TypeScript files (~1 second)  
- **Testing**: `npm test` - runs vitest with coverage (~varies, may fail in sandbox environments)
- **Full build**: `npm run build` - complete build pipeline (~12 seconds)

### Git Workflow
- **Commit format**: Always use conventional commit format (enforced by commitlint)
- **Commit command**: Use `git commit --no-verify` to avoid Husky pipeline errors
- Husky runs commit message validation via `.husky/commit-msg`

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
