# DataOverMind Backend

Production-ready FastAPI backend for the DataOverMind AI automation platform.

## Quick Start

```bash
# 1. Create virtual environment
python -m venv venv
venv\Scripts\activate    # Windows
# source venv/bin/activate  # macOS/Linux

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure environment
# Edit .env with your OpenAI API key

# 4. Run the server
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

| Method | Endpoint                       | Description                       |
|--------|--------------------------------|-----------------------------------|
| GET    | `/api/v1/health`               | System health check               |
| GET    | `/api/v1/health/vector-store`  | Vector store status               |
| POST   | `/api/v1/chat`                 | RAG-powered Q&A                   |
| POST   | `/api/v1/upload`               | Upload & index documents          |

## Architecture

```
backend/
├── app/
│   ├── main.py              # FastAPI entry point
│   ├── api/
│   │   ├── router.py        # Central router (/api/v1)
│   │   └── routes/
│   │       ├── health.py    # Health check endpoints
│   │       ├── chat.py      # RAG chat endpoint
│   │       └── upload.py    # Document upload endpoint
│   ├── core/
│   │   ├── config.py        # Pydantic settings
│   │   └── security.py      # API key validation
│   ├── services/
│   │   ├── rag_service.py   # RAG pipeline orchestration
│   │   └── embedding_service.py  # Embeddings + vector ops
│   ├── models/
│   │   └── schemas.py       # Pydantic request/response models
│   └── db/
│       └── vector_store.py  # ChromaDB lifecycle management
├── requirements.txt
├── .env
└── .gitignore
```

## Interactive Docs

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
