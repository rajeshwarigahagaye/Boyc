# GitHub Pages Setup - Complete Guide

## ✅ What Has Been Configured

### 1. Vite Configuration (`boyc/vite.config.js`)
- Added `base: '/Boyc/'` for GitHub Pages routing
- **Action Required**: Update `/Boyc/` to match your actual repository name

### 2. GitHub Actions Workflow (`.github/workflows/deploy.yml`)
- Automatic deployment on push to main branch
- Builds the React app
- Deploys to GitHub Pages
- No manual deployment needed!

### 3. Documentation
- `boyc/DEPLOYMENT.md` - Detailed deployment guide
- `boyc/deploy.sh` - Optional local build script

## 🚀 Quick Start (3 Steps)

### Step 1: Update Repository Name
Edit `boyc/vite.config.js` and change the base path:

```javascript
base: '/YOUR-REPO-NAME/', // Replace with your actual GitHub repo name
```

**Example**: If your repo URL is `https://github.com/username/my-drama-app`, use:
```javascript
base: '/my-drama-app/',
```

### Step 2: Enable GitHub Pages
1. Go to your GitHub repository
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select: **GitHub Actions**
4. Save

### Step 3: Push to GitHub
```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

That's it! GitHub Actions will automatically build and deploy your site.

## 📍 Your Site URL

After deployment completes (2-3 minutes), your site will be live at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

## 🔍 Monitoring Deployment

1. Go to your GitHub repository
2. Click the **Actions** tab
3. Watch the "Deploy to GitHub Pages" workflow
4. Green checkmark = successful deployment ✅
5. Red X = failed deployment ❌ (check logs for errors)

## ⚠️ Important Notes

### Backend API
Your backend (MongoDB + Express) **cannot** be hosted on GitHub Pages. GitHub Pages only hosts static files (HTML, CSS, JS).

**Backend Deployment Options**:
- **Render** (Free tier available) - Recommended
- **Railway** (Free tier available)
- **Heroku** (Paid)
- **Vercel** (Serverless functions)

After deploying your backend, update the API URL:
1. Create `boyc/.env.production`:
```env
VITE_API_URL=https://your-backend-url.com/api
```

### Environment Variables
If you need environment variables in production:
1. Add them to `boyc/.env.production`
2. Or use GitHub Secrets (Settings → Secrets and variables → Actions)

## 🐛 Troubleshooting

### 404 Error
- ✅ Check `base` path in `vite.config.js` matches repo name exactly
- ✅ Ensure GitHub Pages source is set to "GitHub Actions"
- ✅ Wait 2-3 minutes after pushing for deployment to complete

### Build Fails
- ✅ Check the Actions tab for error details
- ✅ Ensure all dependencies are in `package.json`
- ✅ Test build locally: `cd boyc && npm run build`

### Blank Page
- ✅ Check browser console for errors
- ✅ Verify `base` path is correct
- ✅ Check if assets are loading (Network tab in DevTools)

### API Not Working
- ✅ Backend must be deployed separately
- ✅ Update `VITE_API_URL` to point to deployed backend
- ✅ Enable CORS on your backend for the GitHub Pages domain

## 📝 Workflow Explanation

The GitHub Actions workflow does the following:

1. **Checkout code** - Gets your latest code
2. **Setup Node.js** - Installs Node.js 20
3. **Install dependencies** - Runs `npm ci` in boyc folder
4. **Build** - Runs `npm run build` to create production files
5. **Upload artifact** - Prepares the `dist` folder
6. **Deploy** - Publishes to GitHub Pages

## 🔄 Updating Your Site

Every time you push to the main branch:
1. GitHub Actions automatically triggers
2. Builds your app
3. Deploys the new version
4. Your site updates in 2-3 minutes

No manual deployment needed!

## 🎨 Custom Domain (Optional)

To use your own domain (e.g., `mydramaapp.com`):

1. Create `boyc/public/CNAME` file:
```
mydramaapp.com
```

2. Update `vite.config.js`:
```javascript
base: '/', // Use root path for custom domain
```

3. Configure DNS with your domain provider:
```
Type: CNAME
Name: www
Value: YOUR-USERNAME.github.io
```

4. In GitHub Settings → Pages, add your custom domain

## 📚 Additional Resources

- [Vite Deployment Docs](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

## 🆘 Need Help?

If deployment fails:
1. Check the Actions tab for detailed error logs
2. Verify all steps in this guide
3. Test build locally: `cd boyc && npm run build`
4. Check that `boyc/dist` folder is created successfully

---

**Ready to deploy?** Just update the repo name in `vite.config.js` and push to GitHub! 🚀
