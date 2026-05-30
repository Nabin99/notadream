# Development Workflow & Best Practices

## Setting Up Your Environment

### Prerequisites
- Node.js 20 LTS
- pnpm 9.15.9
- Git
- Docker (optional, for containerized development)
- VS Code (recommended with extensions)

### Initial Setup

```bash
# Clone repository
git clone <repo-url>
cd notadream

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env

# Verify setup
node --version       # v20.x.x
pnpm --version      # 9.15.9
npm list -g pnpm    # Verify global installation
```

### VS Code Extensions

Recommended for better development experience:

```
ESLint
TypeScript Vue Plugin (Volar)
Prettier - Code formatter
GitLens
Thunder Client (API testing)
PostgreSQL (database management)
```

## Development Workflow

### Starting Development

**Option 1: Start all apps**
```bash
pnpm run dev
```

This starts all applications with hot reload:
- API on http://localhost:4000
- Admin on http://localhost:4001 (dev)
- Blogs on http://localhost:4002 (dev)
- Portfolio on http://localhost:4003 (dev)
- Portfolio-NextJS on http://localhost:3000 (dev)

**Option 2: Start specific app**
```bash
cd apps/portfolio
pnpm run dev
# Opens on http://localhost:5173
```

**Option 3: Start with Docker**
```bash
docker-compose up -d
# Access apps at assigned ports
```

### Making Changes

#### 1. Create Feature Branch
```bash
git checkout -b feature/my-feature
# or
git checkout -b bugfix/issue-description
```

#### 2. Edit Code with Hot Reload
Changes are automatically reflected in browser (Frontend) or server (Backend).

#### 3. Run Type Checking
```bash
# Check whole project
pnpm run type-check

# Or specific app
cd apps/portfolio && pnpm run type-check
```

#### 4. Lint Code
```bash
pnpm run lint
```

#### 5. Commit Changes
```bash
git add .
git commit -m "feat: description" # follows conventional commits
```

#### 6. Push and Create PR
```bash
git push origin feature/my-feature
# Create pull request on GitHub
```

## Working with Specific Applications

### Frontend App Development (Vite)

```bash
cd apps/portfolio
pnpm run dev
# Dev server with hot reload
# Changes to .tsx/.ts/.css files auto-reload
```

**Tips**:
- Use browser DevTools (F12)
- React DevTools extension helps debug
- Check console for build errors

### Frontend App Development (Next.js)

```bash
cd apps/blogs
pnpm run dev
# Next.js dev server with hot reload
# File-based routing - create files in app/ to add routes
```

**Tips**:
- Next.js automatically creates routes from file structure
- Use pages/api/ for API routes
- Middleware in middleware.ts for request interception

### Backend Development

```bash
cd apps/api
pnpm run dev
# Fastify server with hot reload
# Changes trigger server restart
```

**Tips**:
- Use Thunder Client or Postman for API testing
- Check logs for errors and debug info
- Use logger utility from @notadream/backend

### Library Development

When working on shared libraries:

```bash
cd libs/react
pnpm run build
# or watch mode for auto-rebuild
pnpm run dev
```

Then import in apps:
```typescript
import { Button } from '@notadream/react/components';
```

## Testing During Development

### Running Tests

```bash
# Run all tests (serial - recommended)
pnpm test

# Run tests in watch mode (auto-rerun on changes)
pnpm test:watch

# Run tests for specific package
cd apps/portfolio && pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

### Test Frameworks

- **Jest**: Used for `libs/backend`, `apps/blogs`, `apps/portfolio-nextjs`
- **Vitest**: Used for `libs/react`, `apps/api`, `apps/admin`, `apps/portfolio`

### Writing Tests

```typescript
// Example: Component test
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('should render with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});

// Example: Utility test
import { buildQuery } from './query-builder';

describe('buildQuery', () => {
  it('should build valid SQL', () => {
    const result = buildQuery({ table: 'users' });
    expect(result).toBe('SELECT * FROM users');
  });
});
```

### Coverage Requirements

Minimum coverage threshold: **50%** across all metrics
- Branches
- Functions  
- Lines
- Statements

View coverage: `open apps/portfolio/coverage/index.html`

### Pre-commit Testing

Tests run automatically before committing (via Husky):
```bash
git commit -m "feat: new feature"
# Husky runs linting, type-check, and tests
# Commit only succeeds if all pass
```

For detailed testing guide, see [TESTING.md](../../TESTING.md)

## Git Workflow

### Branch Naming Convention
```
feature/add-login
bugfix/fix-navigation
docs/update-readme
refactor/reorganize-components
```

### Commit Message Convention

Follow conventional commits:
```
feat: add new feature
fix: fix a bug
docs: documentation updates
style: formatting changes
refactor: code reorganization
test: add/update tests
chore: maintenance tasks
```

### Creating Pull Request

```bash
git push origin feature/my-feature
# Then create PR on GitHub with:
# - Clear title
# - Description of changes
# - Reference any issues
# - Screenshots if UI changes
```

## Code Organization

### File Structure Best Practices

```
apps/portfolio/src/
├── components/          # Reusable React components
├── pages/               # Page components
├── layouts/             # Layout components
├── utils/               # Helper functions
├── hooks/               # Custom React hooks
├── store/               # State management
├── styles/              # CSS modules
├── assets/              # Images, fonts, etc
├── config/              # Configuration files
└── types/               # TypeScript types
```

### Component Examples

**Component with props**:
```typescript
// components/Button.tsx
interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({
  label,
  onClick,
  variant = 'primary',
  disabled = false
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}
```

**Using the component**:
```typescript
// pages/MyPage.tsx
import { Button } from '../components/Button';

export function MyPage() {
  return (
    <Button
      label="Click me"
      variant="primary"
      onClick={() => console.log('clicked')}
    />
  );
}
```

### Using Shared Libraries

**Import from @notadream/react**:
```typescript
import { useTheme } from '@notadream/react/hooks';
import { Button } from '@notadream/react/components';

function MyApp() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div style={{ background: theme.colors.background }}>
      <Button onClick={toggleTheme}>Toggle</Button>
    </div>
  );
}
```

## Testing Locally

### Type Checking
```bash
# Check TypeScript in all packages
pnpm run type-check

