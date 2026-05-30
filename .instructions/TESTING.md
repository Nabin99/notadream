# Testing Guide - NotADream

This document provides comprehensive information about the testing infrastructure, running tests, and troubleshooting common issues.

## 📋 Table of Contents

- [Test Frameworks](#test-frameworks)
- [Quick Start](#quick-start)
- [Running Tests](#running-tests)
- [Test Configuration](#test-configuration)
- [Coverage Requirements](#coverage-requirements)
- [Troubleshooting](#troubleshooting)
- [CI/CD Integration](#cicd-integration)

---

## Test Frameworks

NotADream uses a mix of testing frameworks optimized for different package types:

### **Jest**
Used for Node.js and Next.js packages:
- **libs/backend** - Backend utilities testing
- **apps/blogs** - Next.js blog platform
- **apps/portfolio-nextjs** - Next.js portfolio

**Key Configuration:**
- Environment: `jsdom` (React components) or `node` (backend)
- Preset: `ts-jest` for TypeScript support
- Workers: Single-threaded (`maxWorkers: 1`) to prevent resource exhaustion
- Timeout: 10 seconds

### **Vitest**
Used for Vite-based React applications:
- **libs/react** - React components library
- **apps/api** - Fastify API server
- **apps/admin** - React admin dashboard
- **apps/portfolio** - Vite React portfolio

**Key Configuration:**
- Environment: `jsdom` (React) or `node` (APIs)
- Test Script: `vitest run` (not `vitest` alone - see [Troubleshooting](#watch-mode-freezing))
- Timeout: 10 seconds

---

## Quick Start

```bash
# Run all tests (serial execution - recommended)
pnpm test

# Run tests in parallel (for CI environments)
pnpm test:parallel

# Run unit tests only
pnpm test:unit

# Run tests with coverage report
pnpm test:coverage

# Watch mode (for development)
pnpm test:watch

# Run specific package tests
cd apps/portfolio && pnpm test
cd libs/react && pnpm test
```

---

## Running Tests

### **All Tests (Serial)**

```bash
pnpm test
```

Runs all tests in packages sequentially. Recommended for local development as it:
- Prevents resource exhaustion
- Provides clear output per package
- Doesn't freeze system with multiple jsdom environments

### **All Tests (Parallel - CI)**

```bash
pnpm test:parallel
```

Runs all tests in parallel. Use in CI environments or on high-performance machines.

### **Unit Tests Only**

```bash
pnpm test:unit
```

Runs only unit test suites across all packages.

### **Integration Tests**

```bash
pnpm test:integration
```

Runs integration test suites (currently: Firebase integration tests in portfolio-nextjs).

### **Coverage Reports**

```bash
pnpm test:coverage
```

Generates coverage reports for all packages with HTML reports at:
- `libs/backend/coverage/index.html`
- `libs/react/coverage/index.html`
- `apps/api/coverage/index.html`
- `apps/admin/coverage/index.html`
- `apps/blogs/coverage/index.html`
- `apps/portfolio/coverage/index.html`
- `apps/portfolio-nextjs/coverage/index.html`

### **Watch Mode (Development)**

```bash
# Watch all tests
pnpm test:watch

# Watch specific package
cd apps/portfolio && pnpm test:watch
cd libs/react && pnpm test:watch
```

Re-runs tests on file changes. Useful during development.

---

## Test Configuration

### **Test Directory Structure**

All tests follow consistent naming and location patterns:

```
package/
├── src/
│   ├── __tests__/
│   │   ├── setup.ts          # Test environment setup
│   │   ├── Component.test.tsx # React component tests
│   │   └── util.test.ts      # Utility function tests
│   └── (source files)
```

### **Setup Files**

Some packages include test setup files for environment configuration:

- **libs/react/src/__tests__/setup.ts** - Mock browser APIs (matchMedia, IntersectionObserver)
- **apps/admin/src/__tests__/setup.ts** - Test environment configuration
- **apps/portfolio/src/__tests__/setup.ts** - Router and store setup
- **apps/portfolio-nextjs/__tests__/setup.ts** - Firebase mocks, environment variables

### **Config Files**

#### Jest Configuration
- **libs/backend/jest.config.cjs**
- **apps/blogs/jest.config.js**
- **apps/portfolio-nextjs/jest.config.cjs**

Key settings:
```javascript
{
  maxWorkers: 1,           // Single-threaded execution
  testTimeout: 10000,      // 10 second timeout
  testEnvironment: "jsdom" // or "node"
}
```

#### Vitest Configuration
- **libs/react/vitest.config.ts**
- **apps/api/vitest.config.ts**
- **apps/admin/vitest.config.ts**
- **apps/portfolio/vitest.config.ts**

Key settings:
```typescript
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom", // or "node"
    setupFiles: ["./src/__tests__/setup.ts"],
  },
});
```

---

## Coverage Requirements

All packages enforce minimum coverage thresholds:

```javascript
coverageThreshold: {
  global: {
    branches: 50,
    functions: 50,
    lines: 50,
    statements: 50,
  },
}
```

**Coverage Target**: 50% for all metrics
- **Branches**: Decision points (if/else)
- **Functions**: Function coverage
- **Lines**: Line-by-line coverage
- **Statements**: Statement coverage

To view coverage details, run:
```bash
pnpm test:coverage
open libs/react/coverage/index.html
```

---

## Troubleshooting

### Watch Mode Freezing

**Problem**: Running `vitest` in watch mode causes tests to hang indefinitely.

**Solution**: Always use `vitest run` for CI/script execution:

```json
// ✅ CORRECT - Test script in package.json
"test": "vitest run"

// ❌ WRONG - This enters watch mode and never exits
"test": "vitest"
```

Watch mode is only for local development:
```bash
# ✅ Development: Use watch mode explicitly
pnpm test:watch

# ✅ CI/Scripts: Use run mode (exits after tests complete)
pnpm test:unit:ci
```

### Tests Timeout

If tests timeout with error: `Timeout - Async callback was not invoked within the 10000ms timeout`

**Solutions:**

1. **Increase timeout** (if tests genuinely need more time):
```typescript
// In your test file
describe("Slow Tests", () => {
  it("should complete", async () => {
    // test code
  }, 30000); // 30 second timeout
});
```

2. **Check for infinite loops** in async operations
3. **Mock external services** to prevent network delays
4. **Run individual package tests** to isolate the issue:
```bash
cd apps/portfolio && pnpm test
```

### High CPU/Memory Usage

**Problem**: Tests consume excessive resources during parallel execution.

**Solutions:**

1. **Use serial execution** (default):
```bash
pnpm test  # Runs packages one at a time
```

2. **Limit parallel workers** (if running parallel):
Individual Jest configs already set `maxWorkers: 1`

3. **Check for infinite subscriptions** in Firebase/real-time code:
```typescript
// ✅ GOOD - Unsubscribe in cleanup
afterEach(() => {
  unsubscribe?.();
});

// ❌ BAD - Leaves listeners active
it("should fetch data", () => {
  const unsubscribe = collection.onSnapshot(callback);
  // No cleanup!
});
```

### "Cannot find module" Errors

**Problem**: Tests can't resolve imports or modules.

**Solutions:**

1. **Run pnpm install** to ensure all dependencies are installed:
```bash
pnpm install
```

2. **Check for missing @notadream imports** - verify monorepo packages are listed in dependencies:
```json
{
  "dependencies": {
    "@notadream/react": "workspace:^",
    "@notadream/backend": "workspace:^"
  }
}
```

3. **Clear cache**:
```bash
rm -rf node_modules/.vite node_modules/.vitest
pnpm install
```

### Tests Pass Locally but Fail in CI

**Causes:**
- Environment variables not set
- Database/Firebase not configured
- Timing differences in CI environment

**Solutions:**

1. **Set environment variables** in CI configuration:
```yaml
env:
  NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
```

2. **Mock external services** instead of making real requests:
```typescript
jest.mock("firebase/firestore");
```

3. **Run tests with CI flag**:
```bash
pnpm run test:ci
```

---

## CI/CD Integration

### GitHub Actions

Tests can be integrated into GitHub Actions workflows:

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm test:ci
```

### Local CI Simulation

To simulate CI environment locally:

```bash
# Run tests in CI mode (serial, with coverage)
pnpm run test:ci
```

---

## Test Statistics

Current test coverage across packages:

| Package | Framework | Tests | Type |
|---------|-----------|-------|------|
| libs/backend | Jest | 23 | Unit |
| libs/react | Vitest | 24 | Unit + Component |
| apps/api | Vitest | 11 | Unit + Integration |
| apps/admin | Vitest | 9 | Component |
| apps/blogs | Jest | 12 | Component |
| apps/portfolio | Vitest | 6 | Component |
| apps/portfolio-nextjs | Jest | 7 | Unit + Integration |
| **TOTAL** | - | **92+** | - |

---

## Best Practices

1. **Use `vitest run` in scripts** - Never use bare `vitest` in package.json test scripts
2. **Mock external services** - Don't make real API calls or Firebase queries
3. **Clean up after tests** - Unsubscribe from listeners, clear timers
4. **Use descriptive test names** - Make it clear what's being tested
5. **Keep coverage threshold in check** - Maintain minimum 50% coverage
6. **Test user behavior** - Focus on how users interact, not implementation details
7. **Run tests before committing** - Use pre-commit hooks to catch issues early

---

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
