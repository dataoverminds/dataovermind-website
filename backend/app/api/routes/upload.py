"""
Document upload endpoint — ingest PDFs and text files into the vector store.
"""

from __future__ import annotations

import logging
from typing import List

from fastapi import APIRouter, File, HTTPException, UploadFile, status
from pypdf import PdfReader
import io

from app.core.config import get_settings
from app.models.schemas import ErrorResponse, UploadResponse
from app.services.embedding_service import embed_and_store

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/upload", tags=["Upload"])

ALLOWED_CONTENT_TYPES = {
    "application/pdf",
    "text/plain",
    "text/csv",
    "text/markdown",
    "application/octet-stream",  # fallback for some text files
}

ALLOWED_EXTENSIONS = {".pdf", ".txt", ".csv", ".md", ".text"}


def _validate_file(file: UploadFile) -> None:
    """Raise HTTPException if the file type or size is unsupported."""
    settings = get_settings()

    # Check extension
    filename = file.filename or "unknown"
    ext = "." + filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Unsupported file type '{ext}'. Allowed: {', '.join(sorted(ALLOWED_EXTENSIONS))}",
        )


async def _extract_text(file: UploadFile) -> str:
    """Read the uploaded file and return its text content."""
    filename = file.filename or "unknown"
    raw = await file.read()

    # Check size after reading
    settings = get_settings()
    if len(raw) > settings.max_upload_bytes:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File exceeds {settings.MAX_UPLOAD_SIZE_MB}MB limit",
        )

    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""

    if ext == "pdf":
        try:
            reader = PdfReader(io.BytesIO(raw))
            pages: List[str] = []
            for page in reader.pages:
                text = page.extract_text()
                if text:
                    pages.append(text)
            text = "\n\n".join(pages)
            if not text.strip():
                raise HTTPException(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    detail="PDF contains no extractable text (may be image-based)",
                )
            return text
        except HTTPException:
            raise
        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Failed to parse PDF: {str(exc)}",
            ) from exc
    else:
        # Plain text, CSV, Markdown
        try:
            return raw.decode("utf-8")
        except UnicodeDecodeError:
            return raw.decode("latin-1")


@router.post(
    "",
    response_model=UploadResponse,
    summary="Upload a document",
    description=(
        "Upload a PDF, TXT, CSV, or Markdown file. The system extracts text, "
        "chunks it, generates embeddings, and stores the vectors in ChromaDB "
        "for later RAG retrieval."
    ),
    responses={
        413: {"model": ErrorResponse, "description": "File too large"},
        415: {"model": ErrorResponse, "description": "Unsupported file type"},
        422: {"model": ErrorResponse, "description": "Cannot extract text from file"},
    },
)
async def upload_document(
    file: UploadFile = File(..., description="PDF, TXT, CSV, or Markdown file"),
) -> UploadResponse:
    filename = file.filename or "unknown"
    logger.info("Upload started: %s (content_type=%s)", filename, file.content_type)

    _validate_file(file)

    try:
        text = await _extract_text(file)
        chunks_created, total_chars = await embed_and_store(text=text, filename=filename)

        logger.info(
            "Upload complete: %s — %d chunks, %d chars",
            filename, chunks_created, total_chars,
        )
        return UploadResponse(
            filename=filename,
            chunks_created=chunks_created,
            total_characters=total_chars,
        )

    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("Upload processing failed for %s", filename)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process document: {str(exc)}",
        ) from exc
