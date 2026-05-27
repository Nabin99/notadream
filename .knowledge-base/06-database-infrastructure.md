# Database & Infrastructure Guide

## Overview

The NotADream project includes optional infrastructure services for database and email management. These are defined in two places:
- **Root**: `docker-compose.yaml` (applications)
- **Services**: `services/docker-compose.yml` (infrastructure)

---

## Services Architecture

```
┌─────────────────────────────────────────────┐
│        Application Containers               │
│  (API, Admin, Blogs, Portfolio)             │
└──────────────────┬──────────────────────────┘
                   │
                   │ (Docker Bridge Network)
                   │
┌──────────────────┴──────────────────────────┐
│   Infrastructure Services                   │
├─────────────────────────────────────────────┤
│  • PostgreSQL 16.3  (Relational DB)        │
│  • MongoDB 7.0      (NoSQL DB)             │
│  • Adminer          (DB Web UI)            │
│  • Mailhog          (Email Testing)        │
└─────────────────────────────────────────────┘
```

---

## PostgreSQL

**Purpose**: Relational database for structured data

### Configuration

**Image**: `postgres:16.3-alpine`  
**Port**: `5432`  
**Default Credentials**:
```
Username: postgres
Password: postgres
Database: notadream
```

### Connection String

```
postgresql://postgres:postgres@localhost:5432/notadream
```

### Docker Environment

```yaml
POSTGRES_USER: postgres
POSTGRES_PASSWORD: postgres
POSTGRES_DB: notadream
```

### Health Check

```
HEALTHCHECK --interval 10s --timeout 5s
SELECT 1
```

### Data Persistence

```
Volume: postgres-data
Location: /var/lib/postgresql/data
```

### Starting PostgreSQL

With docker-compose:
```bash
docker-compose -f services/docker-compose.yml up -d postgres
```

### Accessing Database

**Using psql**:
```bash
psql -h localhost -U postgres -d notadream
```

**Using Adminer** (web UI):
```
http://localhost:8080
```

### Creating Tables

Example schema:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  author_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Backup & Restore

**Backup**:
```bash
pg_dump -h localhost -U postgres notadream > backup.sql
```

**Restore**:
```bash
psql -h localhost -U postgres notadream < backup.sql
```

---

## MongoDB

**Purpose**: NoSQL database for flexible documents

### Configuration

**Image**: `mongo:7.0`  
**Port**: `27017`  
**Default Admin**:
```
Username: admin (no auth by default)
```

### Connection String

```
mongodb://localhost:27017/notadream
```

### Docker Environment

```yaml
MONGO_INITDB_DATABASE: notadream
MONGO_INITDB_ROOT_USERNAME: (optional)
MONGO_INITDB_ROOT_PASSWORD: (optional)
```

### Health Check

```
HEALTHCHECK --interval 10s --timeout 5s
echo 'db.adminCommand("ping")' | mongosh
```

### Data Persistence

```
Volume: mongodb-data
Location: /data/db
```

### Starting MongoDB

With docker-compose:
```bash
docker-compose -f services/docker-compose.yml up -d mongodb
```

### Accessing Database

**Using mongosh CLI**:
```bash
mongosh --host localhost:27017 notadream
```

**Using Adminer** (web UI):
```
http://localhost:8080
```

### Creating Collections

```javascript
// Connect to notadream database
use notadream

// Create collections
db.createCollection("blog_posts")
db.createCollection("portfolio_items")

// Insert sample document
db.blog_posts.insertOne({
  title: "First Post",
  content: "Hello World",
  createdAt: new Date()
})
```

### Querying Data

```javascript
// Find all documents
db.blog_posts.find()

// Find with filter
db.blog_posts.find({ author: "nabin" })

// Update document
db.blog_posts.updateOne(
  { _id: ObjectId("...") },
  { $set: { title: "Updated Title" } }
)

// Delete document
db.blog_posts.deleteOne({ _id: ObjectId("...") })
```

### Backup & Restore

**Backup**:
```bash
mongodump --host localhost:27017 --db notadream --out ./backup
```

**Restore**:
```bash
mongorestore --host localhost:27017 ./backup/notadream
```

---

## Adminer

**Purpose**: Web UI for database management (PostgreSQL & MongoDB)

### Configuration

**Image**: `adminer`  
**Port**: `8080`  
**URL**: `http://localhost:8080`

### Features
- ✅ Connect to PostgreSQL
- ✅ Connect to MongoDB
- ✅ Execute queries
- ✅ Manage tables/collections
- ✅ Export/import data

### Login

**For PostgreSQL**:
```
System: PostgreSQL
Server: postgres (or localhost)
Username: postgres
Password: postgres
Database: notadream
```

**For MongoDB**:
```
System: MongoDB
Server: mongodb (or localhost)
Database: notadream
```

### Database Tasks

In Adminer UI:
- View database structure
- Execute SQL queries
- Create/edit tables
- Export data
- Import SQL files

---

## Mailhog

**Purpose**: Email testing during development

### Configuration

**Image**: `mailhog/mailhog`  
**SMTP Port**: `1025`  
**Web UI Port**: `8025`  
**URL**: `http://localhost:8025`

### Features
- ✅ Capture outgoing emails
- ✅ View email content
- ✅ No external dependencies
- ✅ Perfect for development/testing

