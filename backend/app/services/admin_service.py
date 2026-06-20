# Import database session
from sqlalchemy.orm import Session

# Import models
from app.models.user import User
from app.models.book import Book
from app.models.borrow import Borrow


# Dashboard statistics
def get_dashboard(db: Session):

    # Count users
    total_users = db.query(User).count()

    # Count books
    total_books = db.query(Book).count()

    # Count borrowed books
    borrowed_books = (
        db.query(Borrow)
        .filter(Borrow.status == "Borrowed")
        .count()
    )

    # Count returned books
    returned_books = (
        db.query(Borrow)
        .filter(Borrow.status == "Returned")
        .count()
    )

    # Count available books
    available_books = (
        db.query(Book)
        .filter(Book.available_copies > 0)
        .count()
    )

    # Return dashboard data
    return {

        "total_users": total_users,

        "total_books": total_books,

        "borrowed_books": borrowed_books,

        "returned_books": returned_books,

        "available_books": available_books

    }