---
applyTo: "spec/**/*"
---

# Testing Instructions

## Testing Standards

### Test Framework and Structure
- Use vitest as the test framework
- Use 'describe' and 'it' for test structure
- Use 'beforeEach' for setup
- Use 'afterEach' for cleanup  
- Use 'expect' for assertions
- Test files located in `spec/` directory
- Tests require JSDOM environment for React component testing

### Test Environment Setup
- Tests use JSDOM for browser environment simulation (see `spec/setup.js`)
- React DOM testing with `@testing-library/react`
- Comprehensive test coverage requirements (80% threshold for statements, branches, lines, and functions)

## Test File Organization

### Test Directory Structure
- `spec/` - All test files
- `spec/setup.js` - Test environment setup with JSDOM
- `spec/mocks/` - Mock data and utilities
- Test files follow `*.spec.ts` or `*.spec.tsx` naming convention

### Testing Dependencies
- `@testing-library/react` - React component testing
- `@testing-library/jest-dom` - Jest DOM matchers
- `@testing-library/user-event` - User interaction simulation
- `vitest` - Test runner and assertions
- `@vitest/coverage-v8` - Coverage reporting
- `jsdom` - Browser environment simulation