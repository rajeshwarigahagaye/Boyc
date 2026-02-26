# BOYC Quick Start Checklist

Get up and running in 5 minutes!

## ✅ Pre-flight Checklist

- [ ] Node.js v16+ installed
- [ ] MongoDB installed and running
- [ ] Two terminal windows ready

## 🚀 Installation (2 minutes)

```bash
# Terminal 1 - Install dependencies
npm install
cd server && npm install && cd ..
```

## ⚙️ Configuration (30 seconds)

Environment files are already created with defaults. You're good to go!

- ✅ `boyc/.env` - Frontend config
- ✅ `boyc/server/.env` - Backend config

## 🏃 Start the App (1 minute)

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Wait for: `✅ Connected to MongoDB` and `🚀 Server running`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Wait for: `Local: http://localhost:5173/`

## 🎉 You're Ready!

Open **http://localhost:5173** in your browser.

## 🎬 First Steps

1. Click **Login** → **Register**
2. Create account (username, email, password)
3. Click **Add Review** to add your first movie
4. View all reviews in **Library**
5. Customize colors in **Settings**

## 🆘 Quick Fixes

**MongoDB not running?**
```bash
# Windows: Check Services app for "MongoDB Server"
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Port 5000 in use?**
- Change `PORT=5001` in `server/.env`
- Update `VITE_API_URL=http://localhost:5001/api` in `.env`

**Need detailed help?**
- See [SETUP.md](SETUP.md) for detailed instructions
- See [README.md](README.md) for project overview
- See [API_INTEGRATION.md](API_INTEGRATION.md) for technical details

---

**That's it! You're all set to start reviewing movies! 🎬🍿**
