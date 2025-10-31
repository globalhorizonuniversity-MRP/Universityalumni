# 🚀 GitHub Codespaces - Step by Step Guide

## Step 1: Save Your Code to GitHub

**From Emergent (Current Environment):**

1. Look for the **"Save to GitHub"** button in your Emergent interface
2. Click it and follow the prompts
3. Create a new repository (e.g., `alumni-network`)
4. Wait for the code to be pushed

**OR Manually via Git:**

```bash
# Initialize git (if not already)
cd /app
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Alumni Network MVP"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/alumni-network.git
git branch -M main
git push -u origin main
```

---

## Step 2: Create a Codespace

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/alumni-network`

2. Click the green **"Code"** button (top right)

3. Click the **"Codespaces"** tab

4. Click **"Create codespace on main"**

5. Wait 2-3 minutes while Codespaces:
   - Provisions a cloud VM
   - Installs Python, Node.js
   - Runs the setup script automatically
   - Installs all dependencies

You'll see a VS Code interface in your browser!

---

## Step 3: Start the Application

Once your Codespace is ready, open the terminal and run:

```bash
# Option 1: Using Docker (Recommended)
docker-compose up

# Option 2: Using Make
make dev

# Option 3: Using NPM
npm run dev
```

**First time setup takes 2-3 minutes** to pull Docker images.

---

## Step 4: Access Your Application

**After services start:**

1. Look for the **"PORTS"** tab at the bottom of VS Code
   
2. You'll see 3 ports forwarded:
   - **3000** (Frontend) - Click the 🌐 globe icon
   - **8001** (Backend) - Hover to see URL
   - **27017** (MongoDB) - Private

3. Click the globe icon (🌐) next to port **3000**

4. Your app opens in a new tab! 🎉

The URL will look like:
```
https://your-codespace-name-3000.app.github.dev
```

---

## Step 5: Update Environment Variables (Important!)

**The frontend needs to know the backend URL:**

1. In Codespaces terminal:

```bash
# Get your Codespace backend URL
echo "Backend URL: https://${CODESPACE_NAME}-8001.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
```

2. Update `frontend/.env`:

```bash
# Edit the file
nano frontend/.env

# Change to:
REACT_APP_BACKEND_URL=https://YOUR-CODESPACE-NAME-8001.app.github.dev
```

3. Restart frontend:

```bash
docker-compose restart frontend
# OR if running manually:
# Ctrl+C in frontend terminal, then: yarn start
```

---

## 🎯 Quick Commands in Codespaces

```bash
# View all services status
docker-compose ps

# View logs
docker-compose logs -f

# Stop everything
docker-compose down

# Restart a service
docker-compose restart backend

# Open MongoDB shell
docker-compose exec mongodb mongosh alumni_network

# View all available commands
make help
```

---

## 🔍 Troubleshooting in Codespaces

### Port not showing up?

1. Click "PORTS" tab
2. Click "Forward a Port" button
3. Enter: `3000` (or `8001`)
4. Set visibility to "Public"

### Can't access the app?

1. Check services are running: `docker-compose ps`
2. Check logs: `docker-compose logs`
3. Restart services: `docker-compose restart`

### CORS errors?

1. Get your Codespace URL from PORTS tab
2. Update `backend/.env`:
```env
CORS_ORIGINS=https://*-3000.app.github.dev
```
3. Restart backend: `docker-compose restart backend`

### MongoDB not connecting?

```bash
# Check if MongoDB is running
docker-compose ps mongodb

# Restart MongoDB
docker-compose restart mongodb

# Check logs
docker-compose logs mongodb
```

### Need to rebuild?

```bash
# Clean rebuild
docker-compose down -v
docker-compose up --build
```

---

## 💡 Pro Tips for Codespaces

**1. Codespace will auto-suspend after 30 minutes of inactivity**
   - Don't worry, your work is saved
   - Just reopen and run `docker-compose up` again

**2. Access your Codespace later:**
   - Go to https://github.com/codespaces
   - Click on your codespace to reopen it

**3. Share your app:**
   - Click the port visibility (in PORTS tab)
   - Change from "Private" to "Public"
   - Share the URL with others!

**4. Use multiple terminals:**
   - Click "+" in terminal to open new terminals
   - Run different commands simultaneously

**5. Edit files easily:**
   - Full VS Code interface
   - File explorer on the left
   - Extensions pre-installed

---

## 📱 What You'll See

**When services start successfully:**

```
✅ mongodb    | Running on port 27017
✅ backend    | Running on port 8001
✅ frontend   | Running on port 3000
```

**In PORTS tab:**

```
Port  | Running Process
------|----------------
3000  | React Frontend  🌐
8001  | FastAPI Backend 🌐
27017 | MongoDB        🔒
```

**Your App:**
- Homepage with beautiful gradient hero
- Register and create account
- Login and access dashboard
- Explore all features!

---

## 🎓 Test Your App

1. Click the globe icon next to port 3000
2. Click "Register" button
3. Fill out the form:
   - Name: Your Name
   - Email: test@example.com
   - Password: test123
   - Year: 2020
   - Location: San Francisco, CA
   - Company: Tech Corp
   - Domain: Technology
   - Phone: 5551234567 (auto-formats)
4. Click Register → Redirects to Dashboard
5. Explore all pages using sidebar navigation

---

## 🆘 Need Help?

**Codespace not working?**
- Check https://www.githubstatus.com/
- Try creating a new Codespace
- Check your GitHub account has Codespaces enabled

**Services not starting?**
```bash
# View detailed logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

**Still stuck?**
- View README.md for more details
- Check QUICKSTART.md for alternative methods
- GitHub Issues: Report problems in your repo

---

## ✅ Success Checklist

- [ ] Code pushed to GitHub
- [ ] Codespace created successfully
- [ ] Services started with `docker-compose up`
- [ ] Port 3000 forwarded and accessible
- [ ] Frontend loads in browser
- [ ] Can register new account
- [ ] Can login and see dashboard
- [ ] All pages accessible via sidebar

**You're all set! Enjoy your Alumni Network in the cloud! ☁️🎉**
