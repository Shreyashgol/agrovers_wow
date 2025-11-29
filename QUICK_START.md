# Quick Start Guide

## Local Development

### 1. Start Backend
```bash
./start_backend.sh
```
Backend will run on `http://localhost:8001`

### 2. Start Frontend (in new terminal)
```bash
./start_frontend.sh
```
Frontend will run on `http://localhost:5173`

### 3. Open Browser
Visit `http://localhost:5173`

## Deployment

### Backend (Render)
See `DEPLOY.md`

### Frontend (Vercel)
See `DEPLOY_FRONTEND.md`

## Environment Setup

### Backend (.env)
```env
GROQ_API_KEY=your_key_here
GOOGLE_API_KEY=your_key_here
```

### Frontend (auto-created)
Development: Uses `http://localhost:8001`
Production: Set in Vercel dashboard

## No CORS Issues!

The setup automatically handles CORS:
- Backend allows all origins (configurable in `backend/app/main.py`)
- Frontend uses environment variables for API URL
- Works seamlessly in development and production
