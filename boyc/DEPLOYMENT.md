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

## Backend API Note

⚠️ **Important**: GitHub Pages only hosts static files (frontend). Your backend API needs to be deployed separately:

- **Backend options**:
  - Heroku
  - Railway
  - Render
  - Vercel (for serverless functions)
  - AWS/Azure/Google Cloud

- **Update API URL**: After deploying backend, update `VITE_API_URL` in your environment variables

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
