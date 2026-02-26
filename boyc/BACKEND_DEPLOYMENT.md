# Backend Deployment Guide

## Problem
GitHub Pages only hosts static files (your React frontend). Your backend server needs to be deployed separately.

## Solution: Deploy Backend to Render.com

### Step 1: Prepare Your Backend for Deployment

1. **Create a `render.yaml` file** in your `boyc/server/` directory:

```yaml
services:
  - type: web
    name: boyc-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: JWT_SECRET
        generateValue: true
      - key: MONGODB_URI
        sync: false
```

2. **Update `package.json`** in `boyc/server/` to ensure it has a start script:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Step 2: Set Up MongoDB Atlas (Free Cloud Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/boyc-movie-diary
   ```
6. Replace `<password>` with your actual password

### Step 3: Deploy to Render

1. Go to [Render.com](https://render.com)
2. Sign up with your GitHub account
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `boyc-backend`
   - **Root Directory**: `boyc/server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

6. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A random secure string (e.g., `your_super_secret_jwt_key_12345`)
   - `NODE_ENV`: `production`
   - `PORT`: `5000` (Render will override this automatically)

7. Click "Create Web Service"

8. Wait for deployment (5-10 minutes)

9. Copy your backend URL (e.g., `https://boyc-backend.onrender.com`)

### Step 4: Update Frontend to Use Deployed Backend

1. **Update `boyc/.env`**:
```env
VITE_API_URL=https://boyc-backend.onrender.com/api
```

2. **Rebuild and redeploy your frontend**:
```bash
cd boyc
npm run build
git add .
git commit -m "Update API URL for production"
git push
```

### Step 5: Update CORS on Backend

Update `boyc/server/server.js` to allow your GitHub Pages domain:

```javascript
// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://rajeshwarigahagaye.github.io'
  ],
  credentials: true
}));
```

## Alternative: Railway.app

### Quick Deploy to Railway

1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Node.js
6. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
7. Set root directory to `boyc/server`
8. Deploy!

## Alternative: Fly.io

### Deploy to Fly.io

1. Install Fly CLI:
```bash
# Windows (PowerShell)
iwr https://fly.io/install.ps1 -useb | iex

# macOS/Linux
curl -L https://fly.io/install.sh | sh
```

2. Login:
```bash
fly auth login
```

3. Navigate to server directory:
```bash
cd boyc/server
```

4. Launch app:
```bash
fly launch
```

5. Set environment variables:
```bash
fly secrets set MONGODB_URI="your_mongodb_uri"
fly secrets set JWT_SECRET="your_jwt_secret"
fly secrets set NODE_ENV="production"
```

6. Deploy:
```bash
fly deploy
```

## Testing Your Deployed Backend

Once deployed, test your backend:

1. **Health Check**:
   ```
   https://your-backend-url.com/api/health
   ```
   Should return: `{"status":"OK","message":"Server is running"}`

2. **Test Registration**:
   - Go to your GitHub Pages site
   - Try to register a new user
   - Should work now!

## Important Notes

### Free Tier Limitations

**Render.com**:
- ✅ Free tier available
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ First request after spin-down takes 30-60 seconds
- ✅ 750 hours/month free

**Railway.app**:
- ✅ $5 free credit per month
- ✅ No spin-down
- ⚠️ Credit runs out if you use too much

**Fly.io**:
- ✅ Free tier available
- ✅ 3 shared-cpu VMs free
- ⚠️ More complex setup

### Handling Render Spin-Down

If using Render's free tier, add a loading state to your frontend:

```javascript
// In AuthContext.jsx
const [serverWaking, setServerWaking] = useState(false);

const register = async (userData) => {
  try {
    setServerWaking(true);
    const response = await authAPI.register(userData);
    setServerWaking(false);
    // ... rest of code
  } catch (error) {
    setServerWaking(false);
    // ... error handling
  }
};
```

Show a message: "Waking up server, please wait..." on first request.

## Environment Variables Summary

Your deployed backend needs these environment variables:

| Variable | Example | Description |
|----------|---------|-------------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/boyc` | MongoDB connection string |
| `JWT_SECRET` | `super_secret_key_12345` | Secret for JWT tokens |
| `NODE_ENV` | `production` | Environment mode |
| `PORT` | `5000` | Port (usually auto-set by platform) |

## Troubleshooting

### Backend URL Not Working
- Check if service is running in Render/Railway dashboard
- Verify environment variables are set correctly
- Check logs for errors

### CORS Errors
- Make sure you added your GitHub Pages URL to CORS origins
- Redeploy backend after CORS changes

### Database Connection Failed
- Verify MongoDB Atlas connection string is correct
- Check if your IP is whitelisted in MongoDB Atlas (use 0.0.0.0/0 for all IPs)
- Ensure password doesn't contain special characters that need URL encoding

### 502 Bad Gateway
- Backend is starting up (wait 30-60 seconds on Render free tier)
- Check backend logs for startup errors

## Cost Comparison

| Platform | Free Tier | Spin Down | Best For |
|----------|-----------|-----------|----------|
| Render | ✅ 750hrs/mo | ⚠️ Yes (15min) | Hobby projects |
| Railway | ✅ $5 credit | ❌ No | Active development |
| Fly.io | ✅ 3 VMs | ❌ No | Production-ready |
| Heroku | ❌ Paid only | N/A | Not recommended |

## Recommended Setup

For your project, I recommend:

1. **Frontend**: GitHub Pages (free, fast)
2. **Backend**: Render.com (free tier)
3. **Database**: MongoDB Atlas (free tier, 512MB)

This gives you a completely free full-stack deployment!

## Next Steps

1. Deploy backend to Render/Railway/Fly
2. Get your backend URL
3. Update `VITE_API_URL` in your frontend
4. Rebuild and push to GitHub Pages
5. Test registration/login on your live site

Your app will then work exactly like it does locally, but accessible from anywhere!
