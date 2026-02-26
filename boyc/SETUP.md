# BOYC Setup Guide

Complete step-by-step guide to get BOYC Movie Critic Diary running on your machine.

## Prerequisites Check

Before starting, ensure you have:
- [ ] Node.js v16+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB installed

## Step-by-Step Setup

### 1. Install Node.js Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Install and Start MongoDB

#### Windows
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run the installer (choose "Complete" installation)
3. MongoDB will start as a Windows service automatically
4. Verify it's running: Open Services (Win+R, type `services.msc`) and look for "MongoDB Server"

#### macOS
```bash
# Install via Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify it's running
brew services list | grep mongodb
```

#### Linux (Ubuntu/Debian)
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify it's running
sudo systemctl status mongod
```

### 3. Verify MongoDB Connection

```bash
# Connect to MongoDB shell
mongosh

# You should see a connection message
# Type 'exit' to quit
```

### 4. Environment Configuration

The `.env` files are already created with default values. You can modify them if needed:

**Frontend (.env):**
```
VITE_API_URL=http://localhost:5000/api
```

**Backend (server/.env):**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/boyc-movie-diary
JWT_SECRET=boyc_secret_key_change_this_in_production_2026
NODE_ENV=development
```

**Important:** Change `JWT_SECRET` to a random string in production!

### 5. Start the Application

You need TWO terminal windows:

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```

You should see:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### 6. Open the Application

Open your browser and go to: **http://localhost:5173**

## First Time Usage

1. Click the "Login" button in the top navigation
2. Click "Don't have an account? Register"
3. Enter:
   - Username (e.g., "testuser")
   - Email (e.g., "test@example.com")
   - Password (e.g., "password123")
4. Click "Register"
5. You're now logged in and can start adding movie reviews!

## Troubleshooting

### MongoDB Connection Error

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
- Verify MongoDB is running: `mongosh` (should connect)
- Check if MongoDB service is active
- Windows: Check Services app
- Mac: `brew services list`
- Linux: `sudo systemctl status mongod`

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
- Another process is using port 5000
- Kill the process or change the port in `server/.env`

### Axios Not Found

**Error:** `Cannot find module 'axios'`

**Solution:**
```bash
npm install axios
```

### CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `.env` matches backend URL
- Restart both frontend and backend

### Theme Not Persisting

**Issue:** Theme colors reset after refresh

**Solution:**
- Make sure you're logged in (theme syncs to backend for logged-in users)
- Check browser console for API errors
- Verify backend is running

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Changes auto-refresh in browser
- Backend: nodemon restarts server on file changes

### Database Management

View your data using MongoDB Compass (GUI):
1. Download from https://www.mongodb.com/try/download/compass
2. Connect to `mongodb://localhost:27017`
3. Browse the `boyc-movie-diary` database

### API Testing

Test API endpoints with curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

## Production Deployment

For production deployment:

1. Change `JWT_SECRET` to a strong random string
2. Update `MONGODB_URI` to your production MongoDB instance
3. Update `VITE_API_URL` to your production API URL
4. Build the frontend: `npm run build`
5. Serve the `dist` folder with a static server
6. Run backend with `npm start` (not `npm run dev`)

## Need Help?

- Check the main [README.md](README.md) for project overview
- Check [server/README.md](server/README.md) for API documentation
- Review the code in `src/` for frontend implementation
- Review the code in `server/` for backend implementation
