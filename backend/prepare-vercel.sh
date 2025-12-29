#!/bin/bash
# Prepare backend for Vercel deployment
# This script swaps to lightweight requirements

echo "📦 Preparing for Vercel deployment..."

# Backup original requirements
if [ -f "requirements.txt" ]; then
    cp requirements.txt requirements-full.txt.bak
    echo "✓ Backed up full requirements"
fi

# Use Vercel-optimized requirements
if [ -f "requirements-vercel.txt" ]; then
    cp requirements-vercel.txt requirements.txt
    echo "✓ Using lightweight requirements for Vercel"
else
    echo "❌ requirements-vercel.txt not found!"
    exit 1
fi

echo "✅ Ready for Vercel deployment!"
echo ""
echo "Note: RAG engine will be disabled on Vercel."
echo "The app will use LLM-only mode for helper responses."
