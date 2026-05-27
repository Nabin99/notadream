# Shared Libraries Documentation

## Overview

The NotADream monorepo includes 2 shared libraries that provide reusable functionality across all applications.

---

## 1. @notadream/react

**Location**: `libs/react/`  
**Purpose**: Shared React components, hooks, utilities, and theming  
**Used By**: All React-based applications (portfolio, admin)  
**Type**: ESM + UMD + TypeScript

### Directory Structure

```
libs/react/
├── src/
│   ├── index.ts                 # Main export
│   ├── assets/                  # Images, icons, fonts
│   ├── components/              # React components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Navigation.tsx
│   │   └── ... (more components)
│   ├── config/                  # Configuration
│   ├── forms/                   # Form components
│   ├── hooks/                   # Custom React hooks
│   │   ├── useTheme.ts
│   │   ├── useI18n.ts
│   │   └── ... (more hooks)
│   ├── i18n/                    # Internationalization
│   │   ├── en.json
│   │   ├── fr.json
│   │   └── setup.ts
│   ├── page-layouts/            # Layout components
│   ├── pages/                   # Page components
│   ├── routing/                 # Routing utilities
│   ├── theme-engine/            # Theme system
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── themes.ts
│   └── utils/                   # Utility functions
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Main Exports

#### Components
```typescript
// UI Components
import {
  Button,
  Card,
  Navigation,
  // ... more components
} from '@notadream/react/components';
```

#### Hooks
```typescript
// Custom hooks
import {
  useTheme,
  useI18n,
  // ... more hooks
} from '@notadream/react/hooks';
```

#### Utilities
```typescript
// Helper functions and utilities
import {
  formatDate,
  parseJSON,
  // ... more utilities
} from '@notadream/react/utils';
```

#### Theme Engine
```typescript
// Theme system
import {
  lightTheme,
  darkTheme,
  applyTheme,
} from '@notadream/react/theme-engine';
```

#### Internationalization
```typescript
// i18n setup and translations
import {
  i18n,
  useTranslation,
} from '@notadream/react/i18n';

// Translations
const translations = {
  en: require('./i18n/en.json'),
  fr: require('./i18n/fr.json'),
};
```

### Key Features

#### 1. Theme System
Provides customizable theming across all apps:
```typescript
import { useTheme } from '@notadream/react/hooks';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div style={{ background: theme.colors.background }}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

#### 2. Internationalization (i18n)
Multi-language support:
```typescript
import { useI18n } from '@notadream/react/hooks';

function MyComponent() {
  const { t, language, setLanguage } = useI18n();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => setLanguage('fr')}>Français</button>
    </div>
  );
}
```

#### 3. Routing Utilities
Helper functions for routing:
```typescript
import { useNavigate, useParams } from '@notadream/react/routing';

function MyComponent() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  return <button onClick={() => navigate('/home')}>Go Home</button>;
}
```

#### 4. Reusable Components
Pre-built UI components:
```typescript
import { Button, Card, Navigation } from '@notadream/react/components';

function MyApp() {
  return (
    <div>
      <Navigation />
      <Card>
        <Button onClick={() => alert('Clicked!')}>Click Me</Button>
      </Card>
    </div>
  );
}
```

### Configuration

**tsconfig.json** in library:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "jsx": "react-jsx",
    "module": "ESNext"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

### Build Configuration

**vite.config.ts**:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'NotAdreamReact',
      formats: ['es', 'umd']
    }
  }
});
```

### Build & Publishing

```bash
# Build library
cd libs/react
pnpm run build

# Output files
dist/
├── notadream-react.js       # UMD format
├── notadream-react.mjs      # ESM format
└── index.d.ts              # TypeScript definitions
```

### Usage in Applications

**In React/Vite app** (portfolio, admin):
```typescript
// Import from shared library
import { Button, useTheme } from '@notadream/react/components';
import { useI18n } from '@notadream/react/hooks';

