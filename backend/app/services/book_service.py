# Import database session
from sqlalchemy.orm import Session

# Import Book model
from app.models.book import Book

# Import Book schema
from app.schemas.book import BookCreate


# Create book
def create_book(book: BookCreate, db: Session):

    # Check ISBN already exists
    existing_book = (
        db.query(Book)
        .filter(Book.isbn == book.isbn)
        .first()
    )

    # Book already exists
    if existing_book:
        return None

    # Create book object
    new_book = Book(
        title=book.title,
        author=book.author,
        isbn=book.isbn,
        category=book.category,
        published_year=book.published_year,
        total_copies=book.total_copies,
        available_copies=book.available_copies
    )

    # Add book
    db.add(new_book)

    # Save changes
    db.commit()

    # Refresh object
    db.refresh(new_book)

    # Return book
    return new_book

# Get all books
def get_all_books(db: Session):

    # Get all books
    books = db.query(Book).all()

    # Return books
    return books

# Get book by ID
def get_book_by_id(book_id: int, db: Session):

    # Find book
    book = (
        db.query(Book)
        .filter(Book.id == book_id)
        .first()
    )

    # Return book
    return book

# Update book
def update_book(
    book_id: int,
    book_data: BookCreate,
    db: Session
):

    # Find book
    book = (
        db.query(Book)
        .filter(Book.id == book_id)
        .first()
    )

    # Book not found
    if book is None:
        return None

    # Update book details
    book.title = book_data.title
    book.author = book_data.author
    book.isbn = book_data.isbn
    book.category = book_data.category
    book.published_year = book_data.published_year
    book.total_copies = book_data.total_copies
    book.available_copies = book_data.available_copies

    # Save changes
    db.commit()

    # Refresh book
    db.refresh(book)

    # Return updated book
    return book

# Delete book
def delete_book(
    book_id: int,
    db: Session
):

    # Find book
    book = (
        db.query(Book)
        .filter(Book.id == book_id)
        .first()
    )

    # Book not found
    if book is None:
        return False

    # Delete book
    db.delete(book)

    # Save changes
    db.commit()

    # Success
    return True