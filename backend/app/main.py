# Import FastAPI
from fastapi import FastAPI

# Import database
from app.core.database import Base, engine

# Import models
from app.models.user import User
from app.models.book import Book
from app.models.borrow import Borrow

# Import admin router
from app.api.admin import router as admin_router

# Import router
from app.api.auth import router as auth_router

# Import books router
from app.api.books import router as books_router

# Import borrow router
from app.api.borrow import router as borrow_router

# Import user dashboard router
from app.api.user_dashboard import router as user_dashboard_router

# Import CORS
from fastapi.middleware.cors import CORSMiddleware
import os

# Create tables
Base.metadata.create_all(bind=engine)


# Create app
app = FastAPI(
    title="Library Management API",
    version="1.0.0"
)

# Configure CORS origins dynamically
cors_origins_raw = os.getenv("CORS_ORIGINS", "")
if cors_origins_raw:
    origins = [origin.strip() for origin in cors_origins_raw.split(",") if origin.strip()]
else:
    origins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175"
    ]

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Include authentication routes
app.include_router(auth_router)

# Register books router
app.include_router(books_router)

# Register borrow router
app.include_router(borrow_router)

# Register admin router
app.include_router(admin_router)

# Register user dashboard router
app.include_router(user_dashboard_router)


# Home API
@app.get("/")
def home():

    return {
        "message": "Library API Running 🚀"
    }