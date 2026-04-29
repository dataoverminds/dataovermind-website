"""
DataOverMind API — FastAPI application entry point.

Run with:
    uvicorn app.main:app --reload --port 8000
"""

from __future__ import annotations

import logging
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import get_settings
from app.db.vector_store import get_collection

# ── Logging ──────────────────────────────────────────────────────────
settings = get_settings()

logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO),
    format="%(asctime)s │ %(levelname)-8s │ %(name)s │ %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger(__name__)


# ── Lifespan ─────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """
    Startup / shutdown lifecycle.
    Initialise the vector store on startup, cleanup on shutdown.
    """
    logger.info("Starting %s v%s [%s]", settings.APP_NAME, settings.APP_VERSION, settings.APP_ENV)

    # Eagerly initialise the vector store so failures surface immediately
    try:
        collection = get_collection()
        logger.info("Vector store ready — %d documents indexed", collection.count())
    except Exception:
        logger.warning("Vector store initialisation deferred — will retry on first request")

    # Check OpenAI key
    if not settings.OPENAI_API_KEY or settings.OPENAI_API_KEY.startswith("your-"):
        logger.warning(
            "⚠ OPENAI_API_KEY is not configured. "
            "Chat and upload endpoints will fail until a valid key is set in .env"
        )

    yield  # ← app runs here

    logger.info("Shutting down %s", settings.APP_NAME)


# ── Application ──────────────────────────────────────────────────────
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "AI automation backend for DataOverMind. "
        "Provides RAG-powered chat, document ingestion, and intelligent "
        "retrieval over your business knowledge base."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
)

# ── Middleware ────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routes ───────────────────────────────────────────────────────────
app.include_router(api_router)


# Root redirect to docs
@app.get("/", include_in_schema=False)
async def root():
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "health": "/api/v1/health",
    }
