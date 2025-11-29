# Render Deployment Guide

## Quick Deploy Steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Deploy on Render

1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Render will auto-detect `render.yaml` configuration

### 3. Set Environment Variables

In Render dashboard, add these environment variables:

**Required:**
- `GROQ_API_KEY` - Get from [console.groq.com](https://console.groq.com)
- `GOOGLE_API_KEY` - Get from [makersuite.google.com](https://makersuite.google.com/app/apikey)

**Optional:**
- `OLLAMA_BASE_URL` - Leave default (http://localhost:11434)
- `OLLAMA_MODEL_NAME` - Leave default (gemma2:9b)

### 4. Deploy

Click "Create Web Service" and wait 5-10 minutes for deployment.

## What's Optimized

- Removed heavy dependencies (Whisper, torch, transformers)
- Kept only essential packages for Render free tier
- Uses Groq/Gemini APIs instead of local models
- Gunicorn with 2 workers for production
- Auto-preprocesses knowledge base on first deploy

## Free Tier Limits

- 512 MB RAM
- Sleeps after 15 min inactivity
- 750 hours/month free

## Troubleshooting

**Build fails:** Check requirements.txt has no syntax errors
**Out of memory:** Reduce workers in start_backend.sh to 1
**API errors:** Verify environment variables are set correctly
