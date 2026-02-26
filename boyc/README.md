# BOYC - Movie Critic Diary

A full-stack Movie Critic Diary application with a cyberpunk-inspired theme. Built with React, Vite, Node.js, Express, and MongoDB.

## Features

- 10-star rating system for movie reviews
- Add, view, search, and delete movie reviews
- User authentication with JWT
- Customizable theme colors (persisted per user)
- Responsive design with cyberpunk aesthetics
- MongoDB backend for data persistence

## Tech Stack

**Frontend:**
- React 18
- Vite
- React Router
- Axios
- Context API for state management

**Backend:**
- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### 1. Clone and Install

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Setup MongoDB

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

**Frontend (.env):**
```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

**Backend (server/.env):**
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/boyc-movie-diary
JWT_SECRET=your_secret_key_change_this_in_production
NODE_ENV=development
```

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Usage

1. Click "Login" to register a new account or login
2. Once logged in, you can:
   - Add movie reviews with title, poster URL, rating, and review text
   - View all your reviews in the Library
   - Search and sort reviews
   - Delete reviews
   - Customize theme colors in Settings
3. Non-logged users can browse and search but cannot add/delete reviews

## Project Structure

```
boyc/
├── src/                    # Frontend source
│   ├── components/         # Reusable components
│   ├── context/           # React Context providers
│   ├── pages/             # Page components
│   ├── services/          # API service layer
│   └── App.jsx            # Main app component
├── server/                # Backend source
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   └── server.js          # Express server
└── public/                # Static assets
```

## API Documentation

See [server/README.md](server/README.md) for detailed API documentation.

## Development

```bash
# Frontend dev server with hot reload
npm run dev

# Backend dev server with nodemon
cd server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## License

MIT
