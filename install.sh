#!/bin/bash
# ============================================
# Agrovers Quick Installation Script
# ============================================

set -e  # Exit on error

echo "🚀 Installing Agrovers Soil Assistant..."
echo ""

# Check Python version
echo "📋 Checking Python version..."
python_version=$(python3 --version 2>&1 | awk '{print $2}')
required_version="3.9"

if [ "$(printf '%s\n' "$required_version" "$python_version" | sort -V | head -n1)" != "$required_version" ]; then 
    echo "❌ Python 3.9+ required. Found: $python_version"
    exit 1
fi
echo "✅ Python $python_version"

# Check Node version
echo "📋 Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi
node_version=$(node --version | cut -d'v' -f2)
echo "✅ Node.js $node_version"

# Backend setup
echo ""
echo "🔧 Setting up backend..."
cd backend

# Create virtual environment
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
fi

# Activate virtual environment
source .venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Create .env if not exists
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env and add your API keys!"
fi

cd ..

# Frontend setup
echo ""
echo "🔧 Setting up frontend..."
cd frontend

# Install dependencies
echo "Installing Node.js dependencies..."
npm install

cd ..

echo ""
echo "✅ Installation complete!"
echo ""
echo "📝 Next steps:"
echo "1. Edit backend/.env and add your API keys"
echo "2. Start backend: cd backend && source .venv/bin/activate && uvicorn app.main:app --reload"
echo "3. Start frontend: cd frontend && npm run dev"
echo "4. Open http://localhost:5174 in your browser"
echo ""
echo "📚 For more details, see DEPLOYMENT_GUIDE.md"
