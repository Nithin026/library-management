# Import datetime
from datetime import datetime, timezone

# Import database session
from sqlalchemy.orm import Session

# Import models
from app.models.borrow import Borrow
from app.models.user import User
from app.models.book import Book

# Import schema
from app.schemas.borrow import BorrowCreate


# Borrow book
def borrow_book(
    borrow: BorrowCreate,
    current_user: User,
    db: Session
):

    # Find book
    book = (
        db.query(Book)
        .filter(Book.id == borrow.book_id)
        .first()
    )

    # Book not found
    if book is None:
        return None, "Book not found."

    # Check available copies
    if book.available_copies <= 0:
        return None, "Book is not available."

    # Create borrow record
    borrow_record = Borrow(
        user_id=current_user.id,
        book_id=borrow.book_id,
        due_date=borrow.due_date
    )

    # Reduce available copies
    book.available_copies -= 1

    # Save record
    db.add(borrow_record)

    # Save changes
    db.commit()

    # Refresh record
    db.refresh(borrow_record)

    # Return record
    return borrow_record, None


# Return book
def return_book(
    borrow_id: int,
    current_user: User,
    db: Session
):

    # Find borrow record
    borrow = (
        db.query(Borrow)
        .filter(Borrow.id == borrow_id)
        .first()
    )

    # Record not found
    if borrow is None:
        return None, "Borrow record not found."

    # Verify authorization (only the borrower or an admin can return)
    if borrow.user_id != current_user.id and current_user.role != "admin":
        return None, "You do not have permission to return this book."

    # Already returned
    if borrow.status == "Returned":
        return None, "Book already returned."

    # Find book
    book = (
        db.query(Book)
        .filter(Book.id == borrow.book_id)
        .first()
    )

    # Increase copies
    book.available_copies += 1

    # Update record
    borrow.return_date = datetime.now(timezone.utc)
    borrow.status = "Returned"

    # Save changes
    db.commit()

    # Refresh record
    db.refresh(borrow)

    # Return record
    return borrow, None


# Get logged in user's borrow history
def get_user_borrow_history(
    current_user: User,
    db: Session
):

    # Get user records
    records = (
        db.query(Borrow)
        .filter(Borrow.user_id == current_user.id)
        .all()
    )

    # Return records
    return records


# Get member dashboard stats
def get_user_dashboard(
    current_user: User,
    db: Session
):
    # Import timedelta
    from datetime import timedelta

    now = datetime.now(timezone.utc)
    now_naive = now.replace(tzinfo=None)

    # Count active borrows
    borrowed_books = (
        db.query(Borrow)
        .filter(Borrow.user_id == current_user.id, Borrow.status == "Borrowed")
        .count()
    )

    # Count returned books
    books_read = (
        db.query(Borrow)
        .filter(Borrow.user_id == current_user.id, Borrow.status == "Returned")
        .count()
    )

    # Count due soon (next 3 days)
    three_days_later = now_naive + timedelta(days=3)
    due_soon = (
        db.query(Borrow)
        .filter(
            Borrow.user_id == current_user.id,
            Borrow.status == "Borrowed",
            Borrow.due_date >= now_naive,
            Borrow.due_date <= three_days_later
        )
        .count()
    )

    # Count overdue
    overdue = (
        db.query(Borrow)
        .filter(
            Borrow.user_id == current_user.id,
            Borrow.status == "Borrowed",
            Borrow.due_date < now_naive
        )
        .count()
    )

    # Return stats
    return {
        "borrowed_books": borrowed_books,
        "books_read": books_read,
        "due_soon": due_soon,
        "overdue": overdue
    }