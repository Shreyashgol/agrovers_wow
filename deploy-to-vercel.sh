#!/bin/bash

# Vercel Deployment Script
# This script helps you deploy both backend and frontend to Vercel

set -e

echo "🚀 Agrovers Vercel Deployment Helper"
echo "===================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found!"
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI is installed"
echo ""

# Login to Vercel
echo "🔐 Logging in to Vercel..."
vercel login

echo ""
echo "Choose deployment option:"
echo "1) Deploy Backend only"
echo "2) Deploy Frontend only"
echo "3) Deploy Both (Backend first, then Frontend)"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "📦 Deploying Backend to Vercel..."
        cd backend
        vercel --prod
        echo ""
        echo "✅ Backend deployed!"
        echo "⚠️  Don't forget to set environment variables in Vercel dashboard:"
        echo "   - GROQ_LLM_API_KEY"
        echo "   - GROQ_STT_API_KEY"
        echo "   - GROQ_REPORT_API_KEY"
        echo "   - GEMINI_API_KEY"
        echo "   - GEMINI_REPORT_API_KEY"
        ;;
    2)
        echo ""
        read -p "Enter your backend URL (e.g., https://agrovers-backend.vercel.app): " backend_url
        echo ""
        echo "📦 Deploying Frontend to Vercel..."
        cd frontend
        vercel --prod
        echo ""
        echo "✅ Frontend deployed!"
        echo "⚠️  Set VITE_API_BASE_URL=$backend_url in Vercel dashboard"
        ;;
    3)
        echo ""
        echo "📦 Step 1: Deploying Backend..."
        cd backend
        vercel --prod
        cd ..
        echo ""
        echo "✅ Backend deployed!"
        echo ""
        read -p "Enter your backend URL (from above): " backend_url
        echo ""
        echo "📦 Step 2: Deploying Frontend..."
        cd frontend
        vercel --prod
        echo ""
        echo "✅ Both deployed!"
        echo ""
        echo "⚠️  Final steps:"
        echo "1. Set backend environment variables in Vercel dashboard"
        echo "2. Set VITE_API_BASE_URL=$backend_url in frontend Vercel dashboard"
        echo "3. Update backend ALLOWED_ORIGINS with your frontend URL"
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment complete!"
echo "📖 See VERCEL_DEPLOYMENT.md for detailed instructions"
