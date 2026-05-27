# 📚 Blogs Platform

NotADream Blog Platform built with **Next.js 15**, **React 19**, and **TypeScript**.

## 📋 Overview

The Blogs Platform is a content management system for publishing articles and blog posts. It's built with Next.js for server-side rendering, static generation, and API routes, providing excellent performance and SEO capabilities.

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **UI Library**: React 19.0
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL / MongoDB (optional)
- **Package Manager**: pnpm 9.15.9
- **Runtime**: Node.js 20+
- **Server**: Node.js standalone (Docker)

## 📦 Dependencies

### Core Dependencies
- `next`: ^15.0 - React framework
- `react`: ^19.0 - UI library
- `react-dom`: ^19.0 - React DOM rendering

### Libraries
- `@notadream/react`: - Shared React components and utilities

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
BLOGS_PORT=4002
BLOGS_HOSTNAME=localhost
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_BLOG_TITLE=NotADream Blogs
NEXT_PUBLIC_BLOG_DESCRIPTION=Articles and insights
```

### Development

Start the development server:

```bash
pnpm --filter @notadream/blogs dev
```

Or from the monorepo root:

```bash
pnpm dev
```

The blog platform will be available at `http://localhost:4002`

### Build

Build for production:

```bash
pnpm --filter @notadream/blogs build
```

### Production

Start the production server:

```bash
pnpm --filter @notadream/blogs start
```

Or using Node.js directly:

```bash
node apps/blogs/.next/standalone/server.js
```

## 📁 Project Structure

```
apps/blogs/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   └── (routes)/            # Page routes
├── public/                  # Static assets
├── .next/                   # Next.js build output
│   ├── standalone/          # Production server (Docker)
│   └── static/              # Static files
├── docker/
│   └── Dockerfile          # Docker configuration
├── package.json            # Dependencies
├── tsconfig.json          # TypeScript configuration
├── next.config.js         # Next.js configuration
└── README.md              # This file
```

## 🐳 Docker

### Build Docker Image

```bash
docker build -f ./apps/blogs/docker/Dockerfile -t notadream-blogs:latest .
```

### Run Docker Container

```bash
docker run -p 4002:4002 \
  -e NODE_ENV=production \
  -e PORT=4002 \
  -e HOSTNAME=localhost \
  notadream-blogs:latest
```

### Using Docker Compose

```bash
# Start the blogs service
docker-compose up blogs

# Start all services
docker-compose up
```

The blog platform will be available at `http://localhost:4002`

## 🧪 Testing

Run tests:

```bash
pnpm --filter @notadream/blogs test
```

Run tests in watch mode:

```bash
pnpm --filter @notadream/blogs test:watch
```

## 📊 Features

- ✅ Next.js 15 with App Router
- ✅ Server-side rendering (SSR)
- ✅ Static site generation (SSG)
- ✅ Incremental static regeneration (ISR)
- ✅ Type-safe with TypeScript
- ✅ Responsive design with Tailwind CSS
- ✅ API routes for content management
- ✅ SEO optimized
- ✅ Image optimization
- ✅ Standalone production build for Docker

## 🔄 Build Modes

### Static Export (Default in Dockerfile)

For fully static sites:

```bash
next build
next export
```

Output: `out/` directory with static HTML files

### Server-Side Rendering

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

## 🚨 Troubleshooting

### Port Already in Use

If port 4002 is already in use:

```bash
# Find and kill the process
lsof -i :4002
kill -9 <PID>

# Or use Docker with a different port
docker run -p 4003:4002 notadream-blogs:latest
```

### Dependencies Not Found

Ensure all dependencies are installed:

```bash
pnpm install
pnpm --filter @notadream/blogs install
```

### Build Fails

Clean and rebuild:

```bash
rm -rf .next/
pnpm --filter @notadream/blogs build
```

### Docker Build Fails

Common issues:
- Invalid pnpm version (check Dockerfile)
- Missing dependencies (run `pnpm install`)
- Build scripts failing (check `package.json`)

Solution:

```bash
# Clean Docker cache
docker system prune -a

# Rebuild
docker build -f ./apps/blogs/docker/Dockerfile -t notadream-blogs:latest .
```

## 🔌 API Integration

The blog platform connects to the Fastify API service:

- **Default API URL**: `http://localhost:4000`
- **Configure via**: `.env` file (`NEXT_PUBLIC_API_URL`)

Ensure the API service is running before starting the blog platform.

## 📖 Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `NODE_ENV` | Environment mode | development |
| `BLOGS_PORT` | Server port | 4002 |
| `BLOGS_HOSTNAME` | Server hostname | localhost |
| `NEXT_PUBLIC_API_URL` | API base URL | http://localhost:4000 |
| `NEXT_PUBLIC_BLOG_TITLE` | Blog title | NotADream Blogs |
| `NEXT_PUBLIC_BLOG_DESCRIPTION` | Blog description | Articles and insights |

## 📚 Related Documentation

- [Docker Compose Guide](../../instructions/DOCKER_COMPOSE_GUIDE.md)
- [Docker Update Report](../../instructions/DOCKER_UPDATE_REPORT.md)
- [Main README](../../README.md)
- [React Library](../../../libs/react/README.md)
- [Next.js Official Docs](https://nextjs.org/docs)

## 📄 License

UNLICENSED

## 👤 Author

Nabin Dhital
