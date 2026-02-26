# BOYC Backend Server

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Setup MongoDB
Make sure MongoDB is installed and running on your system.

**Install MongoDB:**
- Windows: Download from https://www.mongodb.com/try/download/community
- Mac: `brew install mongodb-community`
- Linux: Follow official MongoDB installation guide

**Start MongoDB:**
```bash
# Windows (run as service or)
mongod

# Mac/Linux
brew services start mongodb-community
# or
sudo systemctl start mongod
```

### 3. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` and update values if needed:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/boyc-movie-diary
JWT_SECRET=your_secret_key_change_this
NODE_ENV=development
```

### 4. Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Reviews
- `GET /api/reviews` - Get all reviews (requires auth)
- `POST /api/reviews` - Create review (requires auth)
- `PUT /api/reviews/:id` - Update review (requires auth)
- `DELETE /api/reviews/:id` - Delete review (requires auth)
- `GET /api/reviews/search?q=query` - Search reviews (requires auth)

### Users
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/theme` - Update theme preferences (requires auth)

## Testing the API

Use tools like Postman or curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```


## Deployment to Production

### Deploy to Render.com (Free - Recommended)

1. **Prepare for deployment:**
   - Ensure `render.yaml` exists in this directory
   - Push code to GitHub

2. **Create MongoDB Atlas database:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free M0 cluster
   - Get connection string

3. **Deploy on Render:**
   - Go to [Render.com](https://render.com)
   - Sign up with GitHub
   - New → Web Service
   - Connect your repository
   - Root Directory: `boyc/server`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Set environment variables on Render:**
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Random secure string
   - `NODE_ENV`: `production`

5. **Update CORS in `server.js`:**
   ```javascript
   app.use(cors({
     origin: [
       'http://localhost:5173',
       'https://yourusername.github.io'
     ],
     credentials: true
   }));
   ```

6. **Deploy and get your backend URL**
   - Example: `https://boyc-backend.onrender.com`

**📖 See `../BACKEND_DEPLOYMENT.md` for detailed deployment guide**

### After Deployment

Update your frontend `.env`:
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

Then rebuild and redeploy your frontend to GitHub Pages.

## Troubleshooting

### "Cannot connect to MongoDB"
- Check if MongoDB is running locally
- For production, verify MongoDB Atlas connection string
- Whitelist IP addresses in MongoDB Atlas (use 0.0.0.0/0 for all)

### "JWT must be provided"
- Ensure `JWT_SECRET` is set in environment variables
- Check if token is being sent in Authorization header

### CORS Errors
- Add your frontend URL to CORS origins in `server.js`
- Restart server after changes

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

## Project Structure

```
server/
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── models/
│   ├── User.js          # User schema
│   └── Review.js        # Review schema
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── reviews.js       # Review CRUD routes
│   └── users.js         # User profile routes
├── .env.example         # Environment variables template
├── render.yaml          # Render deployment config
├── server.js            # Main server file
└── package.json         # Dependencies
```

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 5000 | Server port |
| `MONGODB_URI` | Yes | - | MongoDB connection string |
| `JWT_SECRET` | Yes | - | Secret for JWT tokens |
| `NODE_ENV` | No | development | Environment mode |

## Security Notes

- Passwords are hashed with bcrypt (10 rounds)
- JWT tokens expire after 7 days
- CORS is configured for specific origins only
- All review routes require authentication
- Input validation on all endpoints
