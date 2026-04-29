"""
Health check endpoint.
"""

from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter

from app.core.config import get_settings
from app.db.vector_store import get_collection_stats
from app.models.schemas import HealthResponse

router = APIRouter(tags=["Health"])


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="System health check",
    description="Returns the current status of the API, including version and environment info.",
)
async def health_check() -> HealthResponse:
    settings = get_settings()
    return HealthResponse(
        status="ok",
        version=settings.APP_VERSION,
        environment=settings.APP_ENV,
        timestamp=datetime.utcnow(),
    )


@router.get(
    "/health/vector-store",
    summary="Vector store status",
    description="Returns statistics about the ChromaDB vector store.",
)
async def vector_store_health() -> dict:
    stats = get_collection_stats()
    return {
        "status": "ok",
        **stats,
    }
