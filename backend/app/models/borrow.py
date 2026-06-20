# Import datetime
from datetime import datetime, timezone

# Import SQLAlchemy columns
from sqlalchemy import Column, Integer, DateTime, ForeignKey, String

# Import relationship
from sqlalchemy.orm import relationship

# Import Base
from app.core.database import Base


# Borrow table
class Borrow(Base):

    # Table name
    __tablename__ = "borrow_records"

    # Borrow ID
    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # User ID
    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    # Book ID
    book_id = Column(
        Integer,
        ForeignKey("books.id"),
        nullable=False
    )

    # Borrow date
    borrow_date = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc)
    )

    # Due date
    due_date = Column(
        DateTime,
        nullable=False
    )

    # Return date
    return_date = Column(
        DateTime,
        nullable=True
    )

    # Borrow status
    status = Column(
        String,
        default="Borrowed"
    )

    # Relationship with User
    user = relationship(
        "User",
        back_populates="borrow_records"
    )

    # Relationship with Book
    book = relationship(
        "Book",
        back_populates="borrow_records"
    )