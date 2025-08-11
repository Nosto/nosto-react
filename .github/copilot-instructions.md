# Instructions for GitHub Copilot

## Coding standards

* Use closures over classes
* Utilize type inference in return types, except for functions with multiple return statements
* Use utility types to derive types from constants
* Use const (and let) over var
* Avoid 'any' type usage
* Use async/await instead of Promise chaining
* Use individual named exports over bulk exports
* Favor named exports over default exports

## Testing

* Use vitest as the test framework
* Use 'describe' and 'it' for test structure
* Use 'beforeEach' for setup
* Use 'afterEach' for cleanup
* Use 'expect' for assertions

## Build

* `npm ci` - Install dependencies (preferred over `npm install` for CI/CD and clean installs)
* `npm run build` - Main build script: compiles TypeScript, runs linting, bundles with Vite, and generates documentation
* `npm run lint` - Run ESLint to check code quality and style
* `npm run prettier:fix` - Run Prettier with auto-fix to automatically format code (run before commit)
* `npm test` - Run test suite with vitest including coverage reporting
* 
## Commits

* Use conventional commits format: `<type>(<scope>): <subject>`
