# Import BaseModel
from pydantic import BaseModel


# Dashboard response
class DashboardResponse(BaseModel):

    # Total users
    total_users: int

    # Total books
    total_books: int

    # Borrowed books
    borrowed_books: int

    # Returned books
    returned_books: int

    # Available books
    available_books: int