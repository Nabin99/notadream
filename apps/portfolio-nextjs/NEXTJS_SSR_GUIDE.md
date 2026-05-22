# Next.js Portfolio - Static Export vs SSR Guide

## Current Setup: Static Export (Production-Ready)

Currently, your portfolio is configured for **static export** and serves through Nginx:

```
┌─────────────┐
│ Next.js App │ → Build to static files → Nginx Server
└─────────────┘                         (Port 4003)
```

**Docker Command:**
```bash
docker build -f Dockerfile -t portfolio-nextjs .
docker run -p 4003:4003 portfolio-nextjs
```

---

## Future Setup: Server-Side Rendering (SSR)

When you need dynamic features, switch to SSR with Node.js server:

```
┌─────────────┐
│ Next.js App │ → Node.js Server → Nginx (optional)
└─────────────┘    (Port 3000)
```

**Docker Command:**
```bash
docker build -f Dockerfile.ssr -t portfolio-nextjs-ssr .
docker run -p 3000:3000 portfolio-nextjs-ssr
```

---

## Migration Steps: Static → SSR

### **Step 1: Remove Static Export**

Edit `next.config.mjs`:

```typescript
// ❌ DELETE THIS LINE:
output: 'export',

// Your next.config.mjs should NOT have output: 'export'
```

### **Step 2: Update next.config.mjs**

Make sure your config looks like:

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', ← REMOVE THIS
  reactStrictMode: true,
  compress: true,
  transpilePackages: ['@notadream/react'],
  // ... rest of config
};

export default nextConfig;
```

### **Step 3: Switch Docker Build**

Use `Dockerfile.ssr` instead of `Dockerfile`:

```bash
# Old (Static Export):
docker build -f Dockerfile -t portfolio-nextjs .

# New (SSR):
docker build -f Dockerfile.ssr -t portfolio-nextjs-ssr .
```

### **Step 4: Update Environment Variables**

SSR allows **runtime environment variables** (not just build-time):

```bash
# Create .env.local or pass at runtime
NEXT_PUBLIC_API_BASE_URL="http://api.example.com"
NODE_ENV="production"
```

### **Step 5: Run SSR Server**

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL="http://api.example.com" \
  portfolio-nextjs-ssr
```

---

## Comparison Table

| Feature | Static Export | SSR |
|---------|---------------|-----|
| **Build Output** | `.next/out/` (static files) | `.next/` (server-ready) |
| **Runtime** | Nginx static server | Node.js application |
| **Port** | 4003 | 3000 |
| **API Routes** | ❌ No | ✅ Yes (`/api/...`) |
| **Middleware** | ❌ No | ✅ Yes |
| **getServerSideProps** | ❌ No | ✅ Yes |
| **Dynamic Routes** | ❌ No (at build time) | ✅ Yes (at request time) |
| **Environment Vars** | Build-time only | Runtime (build + runtime) |
| **Database Queries** | ❌ No | ✅ Yes |
| **Authentication** | ❌ No | ✅ Yes |
| **Real-time Data** | ❌ No | ✅ Yes |
| **Performance** | 🚀 Fastest | ⚡ Fast |
| **Scalability** | ✅ Excellent | ✅ Good (load balance) |
| **Cost** | 💰 Low (CDN-friendly) | 💰 Medium (server required) |

---

## File Changes Summary

### Static Export (Current)
```
├── next.config.mjs
│   └── output: 'export' ✓
├── docker/
│   ├── Dockerfile ✓ (uses Nginx)
│   └── nginx.conf ✓
└── .next/out/ → Static files
```

### SSR (Future)
```
├── next.config.mjs
│   └── NO output: 'export' ✓
├── docker/
│   └── Dockerfile.ssr ✓ (uses Node.js)
├── .next/ → Server files
└── api/ → Optional API routes
```

---

## When to Switch to SSR?

**Keep Static Export when:**
- Portfolio is mostly static content
- You want maximum performance
- You don't need dynamic content
- You want to use a CDN

**Switch to SSR when:**
- ✅ You need dynamic blog posts from database
- ✅ You need real-time portfolio updates
- ✅ You need contact form with backend
- ✅ You need user authentication
- ✅ You need API routes for third-party integrations

---

## Docker Compose Example (SSR)

Create `docker-compose.yml` for SSR with environment variables:

```yaml
version: '3.9'

services:
  portfolio-nextjs:
    build:
      context: .
      dockerfile: apps/portfolio-nextjs/docker/Dockerfile.ssr
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      NEXT_PUBLIC_API_BASE_URL: "${API_URL:-http://localhost:4000}"
      NEXT_PUBLIC_APP_NAME: "Nabin Dhital"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

---

## Testing SSR Locally

```bash
# Install dependencies
pnpm i

# Remove "output: 'export'" from next.config.mjs

# Build for SSR
pnpm --filter ./apps/portfolio-nextjs/ build

# Run SSR server
pnpm --filter ./apps/portfolio-nextjs/ start

# Visit http://localhost:3000
```

---

## Troubleshooting

### Error: "output: export" conflicts with API routes
→ Remove `output: 'export'` from next.config.mjs

### Build fails with "Cannot find module"
→ Make sure `transpilePackages: ['@notadream/react']` is in next.config.mjs

### Port 3000 already in use
→ Change port: `pnpm start -- -p 3001`

### Container exits immediately
→ Check logs: `docker logs <container-id>`

---

## Summary

Your portfolio is currently optimized for **static deployment** with excellent performance. The SSR setup is ready whenever you need dynamic features. Just switch the Dockerfile and remove the static export setting!

**You have both options:**
- ✅ **Now**: Static Export (Dockerfile) - Perfect for portfolio
- ✅ **Later**: SSR (Dockerfile.ssr) - Perfect for scalability
