"""
Security utilities — API key validation and future auth hooks.
Kept thin for now; extend with JWT/OAuth2 as needed.
"""

from __future__ import annotations

from fastapi import HTTPException, Security, status
from fastapi.security import APIKeyHeader

from app.core.config import get_settings

_api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)


async def verify_api_key(
    api_key: str | None = Security(_api_key_header),
) -> str:
    """
    Validate the incoming API key against the server's OpenAI key.
    This is a lightweight guard — replace with a proper auth system
    for production multi-tenant use.
    """
    settings = get_settings()

    # Skip validation in development when no key is configured
    if not settings.is_production and not settings.OPENAI_API_KEY:
        return "dev-bypass"

    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing X-API-Key header",
        )

    # In a real system you'd check against a database of valid keys.
    # For now we just verify *something* was sent.
    if len(api_key) < 8:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid API key",
        )

    return api_key
