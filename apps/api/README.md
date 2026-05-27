# 🚀 API Service

NotADream REST API built with **Fastify** and **TypeScript**.

## 📋 Overview

The API service provides the backend for all frontend applications in the NotADream ecosystem. It's built with Fastify for high performance and includes proper TypeScript typing for type-safe development.

## 🛠️ Tech Stack

- **Framework**: Fastify 5.2
- **Language**: TypeScript 5.6
- **Runtime**: Node.js 20+
- **Package Manager**: pnpm 9.15.9
- **Build Tool**: esbuild + Turbo

## 📦 Dependencies

### Core Dependencies
- `fastify`: ^5.2.0 - Web framework
- `dotenv`: - Environment configuration

### Development Dependencies
- `esbuild`: - Fast JavaScript bundler
- `tsconfig`: - TypeScript configuration
- `typescript`: - Type-safe JavaScript

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
PORT=4000
API_BASE_URL=http://localhost:4000
```

### Development

Start the development server:

```bash
pnpm --filter @notadream/api dev
```

Or from the monorepo root:

```bash
pnpm dev
```

The API will be available at `http://localhost:4000`

### Build

Build the API for production:

```bash
pnpm --filter @notadream/api build
```

Output files will be in `dist/` directory.

### Production

Start the production server:

```bash
node dist/index.js
```

## 📁 Project Structure

```
apps/api/
├── src/
│   ├── api.ts              # Fastify app initialization
│   ├── index.ts            # Entry point
│   └── config/
│       └── config.ts       # Configuration management
├── dist/                   # Compiled output (production)
├── docker/
│   └── Dockerfile         # Docker configuration
├── package.json           # Dependencies
└── tsconfig.json         # TypeScript configuration
```

## 🐳 Docker

### Build Docker Image

```bash
docker build -f ./apps/api/docker/Dockerfile -t notadream-api:latest .
```

### Run Docker Container

```bash
docker run -p 4000:4000 \
  -e NODE_ENV=production \
  -e PORT=4000 \
  notadream-api:latest
```

### Using Docker Compose

```bash
# Start the API service
docker-compose up api

# Start all services
docker-compose up
```

## 🧪 Testing

Run unit tests:

```bash
pnpm --filter @notadream/api test
```

Run integration tests:

```bash
pnpm --filter @notadream/api test:integration
```

## 📊 API Endpoints

Health Check:

```bash
curl http://localhost:4000/health
```

## 🔒 Health Checks

The API includes Docker health checks:

- **Interval**: 30 seconds
- **Timeout**: 3 seconds
- **Retries**: 3 attempts
- **Start Period**: 5 seconds

## 📝 Logs

View Docker logs:

```bash
docker-compose logs -f api
```

## 🚨 Troubleshooting

### Port Already in Use

If port 4000 is already in use:

```bash
# Find and kill the process
lsof -i :4000
kill -9 <PID>

# Or change the PORT environment variable
PORT=4001 node dist/index.js
```

### Module Not Found

Ensure dependencies are installed:

```bash
pnpm install
pnpm --filter @notadream/api install
```

### Build Fails

Clean and rebuild:

```bash
rm -rf dist/
pnpm --filter @notadream/api build
```

## 📚 Related Documentation

- [Docker Compose Guide](../../instructions/DOCKER_COMPOSE_GUIDE.md)
- [Docker Update Report](../../instructions/DOCKER_UPDATE_REPORT.md)
- [Main README](../../README.md)

## 📄 License

UNLICENSED

## 👤 Author

Nabin Dhital
