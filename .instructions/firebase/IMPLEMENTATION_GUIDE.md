# Complete Implementation Guide - Firebase Integration

This guide covers all the components we've implemented for Firebase integration, real-time updates, admin panel, and testing.

## 📚 Table of Contents

1. [Quick Start](#quick-start)
2. [Component Overview](#component-overview)
3. [API Routes](#api-routes)
4. [Real-time Updates](#real-time-updates)
5. [Admin Dashboard](#admin-dashboard)
6. [Testing](#testing)
7. [Seed Data](#seed-data)
8. [Security Rules](#security-rules)

---

## Quick Start

### 1. Install Dependencies

```bash
cd apps/portfolio-nextjs
pnpm install
```

### 2. Configure Firebase

```bash
# Create .env.local
cp .env.example .env.local

# Add Firebase credentials
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
# ... (other Firebase config)
```

### 3. Seed Initial Data

```bash
# Download service account key from Firebase Console
# Set environment variable
export FIREBASE_SERVICE_ACCOUNT_KEY="/path/to/service-account-key.json"

# Run seed script
pnpm run seed:firebase
```

### 4. Deploy Security Rules

```bash
# Using Firebase CLI
firebase deploy --only firestore:rules
```

### 5. Start Development Server

```bash
pnpm run dev
```

---

## Component Overview

### Error Boundaries

**File**: `app/components/ErrorBoundary.tsx`

Catches and displays errors gracefully:

```tsx
import { ErrorBoundary, FirebaseErrorBoundary } from '@/app/components/ErrorBoundary';

// Basic error boundary
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// Firebase-specific error boundary
<FirebaseErrorBoundary>
  <Portfolio />
</FirebaseErrorBoundary>
```

### Features:
- ✅ Default error fallback UI
- ✅ Custom error handlers
- ✅ Async error handling
- ✅ Firebase-specific error messages

---

## API Routes

### Get All Portfolio Data

**Endpoint**: `GET /api/admin/portfolio`

**Headers**:
```
Authorization: Bearer <admin-token>
```

**Response**:
```json
{
  "experience": [...],
  "education": [...],
  "skills": [...],
  "projects": [...]
}
```

### Update Portfolio Item

**Endpoint**: `PUT /api/admin/portfolio/[collection]/[id]`

**Example**:
```bash
curl -X PUT http://localhost:3000/api/admin/portfolio/experience/exp_123 \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "company": "New Company",
    "role": "Senior Developer"
  }'
```

### Delete Portfolio Item

**Endpoint**: `DELETE /api/admin/portfolio/[collection]/[id]`

**Implementation Note**: Items are soft-deleted (marked with `deletedAt` timestamp) to preserve referential integrity.

---

## Real-time Updates

### Using Real-time Hooks

**File**: `app/utils/hooks/useRealtime.ts`

#### Single Collection

```typescript
import { useRealtimeCollection } from '@/app/utils/hooks/useRealtime';

export function Experience() {
  const { data, loading, error, isRealtime } = useRealtimeCollection('experience');

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isRealtime && <span className="badge">🔴 Live</span>}
      {data.map(item => (
        <div key={item.id}>{item.company}</div>
      ))}
    </div>
  );
}
```

#### Multiple Collections

```typescript
import { useRealtimePortfolioData } from '@/app/utils/hooks/useRealtime';

export function Portfolio() {
  const { experience, education, skills, projects, loading, isRealtime } =
    useRealtimePortfolioData();

  return (
    <div>
      {isRealtime && <span>📡 All data is real-time synced</span>}
      {/* Use data here */}
    </div>
  );
}
```

#### Single Document

```typescript
import { useRealtimeDocument } from '@/app/utils/hooks/useRealtime';

export function ProjectDetail({ projectId }) {
  const { data, loading, error } = useRealtimeDocument('projects', projectId);

  return <div>{data?.title}</div>;
}
```

---

## Admin Dashboard

### Accessing the Admin Panel

**URL**: `http://localhost:3000/admin`

### Features

1. **Real-time Data Display**
   - Shows all portfolio data
   - Live indicator when synced
   - Automatic updates when data changes

2. **CRUD Operations**
   - View all items in each category
   - Edit item details inline
   - Delete items (soft delete)
   - Add new items (placeholder)

3. **Data Editing**
   - Form auto-generates from document fields
   - Array and string fields with dedicated inputs
   - Save/Cancel buttons
   - Error handling with user feedback

### Implementation

```tsx
import { AdminDashboard } from '@/app/admin/dashboard';

export default function AdminPage() {
  // TODO: Add authentication check
  return <AdminDashboard />;
}
```

### Security Note
⚠️ **Add authentication middleware before deploying to production**.

---

## Testing

### Unit Tests

**File**: `__tests__/hooks/useRealtime.test.ts`

Tests for real-time hooks:

```bash
# Run unit tests
pnpm run test

# Watch mode
pnpm run test:watch

# Coverage report
pnpm run test:coverage
```

**Tested Areas**:
- ✅ Hook initialization
- ✅ Data fetching
- ✅ Error handling
- ✅ Component cleanup/unsubscription
- ✅ Multiple collections

### Integration Tests

**File**: `__tests__/integration/firestore.integration.test.ts`

Tests real Firestore interactions:

```bash
# Run integration tests
pnpm run test:integration
```

**Tested Areas**:
- ✅ Collection structure
- ✅ Document ordering
- ✅ Document schema validation
- ✅ Data integrity

### Using Firestore Emulator

```bash
# Start emulator
firebase emulators:start --only firestore

# Run tests against emulator
FIREBASE_EMULATOR_HOST=localhost:8080 pnpm run test:integration
```

---

## Seed Data

### Running Seed Script

```bash
# First time setup
export FIREBASE_SERVICE_ACCOUNT_KEY="/path/to/service-account-key.json"
pnpm run seed:firebase
```

### What Gets Seeded

1. **Experience** (3 entries)
   - Tech Startup Inc
   - Digital Agency Co
   - Freelance

2. **Education** (2 entries)
   - University of Technology
   - Online Learning Platform

3. **Skills** (15+ technical + soft skills)
   - Ordered by importance
   - Categorized by type

4. **Projects** (5 entries)
   - Mixed featured/non-featured
   - Technologies tagged

5. **Metadata**
   - Last updated timestamp
   - Version info

### Customizing Seed Data

Edit `scripts/seedFirebase.ts` to modify default data:

```typescript
const experienceData = [
  {
    order: 1,
    company: "Your Company",
    role: "Your Role",
    // ... more fields
  },
];
```

---

## Security Rules

### Development Rules

**Use during development** (unrestricted access):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Production Rules

**Use in production** (read-only portfolio, public submissions):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read-only collections
    match /experience/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    // ... (other collections)
    
    // Public form submissions
    match /submissions/{document=**} {
      allow create: if request.resource.data.size() > 0 &&
                       request.resource.data.keys().hasAll(['name', 'email', 'message']);
      allow read, update, delete: if false;
    }
  }
}
```

### Deploying Rules

```bash
# Update rules file
vim firestore.rules

# Deploy
firebase deploy --only firestore:rules
```

For detailed information, see [FIRESTORE_SECURITY_RULES.md](../instructions/FIRESTORE_SECURITY_RULES.md)

---

## Troubleshooting

### Firebase Not Initialized

**Error**: `Firebase not initialized. Check NEXT_PUBLIC_FIREBASE_* environment variables.`

**Solution**:
1. Verify `.env.local` has all Firebase config variables
2. Restart dev server after adding env vars
3. Check Firebase Console for correct credentials

### Real-time Updates Not Working

**Error**: Data doesn't update when changed in Firestore

**Solution**:
1. Verify `enableRealtime={true}` in hook call
2. Check Firestore security rules allow reads
3. Check browser console for connection errors
4. Restart dev server

### Tests Failing

**Error**: Jest tests fail with Firebase mocking issues

**Solution**:
1. Run `pnpm install` to install test dependencies
2. Check `jest.config.js` is in correct location
3. Verify Firebase mocks in `__tests__/setup.ts`
4. Run `pnpm run test:watch` for debugging

### Seed Script Fails

**Error**: `FIREBASE_SERVICE_ACCOUNT_KEY not set`

**Solution**:
```bash
# Download service account from Firebase Console
# Project Settings > Service Accounts > Generate new private key
export FIREBASE_SERVICE_ACCOUNT_KEY="/path/to/key.json"
pnpm run seed:firebase
```

---

## Next Steps

1. **Add Authentication**
   - Implement Firebase Authentication for admin panel
   - Add role-based access control (RBAC)
   - Create login page

2. **Enhanced Admin Features**
   - Bulk import/export
   - Data versioning/history
   - Analytics dashboard

3. **Optimization**
   - Add pagination for large datasets
   - Implement caching strategies
   - Monitor Firestore costs

4. **Advanced Features**
   - Cloud Functions for email notifications
   - Image upload to Firebase Storage
   - Automated backups

---

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)
- [Security Rules](https://firebase.google.com/docs/firestore/security/start)
- [Jest Testing](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/react)
