# Import create_engine to create a connection with PostgreSQL
from sqlalchemy import create_engine

# Import sessionmaker to create database sessions
from sqlalchemy.orm import sessionmaker

# Import DeclarativeBase to create a base class for all models
from sqlalchemy.orm import DeclarativeBase

# Import settings from config.py
from app.core.config import settings


# ----------------------------------------------------
# Create the database engine
# This engine is responsible for connecting FastAPI
# with PostgreSQL.
# ----------------------------------------------------
engine = create_engine(
    settings.DATABASE_URL
)


# ----------------------------------------------------
# Create a Session Factory
# Every request gets its own database session.
# ----------------------------------------------------
SessionLocal = sessionmaker(
    autocommit=False,   # Changes are NOT saved automatically
    autoflush=False,    # SQLAlchemy won't send queries automatically
    bind=engine         # Use the engine created above
)


# ----------------------------------------------------
# Base class for all database models
# Every model (User, Book, BorrowRecord)
# will inherit from this class.
# ----------------------------------------------------
class Base(DeclarativeBase):
    pass


# ----------------------------------------------------
# Dependency to get a database session
# FastAPI will use this function whenever
# an API needs database access.
# ----------------------------------------------------
def get_db():

    # Create a new database session
    db = SessionLocal()

    try:
        # Give the session to the API
        yield db

    finally:
        # Close the session after the request finishes
        db.close()