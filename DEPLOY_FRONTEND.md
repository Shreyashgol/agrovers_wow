# Frontend Deployment Guide (Vercel)

## Prerequisites

1. Backend deployed on Render (get the URL)
2. GitHub repository with your code

## Step 1: Update Production Environment

Edit `frontend/.env.production` and replace with your actual backend URL:

```env
VITE_API_BASE_URL=https://your-backend-name.onrender.com
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - Key: `VITE_API_BASE_URL`
   - Value: `https://your-backend-name.onrender.com`
6. Click "Deploy"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod

# When prompted:
# - Set root directory: ./
# - Build command: npm run build
# - Output directory: dist
```

## Step 3: Update Backend CORS

After deployment, update `backend/app/main.py` line with your Vercel URL:

```python
allowed_origins = [
    "http://localhost:5173",
    "https://your-app.vercel.app",  # Add your actual Vercel URL
]
```

Then redeploy backend on Render.

## Step 4: Test

Visit your Vercel URL and test the application!

## Local Development

```bash
# Start backend first
./start_backend.sh

# Then start frontend (in another terminal)
./start_frontend.sh
```

Frontend will automatically use `http://localhost:8001` for API calls.

## Troubleshooting

### CORS Errors

**Problem**: "Access to fetch blocked by CORS policy"

**Solution**: 
1. Check backend CORS settings in `backend/app/main.py`
2. Verify `VITE_API_BASE_URL` is set correctly in Vercel
3. Backend should allow your Vercel domain

### API Connection Failed

**Problem**: "Failed to fetch" or "Network error"

**Solution**:
1. Verify backend is running on Render
2. Check `VITE_API_BASE_URL` environment variable
3. Test backend directly: `https://your-backend.onrender.com/health`

### Build Fails on Vercel

**Problem**: Build errors during deployment

**Solution**:
1. Check `vercel.json` is in frontend folder
2. Verify `package.json` has correct build script
3. Check TypeScript errors locally first: `npm run build`

## Environment Variables Summary

### Development (.env.development)
```
VITE_API_BASE_URL=http://localhost:8001
```

### Production (Vercel Dashboard)
```
VITE_API_BASE_URL=https://your-backend.onrender.com
```

## Quick Commands

```bash
# Local development
./start_frontend.sh

# Build for production
cd frontend && npm run build

# Preview production build locally
cd frontend && npm run preview
```
