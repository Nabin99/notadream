# Applications Guide

## Overview

The NotADream project contains 5 main applications organized in the `apps/` directory. Each serves a specific purpose in the ecosystem.

---

## 1. API (Fastify Backend)

**Location**: `apps/api/`  
**Status**: ✅ Docker builds successfully  
**Purpose**: REST API backend for all frontend applications

### Technology Stack
- **Framework**: Fastify 5.2
- **Language**: TypeScript 5.7
- **Runtime**: Node.js 20 LTS
- **Port**: 4000
- **Database**: PostgreSQL (optional), MongoDB (optional)

### Key Files
- `src/index.ts` - Entry point, server initialization
- `src/api.ts` - Route definitions
- `src/config/config.ts` - Configuration management
- `docker/Dockerfile` - Multi-stage Docker build

### Environment Variables
```
NODE_ENV=development|production
PORT=4000
```

### Docker Build Command
```bash
docker build -f ./apps/api/docker/Dockerfile -t notadream-api .
```

### Key Features
- ✅ Multi-stage build with optimized runtime
- ✅ Git hooks excluded during Docker build
- ✅ Health check configured
- ✅ pnpm 9.15.9

### Known Issues
- ❌ No API endpoints implemented yet (framework only)
- ⚠️ Database connections not configured

### Development
```bash
cd apps/api
pnpm install
pnpm run dev     # Start development server
pnpm run build   # Build for production
```

---

## 2. Admin Dashboard

**Location**: `apps/admin/`  
**Status**: ✅ Docker builds successfully  
**Purpose**: Admin dashboard for content and settings management

### Technology Stack
- **Framework**: React 19 + Vite
- **Language**: TypeScript 5.7
- **Styling**: CSS modules
- **Port**: 4001
- **Build Tool**: Vite

### Key Files
- `src/main.tsx` - React entry point
- `src/App.tsx` - Root component
- `src/index.css` - Global styles
- `vite.config.ts` - Vite configuration
- `docker/Dockerfile` - Multi-stage Docker build with Nginx
- `docker/nginx.conf` - Nginx configuration for SPA routing

### Environment Variables
```
NODE_ENV=development|production
```

### Docker Build Command
```bash
docker build -f ./apps/admin/docker/Dockerfile -t notadream-admin .
```

### Key Features
- ✅ React 19 with TypeScript
- ✅ Vite for fast development
- ✅ Multi-stage Docker build
- ✅ Nginx for static serving with SPA routing

### Known Issues
- ⚠️ Basic template, no features implemented
- ❌ No authentication/authorization system
- ❌ No real admin functionality

### Development
```bash
cd apps/admin
pnpm install
pnpm run dev     # Start dev server (port 5173 by default)
pnpm run build   # Build production bundle
```

---

## 3. Blogs Platform

**Location**: `apps/blogs/`  
**Status**: ✅ Docker builds successfully  
**Purpose**: Blog platform for sharing articles and content

### Technology Stack
- **Framework**: Next.js 15
- **Language**: TypeScript 5.7
- **Styling**: CSS modules, globals
- **Port**: 4002
- **Build Tool**: Next.js

### Key Files
- `src/app/page.tsx` - Home page
- `src/app/layout.tsx` - Root layout
- `src/app/globals.css` - Global styles
- `next.config.js` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `docker/Dockerfile` - Docker build with standalone mode

### Environment Variables
```
NODE_ENV=development|production
PORT=4002
HOSTNAME=0.0.0.0
```

### Docker Build Command
```bash
docker build -f ./apps/blogs/docker/Dockerfile -t notadream-blogs .
```

### Key Features
- ✅ Next.js 15 with App Router
- ✅ TypeScript support
- ✅ CSS Modules support
- ✅ Standalone build for Docker

### Known Issues
- ⚠️ Basic template, no blog functionality
- ❌ No database integration
- ❌ No content management

### Development
```bash
cd apps/blogs
pnpm install
pnpm run dev     # Start dev server (port 3000 by default)
pnpm run build   # Build for production
```

---

## 4. Portfolio (Vite)

**Location**: `apps/portfolio/`  
**Status**: ✅ Docker builds successfully  
**Purpose**: High-performance SPA portfolio showcasing projects

### Technology Stack
- **Framework**: React 19 + Vite
- **Language**: TypeScript 5.7
- **Routing**: React Router v6
- **Internationalization**: i18n (English, French)
- **Port**: 4003
- **Build Tool**: Vite

### Key Files
- `src/main.tsx` - React entry point
- `src/App.tsx` - Root component
- `src/Routes.tsx` - Route definitions
- `src/routing-adapter.tsx` - Routing adapter
- `src/config.ts` - Configuration with environment variables
- `src/i18n/` - Internationalization setup
- `src/store/` - State management
- `src/components/` - React components
- `src/pages/` - Page components
- `vite.config.ts` - Vite configuration
- `docker/Dockerfile` - Multi-stage build with Nginx
- `docker/nginx.conf` - Nginx SPA routing

