# GitHub Actions Deployment Guide

## Overview

Two GitHub Actions workflows have been created for deploying your Next.js portfolio:

1. **`deploy-portfolio-nextjs.yml`** - Simple approach (CLI-based)
2. **`deploy-portfolio-nextjs-improved.yml`** ⭐ **RECOMMENDED** - Advanced approach (Vercel native integration)

---

## Quick Start (Recommended Approach)

### Step 1: Choose Your Workflow

Use **`deploy-portfolio-nextjs-improved.yml`** (more reliable):

```bash
# Delete the simple one (optional)
rm .github/workflows/deploy-portfolio-nextjs.yml

# Rename the improved one to be active
mv .github/workflows/deploy-portfolio-nextjs-improved.yml \
   .github/workflows/deploy-portfolio-nextjs.yml
```

### Step 2: Set Up Vercel Integration

#### Option A: Using Vercel GitHub App (Easiest)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a new project and connect to your GitHub repository
3. Vercel automatically handles deployments via GitHub webhook
4. No need to set secrets manually!

#### Option B: Manual Vercel Setup (If you prefer CLI)

1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Generate a new **Access Token**
3. Copy the token (you'll need it for secrets)

### Step 3: Add GitHub Secrets & Variables

Go to your GitHub repository: **Settings → Secrets and variables → Actions**

#### Add these **SECRETS** (sensitive data):

```
VERCEL_TOKEN = <your-vercel-access-token>
VERCEL_ORG_ID = <your-vercel-org-id>
VERCEL_PROJECT_ID = <your-vercel-project-id>

NEXT_PUBLIC_EMAILJS_SERVICE_ID = service_xxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = template_xxxxx
NEXT_PUBLIC_EMAILJS_USER_ID = user_xxxxx
NEXT_PUBLIC_APP_EMAIL = your-email@example.com
```

#### Add these **VARIABLES** (public data):

```
NEXT_PUBLIC_APP_TITLE = Nabin Dhital | Full-Stack Developer
NEXT_PUBLIC_APP_DESCRIPTION = Portfolio of a full-stack engineer
NEXT_PUBLIC_APP_KEYWORDS = Full-Stack Developer, React, Node.js
NEXT_PUBLIC_APP_AUTHOR = Nabin Dhital
NEXT_PUBLIC_APP_NAME = Nabin Dhital

NEXT_PUBLIC_BASE_APP_URL = https://your-domain.com
NEXT_PUBLIC_API_BASE_URL = https://api.your-domain.com

NEXT_PUBLIC_APP_LINKEDIN_URL = https://linkedin.com/in/nabin
NEXT_PUBLIC_APP_GITHUB_URL = https://github.com/nabin99
NEXT_PUBLIC_APP_TWITTER_URL = https://twitter.com/nabin
NEXT_PUBLIC_APP_FACEBOOK_URL = https://facebook.com/nabin
NEXT_PUBLIC_APP_INSTAGRAM_URL = https://instagram.com/nabin
NEXT_PUBLIC_APP_YOUTUBE_URL = https://youtube.com/@nabin

NEXT_PUBLIC_APP_TWITTER_HANDLE = @nabin_dhital
NEXT_PUBLIC_APP_THEME_COLOR = #16c7d5
```

### Step 4: Get Vercel IDs

To find your Vercel IDs:

```bash
# After installing Vercel CLI globally:
vercel --version

# Navigate to your portfolio-nextjs app and link it:
cd apps/portfolio-nextjs
vercel link

# This will create .vercel/project.json with your IDs:
cat .vercel/project.json
```

Look for:
- `"orgId"` → Set as `VERCEL_ORG_ID`
- `"projectId"` → Set as `VERCEL_PROJECT_ID`

### Step 5: Test the Workflow

Make a push to trigger the workflow:

```bash
git add .github/workflows/
git commit -m "Add GitHub Actions deployment workflows"
git push origin development
```

Monitor in GitHub: **Actions tab → Deploy Portfolio NextJS**

---

## Workflow Triggers

Both workflows trigger on:

```yaml
on:
  push:
    branches:
      - development  # Preview deployments
      - main         # Production deployments
    paths:
      - apps/portfolio-nextjs/**
      - libs/react/**
      - package.json
      - pnpm-lock.yaml
  pull_request:
    # Validates build on PRs (doesn't deploy)
```

---

## Deployment Behavior

### Branch: `development`
- ✅ Builds on every push
- ✅ Deploys to Vercel preview environment
- 📊 Shows preview URL in GitHub

### Branch: `main`
- ✅ Builds on every push
- ✅ Deploys to Vercel production
- 🌐 Goes live immediately

### Pull Requests
- ✅ Builds to verify no errors
- ❌ Does not deploy

---

## Fallback to GitHub Pages

If Vercel deployment fails:

1. Workflow automatically exports Next.js to static files
2. Deploys to GitHub Pages as fallback
3. GitHub Pages URL shown in workflow output

**Enable GitHub Pages:**
- Go to **Settings → Pages**
- Set **Source** to "GitHub Actions"
- Pages automatically deploys on workflow success

---

## Environment Variables Reference

### For Vercel CLI Login

```bash
export VERCEL_TOKEN=<your-token>
vercel --token=$VERCEL_TOKEN
```

### For Docker Builds

These are used by Dockerfile:

```dockerfile
ENV NEXT_PUBLIC_APP_TITLE="Your Title"
ENV NEXT_PUBLIC_API_BASE_URL="http://localhost:4000"
```

---

## Complete Setup Checklist

- [ ] Choose between the two workflow files
- [ ] Create Vercel project (or use existing)
- [ ] Get Vercel Access Token from settings
- [ ] Get Vercel Org ID and Project ID
- [ ] Add all secrets to GitHub
- [ ] Add all variables to GitHub
- [ ] Make a test commit to `development` branch
- [ ] Check GitHub Actions tab for successful deployment
- [ ] Verify Vercel deployment shows live URL
- [ ] Test GitHub Pages fallback (optional)

---

## Troubleshooting

### Workflow Status: Failing

Check the **Actions** tab for detailed error logs:

#### "Build failed"
```bash
# Test build locally:
pnpm install
pnpm --filter ./libs/react/ build
pnpm --filter ./apps/portfolio-nextjs/ build
```

#### "Vercel deployment failed"
```bash
# Verify Vercel CLI works:
vercel --token=$VERCEL_TOKEN status

# Check project is linked:
ls .vercel/project.json
```

#### "GitHub Pages deployment failed"
```
→ Enable Pages in repository settings
→ Set source to "GitHub Actions"
→ Ensure workflow has write permissions
```

### Missing Environment Variables

Error: `NEXT_PUBLIC_APP_TITLE is undefined`

✅ **Fix**: Add variable to GitHub Settings → Variables

### Timeout Issues

If workflow times out:

1. Increase timeout in workflow YAML:
```yaml
jobs:
  deploy-vercel:
    timeout-minutes: 15  # Increase from default
```

2. Check pnpm install is cached:
```yaml
- uses: actions/setup-node@v4
  with:
    cache: 'pnpm'  # ✅ Enables caching
```

### PRs Not Building

Ensure workflow has correct paths:
```yaml
paths:
  - apps/portfolio-nextjs/**  # Case sensitive!
```

---

## Advanced: Notifications

### Slack Notification on Deployment

Add to workflow after deployment step:

```yaml
- name: Notify Slack
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
    payload: |
      {
        "text": "Portfolio deployed to Vercel",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "✅ Portfolio deployed to <${{ steps.deployment.outputs.url }}|Vercel>"
            }
          }
        ]
      }
```

### Email Notification

```yaml
- name: Send Email
  uses: dawidd6/action-send-mail@v3
  with:
    server_address: ${{ secrets.EMAIL_SERVER }}
    server_port: ${{ secrets.EMAIL_PORT }}
    username: ${{ secrets.EMAIL_USERNAME }}
    password: ${{ secrets.EMAIL_PASSWORD }}
    subject: "Portfolio Deployed"
    to: your-email@example.com
    from: github@example.com
    body: "Portfolio deployed to ${{ steps.deployment.outputs.url }}"
```

---

## Performance Tips

1. **Enable Dependency Caching**
```yaml
- uses: actions/setup-node@v4
  with:
    cache: 'pnpm'  # Speeds up install significantly
```

2. **Parallelize Jobs**
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
  
  deploy-vercel:
    needs: build  # Runs only after build succeeds
```

3. **Limit Artifact Retention**
```yaml
- uses: actions/upload-artifact@v4
  with:
    retention-days: 1  # Delete old artifacts
```

---

## Cost Considerations

- ✅ **GitHub Actions**: Free (limited to 2000 minutes/month for private repos)
- ✅ **Vercel**: Free tier generous (100GB bandwidth)
- ✅ **GitHub Pages**: Always free

---

## Next Steps

1. ✅ Set up the workflow
2. ✅ Make your first deployment
3. ✅ Add custom domain to Vercel
4. ✅ Set up monitoring/alerts
5. ✅ Configure branch protection rules

---

## Documentation Links

- [Vercel CLI Docs](https://vercel.com/docs/cli)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
