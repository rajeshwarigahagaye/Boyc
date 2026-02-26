# BOYC - Movie Critic Diary 🎬

A full-stack web application for tracking and reviewing movies/dramas with customizable themes and powerful search functionality.

## 🌟 Live Demo

- **Website**: [https://rajeshwarigahagaye.github.io/Boyc/](https://rajeshwarigahagaye.github.io/Boyc/)

## ✨ Key Features

- 🔐 User authentication with JWT
- 🎬 Add, edit, delete movie reviews
- ⭐ Rate movies (1-5 stars)
- 🎨 Customizable theme colors
- 🔍 Real-time search and filtering
- 📱 Fully responsive design
- 💾 Persistent MongoDB storage

## 🚀 Quick Start

### Local Development

1. **Clone and setup**:
```bash
git clone https://github.com/rajeshwarigahagaye/Boyc.git
cd Boyc
```

2. **Start backend**:
```bash
cd boyc/server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm start
```

3. **Start frontend**:
```bash
cd boyc
npm install
npm run dev
```

4. Visit `http://localhost:5173`

### Production Deployment

**Problem**: GitHub Pages shows "Cannot connect to server"?

**Solution**: Deploy backend separately!

1. Deploy backend to [Render.com](https://render.com) (free)
2. Create [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database (free)
3. Update frontend `.env` with backend URL
4. Push to GitHub → Auto-deploys to GitHub Pages

**📖 Step-by-step guide**: See `boyc/PRODUCTION_DEPLOYMENT_QUICKSTART.md`

## 📚 Documentation

All documentation is in the `boyc/` directory:

### Getting Started
- **[QUICKSTART.md](boyc/QUICKSTART.md)** - Quick setup guide
- **[SETUP.md](boyc/SETUP.md)** - Detailed setup instructions
- **[README.md](boyc/README.md)** - Main project documentation

### Deployment
- **[PRODUCTION_DEPLOYMENT_QUICKSTART.md](boyc/PRODUCTION_DEPLOYMENT_QUICKSTART.md)** - ⭐ Deploy in 10 minutes
- **[DEPLOYMENT.md](boyc/DEPLOYMENT.md)** - Frontend deployment (GitHub Pages)
- **[BACKEND_DEPLOYMENT.md](boyc/BACKEND_DEPLOYMENT.md)** - Backend deployment (Render/Railway/Fly)

### Troubleshooting
- **[TROUBLESHOOTING.md](boyc/TROUBLESHOOTING.md)** - Common issues and solutions

### Technical
- **[ARCHITECTURE.md](boyc/ARCHITECTURE.md)** - System architecture
- **[API_INTEGRATION.md](boyc/API_INTEGRATION.md)** - API documentation
- **[SEARCH_FEATURE.md](boyc/SEARCH_FEATURE.md)** - Search functionality
- **[DATA_STORAGE_LOCATION.md](boyc/DATA_STORAGE_LOCATION.md)** - Database info

## 🛠️ Tech Stack

**Frontend**: React 18, Vite, React Router, Axios, React Icons  
**Backend**: Node.js, Express, MongoDB, Mongoose, JWT  
**Deployment**: GitHub Pages (frontend), Render.com (backend), MongoDB Atlas (database)

## 📦 Project Structure

```
Boyc/
├── boyc/                      # Main application
│   ├── src/                   # Frontend source code
│   │   ├── components/        # React components
│   │   ├── context/           # Context providers
│   │   ├── pages/             # Page components
│   │   └── services/          # API services
│   ├── server/                # Backend server
│   │   ├── models/            # MongoDB models
│   │   ├── routes/            # API routes
│   │   └── middleware/        # Auth middleware
│   └── public/                # Static assets
├── .github/workflows/         # GitHub Actions
└── docs/                      # Documentation
```

## 🎯 Common Issues

### "Cannot connect to server" on GitHub Pages?
→ Backend needs separate deployment. See `PRODUCTION_DEPLOYMENT_QUICKSTART.md`

### Registration failed?
→ Check if backend server is running. See `TROUBLESHOOTING.md`

### Theme not saving?
→ Make sure you're logged in and backend is connected

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - See LICENSE file for details

## 👤 Author

**Rajeshwari Gahagaye**
- GitHub: [@rajeshwarigahagaye](https://github.com/rajeshwarigahagaye)

## 🙏 Acknowledgments

- React community for amazing tools
- MongoDB Atlas for free database hosting
- Render.com for free backend hosting
- GitHub Pages for free frontend hosting

---

⭐ Star this repo if you find it helpful!

**Need help?** Check the documentation in the `boyc/` directory or open an issue.
