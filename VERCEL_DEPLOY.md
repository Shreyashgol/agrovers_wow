# 🚀 Deploy to Vercel - Complete Guide

Deploy both backend (Python FastAPI) and frontend (React + Vite) to Vercel in 10 minutes.

> **⚠️ Important Note**: Due to Vercel's memory limitations, the RAG engine (knowledge base search) will be disabled. The app will still work with LLM-based responses. For full RAG support, use Render deployment (see `DEPLOY.md`).

## Prerequisites

1. **GitHub account** with your code pushed
2. **Vercel account** - Sign up at [vercel.com](https://vercel.com/signup)
3. **API Keys** (both free):
   - **Groq**: [console.groq.com/keys](https://console.groq.com/keys)
   - **Gemini**: [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

### ⚠️ Important: Vercel Memory Limitations

Vercel's free tier has memory constraints that prevent using heavy ML libraries like `sentence-transformers` and `faiss-cpu`. 

**Two deployment options:**

**Option A: Vercel (Lightweight - No RAG)**
- ✅ Fast deployment
- ✅ Free tier friendly
- ❌ No knowledge base search (RAG disabled)
- ✅ LLM still provides helpful responses

**Option B: Render (Full Features)**
- ✅ Full RAG with knowledge base
- ✅ All features enabled
- ⏱️ Slower cold starts
- See `DEPLOY.md` for Render deployment

**For Vercel deployment, continue below:**

---

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to GitHub

**First, prepare backend for Vercel:**

```bash
cd agrovers_wow/backend
./prepare-vercel.sh
cd ..
```

This switches to lightweight dependencies (removes heavy ML libraries).

**Then push to GitHub:**

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Deploy Backend

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository" and select your repo
3. Configure project:
   - **Project Name**: `agrovers-backend`
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)

4. Add **Environment Variables**:
   ```
   GROQ_LLM_API_KEY=your_groq_api_key
   GROQ_STT_API_KEY=your_groq_api_key
   GROQ_REPORT_API_KEY=your_groq_api_key
   GEMINI_API_KEY=your_gemini_api_key
   GEMINI_REPORT_API_KEY=your_gemini_api_key
   LLM_PROVIDER=groq
   ```

5. Click **Deploy** and wait 2-3 minutes

6. **Copy your backend URL**: `https://agrovers-backend-xxx.vercel.app`

7. **Test backend**: Visit `https://your-backend-url.vercel.app/health`
   - Should return: `{"status": "healthy", "rag_ready": true}`

### Step 3: Deploy Frontend

1. Go to [vercel.com/new](https://vercel.com/new) again
2. Import the **same repository**
3. Configure project:
   - **Project Name**: `agrovers-frontend`
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. Add **Environment Variable**:
   ```
   VITE_API_BASE_URL=https://agrovers-backend-xxx.vercel.app
   ```
   ⚠️ Use YOUR actual backend URL from Step 2!

5. Click **Deploy** and wait 2-3 minutes

6. **Copy your frontend URL**: `https://agrovers-frontend-xxx.vercel.app`

### Step 4: Update Backend CORS

1. Go to your **backend project** in Vercel dashboard
2. Navigate to: **Settings → Environment Variables**
3. Add new variable:
   ```
   ALLOWED_ORIGINS=https://agrovers-frontend-xxx.vercel.app
   ```
   ⚠️ Use YOUR actual frontend URL from Step 3!

4. Go to **Deployments** tab → Click "..." on latest deployment → **Redeploy**

### Step 5: Test Your App 🎉

Visit your frontend URL and test:
- ✅ Page loads
- ✅ Start new session
- ✅ Enter data and get AI help
- ✅ Submit form and generate report
- ✅ No CORS errors in browser console (F12)

---

## Method 2: Deploy via CLI

### Install Vercel CLI

```bash
npm install -g vercel
vercel login
```

### Deploy Backend

```bash
cd backend
vercel --prod
```

When prompted:
- Set up and deploy? **Y**
- Link to existing project? **N**
- Project name? **agrovers-backend**
- Directory? **.** (current)

Add environment variables:
```bash
vercel env add GROQ_LLM_API_KEY production
vercel env add GEMINI_API_KEY production
vercel env add LLM_PROVIDER production
# Add other env vars similarly
```

### Deploy Frontend

```bash
cd ../frontend
vercel --prod
```

When prompted:
- Set up and deploy? **Y**
- Link to existing project? **N**
- Project name? **agrovers-frontend**
- Directory? **.** (current)

Add environment variable:
```bash
vercel env add VITE_API_BASE_URL production
# Enter your backend URL when prompted
```

### Update Backend CORS

```bash
cd ../backend
vercel env add ALLOWED_ORIGINS production
# Enter your frontend URL when prompted
vercel --prod  # Redeploy
```

---

## Method 3: Automated Script

```bash
./deploy-to-vercel.sh
```

Follow the interactive prompts to deploy both backend and frontend.

---

## Troubleshooting

### Backend Build Fails

**Error**: "Out of Memory" (OOM) during build

**Solution**:
1. Run `./backend/prepare-vercel.sh` to use lightweight dependencies
2. Commit and push changes
3. Redeploy on Vercel

**Error**: "Function Runtimes must have a valid version" or "Module not found"

**Solution**:
- Ensure `vercel.json` uses `@vercel/python` (not a version number)
- Verify `api/index.py` exists and exports the `app`
- Check `requirements.txt` exists in backend directory
- Review build logs for specific errors
- Make sure Python 3.9+ is being used (Vercel auto-detects)

### Frontend Can't Connect to Backend

**Error**: "Network Error" or CORS errors

**Solution**:
1. Verify `VITE_API_BASE_URL` is set correctly in Vercel
2. Check backend health endpoint: `/health`
3. Ensure `ALLOWED_ORIGINS` includes your frontend URL
4. Redeploy backend after updating CORS

### RAG Engine Not Ready

**Error**: `"rag_ready": false` in health check

**This is expected on Vercel!** The RAG engine (knowledge base search) is disabled due to memory constraints.

**What still works:**
- ✅ LLM-based helper responses
- ✅ Form submission
- ✅ Report generation
- ✅ All core functionality

**For full RAG support**, deploy to Render instead (see `DEPLOY.md`).

### Function Timeout

**Error**: "Function execution timed out"

**Solution**:
- Vercel free tier has 10-second timeout
- Optimize RAG queries
- Consider upgrading to Pro plan (60-second timeout)

### Environment Variables Not Working

**Solution**:
1. Check variable names are correct (case-sensitive)
2. Verify values don't have extra spaces
3. Redeploy after adding/updating variables
4. Check Vercel dashboard shows the variables

---

## Project Structure

```
agrovers_wow/
├── backend/
│   ├── api/
│   │   └── index.py              # Vercel serverless entry point
│   ├── app/
│   │   ├── main.py               # FastAPI application
│   │   ├── config.py
│   │   ├── models.py
│   │   ├── routes/
│   │   ├── services/
│   │   └── data/
│   │       └── kb_raw/           # Add knowledge base files here
│   ├── vercel.json               # Vercel configuration
│   ├── requirements.txt          # Python dependencies
│   └── .vercelignore             # Files to exclude
│
└── frontend/
    ├── src/
    ├── vercel.json               # Vercel configuration
    ├── .env.development          # Local development
    ├── .env.production           # Production template
    ├── package.json
    └── .vercelignore             # Files to exclude
```

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
| `ALLOWED_ORIGINS` | Yes | `https://your-frontend.vercel.app` | Frontend URL for CORS |

### Frontend Variables

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `VITE_API_BASE_URL` | Yes | `https://your-backend.vercel.app` | Backend API URL |

---

## Vercel Free Tier Limits

- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ 100 GB-hours serverless execution/month
- ⚠️ 10-second function timeout (60s on Pro)
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments for branches

---

## Continuous Deployment

Vercel automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Both projects will automatically rebuild and deploy! 🎉

---

## Custom Domains (Optional)

### Add Domain to Frontend
1. Vercel Dashboard → Frontend Project → Settings → Domains
2. Add your domain (e.g., `app.yourdomain.com`)
3. Follow DNS configuration instructions

### Add Domain to Backend
1. Vercel Dashboard → Backend Project → Settings → Domains
2. Add your domain (e.g., `api.yourdomain.com`)
3. Update frontend `VITE_API_BASE_URL` to use new domain

---

## Monitoring & Logs

### View Function Logs
1. Vercel Dashboard → Your Project
2. Deployments → Click on deployment
3. View Function Logs

### Enable Analytics
1. Vercel Dashboard → Your Project
2. Analytics tab
3. Enable (free on all plans)

---

## Success Checklist

- [ ] Backend deployed and health check passes
- [ ] Frontend deployed and loads correctly
- [ ] All environment variables set
- [ ] CORS configured with frontend URL
- [ ] Backend redeployed after CORS update
- [ ] Can create session
- [ ] Can get AI helper responses
- [ ] Can submit form and generate report
- [ ] No console errors in browser
- [ ] Mobile responsive

---

## Quick Reference

### Important URLs
- **Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **New Project**: [vercel.com/new](https://vercel.com/new)
- **Groq API Keys**: [console.groq.com](https://console.groq.com)
- **Gemini API Keys**: [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)

### Useful Commands
```bash
# Deploy to production
vercel --prod

# Add environment variable
vercel env add VARIABLE_NAME production

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm deployment-url
```

---

## Need Help?

1. Check the troubleshooting section above
2. Review Vercel function logs
3. Check browser console for errors
4. Visit [vercel.com/support](https://vercel.com/support)
5. Check [Vercel documentation](https://vercel.com/docs)

---

## 🎉 You're Done!

Your app is now live with:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on push
- ✅ Preview deployments for branches
- ✅ Built-in analytics

Share your frontend URL and start helping farmers! 🌾
