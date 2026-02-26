# Troubleshooting Guide

## Registration/Login Issues

### "Registration failed" Error

If you see a generic "Registration failed" error, here are the most common causes and solutions:

#### 1. Backend Server Not Running
**Symptom**: Error message says "Cannot connect to server"

**Solution**:
```bash
# Navigate to server directory
cd boyc/server

# Start the server
npm start
```

The server should be running on `http://localhost:5000`

#### 2. MongoDB Not Connected
**Symptom**: Server logs show "MongoDB connection error"

**Solution**:
- Make sure MongoDB is installed and running
- Check your `boyc/server/.env` file has correct `MONGODB_URI`
- Default: `mongodb://localhost:27017/boyc-movie-diary`

**Start MongoDB**:
```bash
# Windows
net start MongoDB

# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### 3. Username or Email Already Exists
**Symptom**: Error says "Username already taken" or "Email already registered"

**Solution**:
- Try a different username
- Try a different email address
- If you already have an account, use the "Login" option instead

#### 4. Validation Errors
**Symptom**: Specific validation error messages

**Requirements**:
- Username: minimum 3 characters
- Email: valid email format (e.g., user@example.com)
- Password: minimum 6 characters
- Confirm Password: must match password field

#### 5. Missing Environment Variables
**Symptom**: Server crashes or JWT errors

**Solution**:
1. Copy `.env.example` to `.env` in both directories:
```bash
# Frontend
cp boyc/.env.example boyc/.env

# Backend
cp boyc/server/.env.example boyc/server/.env
```

2. Update `boyc/server/.env` with your settings:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/boyc-movie-diary
JWT_SECRET=your_secure_random_string_here
NODE_ENV=development
```

#### 6. CORS Issues
**Symptom**: Browser console shows CORS errors

**Solution**:
- Make sure the backend server is running on port 5000
- Check that `VITE_API_URL` in `boyc/.env` matches your backend URL
- Default: `VITE_API_URL=http://localhost:5000/api`

### Checking Server Status

#### Test Backend Health
Open your browser and visit: `http://localhost:5000/api/health`

You should see:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

#### Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for error messages when registration fails
4. Common errors:
   - Network errors → Server not running
   - 400 errors → Validation or duplicate user
   - 500 errors → Server/database issue

#### Check Server Logs
Look at your terminal where the server is running for error messages:
- MongoDB connection errors
- JWT secret missing
- Validation errors
- Database errors

### Quick Start Checklist

Before trying to register, ensure:

- [ ] MongoDB is installed and running
- [ ] Backend server is running (`cd boyc/server && npm start`)
- [ ] Frontend dev server is running (`cd boyc && npm run dev`)
- [ ] `.env` files are configured in both `boyc/` and `boyc/server/`
- [ ] Browser can access `http://localhost:5000/api/health`

### Still Having Issues?

1. **Clear browser cache and localStorage**:
   - Open DevTools (F12)
   - Go to Application tab
   - Clear Storage → Clear site data

2. **Restart both servers**:
   ```bash
   # Stop servers (Ctrl+C)
   # Restart backend
   cd boyc/server
   npm start
   
   # Restart frontend (in new terminal)
   cd boyc
   npm run dev
   ```

3. **Check for detailed error messages**:
   - The error message should now be more specific
   - Look in browser console for network errors
   - Check server terminal for backend errors

4. **Verify MongoDB connection**:
   ```bash
   # Connect to MongoDB shell
   mongosh
   
   # List databases
   show dbs
   
   # Use your database
   use boyc-movie-diary
   
   # Check users collection
   db.users.find()
   ```

## Theme Issues

### Theme Not Resetting on Logout
If theme colors persist after logout, clear your browser's localStorage manually:
1. Open DevTools (F12)
2. Go to Application tab
3. Click "Local Storage"
4. Delete all items or clear site data

### Custom Colors Not Saving
Make sure:
- You're logged in
- Backend server is running
- MongoDB is connected
- Check browser console for API errors

## Search Issues

### Search Not Working
- Make sure you have reviews/movies in your library
- Search works across: name, genre, and origin fields
- Try clearing the search and filters

### Genre Filter Not Showing
- Genre filter only shows genres from your existing reviews
- Add some reviews first to see genre options

## Deployment Issues

### GitHub Pages 404 Error
Make sure:
- `vite.config.js` has correct `base: '/Boyc/'`
- `App.jsx` has `basename="/Boyc"` in BrowserRouter
- Repository name matches the base path exactly

### API Not Working on Deployed Site
- GitHub Pages only hosts static files
- You need to deploy the backend separately (e.g., Heroku, Railway, Render)
- Update `VITE_API_URL` to point to your deployed backend

## Need More Help?

Check these files for more information:
- `SETUP.md` - Initial setup instructions
- `API_INTEGRATION.md` - API usage guide
- `DEPLOYMENT.md` - Deployment guide
- `DATA_STORAGE_LOCATION.md` - Database information
