# Configuration Management Guide

## Environment Variables

### Setup

**Location**: `.env` (create from `.env.example`)

```bash
cp .env.example .env
```

### Structure

Environment variables are organized by application:

#### General Settings
```
NODE_ENV=development
```

#### Port Configuration
```
API_PORT=4000
ADMIN_PORT=4001
BLOGS_PORT=4002
PORTFOLIO_PORT=4003
PORTFOLIO_NEXTJS_PORT=3000
BLOGS_HOSTNAME=0.0.0.0
```

#### Application Settings

**API**:
```
# (Currently minimal, future expansions for DB, auth, etc.)
```

**Admin**:
```
# No specific vars needed currently
```

**Blogs**:
```
# No specific vars needed currently
```

**Portfolio (Vite)**:
```
VITE_APP_NAME=NotADream Portfolio
VITE_APP_TITLE=Portfolio - Nabin Dhital
VITE_APP_DESCRIPTION=Full-stack developer portfolio
VITE_APP_KEYWORDS=portfolio, developer, full-stack
VITE_APP_LOGO=/logo.svg
VITE_API_BASE_URL=http://localhost:4000
VITE_APP_EMAIL=dhitalnabin224@gmail.com
VITE_I18N_DEFAULT_LANGUAGE=en
VITE_I18N_SUPPORTED_LANGUAGE=en,fr
VITE_EMAILJS_SERVICE_ID=(from EmailJS)
VITE_EMAILJS_TEMPLATE_ID=(from EmailJS)
VITE_EMAILJS_USER_ID=(from EmailJS)
VITE_APP_FACEBOOK_URL=
VITE_APP_GITHUB_URL=https://github.com
VITE_APP_INSTAGRAM_URL=
VITE_APP_LINKEDIN_URL=
VITE_APP_TWITTER_URL=
VITE_APP_THEME_MULTI_COLOR_MODE=false
VITE_COPYRIGHT_HOLDER=
VITE_VERSION=0.1.0
```

**Portfolio (Next.js)**:
```
NEXT_PUBLIC_BASE_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_THEME_COLOR=#16c7d5
NEXT_PUBLIC_APP_TITLE=Nabin Dhital | Full-Stack Developer & SEO Specialist
NEXT_PUBLIC_APP_DESCRIPTION=...
NEXT_PUBLIC_APP_AUTHOR=Nabin Dhital
NEXT_PUBLIC_APP_TWITTER_HANDLE=@dhitalnabin111
NEXT_PUBLIC_APP_EMAIL=nabin@example.com
NEXT_PUBLIC_APP_KEYWORDS=...
NEXT_PUBLIC_APP_LOGO=/logo.svg
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_APP_PORT=3000
NEXT_PUBLIC_I18N_DEFAULT_LANGUAGE=en
NEXT_PUBLIC_I18N_SUPPORTED_LANGUAGE=en,fr
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_8ydegqh
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_tuc61gb
NEXT_PUBLIC_EMAILJS_USER_ID=xjbCaLkYMZiZzQOp0
NEXT_PUBLIC_APP_FACEBOOK_URL=https://www.facebook.com/dhitalnabin111
NEXT_PUBLIC_APP_GITHUB_URL=https://github.com/Nabin99
NEXT_PUBLIC_APP_INSTAGRAM_URL=https://www.instagram.com/dhitalnabin11
NEXT_PUBLIC_APP_LINKEDIN_URL=https://www.linkedin.com/in/dhitalnabin
NEXT_PUBLIC_APP_TWITTER_URL=https://twitter.com/dhitalnabin111
NEXT_PUBLIC_APP_THEME_MULTI_COLOR_MODE=false
NEXT_PUBLIC_VERSION=0.1.0
```

### Best Practices

1. **Never commit .env**: Always add to `.gitignore`
2. **Use .env.example**: Check it into version control
3. **Keep secrets safe**: Never share .env contents
4. **Production vars**: Use different .env.production for prod
5. **Document defaults**: Add comments in .env.example

---

## TypeScript Configuration

### Root tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noImplicitAny": true,
    "paths": {
      "@notadream/*": ["./libs/*/src"]
    }
  },
  "include": ["apps", "libs"],
  "exclude": ["node_modules", "dist"]
}
```

### Path Aliases

```typescript
// ✅ CORRECT - Use path aliases
import { Button } from '@notadream/react/components';

