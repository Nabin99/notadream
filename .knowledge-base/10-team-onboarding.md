# Team Onboarding Guide

Welcome to the NotADream project! This guide will help you get started quickly.

## 🎯 First Steps (30 minutes)

### 1. Clone and Setup
```bash
# Clone the repository
git clone <repository-url>
cd notadream

# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env
```

### 2. Verify Installation
```bash
# Check Node version
node --version  # Should be 20.x

# Check pnpm version
pnpm --version  # Should be 9.15.9

# Check project structure
ls -la apps/
ls -la libs/
```

### 3. Start Development
```bash
# Start all apps in development mode
pnpm run dev

# Or start a specific app
cd apps/portfolio && pnpm run dev
```

## 📚 Project Structure Quick Tour

```
notadream/
├── apps/                    # 5 Applications
│   ├── api/                 # ✅ Backend (Fastify)
│   ├── admin/               # 📊 Dashboard (React)
│   ├── blogs/               # 📝 Blog (Next.js)
│   ├── portfolio/           # 🎨 Portfolio (Vite)
│   └── portfolio-nextjs/    # 🎨 Portfolio (Next.js)
├── libs/                    # 2 Shared Libraries
│   ├── react/               # React components & utilities
│   └── backend/             # Backend utilities
├── services/                # Infrastructure services
├── .knowledge-base/         # Documentation (you are here)
├── docker-compose.yaml      # All apps orchestration
└── package.json             # Workspace root
```

## 🏃 Common Tasks

### Running Applications

**Start all apps:**
```bash
pnpm run dev
```

**Start specific app:**
```bash
cd apps/portfolio
pnpm run dev
# Accessible at http://localhost:5173
```

**Build for production:**
```bash
cd apps/portfolio
pnpm run build

# Or build all
pnpm run build
```

### Working with Docker

**Start with Docker:**
```bash
docker-compose up -d
```

**View logs:**
```bash
docker-compose logs -f
```

**Stop services:**
```bash
docker-compose down
```

**Build images:**
```bash
docker-compose build
```

### Code Management

**Make a change:**
```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
# ...

# Commit
git add .
git commit -m "feat: description"

# Push
git push origin feature/my-feature
```

**Check code quality:**
```bash
# Type checking
pnpm run type-check

# Linting
pnpm run lint
```

## 📱 Accessing Applications Locally

| App | URL | Status |
|-----|-----|--------|
| Portfolio (Vite) | http://localhost:4003 | ✅ Ready |
| Portfolio (Next.js) | http://localhost:3000 | ⚠️ Dev only |
| Admin | http://localhost:4001 | ✅ Ready |
| Blogs | http://localhost:4002 | ✅ Ready |
| API | http://localhost:4000 | ✅ Ready |

## 🔧 Technology Stack Breakdown

### Frontend
- **React 19**: Latest React version
- **Next.js 15**: Full-stack React framework
- **Vite**: Lightning-fast build tool
- **TypeScript 5.7**: Type-safe JavaScript
- **React Router**: Client-side routing

### Backend
- **Fastify 5.2**: Fast web framework
- **Node.js 20 LTS**: Server runtime
- **TypeScript**: Type safety

### Tooling
- **pnpm**: Fast, disk-efficient package manager
- **Turbo**: Build system optimizer
- **Docker**: Containerization

## 🎓 Learning Paths

### Path 1: Frontend Development
1. Start with [02-applications.md](./02-applications.md) - Understand each app
2. Learn portfolio app structure
3. Read [03-shared-libraries.md](./03-shared-libraries.md)
4. Follow [05-development-workflow.md](./05-development-workflow.md)

### Path 2: Backend Development
1. Read [02-applications.md](./02-applications.md) - API section
2. Learn about [06-database-infrastructure.md](./06-database-infrastructure.md)
3. Review API code structure
4. Implement endpoints

### Path 3: DevOps/Infrastructure
1. Understand [01-architecture.md](./01-architecture.md)
2. Read [07-deployment.md](./07-deployment.md)
3. Learn Docker setup in [06-database-infrastructure.md](./06-database-infrastructure.md)
4. Review [04-configuration.md](./04-configuration.md)

## 💡 Tips for Success

### 1. Use IDE Extensions
- Install ESLint extension
- Install TypeScript extension
- Install Prettier for formatting

### 2. Understand TypeScript Paths
```typescript
// Don't do this
import Button from '../../../libs/react/src/components/Button';

// Do this instead
import { Button } from '@notadream/react/components';
```

### 3. Keep Environment Variables Secure
```bash
# ✅ DO - Use .env (gitignored)
cp .env.example .env
# Edit .env with your values

# ❌ DON'T - Commit sensitive data
git add .env  # This won't work (.env is in .gitignore)
```

### 4. Use Turbo for Development
```bash
# Filter builds - faster than building everything
turbo run build --filter=api

# See what tasks are available
turbo run --help
```

### 5. Debug TypeScript Issues
```bash
# Type check all workspaces
pnpm run type-check

# Rebuild cache if issues persist
turbo run build --force
```

## ❓ Common Questions

### Q: Why is there no node_modules in my app folder?
**A**: pnpm workspaces hoist dependencies to root. This is normal and saves disk space.

### Q: Can I use npm or yarn?
**A**: No, use pnpm. It's configured in `package.json` and locked in `.npmrc`.

### Q: How do I add a new package?
```bash
# Add to specific app
cd apps/portfolio && pnpm add package-name

# Add to root (not recommended)
pnpm add -w package-name
```

### Q: The app won't start, what do I do?
```bash
# 1. Check error message carefully
# 2. Verify Node version
node --version

# 3. Clean and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 4. Check [09-known-issues.md](./09-known-issues.md)
```

### Q: Docker build is failing
```bash
# Check specific errors
docker-compose build --no-cache

# Or build single image
docker build -f ./apps/portfolio/docker/Dockerfile -t test .

# See [09-known-issues.md](./09-known-issues.md) for portfolio-nextjs issue
```

## 🚀 Next Steps

1. **Complete Setup**: Follow instructions above
2. **Read Documentation**: Start with [01-architecture.md](./01-architecture.md)
3. **Pick Task**: Choose what to work on
4. **Ask Questions**: Check relevant doc file or reach out
5. **Make Contribution**: Create feature branch and submit PR

## 📖 Documentation Map

| Document | Purpose |
|----------|---------|
| [01-architecture.md](./01-architecture.md) | System design & structure |
| [02-applications.md](./02-applications.md) | Each app details |
| [03-shared-libraries.md](./03-shared-libraries.md) | Library documentation |
| [04-configuration.md](./04-configuration.md) | Configs explained |
| [05-development-workflow.md](./05-development-workflow.md) | Dev best practices |
| [06-database-infrastructure.md](./06-database-infrastructure.md) | DB & services |
| [07-deployment.md](./07-deployment.md) | Deployment process |
| [08-quick-reference.md](./08-quick-reference.md) | Commands & tips |
| [09-known-issues.md](./09-known-issues.md) | Issues & solutions |

## 🆘 Getting Help

### Check These First
1. [08-quick-reference.md](./08-quick-reference.md) - Quick answers
2. [09-known-issues.md](./09-known-issues.md) - Known solutions
3. App-specific README in `apps/*/README.md`

### Common Resources
- TypeScript: https://www.typescriptlang.org/docs/
- React: https://react.dev
- Next.js: https://nextjs.org/docs
- Fastify: https://www.fastify.io/docs/
- pnpm: https://pnpm.io/

---

**You're all set!** 🎉  
Start exploring the codebase and happy coding!

**Last Updated**: May 27, 2026
