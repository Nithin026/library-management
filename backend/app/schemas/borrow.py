# Import datetime
from datetime import datetime

# Import BaseModel
from pydantic import BaseModel

# Import Book schema
from app.schemas.book import BookResponse


# Borrow request schema
class BorrowCreate(BaseModel):

    # Book ID
    book_id: int

    # Due date
    due_date: datetime


# Borrow response schema
class BorrowResponse(BaseModel):

    # Borrow ID
    id: int

    # User ID
    user_id: int

    # Book ID
    book_id: int

    # Nested book details
    book: BookResponse | None = None

    # Borrow date
    borrow_date: datetime

    # Due date
    due_date: datetime

    # Return date
    return_date: datetime | None

    # Status
    status: str

    # Enable ORM mode
    model_config = {
        "from_attributes": True
    }