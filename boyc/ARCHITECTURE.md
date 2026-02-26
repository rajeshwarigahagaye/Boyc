# BOYC Application Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                       │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         React Frontend (Vite + React Router)           │ │
│  │                                                         │ │
│  │  • Home Page                                           │ │
│  │  • Movie Diary (Add/Edit/Delete Reviews)              │ │
│  │  • Library (View All Reviews)                         │ │
│  │  • Search & Filter                                    │ │
│  │  • Theme Customization                                │ │
│  │  • Authentication (Login/Register)                    │ │
│  └────────────────────────────────────────────────────────┘ │
│                            │                                 │
│                            │ HTTPS Requests                  │
│                            ▼                                 │
└─────────────────────────────────────────────────────────────┘
                             │
                             │
        ┌────────────────────┴────────────────────┐
        │                                         │
        ▼                                         ▼
┌──────────────────┐                    ┌──────────────────┐
│  GitHub Pages    │                    │   Render.com     │
│  (Static Host)   │                    │  (Backend Host)  │
│                  │                    │                  │
│  • HTML/CSS/JS   │                    │  ┌────────────┐  │
│  • React Build   │                    │  │ Express.js │  │
│  • Images        │                    │  │   Server   │  │
│  • Static Assets │                    │  │            │  │
│                  │                    │  │ • Auth API │  │
│  FREE            │                    │  │ • Reviews  │  │
│                  │                    │  │ • Users    │  │
└──────────────────┘                    │  └────────────┘  │
                                        │        │         │
                                        │        │         │
                                        │  FREE (750hrs)   │
                                        └────────┼─────────┘
                                                 │
                                                 │ MongoDB Driver
                                                 ▼
                                        ┌──────────────────┐
                                        │  MongoDB Atlas   │
                                        │   (Database)     │
                                        │                  │
                                        │  • Users         │
                                        │  • Reviews       │
                                        │                  │
                                        │  FREE (512MB)    │
                                        └──────────────────┘
```

## Data Flow

### 1. User Registration Flow
```
User fills form → Frontend validates → POST /api/auth/register
                                              ↓
                                    Backend validates input
                                              ↓
                                    Check if user exists (MongoDB)
                                              ↓
                                    Hash password (bcrypt)
                                              ↓
                                    Save user to database
                                              ↓
                                    Generate JWT token
                                              ↓
                                    Return token + user data
                                              ↓
                                    Frontend stores token
                                              ↓
                                    User logged in ✅
```

### 2. Add Review Flow
```
User fills review form → Frontend validates → POST /api/reviews
                                                     ↓
                                            Verify JWT token
                                                     ↓
                                            Extract userId from token
                                                     ↓
                                            Save review to MongoDB
                                                     ↓
                                            Return saved review
                                                     ↓
                                            Frontend updates UI
                                                     ↓
                                            Review appears in library ✅
```

### 3. Search Flow
```
User types in search → Frontend filters locally (real-time)
                              ↓
                    Searches: name, genre, origin
                              ↓
                    Updates displayed reviews
                              ↓
                    No backend call needed ✅
```

## Technology Stack

### Frontend (GitHub Pages)
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: CSS (CSS Variables for theming)
- **Icons**: React Icons (Font Awesome)
- **HTTP Client**: Axios
- **State Management**: React Context API

### Backend (Render.com)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **CORS**: cors middleware
- **Environment**: dotenv

### Database (MongoDB Atlas)
- **Type**: NoSQL Document Database
- **ODM**: Mongoose
- **Collections**: users, reviews

## Security Features

### Authentication
```
1. User registers → Password hashed with bcrypt (10 rounds)
2. User logs in → Password compared with hash
3. If valid → JWT token generated (expires in 7 days)
4. Token stored in localStorage
5. Every API request → Token sent in Authorization header
6. Backend verifies token → Extracts userId
7. User can only access their own data
```

### Data Protection
- Passwords never stored in plain text
- JWT tokens signed with secret key
- CORS configured for specific origins only
- Input validation on all endpoints
- MongoDB injection protection via Mongoose

## Deployment Architecture

### Local Development
```
Frontend: http://localhost:5173 (Vite dev server)
Backend:  http://localhost:5000 (Express server)
Database: mongodb://localhost:27017 (Local MongoDB)
```

### Production
```
Frontend: https://yourusername.github.io/Boyc/
Backend:  https://boyc-backend.onrender.com
Database: mongodb+srv://cluster.mongodb.net/boyc-movie-diary
```

## API Endpoints

### Authentication
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login user |

### Reviews
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/reviews` | Yes | Get all user's reviews |
| POST | `/api/reviews` | Yes | Create new review |
| PUT | `/api/reviews/:id` | Yes | Update review |
| DELETE | `/api/reviews/:id` | Yes | Delete review |
| GET | `/api/reviews/search?q=query` | Yes | Search reviews |

