"""
Chat endpoint — RAG-powered question answering.
"""

from __future__ import annotations

import logging

from fastapi import APIRouter, HTTPException, status

from app.models.schemas import ChatRequest, ChatResponse, ErrorResponse
from app.services.rag_service import generate_answer

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post(
    "",
    response_model=ChatResponse,
    summary="Ask a question (RAG)",
    description=(
        "Send a natural-language question. The system retrieves relevant "
        "context from the vector store, augments the prompt, and generates "
        "a grounded answer via the configured LLM."
    ),
    responses={
        500: {"model": ErrorResponse, "description": "LLM or retrieval failure"},
    },
)
async def chat(request: ChatRequest) -> ChatResponse:
    try:
        logger.info("Chat request: %s", request.question[:100])
        response = await generate_answer(
            question=request.question,
            top_k=request.top_k,
        )
        return response

    except Exception as exc:
        logger.exception("Chat endpoint error")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate response: {str(exc)}",
        ) from exc
