# Production Deployment Quick Start

## The Problem You're Facing

Your GitHub Pages site shows: **"Cannot connect to server. Please ensure the backend server is running."**

### Why?
GitHub Pages = Static hosting only (HTML, CSS, JS)
- ✅ Hosts your React frontend
- ❌ Cannot run Node.js backend
- ❌ Cannot run MongoDB database

## The Solution (3 Steps)

### Step 1: Deploy Backend to Render.com (10 minutes)

1. **Create MongoDB Atlas account** (free):
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up → Create free M0 cluster
   - Click "Connect" → "Connect your application"
   - Copy connection string:
     ```
     mongodb+srv://username:password@cluster.mongodb.net/boyc-movie-diary
     ```

2. **Deploy to Render**:
   - Go to https://render.com
   - Sign up with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `boyc-backend`
     - **Root Directory**: `boyc/server`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free

3. **Add Environment Variables** on Render:
   ```
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/boyc-movie-diary
   JWT_SECRET = any_random_secure_string_here_12345
   NODE_ENV = production
   ```

4. **Click "Create Web Service"** and wait 5-10 minutes

5. **Copy your backend URL**:
   ```
   https://boyc-backend.onrender.com
   ```

### Step 2: Update Frontend Configuration (2 minutes)

1. **Update `boyc/.env`**:
   ```env
   VITE_API_URL=https://boyc-backend.onrender.com/api
   ```
   (Replace with YOUR actual Render URL)

2. **Commit and push**:
   ```bash
   git add boyc/.env
   git commit -m "Update API URL for production"
   git push
   ```

### Step 3: Wait for GitHub Actions (3 minutes)

1. Go to your GitHub repository
2. Click "Actions" tab
3. Wait for deployment to complete
4. Visit your site: `https://yourusername.github.io/Boyc/`

## Testing

1. **Test backend health**:
   - Visit: `https://your-backend-url.onrender.com/api/health`
   - Should see: `{"status":"OK","message":"Server is running"}`

2. **Test registration**:
   - Go to your GitHub Pages site
   - Click "Login" → "Register"
   - Create a new account
   - Should work now! ✅

## Important Notes

### Free Tier Limitations

**Render.com Free Tier**:
- ✅ Completely free
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ First request after spin-down takes 30-60 seconds to wake up
- ✅ 750 hours/month (enough for hobby projects)

**What this means**:
- First login after inactivity will be slow (30-60 seconds)
- After that, it's fast
- Perfect for portfolio/demo projects

### Keeping Backend Awake (Optional)

If you want to prevent spin-down, use a service like:
- [UptimeRobot](https://uptimerobot.com) - Pings your backend every 5 minutes
- [Cron-job.org](https://cron-job.org) - Free scheduled pings

Or upgrade to Render's paid plan ($7/month) for no spin-down.

## Alternative: Railway.app

If you prefer no spin-down:

1. Go to https://railway.app
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Set root directory: `boyc/server`
6. Add same environment variables
7. Deploy!

Railway gives $5 free credit/month (no spin-down).

## Troubleshooting

### Still seeing "Cannot connect to server"?

1. **Check backend is running**:
   - Visit `https://your-backend-url.onrender.com/api/health`
   - Should return JSON, not error

2. **Check frontend .env**:
   - Make sure `VITE_API_URL` points to your Render URL
   - Must end with `/api`
   - Example: `https://boyc-backend.onrender.com/api`

3. **Check GitHub Actions**:
   - Go to Actions tab
   - Make sure latest deployment succeeded
   - If failed, check error logs

4. **Clear browser cache**:
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or open in incognito/private window

### Backend URL returns 502 Bad Gateway?

- Backend is waking up from sleep (wait 30-60 seconds)
- Try again after a minute

### CORS errors in browser console?

Update `boyc/server/server.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://yourusername.github.io'  // Add your GitHub Pages URL
  ],
  credentials: true
}));
```

Then redeploy backend on Render.

## Cost Summary

| Service | Cost | Purpose |
|---------|------|---------|
| GitHub Pages | Free | Frontend hosting |
| Render.com | Free | Backend hosting |
| MongoDB Atlas | Free | Database (512MB) |
| **Total** | **$0/month** | Full-stack app! |

## Next Steps After Deployment

1. ✅ Test registration and login
2. ✅ Add some movie reviews
3. ✅ Test search functionality
4. ✅ Customize theme colors
5. ✅ Share your live site!

## Need More Help?

- **Detailed backend deployment**: See `BACKEND_DEPLOYMENT.md`
- **Frontend deployment**: See `DEPLOYMENT.md`
- **General issues**: See `TROUBLESHOOTING.md`
- **Server setup**: See `server/README.md`

## Quick Links

- [Render.com](https://render.com) - Backend hosting
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database
- [Railway.app](https://railway.app) - Alternative backend hosting
- [GitHub Pages Docs](https://docs.github.com/en/pages) - Frontend hosting

---

**Your app should now be fully functional at:**
- Frontend: `https://yourusername.github.io/Boyc/`
- Backend: `https://boyc-backend.onrender.com`

Enjoy your deployed full-stack movie diary app! 🎬✨
