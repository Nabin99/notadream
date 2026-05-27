# 🎛️ Admin Dashboard

NotADream Admin Panel built with **React 19**, **Vite**, and **TypeScript**.

## 📋 Overview

The Admin Dashboard provides a management interface for NotADream portfolio content. It's a modern single-page application built with React and optimized for production using Vite.

## 🛠️ Tech Stack

- **UI Framework**: React 19.0
- **Build Tool**: Vite 6.4
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **Validation**: Zod
- **Package Manager**: pnpm 9.15.9
- **Server**: Nginx (production)

## 📦 Dependencies

### Core Dependencies
- `react`: ^19.0 - UI library
- `react-dom`: ^19.0 - React DOM rendering
- `react-hook-form`: - Form management
- `zod`: - Schema validation
- `@hookform/resolvers`: - Form validation integration

### Libraries
- `@notadream/react`: - Shared React components

### Development Dependencies
- `vite`: ^6.4 - Build tool
- `typescript`: - Type-safe development
- `tailwindcss`: - Utility-first CSS
- `@vitejs/plugin-react`: - React plugin for Vite

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
ADMIN_PORT=4001
VITE_API_BASE_URL=http://localhost:4000
```

### Development

Start the development server:

```bash
pnpm --filter @notadream/admin dev
```

Or from the monorepo root:

```bash
pnpm dev
```

The dashboard will be available at `http://localhost:4001`

### Build

Build for production:

```bash
pnpm --filter @notadream/admin build
```

Output files will be in `dist/` directory.

### Preview

Preview the production build locally:

```bash
pnpm --filter @notadream/admin preview
```

## 📁 Project Structure

```
apps/admin/
├── src/
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   ├── app.css              # Global styles
│   ├── index.css            # Reset styles
│   ├── components/          # Reusable components
│   ├── pages/               # Page components
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Utility functions
│   └── assets/              # Images, fonts, etc.
├── dist/                    # Compiled output (production)
├── docker/
│   ├── Dockerfile          # Docker configuration
│   └── nginx.conf          # Nginx configuration
├── public/                 # Static assets
├── package.json            # Dependencies
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## 🐳 Docker

### Build Docker Image

```bash
docker build -f ./apps/admin/docker/Dockerfile -t notadream-admin:latest .
```

### Run Docker Container

```bash
docker run -p 4001:4001 notadream-admin:latest
```

### Using Docker Compose

```bash
# Start the admin service
docker-compose up admin

# Start all services
docker-compose up
```

The dashboard will be available at `http://localhost:4001`

## 🧪 Testing

Run unit tests:

```bash
pnpm --filter @notadream/admin test
```

Run tests in watch mode:

```bash
pnpm --filter @notadream/admin test:watch
```

## 📊 Features

- ✅ Modern React 19 with hooks
- ✅ Type-safe with TypeScript
- ✅ Form validation with React Hook Form & Zod
- ✅ Responsive design with Tailwind CSS
- ✅ Fast builds with Vite
- ✅ Nginx for static serving
- ✅ Gzip compression support
- ✅ Production-optimized build

## 🚨 Troubleshooting

### Port Already in Use

If port 4001 is already in use:

```bash
# Find and kill the process
lsof -i :4001
kill -9 <PID>

# Or use Docker with a different port
docker run -p 4002:4001 notadream-admin:latest
```

### Dependencies Not Found

Ensure all dependencies are installed:

```bash
pnpm install
pnpm --filter @notadream/admin install
```

### Build Fails

Clean and rebuild:

```bash
rm -rf dist/
pnpm --filter @notadream/admin build
```

### Vite Error

Clear Vite cache:

```bash
rm -rf node_modules/.vite
pnpm --filter @notadream/admin dev
```

## 🔌 API Integration

The admin dashboard connects to the Fastify API service:

- **Default API URL**: `http://localhost:4000`
- **Configure via**: `.env` file (`VITE_API_BASE_URL`)

Ensure the API service is running before starting the admin dashboard.

## 📚 Related Documentation

- [Docker Compose Guide](../../instructions/DOCKER_COMPOSE_GUIDE.md)
- [Docker Update Report](../../instructions/DOCKER_UPDATE_REPORT.md)
- [Main README](../../README.md)
- [React Library](../../../libs/react/README.md)

## 📄 License

UNLICENSED

## 👤 Author

Nabin Dhital
