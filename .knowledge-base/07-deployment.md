# Deployment Guide

## Pre-Deployment Checklist

### Code Review
- [ ] All features complete and tested
- [ ] No console.log or debug code
- [ ] TypeScript passes type-check
- [ ] Code follows linting rules
- [ ] All tests passing
- [ ] Commits follow conventional commits

### Testing
- [ ] Local development testing complete
- [ ] Docker build successful for all apps
- [ ] Staging environment tested
- [ ] Cross-browser testing done
- [ ] Mobile responsiveness verified
- [ ] Performance profiled

### Security
- [ ] No secrets in code
- [ ] Environment variables configured
- [ ] API endpoints have auth checks
- [ ] CORS configured properly
- [ ] Rate limiting in place
- [ ] SSL/TLS enabled for production

### Documentation
- [ ] README updated
- [ ] API endpoints documented
- [ ] Configuration documented
- [ ] Deployment steps documented
- [ ] Known issues noted

---

## Building for Production

### 1. Build All Applications

```bash
# Production build
pnpm run build

# Or with Turbo
turbo run build --force
```

**Output**:
```
apps/api/dist/
apps/admin/dist/
apps/blogs/.next/
apps/portfolio/dist/
apps/portfolio-nextjs/.next/
```

### 2. Verify Build Artifacts

```bash
# Check output sizes
du -sh apps/*/dist
du -sh apps/*/.next

# Ensure no sourcemaps in prod
grep -r ".map" apps/*/dist 2>/dev/null
```

### 3. Build Docker Images

```bash
# Build all images
docker-compose build

# Build specific image
docker build -f ./apps/portfolio/docker/Dockerfile -t notadream-portfolio:latest .

# Tag for registry
docker tag notadream-portfolio:latest registry.example.com/notadream-portfolio:1.0.0
```

### 4. Push to Registry

```bash
# Login to registry
docker login registry.example.com

# Push all images
docker-compose push

# Or push individually
docker push registry.example.com/notadream-portfolio:1.0.0
```

---

## Environment Configuration

### Production .env

```bash
# Copy and customize for production
cp .env.example .env.production
```

**Key differences from development**:
```
NODE_ENV=production
PORTFOLIO_NEXTJS_PORT=4003    # Use different port or proxy
API_BASE_URL=https://api.notadream.com
DATABASE_URL=postgresql://user:pass@db-host:5432/notadream
MONGODB_URL=mongodb://user:pass@mongo-host:27017/notadream
JWT_SECRET=<generate-strong-secret>
SESSION_SECRET=<generate-strong-secret>
```

### Generate Secrets

```bash
# Generate random secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Configure Nginx

**Example nginx.conf** (for apps/portfolio):
```nginx
upstream api {
  server api:4000;
}

server {
  listen 80;
  server_name portfolio.notadream.com;

  # SSL redirect (in production)
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name portfolio.notadream.com;

  ssl_certificate /etc/ssl/certs/cert.pem;
  ssl_certificate_key /etc/ssl/private/key.pem;

  location / {
    root /usr/share/nginx/html;
    try_files $uri $uri/ /index.html;
  }

  location /api {
    proxy_pass http://api;
  }
}
```

---

## Docker Deployment

### Option 1: Docker Compose (Simple)

```bash
# Pull latest images
docker-compose pull

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Update and restart
docker-compose down
docker-compose pull
docker-compose up -d
```

### Option 2: Docker Swarm (Medium)

```bash
# Initialize swarm
docker swarm init

# Create stack from compose file
docker stack deploy -c docker-compose.yaml notadream

# Check status
docker stack services notadream

# Update
docker service update <service-id> --image <new-image>
```

### Option 3: Kubernetes (Advanced)

Create `k8s/` folder with manifests:

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: notadream-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: notadream-api
  template:
    metadata:
      labels:
        app: notadream-api
    spec:
      containers:
      - name: api
        image: registry.example.com/notadream-api:latest
        ports:
        - containerPort: 4000
        env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "4000"
---
apiVersion: v1
kind: Service
metadata:
  name: notadream-api
spec:
  selector:
    app: notadream-api
  ports:
  - protocol: TCP
    port: 4000
    targetPort: 4000
```

Deploy with kubectl:
```bash
kubectl apply -f k8s/
```

---

## Database Migration

### Before Deployment

**Backup current database**:
```bash
# PostgreSQL
pg_dump postgresql://user:pass@localhost/notadream > backup.sql

# MongoDB
mongodump --uri="mongodb://localhost:27017/notadream"
```

### Schema Migration

**Option 1: Manual SQL**:
```sql
-- Initial schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Option 2: Migration Tool** (e.g., Flyway):
```bash
# Place migrations in migrations/ folder
# migrations/V1__Initial_Schema.sql

# Run migrations
flyway migrate
```

### Rollback Plan

```bash
# PostgreSQL restore
psql notadream < backup.sql

# MongoDB restore
mongorestore --archive=backup.archive
```

---

## Zero-Downtime Deployment

### Blue-Green Deployment

```
Current (Blue):   notadream-api:v1
Staging (Green):  notadream-api:v2

