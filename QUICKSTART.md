# 🚀 Quick Start Guide

## Three Ways to Run Your Alumni Network

### 🐳 Option 1: Docker (Easiest - Recommended)

**One command to rule them all:**
```bash
./setup.sh
```

That's it! Your app will be running at:
- 🌐 Frontend: http://localhost:3000
- ⚙️ Backend: http://localhost:8001
- 🗄️ MongoDB: mongodb://localhost:27017

**Useful commands:**
```bash
npm run dev          # Start all services
npm run dev:down     # Stop all services  
npm run dev:logs     # View logs
docker-compose ps    # Check status
```

---

### ☁️ Option 2: GitHub Codespaces (Cloud Development)

**Steps:**
1. Push code to GitHub
2. Go to your repo → Click **"Code"** → **"Codespaces"** → **"Create codespace"**
3. Wait 2-3 minutes for automatic setup
4. Run: `npm run dev`
5. Click the forwarded port links to access your app

**Auto-configured:**
- ✅ All dependencies installed automatically
- ✅ Ports forwarded (3000, 8001, 27017)
- ✅ VS Code extensions installed
- ✅ Environment variables set

---

### 💻 Option 3: Manual Local Setup (No Docker)

**Prerequisites:**
- Python 3.11+
- Node.js 18+
- MongoDB 6.0+
- Yarn

**Terminal 1 - MongoDB:**
```bash
mongod --dbpath ~/data/db
```

**Terminal 2 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Terminal 3 - Frontend:**
```bash
cd frontend
yarn install
yarn start
```

---

## 🎯 First Time Setup Checklist

- [ ] MongoDB is running
- [ ] Backend started on port 8001
- [ ] Frontend started on port 3000
- [ ] Navigate to http://localhost:3000
- [ ] Click "Register" and create an account
- [ ] Explore all features!

---

## 🧪 Test the App

**Create a test account:**
1. Click "Register"
2. Fill out the form
3. Use any email (e.g., `john@test.com`)
4. Password: anything you want
5. Phone: Will auto-format to (XXX) XXX-XXXX

**Explore features:**
- ✨ Dashboard with stats and rotating carousel
- 📅 10 upcoming events (4 with registration)
- 💬 Connect and chat with other alumni
- ❤️ Make donations ($10-$10,000)
- 📖 Rich about page with gallery
- 📞 Contact form with feedback
- 👤 Edit your profile

---

## ⚡ Pro Tips

**Fast restart (Docker):**
```bash
docker-compose restart backend frontend
```

**View specific service logs:**
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

**Reset database:**
```bash
docker-compose down -v  # Removes volumes
docker-compose up -d
```

**Access MongoDB shell:**
```bash
docker-compose exec mongodb mongosh
use alumni_network
db.users.find()
```

---

## 🐛 Common Issues

**Port already in use:**
```bash
# Stop existing services
docker-compose down
# Or kill specific port
lsof -ti:3000 | xargs kill -9
```

**Can't connect to MongoDB:**
- Check if MongoDB container is running: `docker-compose ps`
- Restart: `docker-compose restart mongodb`
- Check logs: `docker-compose logs mongodb`

**Frontend can't reach backend:**
- Verify backend is running on port 8001
- Check `frontend/.env` has correct REACT_APP_BACKEND_URL
- Check browser console for errors

**Docker build fails:**
```bash
# Clean rebuild
docker-compose down
docker system prune -f
docker-compose build --no-cache
docker-compose up
```

---

## 📱 Access Your App

**Local Development:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001
- API Docs: http://localhost:8001/docs (FastAPI Swagger UI)

**GitHub Codespaces:**
- Check "Ports" tab in VS Code
- Click globe icon next to port 3000
- URL format: `https://[codespace-name]-3000.githubpreview.dev`

---

## 🎉 You're All Set!

Your Global Horizon University Alumni Network is ready to use. Enjoy building connections! 🎓

Need help? Check the full README.md or create an issue on GitHub.