// ❌ INCORRECT - Don't use relative paths
import { Button } from '../../../libs/react/src/components/Button';
```

### Per-App TypeScript

Each app has its own `tsconfig.json` that extends root config:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "target": "ES2020"
  },
  "include": ["src", "vite-environment.d.ts"],
  "exclude": ["node_modules", "dist"]
}
```

---

## Build Configuration

### Root package.json

**Scripts**:
```json
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "type-check": "turbo run type-check",
    "lint": "turbo run lint"
  }
}
```

**Workspace Configuration**:
```json
{
  "name": "notadream",
  "version": "0.1.0",
  "private": true,
  "packageManager": "pnpm@9.15.9",
  "workspaces": [
    "apps/*",
    "libs/*"
  ]
}
```

### pnpm-workspace.yaml

```yaml
packages:
  - 'apps/*'
  - 'libs/*'
```

### Turbo Configuration (turbo.json)

```json
{
  "version": "1",
  "pipeline": {
    "dev": {
      "cache": false,
      "persistent": true
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "type-check": {
      "outputs": []
    },
    "lint": {
      "outputs": []
    }
  }
}
```

---

## Vite Configuration

### Portfolio vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
```

### Environment Variables in Vite

```typescript
// Vite exposes env vars via import.meta.env
import.meta.env.VITE_API_BASE_URL  // Needs VITE_ prefix
import.meta.env.MODE               // development or production
```

---

## Next.js Configuration

### next.config.mjs

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: []
  }
};

export default nextConfig;
```

### Environment Variables in Next.js

```typescript
// In component or page
process.env.NEXT_PUBLIC_API_URL    // Public (exposed to browser)
process.env.DATABASE_URL           // Private (server-side only)

// With TypeScript
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      DATABASE_URL: string;
    }
  }
}
```

---

## Fastify Configuration

### apps/api/src/config/config.ts

```typescript
export const config = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development'
};
```

---

## Docker Compose Configuration

### docker-compose.yaml Structure

```yaml
version: "3.8"

services:
  # Each service has:
  - build context and Dockerfile
  - environment variables
  - port mappings
  - networking
  - restart policy
  - labels

networks:
  notadream-network:
    driver: bridge

volumes:
  postgres-data:
  mongodb-data:
```

### Environment Variable Override

In docker-compose:
```yaml
environment:
  PORT: ${API_PORT:-4000}          # Uses .env if set, defaults to 4000
  NODE_ENV: ${NODE_ENV:-development}
```

---

## Security Best Practices

### 1. Never Commit Secrets
```bash
# ✅ Good - Use .env (gitignored)
echo ".env" >> .gitignore

# ❌ Bad - Committing secrets
git add .env           # Won't work, already in .gitignore
```

### 2. Use Different Configs for Different Environments

```
.env              → Development
.env.production   → Production
.env.staging      → Staging
```

### 3. Validate Environment Variables

```typescript
// In app startup
function validateEnv() {
  const required = ['PORT', 'API_BASE_URL'];
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required env var: ${key}`);
    }
  }
}
```

### 4. Rotate Secrets

EmailJS credentials, JWT secrets, and API keys should be rotated:
- Quarterly minimum
- Immediately if compromised
- Before deployment

---

## Debugging Configuration

### Check Resolved Configuration

**For Vite apps**:
```typescript
console.log(import.meta.env);  // All env vars in browser
```

**For Node apps**:
```typescript
console.log(process.env);      // All env vars in server
```

### Common Configuration Issues

| Issue | Solution |
|-------|----------|
| Port already in use | Change port in `.env` or docker-compose |
| Env vars not loaded | Check `.env` file exists and `NODE_ENV` is set |
| Type errors | Run `pnpm run type-check` |
| Build fails | Check env vars are defined in docker-compose |

---

## Environment-Specific Setup

### Development
```
NODE_ENV=development
Ports: Full (no conflicts)
Database: Optional
API: Local
```

### Production
```
NODE_ENV=production
Ports: 80/443 (behind nginx)
Database: Required with backups
API: HTTPS only
Secrets: From secure vault
```

### Docker
```
NODE_ENV=development|production
Ports: Mapped via docker-compose
Database: PostgreSQL/MongoDB in containers
Network: Docker bridge network
```

---

**See Also**: [05-development-workflow.md](./05-development-workflow.md) for more setup details.

**Last Updated**: May 27, 2026
