"""
Embedding service — handles text → vector conversion and ChromaDB storage.

Responsible for:
  • Chunking raw text into overlapping segments
  • Generating embeddings via OpenAI
  • Upserting vectors into ChromaDB
"""

from __future__ import annotations

import hashlib
import logging
from typing import List, Tuple
from uuid import uuid4

from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.core.config import get_settings
from app.db.vector_store import get_collection

logger = logging.getLogger(__name__)


def _get_embeddings_model() -> OpenAIEmbeddings:
    """Return a configured OpenAI embeddings instance."""
    settings = get_settings()
    return OpenAIEmbeddings(
        model=settings.EMBEDDING_MODEL,
        openai_api_key=settings.OPENAI_API_KEY,
    )


def _build_text_splitter() -> RecursiveCharacterTextSplitter:
    """Create a text splitter with settings from config."""
    settings = get_settings()
    return RecursiveCharacterTextSplitter(
        chunk_size=settings.CHUNK_SIZE,
        chunk_overlap=settings.CHUNK_OVERLAP,
        length_function=len,
        separators=["\n\n", "\n", ". ", " ", ""],
    )


def chunk_text(text: str) -> List[str]:
    """Split a body of text into overlapping chunks."""
    splitter = _build_text_splitter()
    chunks = splitter.split_text(text)
    logger.info("Split text into %d chunks", len(chunks))
    return chunks


def _content_hash(text: str) -> str:
    """Deterministic short hash for deduplication."""
    return hashlib.sha256(text.encode()).hexdigest()[:16]


async def embed_and_store(
    text: str,
    filename: str,
) -> Tuple[int, int]:
    """
    Chunk text, generate embeddings, and upsert into ChromaDB.

    Returns
    -------
    (chunks_created, total_characters)
    """
    chunks = chunk_text(text)
    if not chunks:
        return 0, 0

    embeddings_model = _get_embeddings_model()

    # Generate embeddings for all chunks in one batch call
    logger.info("Generating embeddings for %d chunks from '%s'", len(chunks), filename)
    vectors = embeddings_model.embed_documents(chunks)

    # Prepare data for ChromaDB
    ids: List[str] = []
    metadatas: List[dict] = []

    for idx, chunk in enumerate(chunks):
        chunk_id = f"{_content_hash(chunk)}_{uuid4().hex[:8]}"
        ids.append(chunk_id)
        metadatas.append({
            "filename": filename,
            "chunk_index": idx,
            "total_chunks": len(chunks),
            "char_count": len(chunk),
        })

    # Upsert into ChromaDB
    collection = get_collection()
    collection.upsert(
        ids=ids,
        embeddings=vectors,
        documents=chunks,
        metadatas=metadatas,
    )

    total_chars = sum(len(c) for c in chunks)
    logger.info(
        "Stored %d chunks (%d chars) from '%s'",
        len(chunks), total_chars, filename,
    )
    return len(chunks), total_chars


async def search_similar(
    query: str,
    top_k: int = 5,
) -> List[dict]:
    """
    Embed a query and return the top-k most relevant document chunks.

    Returns a list of dicts with keys: content, metadata, distance.
    """
    embeddings_model = _get_embeddings_model()
    query_vector = embeddings_model.embed_query(query)

    collection = get_collection()
    if collection.count() == 0:
        logger.warning("Vector store is empty — no results to return")
        return []

    results = collection.query(
        query_embeddings=[query_vector],
        n_results=min(top_k, collection.count()),
        include=["documents", "metadatas", "distances"],
    )

    documents: List[dict] = []
    for doc, meta, dist in zip(
        results["documents"][0],
        results["metadatas"][0],
        results["distances"][0],
    ):
        documents.append({
            "content": doc,
            "metadata": meta,
            "distance": dist,
        })

    logger.info("Retrieved %d chunks for query (top_k=%d)", len(documents), top_k)
    return documents
