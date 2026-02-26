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
