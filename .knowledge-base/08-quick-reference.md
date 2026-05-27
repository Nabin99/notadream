# Quick Reference & Cheat Sheet

## 🚀 Most Common Commands

### Installation & Setup
```bash
# Install all dependencies
pnpm install

# Install specific workspace
cd apps/portfolio && pnpm install

# Reinstall (clean)
rm -rf node_modules pnpm-lock.yaml && pnpm install
```

### Development
```bash
# Start all apps in development
pnpm run dev

# Start specific app
cd apps/portfolio && pnpm run dev

# Build single app
cd apps/api && pnpm run build

# Build all apps (turbo parallel)
pnpm run build

# Type check
pnpm run type-check

# Lint code
pnpm run lint
```

### Docker
```bash
# Build all Docker images
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Build specific image
docker build -f ./apps/portfolio/docker/Dockerfile -t notadream-portfolio .

# Start only certain services
docker-compose up -d api admin
```

---

## 📍 Key File Locations

### Root Configuration
| File | Purpose |
|------|---------|
| `package.json` | Root workspace dependencies |
| `pnpm-workspace.yaml` | Workspace configuration |
| `turbo.json` | Turbo build orchestration |
| `tsconfig.json` | TypeScript base config |
| `docker-compose.yaml` | All applications |
| `.env.example` | Environment variable template |

### Application Locations
| App | Main Entry | Config | Docker |
|-----|-----------|--------|--------|
| api | `apps/api/src/index.ts` | `apps/api/src/config/` | `apps/api/docker/` |
| admin | `apps/admin/src/main.tsx` | `apps/admin/vite.config.ts` | `apps/admin/docker/` |
| blogs | `apps/blogs/src/app/page.tsx` | `apps/blogs/next.config.js` | `apps/blogs/docker/` |
| portfolio | `apps/portfolio/src/main.tsx` | `apps/portfolio/src/config.ts` | `apps/portfolio/docker/` |
| portfolio-nextjs | `apps/portfolio-nextjs/app/page.tsx` | `apps/portfolio-nextjs/app/config.ts` | `apps/portfolio-nextjs/docker/` |

### Library Locations
| Library | Source | Exports |
|---------|--------|---------|
| @notadream/react | `libs/react/src/` | Components, hooks, utilities |
| @notadream/backend | `libs/backend/src/` | Utilities, helpers |

---

## 🔌 Port Reference

| Service | Port | Access URL |
|---------|------|------------|
| API | 4000 | `http://localhost:4000` |
| Admin | 4001 | `http://localhost:4001` |
| Blogs | 4002 | `http://localhost:4002` |
| Portfolio (Vite) | 4003 | `http://localhost:4003` |
| Portfolio (Next.js) | 3000 (dev), 4003 (prod) | `http://localhost:3000` |
| PostgreSQL | 5432 | `postgresql://postgres:postgres@localhost:5432/notadream` |
| MongoDB | 27017 | `mongodb://localhost:27017/notadream` |
| Adminer | 8080 | `http://localhost:8080` |
| Mailhog SMTP | 1025 | - |
| Mailhog Web | 1143 | `http://localhost:1143` |

---

## 🛠️ Build Status

| App | Status | Docker | Notes |
|-----|--------|--------|-------|
| api | ✅ Works | ✅ Builds | Fastify framework ready |
| admin | ✅ Works | ✅ Builds | React template, no features |
| blogs | ✅ Works | ✅ Builds | Next.js template, no features |
| portfolio | ✅ Works | ✅ Builds | Fully functional SPA |
| portfolio-nextjs | ❌ Fails | ❌ Fails | React Router incompatibility |

---

## 📦 Import Paths

### From Shared Libraries
```typescript
// React components and utilities
import { Button, Card } from '@notadream/react/components';
import { useTheme, useI18n } from '@notadream/react/hooks';

// Backend utilities (in Node apps)
import { logger } from '@notadream/backend/utils';
```

### TypeScript Path Aliases
Configured in root `tsconfig.json`:
```json
"paths": {
  "@notadream/*": ["./libs/*/src"]
}
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module '@notadream/react'"
**Solution**:
```bash
# Make sure dependencies are linked
pnpm install

# Type check
pnpm run type-check
```

### Issue: Port already in use
**Solution**:
```bash
# Find process using port
lsof -i :4000  # or any port number

# Kill process
kill -9 <PID>

# Or change port in docker-compose or .env
```

### Issue: Docker build fails
**Solution**:
```bash
# Clean Docker cache
docker system prune -a

# Rebuild
docker-compose build --no-cache

# Check specific build
docker build -f ./apps/api/docker/Dockerfile -t test . --no-cache
```

### Issue: pnpm lock conflicts
**Solution**:
```bash
# Regenerate lock file
rm pnpm-lock.yaml
pnpm install
```

### Issue: TypeScript errors
**Solution**:
```bash
# Type check all workspaces
pnpm run type-check

# Rebuild Turbo cache
turbo run build --force
```

---

## 📋 Git Workflow

```bash
# Check status
git status

# See all branches
git branch -a

# Create feature branch
git checkout -b feature/my-feature

# Commit changes
git add .
git commit -m "feat: description"

# Push to remote
git push origin feature/my-feature

# Create pull request (on GitHub)
```

---

## 🔐 Environment Setup

### Create Local .env
```bash
cp .env.example .env
```

### Essential Variables for Development
```
NODE_ENV=development
API_PORT=4000
ADMIN_PORT=4001
BLOGS_PORT=4002
PORTFOLIO_PORT=4003
PORTFOLIO_NEXTJS_PORT=3000
```

---

## 📊 Performance Tips

### Speed Up Development
```bash
# Use pnpm install (faster than npm)
pnpm install

# Use Turbo for builds (caches results)
turbo run build

# Filter builds to specific app
turbo run build --filter=api
```

### Docker Performance
```bash
# Use buildx for multi-platform
docker buildx build -f ./apps/api/docker/Dockerfile .

# Parallel builds
docker-compose build --parallel
```

---

## 📚 Documentation Map

- **Full Details**: See [01-architecture.md](./01-architecture.md)
- **Application Docs**: See [02-applications.md](./02-applications.md)
- **Libraries**: See [03-shared-libraries.md](./03-shared-libraries.md)
- **Configuration**: See [04-configuration.md](./04-configuration.md)
- **Development**: See [05-development-workflow.md](./05-development-workflow.md)
- **Database**: See [06-database-infrastructure.md](./06-database-infrastructure.md)
- **Deployment**: See [07-deployment.md](./07-deployment.md)
- **Issues**: See [09-known-issues.md](./09-known-issues.md)

---

**Last Updated**: May 27, 2026
