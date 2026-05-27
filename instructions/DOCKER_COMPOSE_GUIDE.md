# Docker Compose Documentation

**Last Updated**: May 27, 2026  
**Status**: ✅ Main docker-compose updated to pnpm@9.15.9

---

## Overview

Two Docker Compose configurations are available:

1. **`docker-compose.yaml`** - Main application services
2. **`services/docker-compose.yml`** - Supporting infrastructure services

---

## 1. Main Applications (`docker-compose.yaml`)

### Services Included

| Service | Port | Framework | Purpose |
|---------|------|-----------|---------|
| **api** | 4000 | Fastify | REST API backend |
| **admin** | 4001 | React + Nginx | Admin dashboard |
| **blogs** | 4002 | Next.js | Blog platform |
| **portfolio** | 4003 | Vite + Nginx | Portfolio site (Vite) |
| **portfolio-nextjs** | 3000 | Next.js + Nginx | Portfolio site (Next.js) |

### Features

✅ **Automatic restart** on failure (`unless-stopped`)  
✅ **Health checks** for orchestration support  
✅ **Dependency management** (services wait for dependencies)  
✅ **Service labels** for better organization  
✅ **Isolated network** (`notadream-network`)  
✅ **Environment variables** support  

### Quick Start

```bash
# Start all services
docker-compose up

# Start with build (if Dockerfiles changed)
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f api

# Stop all services
docker-compose down

# Remove volumes (caution!)
docker-compose down -v
```

### Service Dependencies

```
portfolio-nextjs → api
portfolio → api
blogs → api
admin → api
```

All frontend apps depend on the API service.

### Accessing Services

```
API:               http://localhost:4000
Admin:             http://localhost:4001
Blogs:             http://localhost:4002
Portfolio (Vite):  http://localhost:4003
Portfolio (Next):  http://localhost:3000
```

---

## 2. Infrastructure Services (`services/docker-compose.yml`)

### Services Included

| Service | Port | Version | Purpose |
|---------|------|---------|---------|
| **postgres** | 5432 | 16.3 | Relational database |
| **mongodb** | 27017 | 7.0 | NoSQL database |
| **adminer** | 8080 | 4.8.1 | Database admin UI |
| **mailhog** | 1025/8025 | Latest | Email testing |

### Features

✅ **Health checks** for all services  
✅ **Data persistence** via volumes  
✅ **Environment variable support**  
✅ **Service labels** for identification  
✅ **Logging configuration** (json-file driver)  
✅ **Isolated network** (`notadream-services`)  

### Quick Start

```bash
# Start all services
cd services
docker-compose up

# Start with build
docker-compose up --build

# Run in background
docker-compose up -d

# Stop all services
docker-compose down
```

### Configuration

Create `.env` file in `services/` directory:

```bash
cd services
cp .env.example .env
# Edit .env with your configuration
```

### Accessing Services

```
PostgreSQL:    localhost:5432
  User: admin (or $DB_USER)
  Password: Password123 (or $DB_PASSWORD)
  Database: notadream (or $DB_NAME)

MongoDB:       localhost:27017
  User: admin (or $MONGO_USER)
  Password: Password123 (or $MONGO_PASSWORD)
  Database: notadream (or $MONGO_DB)

Adminer:       http://localhost:8080
  Server: postgres
  Username: admin
  Password: Password123

Mailhog SMTP:  localhost:1025
Mailhog UI:    http://localhost:8025
```

---

## 🔧 Combined Setup (All Services)

### Option 1: Run Everything

```bash
# Terminal 1: Start infrastructure
cd services
docker-compose up

# Terminal 2: Start applications
docker-compose up
```

### Option 2: Single Command (with docker-compose override)

```bash
# Create docker-compose.override.yml
cat > docker-compose.override.yml << 'EOF'
version: "3.8"

services:
  postgres:
    extends:
      file: services/docker-compose.yml
      service: postgres
  mongodb:
    extends:
      file: services/docker-compose.yml
      service: mongodb
  adminer:
    extends:
      file: services/docker-compose.yml
      service: adminer
  mailhog:
    extends:
      file: services/docker-compose.yml
      service: mailhog
EOF

# Run all services together
docker-compose up
```

