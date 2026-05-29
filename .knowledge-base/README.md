# NotADream Project Knowledge Base

> Comprehensive linked documentation for the NotADream monorepo project. Use these resources to understand, develop, deploy, and maintain the project.

## 📚 Documentation Structure

### 1. **[Architecture Overview](./01-architecture.md)**
   - Monorepo structure and organization
   - Technology stack breakdown
   - Service dependencies and relationships
   - Network architecture

### 2. **[Applications Guide](./02-applications.md)**
   - Detailed documentation for each application
   - Tech stack, entry points, features
   - Build processes and Docker setup
   - Application status and issues

### 3. **[Shared Libraries](./03-shared-libraries.md)**
   - @notadream/react library documentation
   - @notadream/backend library documentation
   - Export APIs and usage patterns
   - Integration examples

### 4. **[Configuration Management](./04-configuration.md)**
   - Environment variables reference
   - Docker configuration
   - Build configurations (Vite, Next.js, esbuild)
   - TypeScript configuration patterns

### 5. **[Development Workflow](./05-development-workflow.md)**
   - Setup and installation
   - Common development commands
   - Debugging and troubleshooting
   - Code organization and conventions
   - Testing workflow and best practices

### 5.1 **[Testing Guide - MAIN REFERENCE](../TESTING.md)** 
   - Jest and Vitest configuration
   - Running tests locally and in CI
   - Coverage requirements and reports
   - Troubleshooting test issues
   - Common gotchas (watch mode, freezing)

### 6. **[Database & Infrastructure](./06-database-infrastructure.md)**
   - Database setup and schemas
   - PostgreSQL and MongoDB configuration
   - Docker services reference
   - Health checks and monitoring

### 7. **[Deployment Guide](./07-deployment.md)**
   - Docker build process
   - Deployment checklist
   - Production environment setup
   - Known issues and solutions

### 8. **[Quick Reference](./08-quick-reference.md)**
   - Key commands cheat sheet
   - File locations guide
   - Common issues and fixes
   - Development tips and tricks

### 9. **[Known Issues](./09-known-issues.md)**
   - Critical blockers
   - Current build status
   - Compatibility issues
   - Investigation notes

### 10. **[Team Onboarding](./10-team-onboarding.md)**
   - Getting started guide
   - Environment setup
   - First-time developer guide
   - Contribution guidelines

---

## 🚀 Quick Start

**First Time Here?** Start with these in order:
1. Read [Architecture Overview](./01-architecture.md)
2. Follow [Team Onboarding](./10-team-onboarding.md)
3. Check [Development Workflow](./05-development-workflow.md)
4. Read [Testing Guide](../TESTING.md) for test setup

**Need to Test Your Code?**
1. Review [Testing Guide](../TESTING.md) - comprehensive reference
2. Check [Development Workflow Testing Section](./05-development-workflow.md#testing-during-development)
3. Troubleshoot using [Known Issues](./09-known-issues.md) (see Issue #5 about Vitest)

**Need to Deploy?**
1. Review [Deployment Guide](./07-deployment.md)
2. Check [Known Issues](./09-known-issues.md)
3. Use [Quick Reference](./08-quick-reference.md)

**Debugging an Issue?**
1. Search [Known Issues](./09-known-issues.md)
2. Check [Quick Reference](./08-quick-reference.md) troubleshooting
3. Review relevant app documentation in [Applications Guide](./02-applications.md)

---

## 📊 Project Stats

| Aspect | Details |
|--------|---------|
| **Applications** | 5 (2 Portfolios, Admin, Blogs, API) |
| **Libraries** | 2 (React, Backend) |
| **Backend Services** | 4 (PostgreSQL, MongoDB, Adminer, Mailhog) |
| **Package Manager** | pnpm 9.15.9 |
| **Monorepo Tool** | Turbo |
| **Node Version** | 20 LTS (Alpine) |
| **Docker Support** | Full (5 apps + 4 services) |
| **Build Systems** | Vite, Next.js 15, esbuild |

---

## 🔗 Related Resources

- **Root Documentation**: See [PROJECT_DOCUMENTATION.md](../PROJECT_DOCUMENTATION.md) for comprehensive details
- **Instructions Folder**: See `/instructions/` for specific guides
- **Docker Setup**: See `docker-compose.yaml` and `services/docker-compose.yml`
- **Root Config**: `package.json`, `turbo.json`, `tsconfig.json`

---

## 📝 Notes

- All environment variables are documented in `.env.example`
- Docker Compose services are defined in root and `services/` directories
- Each app has its own `README.md` file
- Port assignments are standardized (see [Quick Reference](./08-quick-reference.md))

---

## ✏️ How to Update This Knowledge Base

When making changes to the project:
1. Update relevant documentation files
2. Add entries to [Known Issues](./09-known-issues.md) if applicable
3. Update [Quick Reference](./08-quick-reference.md) for new commands
4. Check this README for cross-references

---

**Last Updated**: May 27, 2026  
**Created by**: GitHub Copilot  
**Status**: Complete and verified
