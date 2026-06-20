# Import BaseModel
from pydantic import BaseModel

# Import datetime
from datetime import datetime


# Create book schema
class BookCreate(BaseModel):

    # Book title
    title: str

    # Author name
    author: str

    # Book ISBN
    isbn: str

    # Book category
    category: str

    # Published year
    published_year: int

    # Total copies
    total_copies: int

    # Available copies
    available_copies: int


# Update book schema
class BookUpdate(BaseModel):

    # Book title
    title: str

    # Author name
    author: str

    # Book ISBN
    isbn: str

    # Book category
    category: str

    # Published year
    published_year: int

    # Total copies
    total_copies: int

    # Available copies
    available_copies: int


# Book response schema
class BookResponse(BaseModel):

    # Book ID
    id: int

    # Book title
    title: str

    # Author name
    author: str

    # Book ISBN
    isbn: str

    # Book category
    category: str

    # Published year
    published_year: int

    # Total copies
    total_copies: int

    # Available copies
    available_copies: int

    # Created time
    created_at: datetime

    # Convert model to schema
    model_config = {
        "from_attributes": True
    }