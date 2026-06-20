# Import BaseModel
from pydantic import BaseModel, EmailStr

# Import datetime
from datetime import datetime


# User registration schema
class UserCreate(BaseModel):

    # User name
    name: str

    # User email
    email: EmailStr

    # User password
    password: str


# User login schema
class UserLogin(BaseModel):

    # User email
    email: EmailStr

    # User password
    password: str


# User response schema
class UserResponse(BaseModel):

    # User ID
    id: int

    # User name
    name: str

    # User email
    email: EmailStr

    # User role
    role: str

    # Account created time
    created_at: datetime

    # Convert SQLAlchemy object to Pydantic model
    model_config = {
        "from_attributes": True
    }

# Login response schema
class Token(BaseModel):

    # JWT token
    access_token: str

    # Token type
    token_type: str   


# User Dashboard response schema
class UserDashboardResponse(BaseModel):

    # Active borrows
    borrowed_books: int

    # Total returned books
    books_read: int

    # Books due in the next 3 days
    due_soon: int

    # Overdue books
    overdue: int