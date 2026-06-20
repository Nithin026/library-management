# Import APIRouter
from fastapi import APIRouter, Depends, HTTPException, status

# Import database session
from sqlalchemy.orm import Session

# Import database dependency
from app.core.database import get_db


# Import admin dependency
from app.core.security import get_current_admin

# Import User model
from app.models.user import User

# Import schemas
from app.schemas.book import BookCreate, BookResponse

# Import service
from app.services.book_service import (
    create_book,
    get_all_books,
    get_book_by_id,
    update_book,
    delete_book
)


# Create router
router = APIRouter(
    prefix="/books",
    tags=["Books"]
)


# Create book API
@router.post(
    "",
    response_model=BookResponse,
    status_code=status.HTTP_201_CREATED
)
def add_book(

    # Book data
    book: BookCreate,

    # Database session
    db: Session = Depends(get_db),

     # Admin user
    current_user: User = Depends(get_current_admin)

):

    # Create book
    new_book = create_book(book, db)

    # ISBN already exists
    if new_book is None:
        raise HTTPException(
            status_code=400,
            detail="Book already exists."
        )

    # Return book
    return new_book

# Get all books API
@router.get(
    "",
    response_model=list[BookResponse]
)
def get_books(

    # Database session
    db: Session = Depends(get_db)

):

    # Get books
    books = get_all_books(db)

    # Return books
    return books

# Get book by ID
@router.get(
    "/{book_id}",
    response_model=BookResponse
)
def get_book(

    # Book ID from URL
    book_id: int,

    # Database session
    db: Session = Depends(get_db)

):

    # Find book
    book = get_book_by_id(book_id, db)

    # Book not found
    if book is None:
        raise HTTPException(
            status_code=404,
            detail="Book not found."
        )

    # Return book
    return book

# Update book API
@router.put(
    "/{book_id}",
    response_model=BookResponse
)
def edit_book(

    # Book ID
    book_id: int,

    # Updated data
    book: BookCreate,

    # Database
    db: Session = Depends(get_db),

    # Logged in user
     # Admin user
    current_user: User = Depends(get_current_admin)

):

    # Update book
    updated_book = update_book(
        book_id,
        book,
        db
    )

    # Book not found
    if updated_book is None:
        raise HTTPException(
            status_code=404,
            detail="Book not found."
        )

    # Return updated book
    return updated_book

# Delete book API
@router.delete("/{book_id}")
def remove_book(

    # Book ID
    book_id: int,

    # Database
    db: Session = Depends(get_db),

    # Logged in user
    current_user: User = Depends(get_current_admin)
):

    # Delete book
    deleted = delete_book(book_id, db)

    # Book not found
    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Book not found."
        )

    # Success message
    return {
        "message": "Book deleted successfully."
    }