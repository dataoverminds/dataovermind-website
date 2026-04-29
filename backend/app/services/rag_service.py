"""
RAG (Retrieval-Augmented Generation) service.

Orchestrates the full RAG pipeline:
  1. Accept a user question
  2. Retrieve relevant context from the vector store
  3. Build a grounded prompt with retrieved context
  4. Call the LLM for a final answer
  5. Return the answer with source attribution
"""

from __future__ import annotations

import logging
import time
from typing import List

from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage

from app.core.config import get_settings
from app.models.schemas import ChatResponse, SourceDocument
from app.services.embedding_service import search_similar

logger = logging.getLogger(__name__)

# ── System prompt ────────────────────────────────────────────────────
SYSTEM_PROMPT = """You are DataOverMind AI — an expert AI automation assistant built by DataOverMind.

Your role:
• Answer questions accurately using ONLY the provided context documents.
• If the context doesn't contain enough information, say so honestly.
• Cite which parts of the context support your answer.
• Be concise, professional, and technically precise.
• Format responses with clear structure using bullet points or numbered lists when helpful.

Rules:
• Never fabricate information not present in the context.
• If no relevant context is provided, give a helpful general response and note that no specific documents were found.
• Always maintain a professional, knowledgeable tone befitting an AI automation agency.
"""


def _build_context_block(documents: List[dict]) -> str:
    """Format retrieved documents into a context block for the prompt."""
    if not documents:
        return "No relevant documents found in the knowledge base."

    parts: List[str] = []
    for i, doc in enumerate(documents, 1):
        source = doc["metadata"].get("filename", "unknown")
        parts.append(
            f"[Source {i} — {source}]\n{doc['content']}"
        )
    return "\n\n---\n\n".join(parts)


def _build_user_prompt(question: str, context: str) -> str:
    """Construct the final user message with context + question."""
    return (
        f"## Retrieved Context\n\n{context}\n\n"
        f"---\n\n"
        f"## User Question\n\n{question}\n\n"
        f"Please answer the question based on the context above."
    )


async def generate_answer(
    question: str,
    top_k: int = 5,
) -> ChatResponse:
    """
    Full RAG pipeline: retrieve → augment → generate.

    Parameters
    ----------
    question : str
        The user's natural-language question.
    top_k : int
        Number of context chunks to retrieve.

    Returns
    -------
    ChatResponse with answer, sources, model info, and latency.
    """
    settings = get_settings()
    start = time.perf_counter()

    # ── 1. Retrieve ──────────────────────────────────────────────────
    logger.info("RAG pipeline started — retrieving context for: %s", question[:80])
    retrieved_docs = await search_similar(query=question, top_k=top_k)

    # ── 2. Augment ───────────────────────────────────────────────────
    context_block = _build_context_block(retrieved_docs)
    user_prompt = _build_user_prompt(question, context_block)

    # ── 3. Generate ──────────────────────────────────────────────────
    llm = ChatOpenAI(
        model=settings.LLM_MODEL,
        openai_api_key=settings.OPENAI_API_KEY,
        temperature=0.3,
        max_tokens=2048,
    )

    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        HumanMessage(content=user_prompt),
    ]

    logger.info("Calling LLM (%s) with %d context chunks", settings.LLM_MODEL, len(retrieved_docs))
    response = await llm.ainvoke(messages)

    elapsed_ms = round((time.perf_counter() - start) * 1000, 1)

    # ── 4. Format sources ────────────────────────────────────────────
    sources = [
        SourceDocument(
            content=doc["content"][:300] + ("..." if len(doc["content"]) > 300 else ""),
            metadata=doc["metadata"],
            relevance_score=round(1 - doc.get("distance", 0), 4) if doc.get("distance") is not None else None,
        )
        for doc in retrieved_docs
    ]

    logger.info("RAG pipeline completed in %.1fms", elapsed_ms)

    return ChatResponse(
        answer=response.content,
        sources=sources,
        model=settings.LLM_MODEL,
        latency_ms=elapsed_ms,
    )
