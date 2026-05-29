# NotADream Monorepo - Comprehensive Project Documentation

**Last Updated**: May 27, 2026  
**Status**: ✅ Mostly Production-Ready (1 Known Issue)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Applications (apps/ folder)](#2-applications-apps-folder)
3. [Shared Libraries (libs/ folder)](#3-shared-libraries-libs-folder)
4. [Backend Services (services/ folder)](#4-backend-services-services-folder)
5. [Configuration Files](#5-configuration-files)
6. [Key Source Files Analysis](#6-key-source-files-analysis)
7. [Database & Infrastructure](#7-database--infrastructure)
8. [Development Workflow](#8-development-workflow)
9. [Known Issues & Blockers](#9-known-issues--blockers)
10. [File Organization](#10-file-organization)

---

## 1. Project Overview

### Purpose

NotADream is a comprehensive **personal portfolio and content ecosystem** designed to showcase a full-stack engineer's work. It provides multiple entry points (portfolio versions, blog platform, admin dashboard) using modern full-stack technologies, all orchestrated through a monorepo structure.

**Key Goals:**
- Quick delivery and scalable project management
- Demonstrate full-stack capabilities (React, Next.js, Fastify, TypeScript)
- Multiple portfolio versions for flexibility (Vite and Next.js)
- Content management and blogging platform
- RESTful API backend for all applications

### Technology Stack

#### Frontend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.0.0 | Core UI library |
| Next.js | 15.1.6 | SSR/SSG framework |
| Vite | 6.1.1 | Fast build tool |
| React Router DOM | 7.2.0 | Client-side routing |
| TypeScript | 5.6-5.7.3 | Type-safe development |
| Tailwind CSS | Latest | Utility-first CSS |
| React Hook Form | 7.54.2 | Form management |
| Zod | 3.24.2 | Schema validation |
| Headless UI | 2.2.0 | Unstyled UI components |

#### Backend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| Fastify | 5.2.1 | High-performance API framework |
| Node.js | 20+ | JavaScript runtime |
| TypeScript | 5.7.3 | Type-safe backend code |
| esbuild | 0.24.2 | Fast bundler |

#### DevOps & Tools
| Tool | Version | Purpose |
|-----|---------|---------|
| Turbo | 2.5.8 | Monorepo build orchestration |
| pnpm | 9.15.9 | Fast package manager |
| Docker | Latest | Containerization |
| Nginx | 1.23 | Web server / reverse proxy |
| ESLint | 8.57.1 | Code linting |
| Prettier | 3.5.1 | Code formatting |
| Husky | 9.1.7 | Git hooks |
| Commitlint | 19.7.1 | Commit message validation |

#### Database Support
- **PostgreSQL** 16.3 (optional, for relational data)
- **MongoDB** 7.0 (optional, for document storage)

### Architecture

**Monorepo Structure** using pnpm workspaces with Turbo:
```
notadream/
├── apps/                    # 5 applications
│   ├── api/                # Fastify REST API
│   ├── admin/              # React admin dashboard
│   ├── blogs/              # Next.js blog platform
│   ├── portfolio/          # Vite-based portfolio
│   └── portfolio-nextjs/   # Next.js portfolio
├── libs/                   # 2 shared libraries
│   ├── react/              # UI components & utilities
│   └── backend/            # Backend utilities
├── services/               # Infrastructure services (Docker Compose)
└── instructions/           # Documentation & guides
```

**Package Manager**: pnpm 9.15.9  
**Workspace Configuration**: pnpm-workspace.yaml  
**Build Orchestration**: Turbo 2.5.8  
**Container Orchestration**: Docker Compose  

---

## 2. Applications (apps/ folder)

### 2.1 Portfolio (Vite Version) - `apps/portfolio`

**Purpose**: High-performance static portfolio website using Vite.

**Tech Stack**:
- **Framework**: Vite 6.1.1 (lightning-fast build)
- **UI**: React 19.0 + Tailwind CSS
- **Routing**: React Router DOM 7.2.0 (client-side)
- **Internationalization**: i18n (en, fr)
- **Components**: @notadream/react library
- **Build Output**: Static HTML/CSS/JS
- **Server**: Nginx 1.23 (production)

**Entry Points**:
- Development: [http://localhost:4003](http://localhost:4003)
- Production Port: 4003
- Main Entry: `src/main.tsx`
- Root Component: `src/App.tsx`

**Key Features**:
- ✅ Client-side routing with React Router
- ✅ Theme management (light/dark mode with multi-color support)
- ✅ Multi-language support (i18n)
- ✅ EmailJS integration for contact forms
- ✅ Social media links integration
- ✅ Responsive design with Tailwind CSS
- ✅ Lazy-loaded pages for performance
- ✅ Compression with gzip (vite-plugin-compression)

**Project Structure**:
```
apps/portfolio/src/
├── main.tsx                  # React entry point
├── App.tsx                   # Root component
├── Routes.tsx                # Route definitions
├── config.ts                 # App configuration
├── pages/
│   ├── home/                # Homepage
│   ├── portfolio/           # Portfolio showcase
│   ├── about/               # About section
│   └── contact/             # Contact form
├── components/              # Reusable components
├── layouts/                 # Page layouts
├── i18n/                    # Internationalization
├── store/                   # State management
├── utils/                   # Helper functions
└── assets/                  # Images, styles
```

**Build Configuration** (`vite.config.ts`):
- CSS code splitting disabled
- HTML injection with metadata
- Compression enabled (level 9)
- Path alias: `@` → `./src`
- Port: 4003 (configurable via VITE_APP_PORT)

**Key Dependencies**:
- `@emailjs/browser` - Email sending
- `react-icons` - Icon library
- `react-toastify` - Toast notifications
- `@notadream/react` - Shared components

**Docker Setup**:
- Multi-stage build (deps → build → nginx)
- Vite build output → Nginx HTML directory
- Nginx reverse proxy on port 4003
- Gzip compression enabled

---

### 2.2 Portfolio (Next.js Version) - `apps/portfolio-nextjs`

**Purpose**: Modern SSR/SSG portfolio with advanced SEO optimization and superior performance.

**Tech Stack**:
- **Framework**: Next.js 15.1.0 (full-stack)
- **UI**: React 19.0 + Tailwind CSS
- **Rendering**: Static export (SSG) + potential SSR
- **Routing**: Next.js file-based routing
- **Internationalization**: i18n (via library)
- **Components**: @notadream/react library
- **Output**: Static export for Docker/Nginx
- **Server**: Nginx 1.23 (production)

**Entry Points**:
- Development: [http://localhost:3000](http://localhost:3000)
- Production Port: 3000 (app), 4003 (on Docker)
- Main Entry: `app/layout.tsx` + `app/page.tsx`
- Root Component: `app/page.tsx` (home page)

**Key Features**:
- ✅ Server-side rendering (Next.js features)
- ✅ Static export for production deployment
- ✅ Comprehensive SEO implementation (metadata, OG tags, schema.org)
- ✅ Theme management via shared library
- ✅ Multi-language support (i18n)
- ✅ EmailJS integration for forms
- ✅ Social media integration
- ✅ Security headers (CSP, X-Frame-Options, etc.)
- ✅ Optimized caching for static assets (1-year cache)
- ✅ Redirects for SEO (old URLs → new URLs)

**Project Structure**:
```
apps/portfolio-nextjs/
├── app/
│   ├── layout.tsx              # Root layout with SEO metadata
│   ├── page.tsx                # Homepage
│   ├── providers.tsx           # Client providers
│   ├── routing-adapter.tsx     # Routing context
│   ├── RootLayoutWrapper.tsx   # App wrapper
│   ├── about/
│   │   ├── layout.tsx
│   │   └── page.tsx            # About page
│   ├── portfolio/
│   │   ├── layout.tsx
│   │   └── page.tsx            # Portfolio showcase
│   ├── contact/
│   │   ├── layout.tsx
│   │   └── page.tsx            # Contact page
│   ├── components/             # Page-specific components
│   ├── layouts/                # Shared layouts
│   ├── i18n/                   # Internationalization
│   ├── utils/                  # Helper functions
│   └── assets/                 # Images, styles
├── next.config.mjs             # Next.js configuration
├── tsconfig.json               # TypeScript config
├── SEO_IMPLEMENTATION.md       # SEO documentation
└── NEXTJS_SSR_GUIDE.md        # SSR/SSG guide
```

**Build Configuration** (`next.config.mjs`):
- Output: 'export' (static export)
- React strict mode enabled
- Compression enabled
- Transpile @notadream/react
- Security headers (CSP, X-Frame-Options, X-XSS-Protection)
- Cache control headers (1-year immutable cache)
- Automatic redirects for SEO
- Image optimization

**SEO Implementation** (Comprehensive):
- Root metadata with title template, keywords, robots config
- Open Graph tags for social sharing
- Twitter Card tags
- Structured data (schema.org): Person, Job Title, Social Links
- Page-specific meta tags for each route
- Canonical URLs
- Canonical links for proper indexing
- Multi-language support with hreflang (if implemented)

**Key Dependencies**:
- `@emailjs/browser` - Email sending
- `react-icons` - Icon library
- `react-toastify` - Toast notifications
- `@notadream/react` - Shared components

**Docker Setup**:
- Multi-stage build (deps → builder → runner)
- Static export with `next export`
- Nginx serving HTML files
- Nginx reverse proxy on port 4003
- Security headers via Nginx

**Known Issues** ⚠️:
- ❌ Current code imports `react-router-dom` (incompatible with Next.js)
- Location: `app/layouts/PageLayout.tsx:7`
- Solution: Refactor to use Next.js routing
- Status: Needs fixing for Docker build to succeed

---

### 2.3 Admin Dashboard - `apps/admin`

**Purpose**: Management interface for portfolio content and settings.

**Tech Stack**:
- **Framework**: React 19.0 + Vite 6.1.1
- **Routing**: React Router (if used)
- **Styling**: Tailwind CSS
- **Components**: @notadream/react library
- **Build Output**: Static SPA
- **Server**: Nginx 1.23 (production)

**Entry Points**:
- Development: [http://localhost:4001](http://localhost:4001)
- Production Port: 4001
- Main Entry: `src/main.tsx`
- Root Component: `src/App.tsx`

**Key Features**:
- ✅ Dashboard interface for content management
- ✅ Responsive design
- ✅ Component-based architecture
- ✅ Shared UI library integration

**Project Structure**:
```
apps/admin/src/
├── main.tsx         # React entry point
├── App.tsx          # Root component
├── index.css        # Global styles
└── (additional components TBD)
```

**Build Configuration** (`vite.config.ts`):
- React plugin enabled
- HTML plugin with dynamic injection
- Compression enabled
- TypeScript checking during build

**Docker Setup**:
- Multi-stage build (deps → build → nginx)
- Vite build output → Nginx
- Nginx reverse proxy on port 4001
- Depends on API service

**Status**: 🔧 Development (basic setup, needs content/features)

---

### 2.4 Blog Platform - `apps/blogs`

**Purpose**: Content management and blog publishing platform.

**Tech Stack**:
- **Framework**: Next.js 15.1.6 (full-stack)
- **UI**: React 19.0
- **Styling**: Tailwind CSS (via config)
- **Rendering**: SSR/SSG with Next.js
- **Build Output**: Next.js standalone
- **Server**: Node.js standalone + Nginx (production)

**Entry Points**:
- Development: [http://localhost:4002](http://localhost:4002)
- Production Port: 4002
- Main Entry: `src/app/page.tsx`
- Root Component: `src/app/layout.tsx`

**Key Features**:
- ✅ Next.js blog platform
- ✅ Server-side rendering
- ✅ API integration with backend
- ✅ Blog post management
- ✅ SEO-optimized content

**Project Structure**:
```
apps/blogs/src/app/
├── layout.tsx       # Root layout
├── page.tsx         # Homepage
├── globals.css      # Global styles
└── (page modules)
```

**Build Configuration** (`next.config.js`):
- Standard Next.js configuration
- Tailwind CSS support

**Key Environment Variables**:
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_BLOG_TITLE` - Blog title
- `NEXT_PUBLIC_BLOG_DESCRIPTION` - Blog description
- `DATABASE_URL` - PostgreSQL connection
- `MONGODB_URL` - MongoDB connection

**Docker Setup**:
- Multi-stage build (deps → builder → runner)
- Next.js standalone mode (.next/standalone)
- Node.js runner with nextjs non-root user (1001)
- Port 4002
- Health checks implemented
- Depends on API service

**Status**: 🔧 Development (framework ready, content needs implementation)

---

### 2.5 REST API - `apps/api`

**Purpose**: RESTful backend API powering all frontend applications.

**Tech Stack**:
- **Framework**: Fastify 5.2.1 (high-performance)
- **Language**: TypeScript 5.7.3
- **Runtime**: Node.js 20+
- **Build Tool**: esbuild 0.24.2
- **Database**: PostgreSQL 16.3 + MongoDB 7.0 (optional)

**Entry Points**:
- Development: [http://localhost:4000](http://localhost:4000)
- Production Port: 4000
- Main Entry: `src/index.ts`
- Fastify App: `src/api.ts`
- Config: `src/config/config.ts`

**Key Features**:
- ✅ High-performance Fastify server
- ✅ Environment-based configuration
- ✅ CORS support for frontend apps
- ✅ JWT authentication support
- ✅ Session management
- ✅ Email integration (EmailJS)
- ✅ Health checks
- ✅ Logging and monitoring

**Project Structure**:
```
apps/api/src/
├── index.ts              # Entry point (starts server)
├── api.ts                # Fastify app initialization
├── config/
│   └── config.ts         # Configuration loader
└── (routes & features to be implemented)
```

**Configuration** (`src/config/config.ts`):
- Loads from `.env` file via dotenv
- Port from `PORT` env var (default: 4000)
- All settings accessible via `config` object

**Key Environment Variables**:
- `PORT` - API port (default: 4000)
- `NODE_ENV` - Environment (development/production)
- `DATABASE_URL` - PostgreSQL connection string
- `MONGODB_URL` - MongoDB connection string
- `JWT_SECRET` - JWT signing key
- `JWT_EXPIRY` - JWT token expiration (default: 7d)
- `CORS_ORIGIN` - Allowed origins (comma-separated)
- `EMAILJS_*` - EmailJS credentials

**Docker Setup**:
- Multi-stage build (build → production)
- Production stage: Node 20 Alpine
- Production dependencies only (`--prod`)
- Health check: HTTP GET to /
- Logging: json-file driver
- Non-root user configuration
- Environment variables passed at runtime

**Status**: ✅ Production Setup (framework ready, endpoints need implementation)

---

## 3. Shared Libraries (libs/ folder)

### 3.1 React Library - `libs/react`

**Purpose**: Shared React components, hooks, utilities, routing, i18n, and theme engine for all React/Next.js applications.

**Tech Stack**:
- **Build Tool**: Vite 6.1.1
- **Language**: TypeScript 5.7.3
- **Type Definitions**: Declarative types
- **Export Formats**: UMD + ESM + TypeScript definitions

**Package Configuration** (`package.json`):
```json
{
  "name": "@notadream/react",
  "main": "./dist/notadream-react.umd.cjs",      // UMD format
  "module": "./dist/notadream-react.js",         // ESM format
  "types": "./dist/index.d.ts",                  // TypeScript definitions
  "exports": {
    ".": {
      "import": "./dist/notadream-react.js",     // ESM
      "require": "./dist/notadream-react.umd.cjs" // CommonJS
    },
    "./dist/index.css": "./dist/notadream-react.css" // CSS
  }
}
```

**Module Exports** (from `src/index.ts`):
```typescript
export * from "./page-layouts";      // Layout components
export * from "./theme-engine";      // Theme management
export * from "./forms";             // Form components
export * from "./i18n";              // Internationalization
export * from "./ui";                // UI components
export * from "./pages";             // Page components
export * from "./routing";           // Routing utilities
export * from "./config";            // Configuration utilities
```

**Key Exports by Category**:

**UI Components** (`src/ui/`):
- `Button` - Reusable button component
- `Logo` - Customizable logo
- `RouterLink` - React Router link wrapper
- `BrowserLink` - Standard anchor wrapper
- `Listbox` - Dropdown selection
- `Spinner` - Loading indicator
- Input components (inputs/)

**Theme Engine** (`src/theme-engine/`):
- `ThemeProvider` - Context provider for themes
- `setThemeConfig()` - Configure theme options
- `useTheme()` - Hook to access/change themes
- Theme variables and CSS
- Multi-color mode support

**Internationalization** (`src/i18n/`):
- `I18nProvider` - Context provider for translations
- `useTranslation()` - Hook to access translations
- Language switching
- Locale management

**Page Layouts** (`src/page-layouts/`):
- `PageLayout` - Main page wrapper
- Layout components for common patterns
- Header and footer layouts

**Form Components** (`src/forms/`):
- Form utilities and helpers
- Field components
- Validation integration (Zod)
- React Hook Form integration

**Routing** (`src/routing/`):
- Routing context and utilities
- Adapter for React Router
- Navigation helpers

**Peer Dependencies**:
```json
{
  "@headlessui/react": "^2.1.8",
  "@hookform/resolvers": "^3.4.2",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-hook-form": "^7.51.5",
  "react-icons": "^5.3.0",
  "react-router-dom": "^6.26.2",
  "zod": "^3.23.8"
}
```

**Build Output**:
- ESM: `dist/notadream-react.js`
- UMD: `dist/notadream-react.umd.cjs`
- CSS: `dist/notadream-react.css`
- Types: `dist/index.d.ts`

**Usage in Apps**:
```typescript
import { ThemeProvider, I18nProvider, PageLayout } from "@notadream/react";
```

**Build Command**:
```bash
pnpm --filter @notadream/react build
```

**Status**: ✅ Production (shared across portfolio, admin, blogs)

---

### 3.2 Backend Library - `libs/backend`

**Purpose**: Shared Node.js backend utilities and helpers for API and other backend services.

**Tech Stack**:
- **Build Tool**: Vite 6.1.1
- **Language**: TypeScript 5.7.3
- **Export Formats**: UMD + ESM + TypeScript definitions

**Package Configuration** (`package.json`):
```json
{
  "name": "@notadream/backend",
  "main": "./dist/notadream-backend.umd.cjs",
  "module": "./dist/notadream-backend.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/notadream-backend.js",
      "require": "./dist/notadream-backend.umd.cjs"
    }
  }
}
```

**Module Exports** (from `src/index.ts`):
```typescript
export * from "./utils";  // Backend utilities
```

**Utilities** (`src/utils/`):
- Backend helpers and utility functions
- Common patterns and abstractions
- (Specific utilities to be documented as they're added)

**Dependencies**:
- None (pure TypeScript utilities)

**Dev Dependencies**:
- TypeScript, ESLint, Prettier
- Vite build tooling
- vite-plugin-dts (for type generation)

**Build Output**:
- ESM: `dist/notadream-backend.js`
- UMD: `dist/notadream-backend.umd.cjs`
- Types: `dist/index.d.ts`

**Usage in API**:
```typescript
import { /* utilities */ } from "@notadream/backend";
```

**Build Command**:
```bash
pnpm --filter @notadream/backend build
```

**Status**: ✅ Production Setup (ready for API utilities)

---

## 4. Backend Services (services/ folder)

**Purpose**: Infrastructure services for development (PostgreSQL, MongoDB, Adminer, Mailhog).

**Configuration File**: `services/docker-compose.yml`

### Services Included

#### PostgreSQL 16.3-alpine
- **Port**: 5432
- **Purpose**: Relational database
- **Container**: notadream-postgres
- **Default Credentials**:
  - User: `admin` (override with DB_USER)
  - Password: `Password123` (override with DB_PASSWORD)
  - Database: `notadream` (override with DB_NAME)
- **Volume**: `postgres-data:/var/lib/postgresql/data`
- **Health Check**: pg_isready
- **Features**:
  - Automatic restart
  - Health monitoring
  - Data persistence

#### MongoDB 7.0-alpine
- **Port**: 27017
- **Purpose**: NoSQL/document database
- **Container**: notadream-mongodb
- **Default Credentials**:
  - Root User: `admin` (override with MONGO_USER)
  - Root Password: `Password123` (override with MONGO_PASSWORD)
  - Database: `notadream` (override with MONGO_DB)
- **Volume**: `mongodb-data:/data/db`
- **Health Check**: mongosh ping
- **Features**:
  - Automatic restart
  - Health monitoring
  - Data persistence

#### Adminer 4.8.1
- **Port**: 8080 (override with ADMINER_PORT)
- **Purpose**: Web UI for database administration
- **Container**: notadream-adminer
- **Access**: [http://localhost:8080](http://localhost:8080)
- **Default Server**: postgres
- **Features**:
  - Support for multiple databases (PostgreSQL, MySQL, MongoDB, etc.)
  - Web-based database browser
  - Depends on PostgreSQL health check

#### Mailhog
- **SMTP Port**: 1025 (override with MAILHOG_SMTP_PORT)
- **UI Port**: 8025 (override with MAILHOG_UI_PORT)
- **Purpose**: Email testing and debugging
- **Container**: notadream-mailhog
- **Access**: [http://localhost:8025](http://localhost:8025)
- **Features**:
  - SMTP server for local development
  - Web UI for viewing sent emails
  - No configuration needed

### Networks
- **notadream-services**: Bridge network
- **Subnet**: 172.29.0.0/16

### Volumes
- `postgres-data` - PostgreSQL data persistence
- `mongodb-data` - MongoDB data persistence

### Starting Services

```bash
# Start all services
docker-compose -f services/docker-compose.yml up

# Start in background
docker-compose -f services/docker-compose.yml up -d

# View logs
docker-compose -f services/docker-compose.yml logs -f

# Stop services
docker-compose -f services/docker-compose.yml down

# Remove volumes and data
docker-compose -f services/docker-compose.yml down -v
```

---

## 5. Configuration Files

### 5.1 Root `package.json`

**Workspace Configuration**:
```json
{
  "workspaces": ["libs/*", "apps/*"],
  "packageManager": "pnpm@9.15.9"
}
```

**Key Scripts**:
```json
{
  "build": "turbo run build",
  "build:libs": "turbo run build --filter=./libs/**",
  "dev": "turbo dev",
  "dev:portfolio": "pnpm run dev --filter=@notadream/portfolio",
  "lint": "turbo run lint",
  "lint:fix": "turbo run lint:fix",
  "typecheck": "pnpm run -r --parallel typecheck",
  "test": "pnpm run --parallel test",
  "sort-package": "sort-package-json && pnpm run sort-package"
}
```

**Root Dependencies**:
- turbo@2.5.8 - Monorepo orchestration
- @commitlint/cli@19.7.1 - Commit linting
- husky@9.1.7 - Git hooks
- ESLint plugin for React@7.37.5

### 5.2 `turbo.json` - Build Pipeline

**Task Configuration**:
```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"],
      "inputs": ["src/**", "package.json", "tsconfig.json", "vite.config.ts"]
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts"]
    },
    "lint": {
      "inputs": ["src/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### 5.3 Docker Compose Configuration - `docker-compose.yaml`

**Main Applications Network** (`notadream-network`):

All 5 application containers with:
- Environment variable injection
- Health checks
- Service dependencies
- Label organization
- Log limiting (json-file driver)

**Service Dependencies**:
```
portfolio-nextjs → api
portfolio → api
blogs → api
admin → api
(api has no dependencies)
```

**Port Mappings**:
| Service | Port | Environment |
|---------|------|-------------|
| api | 4000 | API_PORT |
| admin | 4001 | ADMIN_PORT |
| blogs | 4002 | BLOGS_PORT |
| portfolio | 4003 | PORTFOLIO_PORT |
| portfolio-nextjs | 3000 | PORTFOLIO_NEXTJS_PORT* |

*Note: portfolio-nextjs mapped to 4003 in docker-compose.yaml (hardcoded)

### 5.4 TypeScript Configuration (`tsconfig.json` pattern)

**Common Settings Across Apps**:
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleResolution": "bundler"
  }
}
```

### 5.5 Environment Variables Pattern (`.env.example`)

**Comprehensive Configuration**:
```env
# Node Environment
NODE_ENV=development
ENVIRONMENT=development

# Application Ports
PORT=4000
API_PORT=4000
ADMIN_PORT=4001
PORTFOLIO_PORT=4003
PORTFOLIO_NEXTJS_PORT=3000
BLOGS_PORT=3001

# Database Configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/notadream
DATABASE_POOL_SIZE=10
DATABASE_TIMEOUT=30000
MONGODB_URL=mongodb://localhost:27017/notadream
MONGODB_POOL_SIZE=10

# API Configuration
API_BASE_URL=http://localhost:4000
API_TIMEOUT=30000
CORS_ORIGIN=http://localhost:3000,http://localhost:3001,http://localhost:4001,http://localhost:4003

# Authentication & Security
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRY=7d
JWT_REFRESH_EXPIRY=30d
SESSION_SECRET=your-session-secret-key

# EmailJS Configuration
EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
EMAILJS_USER_ID=
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

### 5.6 Git Hooks & Commit Validation

**Husky** (`.husky/`):
- Pre-commit hooks for linting
- Git hook automation

**Commitlint** (`.commitlintrc.json`):
```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

**Convention**:
```
<type>(<scope>): <subject>
type: feat|fix|docs|style|refactor|test|chore
```

---

## 6. Key Source Files Analysis

### 6.1 API Entry Point - `apps/api/src/index.ts`

```typescript
import app from "./api";
import config from "./config/config";

const start = async () => {
  const server = await app();
  server.listen(
    { port: Number(config.port) || 4000, host: "0.0.0.0" },
    (err, address) => {
      if (err) {
        server.log.error(err);
      }
      server.log.info(`Server listening at ${address}`);
    }
  );
};

start();
```

**Flow**:
1. Imports Fastify app factory
2. Loads configuration
3. Creates async IIFE to handle promises
4. Initializes Fastify server
5. Listens on configured port
6. Logs startup info

### 6.2 Fastify App Factory - `apps/api/src/api.ts`

```typescript
import fastify from "fastify";

const api = async () => {
  const api = await fastify({
    logger: {
      level: "info",
    },
  });
  return api;
};

export default api;
```

**Features**:
- Async factory function
- Logging enabled at info level
- Returns ready-to-configure Fastify instance

### 6.3 Portfolio Entry Point - `apps/portfolio/src/main.tsx`

```typescript
import { I18nProvider, ThemeProvider, setThemeConfig } from "@notadream/react";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { TranslationsEntry } from "./i18n";
import "./config";

setThemeConfig({
  defaultThemeKey: "notadream",
}).initTheme();

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <I18nProvider translations={TranslationsEntry}>
        <App />
      </I18nProvider>
    </ThemeProvider>
  </React.StrictMode>
);
```

**Setup Order**:
1. Import all dependencies
2. Initialize theme with config
3. Setup React providers (Strict Mode)
4. Apply Theme Provider
5. Apply i18n Provider
6. Render root App component

### 6.4 Portfolio Routes - `apps/portfolio/src/Routes.tsx`

```typescript
import { createHashRouter } from "react-router-dom";

const mainLayoutRoutes = [
  { path: "/", element: <Home /> },
  { path: "/portfolio", element: <PortfolioLazy /> },
  { path: "/about", element: <AboutLazy /> },
  { path: "/contact", element: <ContactLazy /> },
];

export const browserRouter = createHashRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <PageLayout />,
    children: mainLayoutRoutes,
  },
]);
```

**Routing Pattern**:
- Hash-based routing (# URLs)
- Single layout wrapper
- Lazy-loaded page components
- Error boundary for undefined routes
- Main routes: home, portfolio, about, contact

### 6.5 Portfolio Configuration - `apps/portfolio/src/config.ts`

```typescript
import { configureApp } from "@notadream/react";

configureApp({
  appName: import.meta.env.VITE_APP_NAME || "",
  appTitle: import.meta.env.VITE_APP_TITLE || "",
  appDescription: import.meta.env.VITE_APP_DESCRIPTION || "",
  appKeywords: import.meta.env.VITE_APP_KEYWORDS || "",
  appLogo: import.meta.env.VITE_APP_LOGO || "",
  apiBaseURL: import.meta.env.VITE_API_BASE_URL || "",
  appEmail: import.meta.env.VITE_APP_EMAIL || "dhitalnabin224@gmail.com",
  i18n: {
    defaultLanguage: import.meta.env.VITE_I18N_DEFAULT_LANGUAGE || "en",
    supportedLanguages: (
      import.meta.env.VITE_I18N_SUPPORTED_LANGUAGE || "en, fr"
    )
      .replaceAll(", ", ",")
      .split(","),
  },
  secrets: {
    emailJsServiceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
    emailJsTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
    emailJsUserId: import.meta.env.VITE_EMAILJS_USER_ID || "",
  },
  socialLinks: {
    facebook: import.meta.env.VITE_APP_FACEBOOK_URL || "",
    github: import.meta.env.VITE_APP_GITHUB_URL || "",
    instagram: import.meta.env.VITE_APP_INSTAGRAM_URL || "",
    linkedin: import.meta.env.VITE_APP_LINKEDIN_URL || "",
    twitter: import.meta.env.VITE_APP_TWITTER_URL || "",
  },
  theme: {
    localStorageName: "theme",
    multiColorMode: import.meta.env.VITE_APP_THEME_MULTI_COLOR_MODE === "true",
  },
});
```

**Configuration Layers**:
1. App metadata (name, title, description)
2. API configuration
3. i18n setup (languages, defaults)
4. EmailJS secrets
5. Social media links
6. Theme options
7. Copyright holder

### 6.6 Admin App Setup - `apps/admin/src/main.tsx`

```typescript
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Simplest Setup**:
- No providers configured yet
- Ready for admin-specific setup

### 6.7 Next.js Portfolio Layout - `apps/portfolio-nextjs/app/layout.tsx`

**Includes**:
- Root metadata with SEO configuration
- Title template for dynamic titles
- Comprehensive keywords
- Open Graph tags
- Twitter Card configuration
- Structured data (schema.org)
- Icon definitions

### 6.8 Next.js Portfolio Page - `apps/portfolio-nextjs/app/page.tsx`

```typescript
'use client';

import { Page } from '@notadream/react';
import { HeroSection } from './components/home-components';
// ... other section imports

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <Page className="home">
      <HeroSection />
      <WhySection />
      <HowSection />
      <ServiceSection />
    </Page>
  );
}
```

**Features**:
- Client component ('use client')
- Shared Page layout component
- Multiple section components
- Dynamic rendering (force-dynamic)

---

## 7. Database & Infrastructure

### 7.1 Database Support

#### PostgreSQL
- **Image**: postgres:16.3-alpine
- **Port**: 5432
- **Default Database**: notadream
- **Default User**: postgres / postgres
- **Connection String**: `postgresql://postgres:postgres@localhost:5432/notadream`
- **Use Cases**:
  - Relational data (users, posts, comments)
  - Strong schema requirements
  - Complex queries and joins
  - ACID compliance needed

#### MongoDB
- **Image**: mongo:7.0-alpine
- **Port**: 27017
- **Default Database**: notadream
- **Default User**: admin / Password123
- **Connection String**: `mongodb://localhost:27017/notadream`
- **Use Cases**:
  - Flexible document schema
  - NoSQL queries
  - Content documents (blog posts)
  - Cache or session storage

### 7.2 Docker Network Architecture

```
┌─────────────────────────────────────────────────────┐
│              notadream-network (bridge)             │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │
│  │   API        │  │   Admin      │  │ Portfolio│ │
│  │   (4000)     │  │   (4001)     │  │  (4003)  │ │
│  └──────────────┘  └──────────────┘  └──────────┘ │
│  ┌──────────────┐  ┌──────────────┐               │
│  │   Blogs      │  │ Portfolio-NG │               │
│  │   (4002)     │  │   (3000)     │               │
│  └──────────────┘  └──────────────┘               │
│                                                     │
└─────────────────────────────────────────────────────┘
         ↓ (cross-compose communication)
┌─────────────────────────────────────────────────────┐
│         notadream-services (bridge)                 │
├─────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐  │
│  │ PostgreSQL   │  │  MongoDB     │  │ Adminer  │  │
│  │   (5432)     │  │  (27017)     │  │  (8080)  │  │
│  └──────────────┘  └──────────────┘  └──────────┘  │
│  ┌──────────────┐                                   │
│  │   Mailhog    │                                   │
│  │  (1025/8025) │                                   │
│  └──────────────┘                                   │
└─────────────────────────────────────────────────────┘
```

### 7.3 Nginx Configuration

**Portfolio (Vite)** - `apps/portfolio/docker/nginx.conf`:
```nginx
server {
  listen 4003;
  root /usr/share/nginx/html;
  
  # Gzip compression
  gzip on;
  gzip_comp_level 5;
  gzip_min_length 1000;
  
  # 1-year cache for static assets
  location ~* \.(?:css|js)$ {
    expires 1y;
    add_header Cache-Control "public,immutable";
  }
  
  # SPA routing: all routes fallback to index.html
  location / {
    add_header X-Frame-Options "DENY";
    add_header Content-Security-Policy "frame-ancestors 'none'";
    try_files $uri $uri/ /index.html;
  }
}
```

**Features**:
- Single-page app routing (try_files fallback)
- Security headers (CSP, X-Frame-Options)
- Gzip compression
- Long-lived cache for assets
- Port 4003

---

## 8. Development Workflow

### 8.1 Installation & Setup

```bash
# 1. Clone repository
git clone <repo-url>
cd notadream

# 2. Install pnpm (if not installed)
npm install -g pnpm@11

# 3. Install dependencies
pnpm install

# 4. Setup git hooks
pnpm prepare

# 5. Copy environment file
cp .env.example .env

# 6. Edit .env with local settings
```

### 8.2 Development Commands

**Run all apps in development**:
```bash
pnpm dev
```

**Run specific app**:
```bash
pnpm --filter @notadream/portfolio dev
pnpm --filter @notadream/api dev
pnpm --filter @notadream/admin dev
```

**Shortcut for portfolio**:
```bash
pnpm dev:portfolio
```

**Build all packages**:
```bash
pnpm build
```

**Build only libraries**:
```bash
pnpm build:libs
```

**Build specific package**:
```bash
pnpm --filter @notadream/portfolio build
pnpm --filter @notadream/api build
```

**Linting**:
```bash
# Check for issues
pnpm lint

# Fix issues
pnpm lint:fix

# Fix only staged files
pnpm lint:fix:staged
```

**Type Checking**:
```bash
# Check all types across monorepo
pnpm typecheck
```

**Testing**:
```bash
# Run all tests
pnpm test

# Run unit tests
pnpm test:unit

# Run integration tests
pnpm test:integration

# CI mode (non-watch)
pnpm test:ci
```

### 8.3 Docker Development

**Start Infrastructure Services**:
```bash
# Start PostgreSQL, MongoDB, Adminer, Mailhog
docker-compose -f services/docker-compose.yml up -d

# View logs
docker-compose -f services/docker-compose.yml logs -f

# Stop services
docker-compose -f services/docker-compose.yml down
```

**Access Services**:
- PostgreSQL: `localhost:5432` (conn: postgres:postgres)
- MongoDB: `localhost:27017` (conn: admin:Password123)
- Adminer: [http://localhost:8080](http://localhost:8080)
- Mailhog: [http://localhost:8025](http://localhost:8025)

**Build All Docker Images**:
```bash
docker-compose build
```

**Build Specific Service**:
```bash
docker-compose build api
docker-compose build portfolio
```

**Start All Apps (Docker)**:
```bash
docker-compose up -d
```

**View Logs**:
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f portfolio
```

**Test Individual Docker Build**:
```bash
# Before full compose
docker build -f ./apps/api/docker/Dockerfile -t notadream-api:test .
docker build -f ./apps/portfolio/docker/Dockerfile -t notadream-portfolio:test .
```

### 8.4 Code Organization Best Practices

**Import Patterns**:
```typescript
// Absolute imports from library
import { ThemeProvider } from "@notadream/react";

// Local relative imports
import { Header } from "./components/Header";
import { config } from "../config";

// React and external libraries
import React from "react";
import { useEffect } from "react";
```

**Component Structure**:
```typescript
// Option 1: Functional component with hooks
export const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  const [state, setState] = React.useState(initial);
  
  return <div>{state}</div>;
};

// Option 2: With types
interface MyComponentProps {
  title: string;
  onClick: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = (props) => {
  return <button onClick={props.onClick}>{props.title}</button>;
};
```

**File Naming Conventions**:
- Components: PascalCase (`Header.tsx`, `Button.tsx`)
- Utilities: camelCase (`config.ts`, `helpers.ts`)
- Types/Interfaces: PascalCase with `.d.ts` for shared (`types.ts`, `interfaces.d.ts`)
- Pages: PascalCase (`Home.tsx`, `About.tsx`)
- Hooks: camelCase starting with `use` (`useAuth.ts`, `useTheme.ts`)

**Directory Structure**:
```
src/
├── components/          # Reusable UI components
├── pages/              # Page-level components
├── layouts/            # Layout components
├── hooks/              # Custom hooks
├── utils/              # Utility functions
├── config/             # Configuration files
├── types/              # TypeScript types & interfaces
├── assets/             # Static files, images, CSS
├── services/           # API service calls
└── store/              # State management (if using)
```

### 8.5 Common Development Tasks

**Add a new page to Portfolio (Vite)**:
1. Create page component: `src/pages/NewPage/index.tsx`
2. Add route: `src/Routes.tsx`
3. Add navigation item (if needed)
4. Add translations in i18n
5. Test with `pnpm dev:portfolio`

**Add a new component to React library**:
1. Create component: `libs/react/src/ui/NewComponent.tsx`
2. Export from `libs/react/src/ui/index.ts`
3. Export from `libs/react/src/index.ts`
4. Test in consuming apps
5. Build library: `pnpm --filter @notadream/react build`

**Add environment variable**:
1. Add to `.env` and `.env.example`
2. Document in this file
3. Reference in config file (e.g., `config.ts`)
4. Use in application

**Update Docker configuration**:
1. Edit `docker-compose.yaml` or app Dockerfile
2. Test build: `docker build ...`
3. Document changes in instructions/
4. Test with `docker-compose up`

---

## 9. Known Issues & Blockers

### 9.1 Critical Issues

#### ❌ Portfolio-NextJS Docker Build Failure

**Issue**: `Cannot find module 'react-router-dom'`  
**Location**: `apps/portfolio-nextjs/app/layouts/PageLayout.tsx:7`  
**Root Cause**: Mixing React Router (client-side) with Next.js (file-based routing)  
**Impact**: Cannot build portfolio-nextjs Docker image  
**Status**: BLOCKER

**Affected Files**:
- `app/layouts/PageLayout.tsx` - Imports `Outlet` from react-router-dom
- `app/routing-adapter.tsx` - Routing context not compatible with Next.js

**Fix Required**:
1. Remove `react-router-dom` imports
2. Refactor PageLayout to use Next.js layouts
3. Use Next.js `children` prop instead of `Outlet`
4. Adapt routing context for Next.js App Router
5. Rebuild and test Docker image

**Example Refactor**:
```typescript
// Before (React Router)
import { Outlet } from 'react-router-dom';
export const PageLayout = () => (
  <div><Outlet /></div>
);

// After (Next.js)
export const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);
```

### 9.2 Build Status Summary

| Service | Build | Docker | Status |
|---------|-------|--------|--------|
| api | ✅ Pass | ✅ Pass | ✅ Production Ready |
| admin | ✅ Pass | ✅ Pass | ✅ Production Ready |
| blogs | ✅ Pass | ✅ Pass | ✅ Production Ready |
| portfolio | ✅ Pass | ✅ Pass | ✅ Production Ready |
| portfolio-nextjs | ✅ Pass | ❌ Fail | 🔧 Development (code issue) |

### 9.3 Development Blockers

**Incomplete Features**:
- API endpoints not fully implemented
- Admin dashboard features needed
- Blog content management not setup
- Authentication/authorization not implemented
- Database migrations not configured
- Email sending not fully integrated

### 9.4 Compatibility Notes

**pnpm Version**:
- Current: 9.15.9
- Previously non-existent version 7.21.1 in Dockerfiles (now fixed)
- Workspace configuration requires pnpm >= 8

**Node.js Version**:
- Minimum: 18.x
- Recommended: 20.x
- Docker images: node:20-alpine

**Next.js**:
- Version: 15.1.6 (latest)
- Static export enabled in next.config.mjs
- App Router required (no Pages Router)

**React**:
- Version: 19.0.0 (latest)
- TypeScript strict mode enabled
- JSX runtime: react-jsx

---

## 10. File Organization

### 10.1 Key File Locations

**Configuration**:
- Root config: `/package.json`, `/turbo.json`, `/pnpm-workspace.yaml`
- Docker: `/docker-compose.yaml`, `/services/docker-compose.yml`
- Environment: `/.env`, `/.env.example`
- Git hooks: `/.husky/`, `/.commitlintrc.json`

**Applications**:
- Portfolio: `/apps/portfolio/`
- Portfolio NextJS: `/apps/portfolio-nextjs/`
- Admin: `/apps/admin/`
- Blogs: `/apps/blogs/`
- API: `/apps/api/`

**Libraries**:
- React lib: `/libs/react/`
- Backend lib: `/libs/backend/`

**Build Outputs**:
- Portfolio dist: `/apps/portfolio/dist/`
- Next.js build: `/apps/portfolio-nextjs/.next/`
- API dist: `/apps/api/dist/`
- Library dist: `/libs/react/dist/`, `/libs/backend/dist/`

**Documentation**:
- Root README: `/README.md`
- This file: `/PROJECT_DOCUMENTATION.md`
- Docker guide: `/instructions/DOCKER_COMPOSE_GUIDE.md`
- Docker report: `/instructions/DOCKER_UPDATE_REPORT.md`
- GitHub Actions: `/instructions/GITHUB_ACTIONS_SETUP.md`
- SEO docs: `/apps/portfolio-nextjs/SEO_IMPLEMENTATION.md`
- SSR guide: `/apps/portfolio-nextjs/NEXTJS_SSR_GUIDE.md`

### 10.2 Finding Specific Types of Files

**Component Files**:
```
Portfolio Vite:      apps/portfolio/src/components/
Portfolio NextJS:    apps/portfolio-nextjs/app/components/
Admin:               apps/admin/src/
Shared React Lib:    libs/react/src/ui/
```

**Page/Route Files**:
```
Portfolio Vite:      apps/portfolio/src/pages/
Portfolio NextJS:    apps/portfolio-nextjs/app/[page]/page.tsx
Admin:               apps/admin/src/
Blogs:               apps/blogs/src/app/
```

**Configuration Files**:
```
Portfolio Vite:      apps/portfolio/src/config.ts
Portfolio NextJS:    apps/portfolio-nextjs/next.config.mjs
Blogs:               apps/blogs/next.config.js
API:                 apps/api/src/config/config.ts
```

**Style Files**:
```
Global:              apps/[app]/src/index.css
Portfolio NextJS:    apps/portfolio-nextjs/app/globals.css
Shared:              libs/react/src/assets/index.css
```

**i18n Files**:
```
Portfolio Vite:      apps/portfolio/src/i18n/
Portfolio NextJS:    apps/portfolio-nextjs/app/i18n/
Shared:              libs/react/src/i18n/
```

**Type Definitions**:
```
Shared UI types:     libs/react/src/ui/type.ts
Portfolio types:     apps/portfolio/src/types/ (if exists)
API types:           apps/api/src/types/ (if exists)
```

### 10.3 Dependency Import Patterns

**From Shared React Library**:
```typescript
import { 
  ThemeProvider, 
  I18nProvider, 
  PageLayout, 
  Button 
} from "@notadream/react";
```

**From Shared Backend Library**:
```typescript
import { /* utilities */ } from "@notadream/backend";
```

**From React Router (Portfolio Vite only)**:
```typescript
import { useRouter, RouterLink } from "react-router-dom";
```

**From Next.js (Portfolio NextJS, Blogs)**:
```typescript
import { useRouter } from "next/navigation";
import Link from "next/link";
```

**From Fastify (API)**:
```typescript
import fastify from "fastify";
```

---

## Summary Table: All Applications

| Aspect | Portfolio (Vite) | Portfolio NextJS | Admin | Blogs | API |
|--------|-----------------|------------------|-------|-------|-----|
| **Framework** | React 19 + Vite | Next.js 15 | React 19 + Vite | Next.js 15 | Fastify 5 |
| **Language** | TypeScript 5.6 | TypeScript 5.6 | TypeScript 5.7 | TypeScript 5.6 | TypeScript 5.7 |
| **Port (Dev)** | 4003 | 3000 | 4001 | 4002 | 4000 |
| **Port (Docker)** | 4003 | 4003 | 4001 | 4002 | 4000 |
| **Routing** | React Router | Next.js App Router | TBD | Next.js App Router | REST endpoints |
| **Rendering** | CSR (SPA) | SSG (export) | CSR | SSR/SSG | N/A |
| **Server** | Nginx | Nginx | Nginx | Node standalone | Node |
| **Dependencies** | API | API | API | API | None |
| **Build Tool** | Vite | Next.js | Vite | Next.js | esbuild |
| **Status** | ✅ Prod | 🔧 Code issue | 🔧 Dev | 🔧 Dev | ✅ Ready |

---

## Quick Reference: Common Commands

```bash
# Development
pnpm dev                              # All apps
pnpm dev:portfolio                    # Portfolio only
pnpm --filter @notadream/api dev      # API only

# Building
pnpm build                            # All apps
pnpm build:libs                       # Libraries only
pnpm --filter @notadream/portfolio build

# Quality
pnpm lint                             # Check all
pnpm lint:fix                         # Fix all
pnpm typecheck                        # Type check all

# Docker
docker-compose build                  # Build all images
docker-compose up -d                  # Start all
docker-compose logs -f                # View logs
docker-compose down                   # Stop all

# Services
docker-compose -f services/docker-compose.yml up -d
docker-compose -f services/docker-compose.yml logs -f postgres
```

---

## Next Steps for Development

1. **Fix portfolio-nextjs**: Remove React Router, use Next.js routing
2. **Implement API endpoints**: Add routes, controllers, middleware
3. **Admin features**: Build content management interface
4. **Blog setup**: Configure database, post management
5. **Authentication**: Implement JWT, session management
6. **Testing**: Add unit and integration tests
7. **CI/CD**: Configure GitHub Actions workflows
8. **Deployment**: Setup Vercel, Docker registry, hosting

---

**Document Version**: 1.0  
**Last Updated**: May 27, 2026  
**Status**: ✅ Comprehensive Documentation Complete
