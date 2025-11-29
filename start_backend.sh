#!/bin/bash
# Render deployment script

# Install dependencies
pip install --upgrade pip
pip install -r backend/requirements.txt

# Preprocess knowledge base if needed
cd backend
if [ ! -d "app/data/embeddings" ]; then
    echo "Preprocessing knowledge base..."
    python preprocess_kb.py
fi

# Start server with gunicorn for production
gunicorn app.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:${PORT:-8000}
