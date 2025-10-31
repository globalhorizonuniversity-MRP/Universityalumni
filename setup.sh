#!/bin/bash
set -e

echo "🎓 Global Horizon University Alumni Network - Setup Script"
echo "============================================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose found"

# Create environment files if they don't exist
if [ ! -f backend/.env ]; then
    echo "📝 Creating backend/.env file..."
    cat > backend/.env << EOF
MONGO_URL=mongodb://mongodb:27017
DB_NAME=alumni_network
CORS_ORIGINS=*
EOF
    echo "✅ Backend .env created"
fi

if [ ! -f frontend/.env ]; then
    echo "📝 Creating frontend/.env file..."
    cat > frontend/.env << EOF
REACT_APP_BACKEND_URL=http://localhost:8001
EOF
    echo "✅ Frontend .env created"
fi

# Build and start services
echo "🏗️  Building Docker containers..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

echo ""
echo "✅ Setup complete!"
echo ""
echo "📱 Your application is running at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8001"
echo "   MongoDB:  mongodb://localhost:27017"
echo ""
echo "📝 Useful commands:"
echo "   View logs:    docker-compose logs -f"
echo "   Stop all:     docker-compose down"
echo "   Restart:      docker-compose restart"
echo "   View status:  docker-compose ps"
echo ""
