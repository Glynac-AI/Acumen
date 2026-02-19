# Deploying Frontend to Render

## Prerequisites

- GitHub repository with the code
- Render account ([render.com](https://render.com))
- Strapi backend deployed (e.g., `https://acumen-strapi-beta.onrender.com`)
- Strapi API token (read-only)

---

## Step 1: Create New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `Glynac-AI/Acumen-blog-beta`
4. Select the branch: `main`

---

## Step 2: Configure Build Settings

| Setting | Value |
|---------|-------|
| **Name** | `acumen-frontend` (or your choice) |
| **Region** | Choose closest to your users |
| **Root Directory** | `.` (leave empty - uses repo root) |
| **Runtime** | Docker |
| **Dockerfile Path** | `Dockerfile` |

> **Note**: The Dockerfile is already configured at the repo root for Next.js standalone build.

---

## Step 3: Set Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_STRAPI_URL` | `https://acumen-strapi-beta.onrender.com` |
| `NEXT_PUBLIC_STRAPI_API_TOKEN` | Your Strapi API token |
| `NEXT_PUBLIC_TENANT_SLUG` | `glynac-ai` (or `regulatethis`, `sylvian`) |

### Getting Your Strapi API Token

1. Go to your Strapi Admin Panel
2. Navigate to **Settings** → **API Tokens**
3. Click **"Create new API Token"**
4. Set: 
   - Name: `Frontend Production`
   - Token type: `Read-only`
   - Duration: `Unlimited`
5. Copy the generated token

---

## Step 4: Deploy

1. Click **"Create Web Service"**
2. Render will build and deploy automatically
3. Wait for build to complete (5-10 minutes first time)

---

## Step 5: Verify Deployment

1. Once deployed, Render provides a URL like: `https://acumen-frontend.onrender.com`
2. Visit the URL to verify the frontend loads
3. Check that articles load from Strapi

---

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure `output: 'standalone'` is in `next.config.ts`

### 403 Forbidden from Strapi API
- Go to Strapi Admin → Settings → Roles → Public
- Enable `find` and `findOne` for: Articles, Authors, Tags, Pillars

### Images Not Loading
- Verify `next.config.ts` has your Strapi domain in `remotePatterns`
- Check Strapi has media files accessible publicly

### API Token Issues
- Ensure token is copied correctly (no trailing spaces)
- Verify token has read permissions for content types

---

## Auto-Deploy Setup

Render automatically deploys when you push to the `main` branch. To change:

1. Go to your service settings
2. Under **"Build & Deploy"**
3. Toggle auto-deploy on/off

---

## Custom Domain (Optional)

1. Go to your Render service → **Settings** → **Custom Domains**
2. Add your domain (e.g., `www.regulatethis.com`)
3. Update DNS with the provided CNAME record
4. Update CORS in Strapi `config/middlewares.ts` to include your domain