### Users
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/users/profile` | Yes | Get user profile |
| PUT | `/api/users/theme` | Yes | Update theme colors |

### Health Check
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/health` | No | Server status |

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  username: String (unique, min 3 chars),
  email: String (unique, valid email),
  password: String (hashed),
  primaryColor: String (default: '#FFD700'),
  secondaryColor: String (default: '#0D0D0D'),
  createdAt: Date
}
```

### Review Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: String (required),
  imageUrl: String,
  genre: String,
  dramaOrigin: String,
  numberOfEP: Number,
  description: String,
  yourPOV: String,
  rating: Number (1-5),
  createdAt: Date,
  updatedAt: Date
}
```

## State Management

### Context Providers
1. **AuthContext** - User authentication state
   - `isLoggedIn`: boolean
   - `username`: string
   - `userId`: string
   - `login()`: function
   - `register()`: function
   - `logout()`: function

2. **ThemeContext** - Theme customization
   - `primaryColor`: string
   - `secondaryColor`: string
   - `updateTheme()`: function

3. **SearchContext** - Global search state
   - `searchQuery`: string
   - `selectedGenre`: string
   - `setSearchQuery()`: function
   - `setSelectedGenre()`: function
   - `clearFilters()`: function

## Performance Optimizations

### Frontend
- Lazy loading for routes
- CSS variables for instant theme switching
- Local search (no backend calls)
- Optimistic UI updates
- Image lazy loading

### Backend
- JWT tokens (stateless authentication)
- MongoDB indexes on userId and email
- CORS configured for specific origins
- Gzip compression (Render default)

### Database
- Indexed fields: userId, email, username
- Compound index on userId + createdAt for reviews
- Connection pooling via Mongoose

## Scalability Considerations

### Current Limitations (Free Tier)
- Render: Spins down after 15 min inactivity
- MongoDB Atlas: 512MB storage limit
- GitHub Pages: 1GB storage, 100GB bandwidth/month

### Upgrade Path
1. **More users** → Render paid plan ($7/mo, no spin-down)
2. **More data** → MongoDB Atlas M10 ($9/mo, 10GB)
3. **Custom domain** → Add CNAME to GitHub Pages
4. **CDN** → Cloudflare for faster global access
5. **Monitoring** → Add error tracking (Sentry)

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=https://boyc-backend.onrender.com/api
```

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=random_secure_string
NODE_ENV=production
```

## Monitoring & Debugging

### Frontend
- Browser DevTools Console
- Network tab for API calls
- React DevTools for component state

### Backend
- Render logs dashboard
- Console.log statements
- Error tracking in catch blocks

### Database
- MongoDB Atlas monitoring dashboard
- Query performance metrics
- Storage usage tracking

## Backup & Recovery

### Database Backups
- MongoDB Atlas: Automatic daily backups (free tier)
- Manual export: `mongodump` command
- Restore: `mongorestore` command

### Code Backups
- GitHub repository (version control)
- All code changes tracked
- Easy rollback to previous versions

## Future Enhancements

### Potential Features
- [ ] Social sharing of reviews
- [ ] Follow other users
- [ ] Review comments
- [ ] Movie recommendations
- [ ] Export reviews to PDF
- [ ] Dark/light mode toggle
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] Advanced analytics

### Technical Improvements
- [ ] Redis caching layer
- [ ] WebSocket for real-time updates
- [ ] Image upload to S3/Cloudinary
- [ ] Full-text search with Elasticsearch
- [ ] GraphQL API
- [ ] Microservices architecture
- [ ] Docker containerization
- [ ] CI/CD pipeline improvements

---

This architecture provides a solid foundation for a full-stack movie diary application with room for growth and scalability.