1. Deploy v2 to staging
2. Test v2 thoroughly
3. Switch traffic from v1 to v2
4. Keep v1 as rollback
5. If issues, switch back to v1
```

### Rolling Deployment

```bash
# Update 1/3 instances at a time
# Ensures service availability during update

docker service update \
  --image registry.example.com/api:v2 \
  --update-parallelism 1 \
  --update-delay 10s \
  notadream_api
```

---

## Health Monitoring

### Health Check Endpoints

Configure in each app:

```typescript
// API health check
app.get('/health', async (req, res) => {
  // Check database connectivity
  const dbHealth = await checkDatabase();
  
  if (!dbHealth) {
    return res.status(500).json({ status: 'unhealthy' });
  }
  
  return res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  });
});
```

### Monitoring Setup

**Docker health check**:
```yaml
services:
  api:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 5s
```

**External monitoring** (e.g., Prometheus):
```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'notadream'
    static_configs:
      - targets: ['localhost:9090']
```

---

## Logging & Debugging

### Structured Logging

```typescript
import { logger } from '@notadream/backend/utils';

// Log format: timestamp | level | message | context
logger.info('User login', { userId: 123, ip: '192.168.1.1' });
logger.error('Database error', { error: err.message });
```

### Log Aggregation

Example with ELK Stack:

```docker-compose
elasticsearch:
  image: docker.elastic.co/elasticsearch/elasticsearch:latest

kibana:
  image: docker.elastic.co/kibana/kibana:latest
  ports:
    - "5601:5601"

logstash:
  image: docker.elastic.co/logstash/logstash:latest
```

Access logs at `http://localhost:5601`

### Docker Logs

```bash
# View container logs
docker logs -f notadream-api

# View logs since specific time
docker logs --since 2024-01-01T00:00:00 notadream-api

# Follow logs
docker logs -f notadream-api
```

---

## Performance Optimization

### CDN Setup

Serve static assets from CDN:

```nginx
# In nginx.conf
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

### Caching Strategy

```
Static Assets:  1 year
CSS/JS:         1 month
HTML:           No cache (must revalidate)
API:            Cache-Control: no-store
```

### Database Optimization

```sql
-- Create indexes for frequently queried fields
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_author_id ON posts(author_id);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM posts WHERE author_id = 1;
```

---

## Rollback Procedure

### If Deployment Fails

```bash
# Immediate rollback
docker-compose down
docker-compose up -d

# Or with images
docker pull registry.example.com/notadream-api:1.0.0
docker tag registry.example.com/notadream-api:1.0.0 latest
docker restart notadream-api
```

### Restore Database

```bash
# PostgreSQL
psql notadream < backup-2024-01-01.sql

# MongoDB
mongorestore --archive=backup-2024-01-01.archive
```

---

## Maintenance Windows

### Scheduled Maintenance

```bash
# Notify users (display maintenance banner)

# Stop accepting new connections
nginx: return 503 'Maintenance in progress';

# Wait for current connections to drain
sleep 60

# Deploy updates
docker pull && docker-compose up -d

# Resume service
# Remove maintenance banner
```

### Database Maintenance

```sql
-- Vacuum PostgreSQL
VACUUM ANALYZE;

-- Reindex MongoDB
db.collection.reIndex();

-- Check database size
SELECT pg_database.datname,
       pg_size_pretty(pg_database_size(pg_database.datname)) AS size
FROM pg_database;
```

---

## Post-Deployment

### Verification Checklist

- [ ] All services running: `docker-compose ps`
- [ ] Health checks passing: `curl http://localhost:4000/health`
- [ ] Database connected: Test queries
- [ ] Frontend loads: Open in browser
- [ ] API responding: Test endpoints
- [ ] Logs clean: `docker-compose logs`
- [ ] Performance acceptable: Monitor metrics

### Monitoring

```bash
# Monitor resources
docker stats

# Check running services
docker ps

# View service logs
docker-compose logs -f api
```

### Communication

- Notify users of deployment
- Update status page
- Document changes
- Monitor for issues

---

## Disaster Recovery

### Backup Strategy

```bash
# Daily backups
0 2 * * * pg_dump postgresql://user:pass@localhost/notadream > /backups/db-$(date +%Y%m%d).sql

# Store in multiple locations
# - Local disk
# - S3/Cloud storage
# - Different data center
```

### RTO/RPO Targets

- **RTO** (Recovery Time Objective): < 1 hour
- **RPO** (Recovery Point Objective): < 1 day

### Recovery Procedure

```
1. Identify failure
2. Notify stakeholders
3. Restore from backup
4. Test restored system
5. Switch to restored system
6. Monitor for issues
7. Investigate root cause
8. Update runbooks
```

---

**See Also**:
- [06-database-infrastructure.md](./06-database-infrastructure.md) - Database setup
- [04-configuration.md](./04-configuration.md) - Configuration
- [09-known-issues.md](./09-known-issues.md) - Known issues

**Last Updated**: May 27, 2026
