# Known Issues & Blockers

## 🚨 Critical Issues

### 1. Portfolio NextJS - Docker Build Failure

**Status**: ❌ BLOCKING  
**Severity**: CRITICAL  
**Affected Component**: `apps/portfolio-nextjs`  

#### Problem
The portfolio-nextjs application fails to build in Docker due to React Router import incompatibility.

**Error**:
```
Module not found: Can't resolve 'react-router-dom'
```

**Location**: `apps/portfolio-nextjs/app/layouts/PageLayout.tsx:7`

#### Root Cause
- Next.js uses file-based routing (App Router)
- The app is trying to import React Router components
- React Router is not compatible with Next.js routing
- This creates a build conflict

#### Current Code Problem
```typescript
// apps/portfolio-nextjs/app/layouts/PageLayout.tsx
import { Outlet } from 'react-router-dom';  // ❌ INVALID IN NEXT.JS

export default function PageLayout() {
  return <Outlet />;  // ❌ React Router component
}
```

#### Solution
Replace React Router with Next.js routing:

```typescript
// ✅ CORRECT for Next.js
interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return <>{children}</>;
}
```

#### Impact
- ❌ Cannot build portfolio-nextjs Docker image
- ❌ Cannot run portfolio-nextjs in production
- ⚠️ Development mode still works (with hot reload)
- ⚠️ docker-compose up fails for this service

#### Action Required
**Priority**: HIGH  
**Owner**: Developer  
**Estimated Time**: 1-2 hours  

**Steps**:
1. Open `apps/portfolio-nextjs/app/layouts/PageLayout.tsx`
2. Remove React Router imports
3. Replace with Next.js routing patterns
4. Test in development mode
5. Build Docker image to verify

#### References
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Next.js Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)

---

## ⚠️ Medium Priority Issues

### 2. API Endpoints Not Implemented

**Status**: ⚠️ IN PROGRESS  
**Severity**: MEDIUM  
**Affected Component**: `apps/api`  

#### Problem
- Fastify server starts but no API endpoints are defined
- All apps depend on API but it returns empty responses
- No database integration

#### Expected Endpoints
```
GET    /api/health           - Health check
GET    /api/portfolio        - Portfolio data
POST   /api/contact          - Contact form submission
GET    /api/blog             - Blog posts
GET    /api/blog/:id         - Blog post detail
```

#### Current Status
✅ Framework setup complete  
❌ Routes not implemented  
❌ Database queries not implemented  
❌ Error handling not implemented  

#### Solution
1. Define route handlers in `src/api.ts`
2. Add database models and queries
3. Implement authentication if needed
4. Add error handling

---

### 3. Admin Dashboard - No Features

**Status**: ⚠️ INCOMPLETE  
**Severity**: MEDIUM  
**Affected Component**: `apps/admin`  

#### Problem
- Only React template scaffolding exists
- No admin functionality implemented
- No data management
- No authentication

#### Missing Features
- Authentication system
- Dashboard widgets
- Content management UI
- Settings management
- User management

#### Solution Required
Implement admin features based on business requirements.

---

### 4. Blogs Platform - No Content

**Status**: ⚠️ INCOMPLETE  
**Severity**: MEDIUM  
**Affected Component**: `apps/blogs`  

#### Problem
- Only Next.js template scaffolding
- No blog post display logic
- No content management
- No database integration

#### Missing Features
- Blog listing
- Individual blog posts
- Categories/tags
- Search functionality
- Comment system

#### Solution Required
Connect to API and implement blog features.

---

## 📋 Minor Issues

### 5. Environment Variables - Defaults May Not Match Production

**Status**: ⚠️ REVIEW  
**Severity**: LOW  

#### Problem
Default values in `docker-compose.yaml` are hardcoded defaults, not production values.

#### Example
```yaml
VITE_EMAILJS_SERVICE_ID: ${VITE_EMAILJS_SERVICE_ID:-}  # Empty default
JWT_SECRET: ${JWT_SECRET:-your-super-secret-key}      # Weak default
```

#### Solution
- Create separate `.env.production`
- Document required production variables
- Add validation for required vars

---

### 6. Database Connections Optional

**Status**: ⚠️ NOT ENFORCED  
**Severity**: LOW  

#### Problem
PostgreSQL and MongoDB are optional but many features will fail without them.

#### Impact
- Portfolio and Admin work without DB
- API and Blogs may fail without DB connections
- No validation that required services are available

#### Solution
Add startup checks:
```typescript
// In api/src/index.ts
await validateDatabaseConnection();
```

---

### 7. No Error Handling in Frontend

**Status**: ⚠️ NOT IMPLEMENTED  
**Severity**: LOW  

#### Problem
Frontend apps don't handle API errors gracefully.

#### Impact
- User sees blank screens on API failure
- No error messages displayed
- No retry logic

#### Solution
Implement error boundaries and API error handlers.

---

## ✅ Resolved Issues

### Issue: pnpm version mismatch
**Status**: ✅ RESOLVED (May 27, 2026)
- **Problem**: Dockerfiles referenced pnpm@7.21.1 (doesn't exist)
- **Solution**: Updated to pnpm@9.15.9 (current project version)
- **Files Modified**: All 5 Dockerfiles

### Issue: Git hooks breaking Docker builds
**Status**: ✅ RESOLVED
- **Problem**: Husky hooks running during Docker build
- **Solution**: Added `--ignore-scripts` flag to API Dockerfile
- **Files Modified**: `apps/api/docker/Dockerfile`

### Issue: Docker environment variables missing
**Status**: ✅ RESOLVED
- **Problem**: docker-compose.yaml didn't have all required env vars
- **Solution**: Added comprehensive env var configuration
- **Files Modified**: `docker-compose.yaml`

---

## 🔍 Known Limitations

### 1. Database Persistence
- PostgreSQL and MongoDB data not persisted between Docker restarts
- Fix: Volume configuration needed in docker-compose

### 2. SSL/TLS
- All connections are unencrypted (HTTP)
- Fix: Configure SSL certificates in production

### 3. Authentication
- No authentication system implemented
- All endpoints are public

### 4. Rate Limiting
- No rate limiting on API endpoints
- Could be vulnerable to abuse

### 5. CORS
- CORS configuration hardcoded
- Should be environment-specific

---

## 📊 Issue Tracking Matrix

| Issue | Component | Priority | Status | Owner | ETA |
|-------|-----------|----------|--------|-------|-----|
| React Router incompatibility | portfolio-nextjs | CRITICAL | ❌ Open | - | TBD |
| API endpoints missing | api | HIGH | ⚠️ Open | - | TBD |
| Admin features missing | admin | MEDIUM | ⚠️ Open | - | TBD |
| Blog features missing | blogs | MEDIUM | ⚠️ Open | - | TBD |
| Env var validation | All | LOW | ⚠️ Open | - | TBD |

---

## 🚀 Recommended Action Plan

### Week 1: Critical Fixes
1. ✅ Fix portfolio-nextjs React Router issue (1-2 hours)
2. ✅ Re-test Docker builds (30 minutes)
3. ✅ Implement basic API endpoints (4 hours)

### Week 2: Core Features
1. Add database integration
2. Implement authentication
3. Add error handling

### Week 3: Enhancement
1. Implement admin features
2. Add blog functionality
3. Optimize performance

---

**See Also**: [07-deployment.md](./07-deployment.md) for deployment troubleshooting.

**Last Updated**: May 27, 2026
