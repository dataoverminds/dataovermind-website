"""
Pydantic request / response schemas for every API endpoint.
Kept in one file while the surface area is small — split later as it grows.
"""

from __future__ import annotations

from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


# ═══════════════════════════════════════════════════════════════════
# Health
# ═══════════════════════════════════════════════════════════════════

class HealthResponse(BaseModel):
    status: str = Field(default="ok", examples=["ok"])
    version: str = Field(examples=["0.1.0"])
    environment: str = Field(examples=["development"])
    timestamp: datetime = Field(default_factory=datetime.utcnow)


# ═══════════════════════════════════════════════════════════════════
# Chat / RAG
# ═══════════════════════════════════════════════════════════════════

class ChatRequest(BaseModel):
    question: str = Field(
        ...,
        min_length=1,
        max_length=4000,
        examples=["How does our AI automation platform work?"],
    )
    top_k: int = Field(default=5, ge=1, le=20, description="Number of context chunks to retrieve")


class SourceDocument(BaseModel):
    content: str
    metadata: Dict[str, Any] = Field(default_factory=dict)
    relevance_score: Optional[float] = None


class ChatResponse(BaseModel):
    answer: str
    sources: List[SourceDocument] = Field(default_factory=list)
    model: str = Field(examples=["gpt-4-turbo"])
    latency_ms: float = Field(description="End-to-end response time in milliseconds")


# ═══════════════════════════════════════════════════════════════════
# Document Upload
# ═══════════════════════════════════════════════════════════════════

class UploadResponse(BaseModel):
    filename: str
    chunks_created: int
    total_characters: int
    message: str = Field(default="Document processed and indexed successfully")


class DocumentInfo(BaseModel):
    id: str
    filename: str
    chunk_count: int
    indexed_at: datetime


class CollectionStats(BaseModel):
    total_documents: int
    total_chunks: int
    vector_db_path: str


# ═══════════════════════════════════════════════════════════════════
# Errors
# ═══════════════════════════════════════════════════════════════════

class ErrorResponse(BaseModel):
    detail: str
    error_code: Optional[str] = None
