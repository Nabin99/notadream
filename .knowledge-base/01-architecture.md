# Architecture Overview

## Project Structure

```
notadream/
├── apps/                    # All applications
│   ├── api/                 # Fastify REST backend
│   ├── admin/               # React dashboard (Vite)
│   ├── blogs/               # Next.js blog platform
│   ├── portfolio/           # Vite-based portfolio (SPA)
│   └── portfolio-nextjs/    # Next.js-based portfolio (SSG)
├── libs/                    # Shared libraries
│   ├── react/               # Shared React components & utilities
│   └── backend/             # Shared backend utilities
├── services/                # Infrastructure services
│   └── docker-compose.yml   # Database & support services
├── instructions/            # Documentation & guides
├── .knowledge-base/         # THIS FOLDER - Project knowledge
├── docker-compose.yaml      # All applications orchestration
├── package.json             # Root workspace config
├── pnpm-workspace.yaml      # pnpm workspace definition
└── turbo.json               # Turbo build orchestration
```

## Monorepo Architecture

This is a **pnpm workspaces + Turbo** monorepo:

```
┌─────────────────────────────────────────┐
│     Root: package.json + turbo.json     │
│  Manages dependencies and build cache   │
└────────┬────────────────────────────────┘
         │
    ┌────┴────────────┬──────────┬────────────┐
    │                 │          │            │
    v                 v          v            v
┌────────────┐  ┌──────────┐  ┌───────┐  ┌──────────────┐
│  apps/*    │  │ libs/*   │  │ deps  │  │ Infrastructure
│ (5 apps)   │  │(2 libs)  │  │ cache │  │ (databases)
└────────────┘  └──────────┘  └───────┘  └──────────────┘
```

### Key Features
- **Dependency Hoisting**: pnpm lifts common dependencies to root
- **Workspace Linking**: Apps and libs can import from each other
- **Turbo Caching**: Smart build caching across entire workspace
- **Single pnpm-lock.yaml**: One lockfile for entire monorepo

## Technology Stack

### Frontend Applications
| App | Framework | Build Tool | Purpose | Port |
|-----|-----------|-----------|---------|------|
| portfolio | React 19 + Vite | Vite | High-perf SPA portfolio | 4003 |
| portfolio-nextjs | Next.js 15 | Next.js | SSG portfolio with SEO | 3000/4003 |
| admin | React 19 + Vite | Vite | Admin dashboard | 4001 |
| blogs | Next.js 15 | Next.js | Blog platform | 4002 |

### Backend
| Service | Framework | Language | Purpose | Port |
|---------|-----------|----------|---------|------|
| api | Fastify 5.2 | Node.js | REST API backend | 4000 |

### Shared Libraries
| Library | Framework | Purpose |
|---------|-----------|---------|
| @notadream/react | React 19 | Shared components, hooks, theme, i18n |
| @notadream/backend | Node.js | Utilities, helpers, middleware |

### Infrastructure
| Service | Version | Purpose |
|---------|---------|---------|
| PostgreSQL | 16.3 | Relational database |
| MongoDB | 7.0 | NoSQL database |
| Redis | Latest | Caching (optional) |
| Nginx | 1.23-alpine | Static serving, reverse proxy |

### Tooling
- **Package Manager**: pnpm 9.15.9
- **Build Orchestration**: Turbo
- **TypeScript**: 5.7
- **Node.js**: 20 LTS (in Docker)
- **Docker**: Compose v3.8

## Service Dependencies

```
┌─────────────────────────────────────────────────────┐
│  Portfolio (Vite)    Admin    Blogs    Portfolio-Next
└──────┬───────────────┬────────┬────────┬─────────────┘
       │               │        │        │
       └───────────────┴────────┴────────┘
            All depend on ↓
       ┌────────────────────────────┐
       │   API (Fastify, Port 4000)  │
       └────────────────────────────┘
            May connect to ↓
       ┌────────────────────────────────────────┐
       │  PostgreSQL  │  MongoDB  │  Mailhog      │
       │  (optional)  │(optional) │  (testing)    │
       └────────────────────────────────────────┘
```

## Docker Networking

### Network Configuration
- **Driver**: Bridge (custom isolated network)
- **Network Name**: `notadream-network`
- **Subnet**: `172.28.0.0/16`
- **Purpose**: Secure inter-service communication

### Port Mapping
```
Host:Container
4000:4000  → API
4001:4001  → Admin Dashboard
4002:4002  → Blogs
4003:4003  → Portfolio (Vite)
3000:3000  → Portfolio NextJS (dev mode)
5432:5432  → PostgreSQL
27017:27017→ MongoDB
8080:80    → Adminer
1025:1025  → Mailhog (SMTP)
1143:1143  → Mailhog (IMAP)
```

## Environment Isolation

### Development Environment
- Local file development
- Hot reload on changes
- Direct service access
- SQL/NoSQL connections optional

### Docker Environment
- Containerized services
- Network isolation
- Health checks enabled
- Production-like configuration

## Build Process Flow

```
pnpm install → Turbo orchestrates builds
     ↓
[In Parallel]
├─ Build @notadream/react
├─ Build @notadream/backend
└─ Build apps (depends on libs)
     ↓
[Post-build]
├─ Type checking (TypeScript)
├─ Linting
└─ Testing (if configured)
```

## Code Sharing & Imports

### Library Imports
```typescript
// In any app, import from shared libraries
import { Button, useTheme } from '@notadream/react';
import { logger, middleware } from '@notadream/backend';
```

### TypeScript Path Aliases
Configured in root `tsconfig.json`:
```json
{
  "paths": {
    "@notadream/*": ["./libs/*/src"]
  }
}
```

## Performance Optimizations

### Monorepo Level
- **Turbo Caching**: Skip unchanged tasks
- **Parallel Building**: Multiple apps build simultaneously
- **Workspace Linking**: No duplicate dependencies
- **Shared Build Cache**: Reuse compilation artifacts

### Application Level
- **Code Splitting**: Each app bundles independently
- **Tree-shaking**: Unused code removed at build time
- **Multi-stage Docker**: Separate build and runtime layers

## Security Architecture

### Data Flow
```
User Browser
    ↓ (HTTPS in production)
Nginx (reverse proxy, SSL termination)
    ↓
Express/Next.js Middleware
    ↓
Application Logic
    ↓
PostgreSQL/MongoDB
```

### Environment Variables
- Secrets managed in `.env` (never committed)
- Different configs for dev/prod/staging
- Defaults provided for development

---

**Next**: Read [02-applications.md](./02-applications.md) for details on each application.
