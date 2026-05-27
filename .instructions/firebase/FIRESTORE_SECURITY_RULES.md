# Firestore Security Rules Guide

This guide provides Firestore security rules for the portfolio application with different configurations for development and production environments.

## Development Rules (Public Read, Public Write)

Use these rules during development to allow unrestricted access for testing:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all reads and writes in development
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **WARNING**: This configuration is NOT secure and should NEVER be used in production.

---

## Production Rules (Read-Only Portfolio, Public Submissions)

Use these rules in production for secure public access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Portfolio data - Public READ ONLY
    match /experience/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    match /education/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    match /skills/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    match /projects/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    // Metadata - Public READ ONLY
    match /metadata/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    // Contact form submissions - Public CREATE only (no read)
    match /submissions/{document=**} {
      allow create: if request.resource.data.size() > 0 &&
                       request.resource.data.keys().hasAll(['name', 'email', 'message']) &&
                       request.resource.data.name is string &&
                       request.resource.data.email is string &&
                       request.resource.data.message is string;
      allow read, update, delete: if false;
    }
    
    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Rules Explanation

| Collection | Operation | Rule | Purpose |
|-----------|-----------|------|---------|
| `experience` | Read | ✅ Allowed | Visitors can view work experience |
| `experience` | Write | ❌ Blocked | Prevent unauthorized data modification |
| `education` | Read | ✅ Allowed | Visitors can view education |
| `education` | Write | ❌ Blocked | Prevent unauthorized data modification |
| `skills` | Read | ✅ Allowed | Visitors can view skills |
| `skills` | Write | ❌ Blocked | Prevent unauthorized data modification |
| `projects` | Read | ✅ Allowed | Visitors can view projects |
| `projects` | Write | ❌ Blocked | Prevent unauthorized data modification |
| `metadata` | Read | ✅ Allowed | Visitors can view metadata |
| `metadata` | Write | ❌ Blocked | Prevent unauthorized data modification |
| `submissions` | Create | ✅ Allowed | Anyone can submit contact forms |
| `submissions` | Read | ❌ Blocked | Protect privacy of submissions |
| `submissions` | Write | ❌ Blocked | Prevent modifying submissions |
| `submissions` | Delete | ❌ Blocked | Prevent deleting submissions |

---

## Admin Rules (With Authentication)

Use these rules when you implement admin authentication:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Portfolio data - Admin edit, public read
    match /experience/{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    match /education/{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    match /skills/{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    match /projects/{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Metadata - Admin edit, public read
    match /metadata/{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Submissions - Admin read/delete, public create
    match /submissions/{document=**} {
      allow create: if request.resource.data.size() > 0 &&
                       request.resource.data.keys().hasAll(['name', 'email', 'message']);
      allow read, update, delete: if isAdmin();
    }
    
    // User roles collection - Admins only
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId && isAdmin();
      allow read, write: if isAdmin();
    }
    
    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## How to Deploy Rules

### Via Firebase Console

1. Go to **Firestore Database** > **Rules** tab
2. Replace the default rules with your desired configuration
3. Click **Publish**

### Via Firebase CLI

```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Initialize Firebase in your project
firebase init firestore

# Update firestore.rules file with desired rules
vim firestore.rules

# Deploy rules
firebase deploy --only firestore:rules
```

---

## Testing Security Rules

### Development Testing

1. Open Firestore Console
2. Switch to **Read-only** mode to simulate visitor access
3. Try reading/writing data to verify rules work as expected

### Using Firestore Emulator

```bash
# Start emulator
firebase emulators:start

# Run tests against emulator
npm test -- --env=firestore-emulator
```

---

## Best Practices

1. **Always use production rules in production** - Never deploy development rules
2. **Validate on the client** - Use zod or similar for schema validation
3. **Limit writes** - Use `request.resource.data.keys().hasAll()` to require specific fields
4. **Monitor access** - Review Firestore audit logs regularly
5. **Test rules** - Use Firestore Emulator to test rules locally
6. **Document changes** - Keep track of rule changes and why they were made
7. **Use helper functions** - Make rules more readable and maintainable
8. **Rate limiting** - Consider implementing rate limiting for sensitive operations

---

## Troubleshooting

### "Permission denied" errors

- **Cause**: Rules don't allow the operation
- **Solution**: Check collection name matches rule path, verify authentication status

### Can't read portfolio data

- **Cause**: Visitor can't access read-only collections
- **Solution**: Ensure `allow read: if true;` for public collections

### Contact form submissions fail

- **Cause**: Missing required fields or rule validation failure
- **Solution**: Verify submission includes `name`, `email`, and `message` fields

### Admin can't edit data

- **Cause**: Admin user role not set or not checked properly
- **Solution**: Verify user document has `role: 'admin'` field

---

## Security Checklist

- [ ] Development rules use `allow read, write: if true;`
- [ ] Production rules restrict portfolio writes to `false`
- [ ] Submissions collection only allows `create` for visitors
- [ ] Admin rules properly check authentication and role
- [ ] All rule changes are tested before deployment
- [ ] Audit logs are monitored regularly
- [ ] Validation rules check all required fields
- [ ] Rate limiting is implemented (optional but recommended)
- [ ] Documentation is updated when rules change

---

## References

- [Firestore Security Rules Documentation](https://firebase.google.com/docs/firestore/security/start)
- [Firestore Rules Best Practices](https://firebase.google.com/docs/firestore/security/rules-query)
- [Testing Security Rules](https://firebase.google.com/docs/firestore/security/test-rules-security)