### Using in Application

**Configure email sender** (in your backend):
```typescript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mailhog',        // Or localhost
  port: 1025,
  secure: false
});

await transporter.sendMail({
  from: 'app@example.com',
  to: 'user@example.com',
  subject: 'Test Email',
  text: 'This is a test email'
});
```

### Viewing Emails

Open `http://localhost:8025` in browser to see:
- All sent emails
- Email headers and body
- Attachments
- Sender/recipient info

---

## Running Infrastructure Services

### Start All Infrastructure

```bash
# Start all services in background
docker-compose -f services/docker-compose.yml up -d

# Or start specific services
docker-compose -f services/docker-compose.yml up -d postgres mongodb adminer
```

### Check Service Status

```bash
# List running services
docker-compose -f services/docker-compose.yml ps

# View logs
docker-compose -f services/docker-compose.yml logs -f postgres
```

### Stop Services

```bash
# Stop all
docker-compose -f services/docker-compose.yml down

# Stop specific service
docker-compose -f services/docker-compose.yml stop postgres
```

### Reset Data

```bash
# Remove all data
docker-compose -f services/docker-compose.yml down -v

# Note: -v flag removes named volumes
```

---

## Connecting from Applications

### Environment Variables

Set in `.env` or docker-compose.yaml:

```
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/notadream
MONGODB_URL=mongodb://mongodb:27017/notadream
```

### In API (Fastify)

```typescript
// apps/api/src/index.ts
import pg from 'pg';
import { MongoClient } from 'mongodb';

const pgClient = new pg.Client({
  connectionString: process.env.DATABASE_URL
});

const mongoClient = new MongoClient(process.env.MONGODB_URL);

// Connect on startup
fastify.register(async () => {
  await pgClient.connect();
  await mongoClient.connect();
});
```

### Testing Connection

**PostgreSQL**:
```bash
# From host
psql postgresql://postgres:postgres@localhost:5432/notadream

# From docker container
psql postgresql://postgres:postgres@postgres:5432/notadream
```

**MongoDB**:
```bash
# From host
mongosh mongodb://localhost:27017/notadream

# From docker container
mongosh mongodb://mongodb:27017/notadream
```

---

## Network Configuration

### Docker Bridge Network

**Name**: `notadream-network`  
**Driver**: `bridge`  
**Subnet**: `172.28.0.0/16`

### Service Discovery

Within Docker network, services are accessible by container name:
- `postgres:5432`
- `mongodb:27017`
- `api:4000`
- `mailhog:1025`

Example from another container:
```bash
# Can reach PostgreSQL via container name
postgresql://postgres:postgres@postgres:5432/notadream
```

---

## Health Checks

### PostgreSQL Health Check

```bash
docker-compose -f services/docker-compose.yml ps postgres

# Status will show: healthy/unhealthy
```

### MongoDB Health Check

```bash
docker-compose -f services/docker-compose.yml ps mongodb

# Status will show: healthy/unhealthy
```

### Manual Health Check

**PostgreSQL**:
```bash
# From docker
docker exec notadream-postgres psql -U postgres -d notadream -c "SELECT 1"
```

**MongoDB**:
```bash
# From docker
docker exec notadream-mongodb mongosh --eval "db.adminCommand('ping')"
```

---

## Data Volumes

### Named Volumes

```yaml
volumes:
  postgres-data:
    driver: local
  mongodb-data:
    driver: local
```

### Viewing Volume Data

```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect notadream_postgres-data

# Volume location on host
# Linux: /var/lib/docker/volumes/
# Mac/Windows: Managed by Docker Desktop
```

### Backup from Volume

```bash
# Export database
docker-compose -f services/docker-compose.yml exec postgres \
  pg_dump -U postgres notadream > backup.sql

# Export MongoDB
docker-compose -f services/docker-compose.yml exec mongodb \
  mongodump --db notadream --archive > backup.archive
```

---

## Environment-Specific Setup

### Development
- All services running with default credentials
- Data lost on `docker-compose down`
- Adminer web UI for easy management

### Production
- Secure passwords required
- Data persisted to volumes/external storage
- Backups configured
- SSL/TLS enabled
- Restricted network access

### Staging
- Mirror production configuration
- Sanitized production data
- For final testing before production

---

## Troubleshooting

### Service won't start
```bash
# Check logs
docker-compose -f services/docker-compose.yml logs postgres

# Verify port availability
lsof -i :5432

# Restart service
docker-compose -f services/docker-compose.yml restart postgres
```

### Connection refused
```bash
# Verify service is running
docker-compose -f services/docker-compose.yml ps

# Check network connectivity
docker-compose -f services/docker-compose.yml exec api ping postgres

# Verify credentials
psql postgresql://postgres:postgres@localhost:5432/notadream
```

### Data loss
```bash
# Volumes are persistent by default
# Check volume exists
docker volume ls | grep notadream

# Restore from backup if available
psql postgresql://postgres:postgres@localhost:5432/notadream < backup.sql
```

---

**See Also**:
- [04-configuration.md](./04-configuration.md) - Environment setup
- [07-deployment.md](./07-deployment.md) - Production deployment
- [08-quick-reference.md](./08-quick-reference.md) - Quick commands

**Last Updated**: May 27, 2026
