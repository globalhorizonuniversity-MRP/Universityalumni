# 🎓 Global Horizon University Alumni Network

A modern, full-stack web application for alumni networking, events, donations, and community engagement.

![Alumni Network](https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80)

## ✨ Features

- **User Authentication**: Secure registration and login system
- **Dashboard**: Personalized dashboard with stats and alumni carousel
- **Events Management**: Browse and register for 10+ upcoming alumni events
- **Connect & Chat**: Search alumni and engage in private conversations
- **Donation Platform**: Support scholarships, infrastructure, and research
- **Rich Content**: Comprehensive about page with 1000+ words and image gallery
- **Profile Management**: Edit personal information and view activity history
- **Responsive Design**: Beautiful UI that works on desktop, tablet, and mobile

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

**Prerequisites:**
- Docker installed
- Docker Compose installed

**Run:**
```bash
# Make setup script executable
chmod +x setup.sh

# Run setup script
./setup.sh

# Or manually:
npm run setup
```

Your app will be running at:
- Frontend: http://localhost:3000
- Backend: http://localhost:8001
- MongoDB: mongodb://localhost:27017

### Option 2: Manual Setup

**Prerequisites:**
- Python 3.11+
- Node.js 18+
- MongoDB 6.0+
- Yarn

**Backend Setup:**
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Frontend Setup:**
```bash
cd frontend
yarn install
yarn start
```

**MongoDB:**
```bash
# Start MongoDB locally
mongod --dbpath /path/to/data

# Or use MongoDB Atlas (cloud)
# Update backend/.env with your connection string
```

### Option 3: GitHub Codespaces

1. Click **Code** → **Codespaces** → **Create codespace on main**
2. Wait for automatic setup (uses .devcontainer configuration)
3. Run: `npm run dev`
4. Access forwarded ports for frontend (3000) and backend (8001)

## 📁 Project Structure

```
alumni-network/
├── backend/
│   ├── server.py           # FastAPI application
│   ├── requirements.txt    # Python dependencies
│   ├── .env               # Backend environment variables
│   └── Dockerfile         # Backend container config
├── frontend/
│   ├── src/
│   │   ├── pages/         # React page components
│   │   ├── components/    # Reusable components
│   │   ├── App.js         # Main app component
│   │   └── App.css        # Global styles
│   ├── public/            # Static assets
│   ├── package.json       # Node dependencies
│   ├── .env              # Frontend environment variables
│   └── Dockerfile        # Frontend container config
├── .devcontainer/         # Codespaces configuration
├── docker-compose.yml     # Docker services configuration
├── setup.sh              # Automated setup script
└── README.md             # This file
```

## 🛠️ Technology Stack

**Frontend:**
- React 19
- React Router DOM
- Tailwind CSS
- Shadcn/UI Components
- Axios
- Lucide React (icons)

**Backend:**
- FastAPI
- Motor (async MongoDB driver)
- Pydantic
- Python 3.11

**Database:**
- MongoDB 6.0

## 📝 Environment Variables

**Backend (.env):**
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=alumni_network
CORS_ORIGINS=*
```

**Frontend (.env):**
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

## 🎨 Design Features

- **Modern Gradients**: Soft blue, purple, and orange color schemes
- **Typography**: Poppins for headings, Montserrat for body text
- **Animations**: Smooth hover effects, fade-ins, and transitions
- **22+ High-Quality Images**: Curated from Unsplash and Pexels
- **Responsive**: Mobile-first design approach
- **Accessibility**: Semantic HTML and ARIA labels

## 🔧 Development Commands

```bash
# Start all services with Docker
npm run dev

# Rebuild and start
npm run dev:build

# Stop all services
npm run dev:down

# View logs
npm run dev:logs

# Install all dependencies (manual setup)
npm run install:all

# Start backend only
npm run start:backend

# Start frontend only
npm run start:frontend
```

## 📱 Pages & Routes

- `/` - Homepage with hero banner
- `/register` - User registration
- `/login` - User login
- `/dashboard` - Main dashboard (protected)
- `/events` - Events listing and registration (protected)
- `/connect` - Alumni search and chat (protected)
- `/donate` - Donation platform (protected)
- `/about` - University information (protected)
- `/contact` - Contact and feedback (protected)
- `/profile` - User profile management (protected)

## 🧪 Testing

**Test User Credentials:**
- Email: `test@example.com`
- Password: `test123`

## 🌐 API Endpoints

- `POST /api/register` - Register new user
- `POST /api/login` - User login
- `GET /api/user/{id}` - Get user profile
- `PUT /api/user/{id}` - Update user profile
- `GET /api/events` - List all events
- `POST /api/events/register` - Register for event
- `GET /api/alumni` - List all alumni
- `POST /api/messages` - Send message
- `GET /api/messages/{user_id}` - Get messages
- `POST /api/donate` - Submit donation
- `POST /api/feedback` - Submit feedback
- `GET /api/stats` - Get dashboard stats

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Kill process on port 3000 or 8001
lsof -ti:3000 | xargs kill -9
lsof -ti:8001 | xargs kill -9
```

**MongoDB connection issues:**
- Ensure MongoDB is running
- Check MONGO_URL in backend/.env
- For Docker: `docker-compose restart mongodb`

**CORS errors:**
- Update CORS_ORIGINS in backend/.env
- Restart backend service

**Frontend not loading:**
- Check REACT_APP_BACKEND_URL in frontend/.env
- Clear browser cache
- Restart frontend: `docker-compose restart frontend`

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support:
- Email: alumni@globalhorizon.edu
- Phone: (555) 123-4567

---

**Made with ❤️ by Global Horizon University**