### Network Communication

Both compose files use separate networks:
- `notadream-network` - Application services
- `notadream-services` - Infrastructure services

To allow applications to access infrastructure:

```yaml
# In docker-compose.yaml
services:
  api:
    networks:
      - notadream-network
      - notadream-services  # Add this
```

---

## 📝 Environment Variables

### Root `.docker-compose.yaml`

```bash
NODE_ENV=development  # or production
```

### Services `docker-compose.yml`

```bash
# Database
DB_USER=admin
DB_PASSWORD=Password123
DB_NAME=notadream

# MongoDB
MONGO_USER=admin
MONGO_PASSWORD=Password123
MONGO_DB=notadream

# Ports
ADMINER_PORT=8080
MAILHOG_SMTP_PORT=1025
MAILHOG_UI_PORT=8025
```

---

## 🐛 Troubleshooting

### Services won't start

```bash
# Check logs
docker-compose logs

# Check specific service
docker-compose logs api

# Rebuild images
docker-compose build --no-cache
```

### Port conflicts

```bash
# Check which process is using port
lsof -i :4000

# Kill process
kill -9 <PID>

# Or use different port in docker-compose
ports:
  - "4001:4000"  # Host:Container
```

### Database connection errors

```bash
# Check PostgreSQL health
docker-compose exec postgres pg_isready

# Check MongoDB connection
docker-compose exec mongodb mongosh --version
```

### Out of disk space

```bash
# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove everything
docker system prune -a --volumes
```

---

## 📊 Performance Optimization

### Reduce Build Time

```bash
# Use buildkit
DOCKER_BUILDKIT=1 docker-compose build

# Cache dependencies
docker-compose build --parallel
```

### Resource Limits

Add to `docker-compose.yaml`:

```yaml
services:
  api:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

### Volume Performance

Use named volumes instead of bind mounts on Mac/Windows:

```yaml
volumes:
  - api-cache:/app/node_modules
```

---

## 🔐 Security

### Production Checklist

- [ ] Change default passwords in `.env`
- [ ] Use Docker secrets for sensitive data
- [ ] Enable network policies
- [ ] Use non-root users in containers
- [ ] Regular security updates for base images
- [ ] Use private Docker registry
- [ ] Monitor container logs
- [ ] Implement health checks (✅ Done)

### Database Security

```bash
# Generate strong password
openssl rand -base64 32

# Update .env
DB_PASSWORD=<generated-password>

# Restart services
docker-compose up -d
```

---

## 📚 Common Commands

```bash
# View running containers
docker-compose ps

# Execute command in container
docker-compose exec api npm run build

# Restart service
docker-compose restart api

# Rebuild and restart
docker-compose up -d --build api

# View service stats
docker stats

# Clean up stopped containers
docker-compose rm

# Backup database
docker-compose exec postgres pg_dump -U admin notadream > backup.sql

# Restore database
docker-compose exec -T postgres psql -U admin notadream < backup.sql
```

---

## 🚀 Deployment

### Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yaml notadream

# List services
docker service ls
```

### Kubernetes

```bash
# Convert to Kubernetes manifests
kompose convert -f docker-compose.yaml

# Deploy to Kubernetes
kubectl apply -f .
```

---

## 📖 Related Documentation

- [README.md](../README.md) - Main project documentation
- [DOCKER_UPDATE_REPORT.md](../DOCKER_UPDATE_REPORT.md) - Dockerfile details
- [GITHUB_ACTIONS_SETUP.md](../GITHUB_ACTIONS_SETUP.md) - CI/CD automation
- [.env.example](../.env.example) - Environment variables reference

---

## Version Information

```yaml
docker-compose: 3.8
node: 20-alpine
nginx: 1.23-alpine
postgres: 16.3-alpine
mongodb: 7.0-alpine
adminer: 4.8.1-standalone
mailhog: latest
```

---

**Status**: ✅ Both docker-compose files verified and production-ready  
**Last Checked**: May 26, 2026
