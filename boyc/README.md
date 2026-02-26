# BOYC - Movie Critic Diary 🎬

A full-stack web application for tracking and reviewing movies/dramas with customizable themes and powerful search functionality.

![BOYC Banner](public/ceri.jpg)

## 🌟 Features

- **User Authentication** - Secure registration and login with JWT
- **Movie Reviews** - Add, edit, delete, and rate movies (1-5 stars)
- **Custom Themes** - Personalize colors (primary and secondary)
- **Global Search** - Real-time search by name, genre, or origin
- **Genre Filtering** - Filter reviews by genre with dropdown
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Persistent Storage** - MongoDB database for permanent data
- **Modern UI** - Clean, dark theme with yellow accents

## 🚀 Live Demo

- **Frontend**: [https://rajeshwarigahagaye.github.io/Boyc/](https://rajeshwarigahagaye.github.io/Boyc/)
- **Backend**: Deployed on Render.com

## 📸 Screenshots

### Home Page
Modern landing page with search functionality

### Movie Library
Grid view of all your movie reviews with ratings

### Add Review
Comprehensive form for adding movie details

### Theme Customization
Personalize your experience with custom colors

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- React Router v6
- Axios
- React Icons
- CSS Variables (for theming)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt (password hashing)

### Deployment
- Frontend: GitHub Pages
- Backend: Render.com
- Database: MongoDB Atlas

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- Git

## 🔧 Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/rajeshwarigahagaye/Boyc.git
cd Boyc
```

### 2. Setup Backend
```bash
cd boyc/server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm start
```

Backend runs on `http://localhost:5000`

### 3. Setup Frontend
```bash
cd boyc
npm install
cp .env.example .env
# Edit .env if needed (default: http://localhost:5000/api)
npm run dev
```

Frontend runs on `http://localhost:5173`

### 4. Start MongoDB
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

## 📦 Production Deployment

### Quick Start (3 Steps)

1. **Deploy Backend to Render.com**
   - Create MongoDB Atlas account (free)
   - Deploy to Render.com (free tier)
   - Set environment variables

2. **Update Frontend Configuration**
   - Update `VITE_API_URL` in `.env`
   - Commit and push to GitHub

3. **GitHub Pages Auto-Deploys**
   - Wait for GitHub Actions to complete
   - Visit your live site!

**📖 Detailed Guide**: See `PRODUCTION_DEPLOYMENT_QUICKSTART.md`

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get started quickly
- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Frontend deployment guide
- **[BACKEND_DEPLOYMENT.md](BACKEND_DEPLOYMENT.md)** - Backend deployment guide
- **[PRODUCTION_DEPLOYMENT_QUICKSTART.md](PRODUCTION_DEPLOYMENT_QUICKSTART.md)** - Quick production setup
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture overview
- **[API_INTEGRATION.md](API_INTEGRATION.md)** - API usage guide
- **[SEARCH_FEATURE.md](SEARCH_FEATURE.md)** - Search functionality details
- **[DATA_STORAGE_LOCATION.md](DATA_STORAGE_LOCATION.md)** - Database information

## 🎯 Usage

### Register/Login
1. Click "Login" button in navigation
2. Register a new account or login
3. Your session persists for 7 days

### Add Movie Review
1. Navigate to "Add Review"
2. Fill in movie details:
   - Name (required)
   - Image URL
   - Genre
   - Origin
   - Number of Episodes
   - Description
   - Your Point of View
   - Rating (1-5 stars)
3. Click "Add Review"

### View Library
1. Navigate to "Library"
2. See all your reviews in a grid
3. Click any card to view full details
4. Edit or delete from the modal

### Search & Filter
1. Use search bar in top navigation
2. Type to search by name, genre, or origin
3. Click filter icon to select genre
4. Clear filters with X button

### Customize Theme
1. Click settings icon (gear) when logged in
2. Choose primary color (default: gold)
3. Choose secondary color (default: black)
4. Click "Save Theme"
5. Theme persists across sessions

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Reviews
- `GET /api/reviews` - Get all user's reviews
- `POST /api/reviews` - Create new review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review
- `GET /api/reviews/search?q=query` - Search reviews

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/theme` - Update theme preferences

### Health Check
- `GET /api/health` - Server status

## 🗄️ Database Schema

### User
```javascript
{
  username: String (unique, min 3 chars),
  email: String (unique, valid email),
  password: String (hashed),
  primaryColor: String (default: '#FFD700'),
  secondaryColor: String (default: '#0D0D0D'),
  createdAt: Date
}
```

### Review
```javascript
{
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

## 🐛 Troubleshooting

### "Cannot connect to server"
- Backend not running → Start backend server
- Wrong API URL → Check `.env` file
- CORS error → Add your domain to CORS origins

### Registration Failed
- Server not running → Start backend
- MongoDB not connected → Start MongoDB
- Username/email exists → Try different credentials

### Theme Not Saving
- Not logged in → Login first
- Backend error → Check server logs
- Network error → Check API connection

**📖 Full troubleshooting guide**: See `TROUBLESHOOTING.md`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Rajeshwari Gahagaye**
- GitHub: [@rajeshwarigahagaye](https://github.com/rajeshwarigahagaye)

## 🙏 Acknowledgments

- React Icons for beautiful icons
- MongoDB Atlas for free database hosting
- Render.com for free backend hosting
- GitHub Pages for free frontend hosting

## 📞 Support

If you have any questions or issues:
1. Check the documentation files listed above
2. Open an issue on GitHub
3. Review the troubleshooting guide

## 🎉 Features Coming Soon

- [ ] Social sharing of reviews
- [ ] Follow other users
- [ ] Review comments
- [ ] Movie recommendations
- [ ] Export reviews to PDF
- [ ] Mobile app version
- [ ] Email notifications

---

Made with ❤️ by Rajeshwari Gahagaye
