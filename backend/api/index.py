"""
Vercel serverless function entry point.
This file is required for Vercel Python deployments.
"""
import sys
from pathlib import Path

# Add parent directory to path so we can import app
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

from app.main import app

# Vercel expects a variable named 'app' or 'handler'
handler = app