# Or specific package
cd apps/portfolio && pnpm run type-check
```

### Building for Production
```bash
# Build all apps
pnpm run build

# Build specific app
cd apps/portfolio && pnpm run build

# Check build output
ls -la apps/portfolio/dist/
```

### Testing with Docker

```bash
# Build Docker image for app
docker build -f ./apps/portfolio/docker/Dockerfile -t notadream-portfolio .

# Run specific container
docker run -p 4003:4003 notadream-portfolio

# Test with curl
curl http://localhost:4003
```

## Debugging

### Browser DevTools
```
F12 or Right-click → Inspect
- Elements: Check HTML structure
- Console: See logs and errors
- Network: Check API calls
- Sources: Debug JavaScript
```

### React DevTools
Install extension to inspect React component tree:
- Check props passed to components
- Track state changes
- Profile performance

### VS Code Debugger

**Create .vscode/launch.json**:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "API",
      "program": "${workspaceFolder}/apps/api/src/index.ts",
      "preLaunchTask": "tsc",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"]
    }
  ]
}
```

### Logging

**In React component**:
```typescript
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    console.log('Component mounted');
    return () => console.log('Component unmounted');
  }, []);
  
  return <div>Hello</div>;
}
```

**In Fastify API**:
```typescript
import { logger } from '@notadream/backend/utils';

fastify.get('/api/route', (request, reply) => {
  logger.info('Route accessed', { userId: request.user?.id });
  return { message: 'ok' };
});
```

## Common Development Tasks

### Adding a New Dependency

```bash
# Add to specific app
cd apps/portfolio
pnpm add package-name

# Add as dev dependency
pnpm add -D package-name

# Add to root workspace (rare)
pnpm add -w package-name
```

### Updating Dependencies

```bash
# Check outdated packages
pnpm outdated

# Update all packages
pnpm update

# Update specific package
pnpm add package-name@latest
```

### Cleaning Up

```bash
# Remove node_modules and lock file
rm -rf node_modules pnpm-lock.yaml

# Reinstall everything
pnpm install

# Clean build artifacts
rm -rf dist apps/*/dist libs/*/dist
```

## Performance Optimization

### Build Performance
```bash
# Use Turbo caching
turbo run build

# Or rebuild specific app
turbo run build --filter=portfolio
```

### Development Performance
```bash
# Reduce hot reload frequency
# Check tsconfig for include/exclude patterns

# Use smaller import paths
import { Button } from '@notadream/react/components';  // Better
import Button from '@notadream/react/components/Button'; // Slower
```

### Code Splitting
Vite and Next.js automatically handle code splitting:
- Dynamic imports for route-based code splitting
- Tree-shaking removes unused code
- Lazy loading of components

```typescript
// Dynamic import
const MyComponent = dynamic(() => import('./MyComponent'));

// Lazy component
const LazyComponent = lazy(() => import('./LazyComponent'));
```

## Documentation

### When Adding New Features

1. Update relevant app README
2. Add JSDoc comments to functions
3. Update [.knowledge-base](./README.md) docs if significant
4. Add TypeScript types for clarity

### Good JSDoc Example

```typescript
/**
 * Fetches user data from the API
 * @param userId - The ID of the user to fetch
 * @returns Promise with user data
 * @throws Error if user not found
 * @example
 * const user = await fetchUser('123');
 */
export async function fetchUser(userId: string) {
  // implementation
}
```

## Troubleshooting

### "Cannot find module" errors
```bash
# Ensure dependencies installed
pnpm install

# Check import paths
# Should use @notadream/* for shared libraries
```

### Hot reload not working
```bash
# Restart dev server
Ctrl+C to stop
pnpm run dev

# Check file is saved
# Browser cache might need clearing
```

### Build errors
```bash
# Type check first
pnpm run type-check

# Clean and rebuild
rm -rf dist
pnpm run build
```

### Port conflicts
```bash
# Change port in .env or app config
# Or find and kill existing process
lsof -i :4000
kill -9 <PID>
```

---

**See Also**:
- [08-quick-reference.md](./08-quick-reference.md) - Quick commands
- [04-configuration.md](./04-configuration.md) - Config details
- [09-known-issues.md](./09-known-issues.md) - Known problems

**Last Updated**: May 27, 2026
