# Firebase Setup Guide

This guide provides step-by-step instructions for setting up Firebase for the portfolio-nextjs application.

## Prerequisites

- Firebase project created in [Firebase Console](https://console.firebase.google.com)
- Node.js and pnpm installed locally
- Docker and Docker Compose (for containerized deployment)

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Enter your project name (e.g., "notadream-portfolio")
4. Follow the setup wizard to enable Google Analytics (optional)
5. Wait for the project to be created

## Step 2: Register Your Web App

1. In the Firebase Console, click the Web icon (`</>`)`
2. Enter your app nickname (e.g., "portfolio-nextjs")
3. Click "Register app"
4. Copy the Firebase configuration object - you'll need the following values:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

## Step 3: Set Up Firestore Database

1. In the Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Select a region (e.g., "us-central1")
4. Choose "Start in production mode" (security rules will restrict access by default)
5. Create the database

### Create Collections

Create the following collections in Firestore for the portfolio app:

#### **portfolio** collection
- **Document ID**: `data`
- **Fields**:
  ```json
  {
    "name": "Your Name",
    "title": "Your Title",
    "bio": "Your bio...",
    "email": "your@email.com",
    "location": "Your Location",
    "socialLinks": [
      {
        "platform": "GitHub",
        "url": "https://github.com/yourusername"
      },
      {
        "platform": "LinkedIn",
        "url": "https://linkedin.com/in/yourusername"
      }
    ],
    "skills": [
      {
        "name": "React",
        "level": "Expert",
        "years": 5
      }
    ],
    "projects": [
      {
        "title": "Project Name",
        "description": "Project description",
        "technologies": ["React", "TypeScript"],
        "link": "https://github.com/yourusername/project",
        "image": "image-url"
      }
    ],
    "experience": [
      {
        "company": "Company Name",
        "position": "Position",
        "duration": "2020-2024",
        "description": "Description"
      }
    ],
    "education": [
      {
        "school": "School Name",
        "degree": "Degree",
        "field": "Field of Study",
        "year": 2020
      }
    ]
  }
  ```

#### **messages** collection
- **Document ID**: Auto-generated
- **Fields**:
  ```json
  {
    "name": "Sender Name",
    "email": "sender@email.com",
    "subject": "Message Subject",
    "message": "Message content",
    "createdAt": "timestamp",
    "read": false
  }
  ```

## Step 4: Set Up Firebase Security Rules

Update your Firestore security rules for proper access control:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Portfolio data - public read
    match /portfolio/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Messages - public write (for contact form), authenticated read
    match /messages/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## Step 5: Configure Environment Variables

### Local Development

1. Copy `.env.example` (if exists) or create `.env.local` in the `apps/portfolio-nextjs` directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

2. Run the development server:
```bash
pnpm install  # if dependencies haven't been installed
pnpm dev
```

### Docker Deployment

1. Create a `.env` file in the project root with your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

2. Build and run with Docker Compose:

```bash
# Build all services
docker-compose build

# Run all services
docker-compose up

# Run specific service
docker-compose up portfolio-nextjs
```

## Step 6: Testing Firebase Connection

The application will automatically test the Firebase connection:

1. Start the development server
2. Check the browser console for Firebase initialization messages
3. Navigate to the Portfolio page - it should load your portfolio data
4. Try submitting the contact form - messages should appear in the Firestore "messages" collection

## Step 7: Enable Additional Firebase Features (Optional)

### Firebase Authentication

1. Go to **Authentication** in Firebase Console
2. Click **Sign-in method**
3. Enable desired providers (Google, GitHub, etc.)
4. Update the portfolio app to support user authentication if needed

### Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Initialize Firebase in your project:
```bash
firebase init
```

3. Deploy your app:
```bash
firebase deploy
```

### Firebase Storage

1. Go to **Storage** in Firebase Console
2. Create a bucket
3. Update storage rules to allow your app to read/write files
4. Use the storage bucket URL in your environment variables

## Troubleshooting

### Firebase Not Initialized
- **Issue**: "Firebase not initialized" error in console
- **Solution**: Ensure `NEXT_PUBLIC_FIREBASE_API_KEY` and other env vars are correctly set

### Firestore Permission Denied
- **Issue**: Can't read/write to Firestore
- **Solution**: Check security rules and ensure your app is following the authenticated/public access pattern

### Messages Not Being Saved
- **Issue**: Contact form submissions don't appear in Firestore
- **Solution**: Check browser console for errors, verify the "messages" collection exists, and check Firestore security rules

### Slow Data Loading
- **Issue**: Portfolio data takes long to load
- **Solution**: Consider adding indexes to your Firestore collections for frequently queried fields

## Security Best Practices

1. **Never commit `.env` files** - they contain sensitive credentials
2. **Use environment-specific security rules** - different rules for development vs. production
3. **Implement rate limiting** - prevent spam messages in the contact form
4. **Validate data server-side** - never trust client-side validation alone
5. **Monitor Firebase usage** - set up billing alerts to detect unusual activity

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key for authentication | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket URL | Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Enable Firebase Analytics | No (default: false) |
| `NEXT_PUBLIC_ENABLE_COMMENTS` | Enable comments feature | No (default: false) |
| `NEXT_PUBLIC_ENABLE_BLOG` | Enable blog feature | No (default: true) |
| `NEXT_PUBLIC_API_TIMEOUT` | API timeout in milliseconds | No (default: 30000) |

## Related Documentation

- [Firebase Setup Guide](./FIREBASE_SETUP_GUIDE.md)
- [Docker Compose Guide](./DOCKER_COMPOSE_GUIDE.md)
- [Next.js SSR Guide](../apps/portfolio-nextjs/NEXTJS_SSR_GUIDE.md)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
