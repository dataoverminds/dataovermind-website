"""
Central API router — mounts all route modules under /api/v1.
"""

from __future__ import annotations

from fastapi import APIRouter

from app.api.routes import chat, health, upload

api_router = APIRouter(prefix="/api/v1")

# Mount individual route modules
api_router.include_router(health.router)
api_router.include_router(chat.router)
api_router.include_router(upload.router)
