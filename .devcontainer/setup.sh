#!/bin/bash
set -e

echo "🚀 Setting up Alumni Network Development Environment..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd /app/backend
pip install -r requirements.txt

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd /app/frontend
yarn install

echo "✅ Setup complete! Run 'npm run dev' to start all services."
