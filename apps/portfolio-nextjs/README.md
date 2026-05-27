# 🚀 Portfolio (Next.js)

NotADream Portfolio built with **Next.js 15**, **React 19**, and **TypeScript**.

## 📋 Overview

The Next.js-based portfolio is a modern, server-side rendered portfolio with exceptional performance, SEO capabilities, and scalability. It supports both static generation and server-side rendering for maximum flexibility.

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **UI Library**: React 19.0
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS
- **Internationalization**: i18n
- **Package Manager**: pnpm 9.15.9
- **Runtime**: Node.js 20+
- **Server**: Node.js standalone + Nginx (production)

## 📦 Dependencies

### Core Dependencies
- `next`: ^15.0 - React framework
- `react`: ^19.0 - UI library
- `react-dom`: ^19.0 - React DOM rendering

### Libraries
- `@notadream/react`: - Shared React components, hooks, routing, i18n, theme engine

### Development Dependencies
- `typescript`: - Type-safe development
- `tailwindcss`: - Utility-first CSS
- `eslint`: - Code quality
- `prettier`: - Code formatting

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 20.x
- **pnpm**: 9.15.9
- Configured from monorepo root

### Installation

Install dependencies from the monorepo root:

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Configure these variables:

```env
NODE_ENV=development
PORTFOLIO_NEXTJS_PORT=3000
NEXT_PUBLIC_APP_TITLE=Portfolio - Nabin Dhital
NEXT_PUBLIC_APP_DESCRIPTION=Full-stack developer portfolio
NEXT_PUBLIC_APP_KEYWORDS=portfolio, developer, full-stack
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_LOGO=/logo.svg
```

### Development

Start the development server:

```bash
pnpm --filter @notadream/portfolio-nextjs dev
```

Or from the monorepo root:

```bash
pnpm dev
```

The portfolio will be available at `http://localhost:3000`

### Build

Build for production:

```bash
pnpm --filter @notadream/portfolio-nextjs build
```

### Production

Start the production server:

```bash
pnpm --filter @notadream/portfolio-nextjs start
```

## 📁 Project Structure

```
apps/portfolio-nextjs/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── providers.tsx           # Context providers
│   ├── RootLayoutWrapper.tsx   # Layout wrapper
│   ├── routing-adapter.tsx     # Routing adapter
│   ├── config.ts               # Configuration
│   ├── client-only.tsx         # Client boundary
│   ├── globals.css             # Global styles
│   ├── loading.tsx             # Loading state
│   ├── not-found.tsx           # 404 page
│   ├── sitemap.ts              # SEO sitemap
│   ├── (routes)/               # Route segments
│   ├── about/                  # About page
│   ├── portfolio/              # Portfolio page
│   ├── contact/                # Contact page
│   ├── components/             # Reusable components
│   ├── layouts/                # Layout components
│   ├── assets/                 # Images, fonts
│   ├── utils/                  # Utility functions
│   ├── apis/                   # API integrations
│   └── i18n/                   # Internationalization
├── public/                     # Static assets
│   ├── robots.txt              # SEO robots file
│   ├── sitemap.xml             # SEO sitemap
│   └── site.webmanifest        # PWA manifest
├── docker/
│   ├── Dockerfile              # Static export Docker
│   ├── Dockerfile.ssr          # SSR Docker (optional)
│   └── nginx.conf              # Nginx configuration
├── .next/                      # Next.js build output
├── package.json                # Dependencies
├── tsconfig.json              # TypeScript configuration
├── next.config.mjs            # Next.js configuration
├── NEXTJS_SSR_GUIDE.md        # SSR documentation
├── SEO_IMPLEMENTATION.md      # SEO documentation
└── README.md                  # This file
```

## 🐳 Docker

### Build Docker Image (Static Export)

```bash
docker build -f ./apps/portfolio-nextjs/docker/Dockerfile \
  -t notadream-portfolio-nextjs:latest .
```

### Build Docker Image (SSR)

For server-side rendering:

```bash
docker build -f ./apps/portfolio-nextjs/docker/Dockerfile.ssr \
  -t notadream-portfolio-nextjs-ssr:latest .
```

### Run Docker Container

```bash
docker run -p 3000:3000 notadream-portfolio-nextjs:latest
```

### Using Docker Compose

```bash
# Start the portfolio service
docker-compose up portfolio-nextjs

# Start all services
docker-compose up
```

The portfolio will be available at `http://localhost:3000`

## 🧪 Testing

