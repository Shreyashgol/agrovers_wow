# 🚀 Deploy Your App - Complete Guide

**Best Practice Deployment:**
- **Backend** → Render (supports ML libraries, full RAG)
- **Frontend** → Vercel (fast CDN, instant deploys)

This gives you the best of both platforms!

## Why This Setup?

**Backend on Render:**
- ✅ Full support for ML libraries (sentence-transformers, FAISS)
- ✅ RAG engine with knowledge base search
- ✅ 512 MB RAM (enough for dependencies)
- ✅ Free tier available

**Frontend on Vercel:**
- ✅ Lightning-fast global CDN
- ✅ Instant deployments
- ✅ Automatic HTTPS
- ✅ Perfect for static sites
- ✅ Free tier with great limits

## Prerequisites

1. **GitHub account** with your code pushed
2. **Render account** - Sign up at [render.com](https://render.com/register)
3. **Vercel account** - Sign up at [vercel.com](https://vercel.com/signup)
4. **API Keys** (both free):
   - **Groq**: [console.groq.com/keys](https://console.groq.com/keys)
   - **Gemini**: [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

---

## Step 1: Push to GitHub

```bash
cd agrovers_wow
git init
git add .
git commit -m "Ready for Render deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## Step 2: Deploy Backend to Render

### 2.1: Create Web Service

1. Go to [render.com/dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Render will auto-detect the `render.yaml` configuration

### 2.2: Configure Backend

If auto-detection doesn't work, manually configure:

- **Name**: `agrovers-backend`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Python 3`
- **Build Command**: 
  ```bash
  pip install -r requirements.txt && python preprocess_kb.py
  ```
- **Start Command**:
  ```bash
  gunicorn app.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT
  ```

### 2.3: Add Environment Variables

Click **"Environment"** and add:

```
GROQ_LLM_API_KEY=your_groq_api_key
GROQ_STT_API_KEY=your_groq_api_key
GROQ_REPORT_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
GEMINI_REPORT_API_KEY=your_gemini_api_key
LLM_PROVIDER=groq
PYTHON_VERSION=3.11.0
```

### 2.4: Deploy

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for build and deployment
3. **Copy your backend URL**: `https://agrovers-backend.onrender.com`

### 2.5: Test Backend

Visit: `https://your-backend-url.onrender.com/health`

Should return:
```json
{
  "status": "healthy",
  "rag_ready": true
}
```

---

## Step 3: Deploy Frontend to Vercel

### 3.1: Create New Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your GitHub repository

### 3.2: Configure Frontend

- **Project Name**: `agrovers-frontend`
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 3.3: Add Environment Variable

Click **"Environment Variables"** and add:

```
VITE_API_BASE_URL=https://agrovers-backend.onrender.com
```

⚠️ Use YOUR actual backend URL from Step 2!

### 3.4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. **Copy your frontend URL**: `https://agrovers-frontend.vercel.app`

### 3.5: Test Frontend

Visit your frontend URL - it should load but may show connection errors until CORS is configured.

---

## Step 4: Update Backend CORS

### 4.1: Add Frontend URL to Backend

1. Go to your **backend service** in Render dashboard
2. Click **"Environment"**
3. Add new variable:
   ```
   ALLOWED_ORIGINS=https://agrovers-frontend.vercel.app
   ```
   ⚠️ Use YOUR actual Vercel frontend URL from Step 3!

4. Click **"Save Changes"**
5. Backend will automatically redeploy (takes 2-3 minutes)

---

## Step 5: Test Your App 🎉

Visit your Vercel frontend URL and test:

- ✅ Page loads
- ✅ Start new session
- ✅ Enter data and get AI help (with RAG!)
- ✅ Submit form and generate report
- ✅ No CORS errors in browser console (F12)

**Your URLs:**
- Frontend (Vercel): `https://agrovers-frontend.vercel.app`
- Backend (Render): `https://agrovers-backend.onrender.com`

---

## Alternative: Deploy Frontend to Render

If you prefer to keep everything on Render:

1. Click **"New +"** → **"Static Site"**
2. Configure with same settings as Vercel
3. Use Render frontend URL in CORS settings

---

## Troubleshooting

### Backend Build Fails

**Error**: "Out of memory" or dependency installation fails

**Solution**:
- Reduce workers in start command to 1
- Check build logs for specific errors
- Verify all dependencies are in `requirements.txt`

### Frontend Can't Connect to Backend

**Error**: "Network Error" or CORS errors

**Solution**:
1. Verify `VITE_API_BASE_URL` is set correctly in Vercel
2. Check backend health endpoint works: `https://your-backend.onrender.com/health`
3. Ensure `ALLOWED_ORIGINS` in Render includes your Vercel URL
4. Wait for backend to finish redeploying after CORS update
5. Check Vercel deployment logs for build errors

### RAG Engine Not Ready

**Error**: `"rag_ready": false` in health check

**Solution**:
- Ensure knowledge base files are in `backend/app/data/kb_raw/`
- Check if `preprocess_kb.py` ran during build (check build logs)
- Verify FAISS index was created
- May need to manually trigger rebuild

### Service Sleeps After Inactivity

**Issue**: First request after 15 minutes is slow (backend only)

**This is normal on Render free tier:**
- Backend sleeps after 15 minutes of inactivity
- First request wakes it up (takes 30-60 seconds)
- Frontend on Vercel is always fast (no sleeping)
- Consider upgrading backend to paid plan for always-on

### Frontend Build Fails on Vercel

**Error**: Build errors or TypeScript errors

**Solution**:
1. Check Vercel build logs for specific errors
2. Verify `package.json` has correct build script
3. Test build locally: `cd frontend && npm run build`
4. Check environment variable is set correctly

---

## Environment Variables Reference

### Backend Variables

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `GROQ_LLM_API_KEY` | Yes | `gsk_xxxxx` | Groq API for LLM |
| `GROQ_STT_API_KEY` | Yes | `gsk_xxxxx` | Groq API for speech-to-text |
| `GROQ_REPORT_API_KEY` | Yes | `gsk_xxxxx` | Groq API for reports |
| `GEMINI_API_KEY` | Yes | `AIzaSyxxxxx` | Gemini API key |
| `GEMINI_REPORT_API_KEY` | Yes | `AIzaSyxxxxx` | Gemini for reports |
| `LLM_PROVIDER` | Yes | `groq` | LLM provider to use |
| `PYTHON_VERSION` | Yes | `3.11.0` | Python version |
| `ALLOWED_ORIGINS` | Yes | `https://your-frontend.onrender.com` | Frontend URL for CORS |

### Frontend Variables (Vercel)

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `VITE_API_BASE_URL` | Yes | `https://your-backend.onrender.com` | Backend API URL on Render |

---

## Platform Limits

### Render (Backend) - Free Tier
- ✅ 512 MB RAM
- ✅ Shared CPU
- ⚠️ Sleeps after 15 min inactivity
- ✅ 750 hours/month free
- ✅ Automatic HTTPS

### Vercel (Frontend) - Free Tier
- ✅ 100 GB bandwidth/month
- ✅ Unlimited deployments
- ✅ No sleeping (always fast!)
- ✅ Global CDN
- ✅ Automatic HTTPS

---

## Continuous Deployment

Both platforms automatically redeploy when you push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

- **Backend (Render)**: Automatically rebuilds and deploys
- **Frontend (Vercel)**: Automatically rebuilds and deploys

Both happen independently and in parallel! 🎉

---

## Custom Domains (Optional)

### Add Domain to Frontend (Vercel)
1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `app.yourdomain.com`)
3. Follow DNS configuration instructions

### Add Domain to Backend (Render)
1. Render Dashboard → Backend Service → Settings
2. Scroll to "Custom Domain"
3. Add your domain (e.g., `api.yourdomain.com`)
4. Update Vercel `VITE_API_BASE_URL` environment variable with new domain
5. Update Render `ALLOWED_ORIGINS` with new frontend domain

---

## Monitoring & Logs

### Backend Logs (Render)
1. Render Dashboard → Backend Service
2. Click "Logs" tab
3. View real-time logs

### Frontend Logs (Vercel)
1. Vercel Dashboard → Your Project
2. Deployments → Click deployment
3. View build and function logs

### Backend Metrics (Render)
1. Render Dashboard → Backend Service
2. Click "Metrics" tab
3. View CPU, memory, and request metrics

---

## Success Checklist

- [ ] Backend deployed and health check passes
- [ ] Backend shows `"rag_ready": true`
- [ ] Frontend deployed and loads correctly
- [ ] All environment variables set
- [ ] CORS configured with frontend URL
- [ ] Backend redeployed after CORS update
- [ ] Can create session
- [ ] Can get AI helper responses with RAG
- [ ] Can submit form and generate report
- [ ] No console errors in browser

---

## Upgrading Plans

### Backend (Render)

**Starter Plan ($7/month):**
- ✅ Always-on (no sleeping)
- ✅ Faster CPU
- ✅ More memory
- ✅ Better for production

### Frontend (Vercel)

**Pro Plan ($20/month):**
- ✅ More bandwidth
- ✅ Advanced analytics
- ✅ Team collaboration
- ✅ Password protection

**Note**: Frontend free tier is usually sufficient for most apps!

---

## Quick Reference

### Important URLs
- **Render Dashboard**: [dashboard.render.com](https://dashboard.render.com)
- **Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Groq API Keys**: [console.groq.com](https://console.groq.com)
- **Gemini API Keys**: [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

### Useful Commands

```bash
# View logs (if using Render CLI)
render logs -s your-service-name

# Trigger manual deploy
# (Go to dashboard → service → Manual Deploy)
```

---

## Need Help?

1. Check the troubleshooting section above
2. Review Render service logs
3. Check browser console for errors
4. Visit [Render Community](https://community.render.com)
5. Check [Render documentation](https://render.com/docs)

---

## 🎉 You're Done!

Your app is now live with the best of both platforms:

**Backend (Render):**
- ✅ Full RAG support with knowledge base
- ✅ All ML features enabled
- ✅ Automatic HTTPS
- ✅ Auto-deploys on push

**Frontend (Vercel):**
- ✅ Lightning-fast global CDN
- ✅ Instant page loads
- ✅ Automatic HTTPS
- ✅ Auto-deploys on push

Share your Vercel frontend URL and start helping farmers! 🌾
