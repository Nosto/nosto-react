# Coding Instructions for TypeScript/TSX Files

**applyTo**: "**/*.{ts,tsx}"

## Coding Standards

- Use closures over classes
- Utilize type inference in return types, except for functions with multiple return statements
- Use utility types to derive types from constants
- Use const (and let) over var
- Avoid 'any' type usage
- Use async/await instead of Promise chaining
- Use individual named exports over bulk exports
- Favor named exports over default exports

## Code Quality Requirements

### Linting
- Always run `npm run lint` before committing - CI will fail if linting errors exist
- Use ESLint configuration defined in `eslint.config.mjs`
- Address all linting warnings and errors

### Type Checking
- Always run `npm run typecheck` for TypeScript validation
- Ensure no TypeScript compilation errors
- Use proper TypeScript types and avoid `any` when possible

### Code Style
- Follow Prettier formatting rules defined in `.prettierrc`
- Use `npm run prettier:fix` to apply formatting automatically
- Maintain consistent code style across the project

## Repository Structure (TypeScript/React Context)

### Key Source Directories
- `src/components/` - React components (NostoProvider, NostoPlacement, etc.)
- `src/hooks/` - React hooks (useNosto*, useLoadClientScript, etc.)
- `src/utils/` - Utility functions and types
- `src/context.ts` - React context for Nosto
- `src/index.ts` - Main export file

### Important Configuration Files
- `tsconfig.json` - TypeScript configuration  
- `eslint.config.mjs` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `vite.config.js` - Vite configuration for building

## Build and Validation

### Node.js Requirement
- **Node.js 22 or higher required** (as specified in `package.json` engines field)
- CI environment uses Node.js 22 (see `.github/workflows/ci.yml`)

### Installation
- **Always use**: `npm ci` for dependency installation (takes ~90 seconds, never cancel)
- Alternative: `npm install` (if npm ci fails)
- Bootstrap includes initial build via husky prepare script

### Validation Commands
- **Type checking**: `npm run typecheck` - runs TypeScript compiler without output (~2 seconds)
- **Linting**: `npm run lint` - runs ESLint on TypeScript files (~1 second)
- **Full build**: `npm run build` - includes TypeScript compilation, ESLint, Vite bundling, and TypeDoc generation (~12 seconds)

### Pre-commit Process
- Always run validation commands before committing
- Use conventional commit format (enforced by commitlint)
- **Important**: Use `git commit --no-verify` to avoid Husky pipeline errors
- Commit message validation runs via `.husky/commit-msg`

## Development Workflow

### Building
- Full build: `npm run build` - includes TypeScript compilation, ESLint, Vite bundling, and TypeDoc generation
- Type checking only: `npm run typecheck` - runs TypeScript compiler without output
- Clean build: `npm run clean && npm run build` - removes dist directory first
- Build outputs: Creates `dist/index.es.js`, `dist/index.umd.js`, and `dist/index.d.ts`

### Development Server
- Start dev server: `npm run dev` - starts Vite development server on http://localhost:5173/
- Preview built version: `npm run preview` - serves the built library