Run tests:

```bash
pnpm --filter @notadream/portfolio-nextjs test
```

Run tests in watch mode:

```bash
pnpm --filter @notadream/portfolio-nextjs test:watch
```

## 📊 Features

- ✅ Next.js 15 with App Router
- ✅ Server-side rendering (SSR)
- ✅ Static site generation (SSG)
- ✅ Incremental static regeneration (ISR)
- ✅ Type-safe with TypeScript
- ✅ Responsive design with Tailwind CSS
- ✅ Multi-language support (i18n)
- ✅ API routes for content management
- ✅ SEO optimized (robots.txt, sitemap.xml, schema markup)
- ✅ Image optimization
- ✅ Dynamic sitemap generation
- ✅ Standalone production build for Docker
- ✅ PWA support

## 🔄 Rendering Modes

### Static Export (Default in Dockerfile)

For fully static sites:

```bash
next build
# Output: out/ directory with static HTML
```

### Server-Side Rendering (Dockerfile.ssr)

For dynamic content:

```bash
next build
next start
```

### Development Mode

For rapid development:

```bash
next dev
```

## 🌍 Internationalization

Multi-language support configured in:

```env
NEXT_PUBLIC_APP_TITLE=Portfolio - Nabin
NEXT_PUBLIC_APP_DESCRIPTION=Full-stack developer
```

Language files in `app/i18n/`

## 📄 SEO Configuration

### Robots File
`public/robots.txt` - Guides search engine crawlers

### Sitemap
`app/sitemap.ts` - Dynamic sitemap generation

### Metadata
Configured in `app/layout.tsx` with Open Graph tags

See [SEO_IMPLEMENTATION.md](./SEO_IMPLEMENTATION.md) for details

## ⚠️ Known Issues

### Issue: Docker Build Fails with React Router Error

**Error Message:**
```
Cannot find module 'react-router-dom'
```

**Root Cause:**
`PageLayout.tsx` imports React Router components which are incompatible with Next.js file-based routing.

**Status:** 🔴 **BLOCKER** - Needs code refactoring

**Solution:**
Remove React Router imports from `app/layouts/PageLayout.tsx` and refactor to use Next.js routing patterns.

See [NEXTJS_SSR_GUIDE.md](./NEXTJS_SSR_GUIDE.md) for migration guide.

## 🚨 Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# Find and kill the process
lsof -i :3000
kill -9 <PID>

# Or use Docker with a different port
docker run -p 3001:3000 notadream-portfolio-nextjs:latest
```

### Dependencies Not Found

Ensure all dependencies are installed:

```bash
pnpm install
pnpm --filter @notadream/portfolio-nextjs install
```

### Build Fails

Clean and rebuild:

```bash
rm -rf .next/
pnpm --filter @notadream/portfolio-nextjs build
```

### Docker Build Fails

Common issues:
- Invalid pnpm version (check Dockerfile)
- React Router incompatibility (see Known Issues)
- Missing dependencies (run `pnpm install`)

Solution:

```bash
# Clean Docker cache
docker system prune -a

# Rebuild
docker build -f ./apps/portfolio-nextjs/docker/Dockerfile \
  -t notadream-portfolio-nextjs:latest .
```

## 🔌 API Integration

The portfolio connects to the Fastify API service:

- **Default API URL**: `http://localhost:4000`
- **Configure via**: `.env` file (`NEXT_PUBLIC_API_URL`)

Ensure the API service is running before starting the portfolio.

## 📖 Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_APP_TITLE` | Page title | Portfolio - Nabin |
| `NEXT_PUBLIC_APP_DESCRIPTION` | Meta description | Full-stack developer |
| `NEXT_PUBLIC_API_URL` | API URL | http://localhost:4000 |
| `NEXT_PUBLIC_APP_LOGO` | Logo path | /logo.svg |

## 📚 Related Documentation

- [SSR Implementation Guide](./NEXTJS_SSR_GUIDE.md)
- [SEO Implementation Guide](./SEO_IMPLEMENTATION.md)
- [Docker Compose Guide](../../instructions/DOCKER_COMPOSE_GUIDE.md)
- [Docker Update Report](../../instructions/DOCKER_UPDATE_REPORT.md)
- [Main README](../../README.md)
- [React Library](../../libs/react/README.md)
- [Portfolio Vite](../portfolio/README.md)
- [Next.js Official Docs](https://nextjs.org/docs)

## 📄 License

UNLICENSED

## 👤 Author

Nabin Dhital