### Environment Variables (Build Args)
```
VITE_APP_NAME
VITE_APP_TITLE
VITE_APP_DESCRIPTION
VITE_APP_KEYWORDS
VITE_APP_LOGO
VITE_API_BASE_URL
VITE_APP_PORT
VITE_APP_EMAIL
VITE_I18N_DEFAULT_LANGUAGE
VITE_I18N_SUPPORTED_LANGUAGE
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_USER_ID
VITE_APP_*_URL (social links)
VITE_APP_THEME_MULTI_COLOR_MODE
VITE_COPYRIGHT_HOLDER
VITE_VERSION
```

### Docker Build Command
```bash
docker build -f ./apps/portfolio/docker/Dockerfile -t notadream-portfolio .
```

### Key Features
- ✅ React Router for client-side routing
- ✅ i18n support (multi-language)
- ✅ Email integration (EmailJS)
- ✅ Social media links
- ✅ Multi-stage Docker build
- ✅ Nginx for optimized static serving

### Development
```bash
cd apps/portfolio
pnpm install
pnpm run dev     # Start dev server (port 5173 by default)
pnpm run build   # Build production bundle
```

---

## 5. Portfolio (Next.js)

**Location**: `apps/portfolio-nextjs/`  
**Status**: ❌ Docker build fails  
**Purpose**: SSG portfolio with superior SEO and static generation

### Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.7
- **Build Mode**: Static export (SSG)
- **Port**: 3000 (dev), 4003 (production)
- **Build Tool**: Next.js

### Key Files
- `app/page.tsx` - Home page
- `app/layout.tsx` - Root layout
- `app/config.ts` - Configuration with environment variables
- `app/routing-adapter.tsx` - Routing utilities
- `app/about/page.tsx` - About page
- `app/portfolio/page.tsx` - Portfolio page
- `app/contact/page.tsx` - Contact page
- `app/sitemap.ts` - SEO sitemap generation
- `next.config.mjs` - Next.js configuration
- `docker/Dockerfile` - Docker build (fails currently)
- `docker/nginx.conf` - Nginx configuration

### Environment Variables
```
NODE_ENV=development|production
PORT=3000
NEXT_PUBLIC_BASE_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_THEME_COLOR=#16c7d5
NEXT_PUBLIC_APP_TITLE
NEXT_PUBLIC_APP_DESCRIPTION
NEXT_PUBLIC_APP_AUTHOR
NEXT_PUBLIC_APP_TWITTER_HANDLE
NEXT_PUBLIC_APP_EMAIL
NEXT_PUBLIC_APP_KEYWORDS
NEXT_PUBLIC_APP_LOGO
NEXT_PUBLIC_API_BASE_URL
NEXT_PUBLIC_APP_PORT
NEXT_PUBLIC_I18N_DEFAULT_LANGUAGE
NEXT_PUBLIC_I18N_SUPPORTED_LANGUAGE
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_USER_ID
NEXT_PUBLIC_APP_*_URL (social links)
NEXT_PUBLIC_APP_THEME_MULTI_COLOR_MODE
NEXT_PUBLIC_VERSION
```

### Docker Build Command
```bash
docker build -f ./apps/portfolio-nextjs/docker/Dockerfile -t notadream-portfolio-nextjs .
```

### Known Issues
🚨 **CRITICAL BUILD FAILURE**
- ❌ Import of `react-router-dom` in `app/layouts/PageLayout.tsx:7`
- ❌ React Router is not compatible with Next.js file-based routing
- ❌ Requires code refactoring to use Next.js routing instead

**Error**:
```
Module not found: Can't resolve 'react-router-dom'
```

**Solution**: Remove React Router usage and replace with Next.js Link/routing

### Development
```bash
cd apps/portfolio-nextjs
pnpm install
pnpm run dev     # Start dev server (port 3000)
pnpm run build   # Build for production (static export)
```

### Key Features
- ✅ Next.js 15 App Router
- ✅ Static Site Generation (SSG)
- ✅ Comprehensive SEO support
- ✅ Auto sitemap generation
- ❌ React Router incompatibility (blocker)

---

## Application Dependency Matrix

```
┌──────────────────────────────────────┐
│  Shared Libraries                    │
│  @notadream/react                    │
│  @notadream/backend                  │
└──────────────────────────────────────┘
    ▲              ▲         ▲         ▲
    │              │         │         │
    └──────────┬───┘         │         │
               │             │         │
            Used by          │         │
               │             │         │
        ┌──────┴─────┐       │         │
        ▼            ▼       ▼         ▼
    Portfolio    Admin   Blogs   Portfolio-NextJS
    (Vite)      (Vite)  (Next)    (Next)
        │            │      │         │
        └────────────┴──────┴─────────┘
                     ▼
                   API
            (Fastify, Port 4000)
```

---

## Development Tips

### Working with Multiple Apps
```bash
# Install all dependencies
pnpm install

# Run specific app
cd apps/portfolio && pnpm run dev

# Build all apps
pnpm run build

# Turbo parallel builds
turbo run build
```

### Docker Development
```bash
# Build single app Docker image
docker build -f ./apps/portfolio/docker/Dockerfile -t notadream-portfolio .

# Run with docker-compose
docker-compose up

# Build all images
docker-compose build
```

### Debugging Issues
1. Check app-specific `README.md` in each app folder
2. Review `.env.example` for required variables
3. Check `tsconfig.json` for TypeScript paths
4. Inspect `docker/Dockerfile` for build issues

---

**Next**: Read [03-shared-libraries.md](./03-shared-libraries.md) for library documentation.