// Use in component
function Dashboard() {
  const { t } = useI18n();
  const { theme } = useTheme();
  
  return (
    <div>
      <h1>{t('dashboard')}</h1>
      <Button>{t('submit')}</Button>
    </div>
  );
}
```

---

## 2. @notadream/backend

**Location**: `libs/backend/`  
**Purpose**: Shared backend utilities, helpers, and middleware  
**Used By**: API (and potentially other backend services)  
**Type**: ESM + TypeScript

### Directory Structure

```
libs/backend/
├── src/
│   ├── index.ts                 # Main export
│   ├── utils/                   # Utility functions
│   │   ├── logger.ts
│   │   ├── errors.ts
│   │   └── ... (more utilities)
│   ├── middleware/              # Middleware functions
│   │   ├── auth.ts
│   │   ├── validation.ts
│   │   └── ... (more middleware)
│   ├── types/                   # Shared types
│   └── constants/               # Constants
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Main Exports

#### Utilities
```typescript
import {
  logger,
  createError,
  validateEmail,
  // ... more utilities
} from '@notadream/backend/utils';
```

#### Middleware
```typescript
import {
  authMiddleware,
  validationMiddleware,
  // ... more middleware
} from '@notadream/backend/middleware';
```

#### Types
```typescript
import {
  User,
  BlogPost,
  // ... more types
} from '@notadream/backend/types';
```

### Key Features

#### 1. Logger
Structured logging:
```typescript
import { logger } from '@notadream/backend/utils';

logger.info('User logged in', { userId: 123 });
logger.error('Database error', { error: err });
logger.debug('Debug info', { data });
```

#### 2. Error Handling
Custom error classes:
```typescript
import { ApiError, ValidationError } from '@notadream/backend/utils';

throw new ValidationError('Invalid email');
throw new ApiError('Not found', 404);
```

#### 3. Validation
Input validation helpers:
```typescript
import { validateEmail, validatePassword } from '@notadream/backend/utils';

if (!validateEmail(email)) {
  throw new ValidationError('Invalid email');
}
```

#### 4. Middleware
Reusable middleware functions:
```typescript
import { authMiddleware, corsMiddleware } from '@notadream/backend/middleware';

// In Fastify setup
app.register(corsMiddleware);
app.register(authMiddleware);
```

### Configuration

**tsconfig.json** in library:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "declaration": true,
    "strict": true
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

### Build & Publishing

```bash
# Build library
cd libs/backend
pnpm run build

# Output files
dist/
├── index.js
├── utils.js
├── middleware.js
├── types.d.ts
└── ... (compiled files)
```

### Usage in Backend

**In Fastify API** (apps/api):
```typescript
import Fastify from 'fastify';
import { logger, authMiddleware } from '@notadream/backend';

const fastify = Fastify();

// Use shared middleware
fastify.register(authMiddleware);

// Use shared logger
logger.info('Server started');

// Handle routes
fastify.get('/api/health', async (request, reply) => {
  logger.info('Health check');
  return { status: 'ok' };
});
```

---

## Adding to Libraries

### Adding a New Component to @notadream/react

```bash
# Create component file
# libs/react/src/components/MyComponent.tsx

export interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

export function MyComponent({ title, onClick }: MyComponentProps) {
  return <button onClick={onClick}>{title}</button>;
}
```

**Export from index.ts**:
```typescript
// libs/react/src/index.ts
export { MyComponent } from './components/MyComponent';
export type { MyComponentProps } from './components/MyComponent';
```

**Use in apps**:
```typescript
import { MyComponent } from '@notadream/react/components';
```

### Adding a Utility to @notadream/backend

```typescript
// libs/backend/src/utils/myUtil.ts
export function myHelper(input: string): string {
  return input.toUpperCase();
}
```

**Export from index.ts**:
```typescript
// libs/backend/src/index.ts
export { myHelper } from './utils/myUtil';
```

**Use in API**:
```typescript
import { myHelper } from '@notadream/backend/utils';
```

---

## Building Libraries

### Build All Libraries
```bash
cd libs/react
pnpm run build

cd libs/backend
pnpm run build
```

### Build with Turbo
```bash
# Build from root
turbo run build --filter=@notadream/react
turbo run build --filter=@notadream/backend
```

### Check Build Output
```bash
ls -la libs/react/dist/
ls -la libs/backend/dist/
```

---

## Testing Libraries

```bash
# In library folder
cd libs/react
pnpm run test

# Or from root
turbo run test --filter=@notadream/react
```

---

## Documentation Map

- **Architecture**: See [01-architecture.md](./01-architecture.md)
- **Applications**: See [02-applications.md](./02-applications.md)
- **Configuration**: See [04-configuration.md](./04-configuration.md)
- **Development**: See [05-development-workflow.md](./05-development-workflow.md)

---

**Last Updated**: May 27, 2026
