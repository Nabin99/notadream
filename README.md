# NotADream - Personal Portfolio & Project Ecosystem

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Node Version](https://img.shields.io/badge/node-%3E%3D%2020-brightgreen)
![pnpm](https://img.shields.io/badge/pnpm-9.15.9-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![License](https://img.shields.io/badge/license-UNLICENSED-red)

A monorepo-based personal portfolio and content platform built with **TypeScript**, **React**, **Next.js**, **Fastify**, and **Turbo**. Designed for quick delivery and scalable project management.

## 🎯 Overview

NotADream is a comprehensive full-stack ecosystem that showcases a full-stack engineer's work through multiple applications:

- **Portfolio Apps**: Two versions (Vite + Next.js) for maximum flexibility
- **API Server**: RESTful backend powered by Fastify
- **Blog Platform**: Content management with Next.js
- **Admin Dashboard**: Management interface for portfolio content
- **React Library**: Shared component library and utilities
- **Backend Library**: Shared backend utilities and helpers

---

## 📁 Project Structure

```
notadream/
├── apps/                          # Applications
│   ├── api/                       # Fastify REST API server (Port 4000)
│   ├── admin/                     # React admin dashboard (Port 4001)
│   ├── blogs/                     # Next.js blog platform (Port 4002)
│   ├── portfolio/                 # Vite-based portfolio (Port 4003)
│   └── portfolio-nextjs/          # Next.js portfolio (Port 3000)
├── libs/                          # Shared libraries
│   ├── react/                     # React components & utilities
│   └── backend/                   # Node.js backend utilities
├── services/                      # Docker compose configuration
├── .github/workflows/             # CI/CD pipelines
├── docker-compose.yaml            # Multi-container orchestration
├── pnpm-workspace.yaml            # Workspace configuration
├── turbo.json                     # Build pipeline config
└── package.json                   # Root dependencies & scripts
```

---

## 🗂️ Applications & Services

### **Apps**

| App | Framework | Port | Purpose | Status |
|-----|-----------|------|---------|--------|
| **portfolio-nextjs** | Next.js 15 + React 19 | 3000 | Modern portfolio site with SSR support | ✅ Production |
| **portfolio** | Vite + React 19 | 4003 | Static export portfolio | ✅ Production |
| **api** | Fastify 5.2 | 4000 | RESTful API backend | ✅ Production |
| **blogs** | Next.js 15 | 4002 | Blog platform & content hub | 🔧 Development |
| **admin** | React 19 + Vite | 4001 | Admin dashboard | 🔧 Development |

### **Libraries**

| Library | Purpose | Exports |
|---------|---------|---------|
| **@notadream/react** | Shared React components, hooks, utilities, routing, i18n, theme engine | UMD + ESM + TypeScript |
| **@notadream/backend** | Shared backend utilities, API helpers, middleware | Node.js compatible |

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19.0** - UI library
- **Next.js 15** - Full-stack framework with SSR/SSG
- **Vite 5** - Lightning-fast build tool
- **React Router DOM 7** - Client-side routing
- **TypeScript 5.6** - Type-safe development
- **Tailwind CSS** - Utility-first CSS
- **React Hook Form** - Form management
- **Zod** - Schema validation

### **Backend**
- **Fastify 5** - High-performance server framework
- **Node.js 20** - JavaScript runtime
- **TypeScript** - Type-safe backend code

### **DevOps & Tools**
- **Turbo 2.5** - Monorepo build orchestration
- **pnpm 9.15** - Fast package manager
- **Docker & Docker Compose** - Containerization
- **GitHub Actions** - CI/CD automation
- **Vercel** - Production deployment
- **ESLint & Prettier** - Code quality
- **Husky & Commitlint** - Git hooks

### **Infrastructure**
- **Nginx** - Web server / reverse proxy
- **PostgreSQL** - Relational database (optional)
- **MongoDB** - Document database (optional)

---

## 🚀 Quick Start

### **Prerequisites**

- **Node.js**: `>= 20.x`
- **pnpm**: `9.15.9` (or run `npm install -g pnpm@9.15.9`)
- **Docker**: (optional, for containerized development)

### **Installation**

```bash
# Clone the repository
git clone https://github.com/Nabin99/notadream.git
cd notadream

# Install dependencies (uses pnpm workspaces)
pnpm install

# Install Git hooks
pnpm run prepare
```

### **Development**

```bash
# Start all apps in development mode
pnpm run dev

# Or start specific app
pnpm run dev:portfolio

# Build all packages and apps
pnpm run build

# Build only libraries
pnpm run build:libs

# Type check all apps
pnpm run typecheck

# Lint all apps
pnpm run lint

# Fix linting issues
pnpm run lint:fix
```

### **Testing**

```bash
# Run all tests
pnpm run test

# Run unit tests only
pnpm run test:unit

# Run integration tests
pnpm run test:integration

# Run tests in CI mode
pnpm run test:ci
```

---

## 🐳 Docker Development

### **Run All Services**

```bash
# Build and start all services
docker-compose up --build

# Services available at:
# - API: http://localhost:4000
# - Admin: http://localhost:4001
# - Blogs: http://localhost:4002
# - Portfolio (Vite): http://localhost:4003
# - Portfolio (Next.js): http://localhost:3000
```

### **Run Individual Services**

```bash
# Only portfolio-nextjs
docker-compose up portfolio-nextjs

# Only API
docker-compose up api

# View logs
docker-compose logs -f portfolio-nextjs
```

### **Docker Build for Production**

```bash
# Build portfolio (Vite)
docker build -f apps/portfolio/docker/Dockerfile -t portfolio:latest .

# Build portfolio-nextjs (Static export)
docker build -f apps/portfolio-nextjs/docker/Dockerfile -t portfolio-nextjs:latest .

# Build portfolio-nextjs (SSR mode) - Future
docker build -f apps/portfolio-nextjs/docker/Dockerfile.ssr -t portfolio-nextjs-ssr:latest .

# Build API
docker build -f apps/api/docker/Dockerfile -t api:latest .
```

---

## 📝 Environment Configuration

All apps use environment variables for configuration. See [.env.example](.env.example) for template.

### **Key Environment Variables**

```bash
# Application
NEXT_PUBLIC_APP_NAME="Nabin Dhital"
NEXT_PUBLIC_APP_TITLE="Portfolio"
NEXT_PUBLIC_BASE_APP_URL="http://localhost:3000"

# API
NEXT_PUBLIC_API_BASE_URL="http://localhost:4000"

# Email Integration (EmailJS)
NEXT_PUBLIC_EMAILJS_SERVICE_ID="service_xxxxx"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="template_xxxxx"
NEXT_PUBLIC_EMAILJS_USER_ID="user_xxxxx"

# Social Links
NEXT_PUBLIC_APP_LINKEDIN_URL="https://linkedin.com/in/your-profile"
NEXT_PUBLIC_APP_GITHUB_URL="https://github.com/your-profile"
NEXT_PUBLIC_APP_TWITTER_URL="https://twitter.com/your-handle"
```

---

## 🚢 Deployment

### **Vercel Deployment (Next.js Portfolio)**

The project includes GitHub Actions workflows for automated deployment:

```bash
# Push to development branch → Preview deployment on Vercel
git push origin development

# Push to main branch → Production deployment on Vercel
git push origin main
```

**Setup Instructions**: See [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md)

### **Docker Deployment**

```bash
# Build and push to registry
docker build -f apps/portfolio-nextjs/docker/Dockerfile -t registry/portfolio-nextjs:latest .
docker push registry/portfolio-nextjs:latest

# Run on production
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL="https://api.example.com" \
  registry/portfolio-nextjs:latest
```

---

## 📚 Documentation

### **Project Guides**

- [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md) - CI/CD deployment guide
- [NEXTJS_SSR_GUIDE.md](apps/portfolio-nextjs/NEXTJS_SSR_GUIDE.md) - SSR migration guide
- [.env.example](.env.example) - Environment variables reference

### **App-Specific Documentation**

- **Portfolio NextJS**: [apps/portfolio-nextjs/README.md](apps/portfolio-nextjs/README.md)
- **React Library**: [libs/react/package.json](libs/react/package.json)
- **Backend API**: [apps/api/package.json](apps/api/package.json)

---

## 📊 Available Scripts

### **Root Level**

| Script | Purpose |
|--------|---------|
| `pnpm dev` | Start all apps in dev mode |
| `pnpm build` | Build all packages with Turbo |
| `pnpm build:libs` | Build only libraries |
| `pnpm lint` | Run ESLint on all apps |
| `pnpm lint:fix` | Fix linting issues automatically |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm test` | Run all tests |
| `pnpm test:unit` | Run unit tests only |
| `pnpm test:ci` | Run tests in CI mode |
| `pnpm sort-package` | Sort package.json files |

### **Per App**

Each app has its own npm scripts. Common ones:

```bash
# Navigate to specific app
cd apps/portfolio-nextjs

# App-specific commands
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server (Next.js)
pnpm lint         # Run linter
pnpm typecheck    # Type check
```

---

## 🔧 Development Workflow

### **Branch Strategy**

- `main` - Production ready
- `development` - Integration branch
- `feature/*` - Feature branches

### **Commit Convention**

Uses CommitLint with conventional commits:

```bash
feat: add new feature
fix: fix a bug
docs: documentation changes
refactor: code refactoring
test: add tests
chore: build, deps, config changes
```

### **Pre-commit Checks**

Husky runs automatically:
- TypeScript compilation check
- ESLint validation
- Commit message validation

---

## 🏗️ Monorepo Architecture (Turbo)

This project uses **Turbo** for monorepo management:

```bash
# Smart caching with Turbo
pnpm run build
# Builds in dependency order, caches results

# Parallel execution
pnpm run lint
# Runs linting in all apps simultaneously

# Filtered execution
pnpm --filter ./apps/portfolio-nextjs build
# Build only specific package
```

---

## 🔐 Security

- **TypeScript**: Compile-time type safety
- **ESLint**: Code quality rules
- **Git Hooks**: Pre-commit checks
- **Container Security**: Docker best practices
- **HTTPS**: TLS/SSL support in production
- **Environment Secrets**: GitHub Secrets for sensitive data

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and follow commit conventions
3. Ensure tests pass: `pnpm test`
4. Ensure code is formatted: `pnpm lint:fix`
5. Push and create a Pull Request

---

## 📄 License

Unlicensed - All rights reserved

---

## 👤 Author

**Nabin Dhital**

- 🔗 [LinkedIn](https://linkedin.com/in/dhitalnabin)
- 🐙 [GitHub](https://github.com/Nabin99)
- 🐦 [Twitter](https://twitter.com/dhitalnabin111)

---

## 📞 Support & Contact

For questions or issues:

1. Check [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md) for deployment help
2. Check [NEXTJS_SSR_GUIDE.md](apps/portfolio-nextjs/NEXTJS_SSR_GUIDE.md) for Next.js questions
3. Review app-specific README files
4. Open an issue on GitHub

---

## 🗺️ Roadmap

- [ ] Blog API with database integration
- [ ] Admin dashboard fully functional
- [ ] Portfolio API for dynamic content
- [ ] User authentication system
- [ ] Real-time notifications
- [ ] Analytics integration
- [ ] Performance monitoring
- [ ] CDN integration

---

## 🔗 Quick Links

- 📱 **Portfolio (Vite)**: http://localhost:4003
- 🎨 **Portfolio (Next.js)**: http://localhost:3000
- 📝 **Blogs**: http://localhost:4002
- ⚙️ **Admin**: http://localhost:4001
- 🔌 **API**: http://localhost:4000
- 🐳 **Docker Hub**: [notadream](https://hub.docker.com)

---

**Last Updated**: May 2026 | **Version**: 0.1.0

