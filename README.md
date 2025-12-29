# Argovers Soil Assistant

A bilingual (Hindi/English) soil testing assistant for farmers that guides them through collecting 8 core soil parameters with RAG-powered help.

## Features

- 🌾 **Multi-step Wizard**: Guided flow through 8 soil parameters
- 🌍 **Bilingual Support**: Hindi and English interface
- 🤖 **RAG-Powered Help**: Context-aware explanations using knowledge base
- 🧠 **LLM Integration**: Gemini API for generating helper responses
- 📊 **n8n Integration**: Automatic data submission to n8n webhook
- 🎨 **Clean UI**: Government/Agri-style wizard interface

## Architecture

```
┌─────────────────┐
│  React Frontend │
│  (TypeScript)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  FastAPI        │
│  Backend        │
│  ┌───────────┐  │
│  │ RAG Engine│  │ ◄── FAISS + sentence-transformers
│  │ LLM Adapter│ │ ◄── Gemini API
│  │ Validators │ │
│  └───────────┘  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│      n8n        │
│   (Webhook)     │
└─────────────────┘
```

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- Gemini API key
- Hugging Face token (for embeddings)
- n8n webhook URL (optional)

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment template
cp .env.example .env
# Edit .env with your API keys

# Add knowledge base files to app/data/kb_raw/
# (Copy your .md files here)

# Preprocess knowledge base
python preprocess_kb.py

# Run server
uvicorn app.main:app --reload
```

Backend runs on `http://localhost:8000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend runs on `http://localhost:5173`

## Project Structure

```
agri_proj/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entrypoint
│   │   ├── config.py            # Configuration
│   │   ├── models.py            # Pydantic models
│   │   ├── routes/              # API endpoints
│   │   ├── services/            # Business logic
│   │   └── data/                # Knowledge base
│   ├── preprocess_kb.py         # KB preprocessing script
│   ├── requirements.txt
│   └── README.md
│
└── frontend/
    ├── src/
    │   ├── App.tsx              # Root component
    │   ├── api/                 # API client
    │   ├── components/          # React components
    │   ├── pages/               # Page components
    │   └── config/              # Labels and config
    ├── package.json
    └── README.md
```

## Configuration

### Environment Variables

See `backend/.env.example` for required variables:

- `GEMINI_API_KEY` - Gemini API key
- `HF_TOKEN` - Hugging Face token
- `N8N_WEBHOOK_URL` - n8n webhook URL

### Parameter List

To modify parameters, edit:
- Backend: `backend/app/services/orchestrator.py` → `PARAMETER_ORDER`
- Frontend: `frontend/src/config/labels.ts` → `LABELS` and `PARAMETER_ORDER`

### Questions and Labels

- Backend questions: `backend/app/services/orchestrator.py` → `PARAMETER_QUESTIONS`
- Frontend labels: `frontend/src/config/labels.ts` → `LABELS`

## Knowledge Base

### Adding Knowledge Base Files

1. Place markdown files in `backend/app/data/kb_raw/`
2. Run `python backend/preprocess_kb.py`
3. FAISS index will be created in `backend/app/data/embeddings/`

### File Naming Convention

Files should follow pattern: `NN-description.md`

Examples:
- `01-color-detection.md`
- `02-moisture-testing.md`
- `03-smell-testing.md`

The preprocessing script extracts metadata from filenames.

## API Documentation

Once backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Development

### Backend

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm run dev
```

## Deployment

### 🚀 Deploy to Vercel (Recommended - 10 minutes)

Complete guide: **[VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)**

Quick steps:
1. Get API keys (Groq + Gemini)
2. Deploy backend to Vercel
3. Deploy frontend to Vercel
4. Update CORS and test

Or use automated script:
```bash
./deploy-to-vercel.sh
```

### 🐳 Deploy to Render (Alternative)

See `DEPLOY.md` for Render deployment instructions.

## Troubleshooting

### RAG Engine Not Ready

Ensure knowledge base is preprocessed:
```bash
cd backend
python preprocess_kb.py
```

### LLM Errors

Check `.env` file has correct `GEMINI_API_KEY`.

### CORS Errors

Update `ALLOWED_ORIGINS` in `backend/app/config.py` or `.env`.

## Future Enhancements

- [ ] Local LLM support (Llama3/Phi3)
- [ ] Redis/PostgreSQL session storage
- [ ] Fine-tuning data collection
- [ ] Docker containerization
- [ ] Unit and integration tests
- [ ] Analytics dashboard

## License

[Your License Here]

## Support

For issues or questions, please [open an issue](link-to-repo/issues).

