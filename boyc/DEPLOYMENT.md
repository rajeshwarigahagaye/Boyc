# GitHub Pages Deployment Guide

## Prerequisites
- GitHub repository created
- Code pushed to GitHub
- GitHub Pages enabled in repository settings

## Setup Steps

### 1. Update Repository Name in Configuration
In `vite.config.js`, update the `base` property with your actual repository name:
```javascript
base: '/your-repo-name/', // Replace with your actual repo name
```

For example, if your repo is `https://github.com/username/Boyc`, use:
```javascript
base: '/Boyc/',
```

### 2. Enable GitHub Pages
1. Go to your GitHub repository
2. Click on **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Source: **GitHub Actions**
5. Save the settings

### 3. Push Your Code
```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

### 4. Monitor Deployment
1. Go to the **Actions** tab in your GitHub repository
2. You should see a workflow running called "Deploy to GitHub Pages"
3. Wait for it to complete (usually 2-3 minutes)
4. Once complete, your site will be live at:
   ```
   https://username.github.io/repository-name/
   ```

## Manual Build (Optional)

If you want to build locally before deploying:

```bash
cd boyc
npm run build
```

This creates a `dist` folder with the production build.

## Troubleshooting

### 404 Error
- **Check base path**: Ensure `vite.config.js` has the correct repository name
- **Check branch**: Make sure you're pushing to the correct branch (main/master)
- **Check Pages settings**: Verify GitHub Pages is set to "GitHub Actions"

### Build Fails
- **Check Node version**: Ensure you're using Node 18 or higher
- **Check dependencies**: Run `npm install` to ensure all packages are installed
- **Check for errors**: Look at the Actions tab for detailed error messages

### Assets Not Loading
- **Base path issue**: The `base` in `vite.config.js` must match your repo name exactly
- **Case sensitivity**: Repository names are case-sensitive

## Environment Variables

If your app uses environment variables:

1. Create a `.env.production` file in the `boyc` folder:
```env
VITE_API_URL=https://your-backend-api.com/api
```

2. Add secrets in GitHub:
   - Go to Settings > Secrets and variables > Actions
   - Add your secrets
   - Reference them in the workflow file

## Backend API Deployment

⚠️ **CRITICAL**: GitHub Pages only hosts static files (your React frontend). Your backend server (Node.js/Express/MongoDB) **MUST** be deployed separately!

### Why You're Seeing "Cannot connect to server"

GitHub Pages cannot run:
- ❌ Node.js servers
- ❌ Express APIs
- ❌ MongoDB databases
- ❌ Any backend code

### Solution: Deploy Backend Separately

**See `BACKEND_DEPLOYMENT.md` for detailed instructions.**

Quick options:
1. **Render.com** (Recommended - Free tier)
   - Easy setup
   - Free 750 hours/month
   - Auto-deploys from GitHub

2. **Railway.app** (Free $5 credit/month)
   - No spin-down
   - Very fast

3. **Fly.io** (Free tier)
   - Production-ready
   - More complex setup

### After Deploying Backend

1. Get your backend URL (e.g., `https://boyc-backend.onrender.com`)
2. Update `boyc/.env`:
   ```env
   VITE_API_URL=https://your-backend-url.com/api
   ```
3. Rebuild and redeploy frontend:
   ```bash
   npm run build
   git add .
   git commit -m "Update API URL"
   git push
   ```

**📖 Full backend deployment guide**: See `BACKEND_DEPLOYMENT.md`

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file in the `public` folder:
```
yourdomain.com
```

2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings with your custom domain

## Useful Commands

```bash
# Install dependencies
cd boyc && npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
