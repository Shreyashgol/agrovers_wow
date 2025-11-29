#!/bin/bash
# Start frontend development server

cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Create .env.development if it doesn't exist
if [ ! -f ".env.development" ]; then
    echo "📝 Creating .env.development..."
    echo "VITE_API_BASE_URL=http://localhost:8001" > .env.development
fi

# Start Vite dev server
echo "🚀 Starting frontend on http://localhost:5173"
echo "📡 API URL: http://localhost:8001"
echo ""
echo "⚠️  Make sure backend is running on port 8001!"
echo ""
npm run dev
