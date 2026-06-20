# Import SQLAlchemy column types
from sqlalchemy import Column, Integer, String, TIMESTAMP, text

# Import relationship
from sqlalchemy.orm import relationship

# Import Base class
from app.core.database import Base


# Book table
class Book(Base):

    # Database table name
    __tablename__ = "books"

    # Book ID
    id = Column(Integer, primary_key=True, index=True)

    # Book title
    title = Column(String(255), nullable=False)

    # Author name
    author = Column(String(150), nullable=False)

    # Book ISBN
    isbn = Column(String(20), unique=True, nullable=False)

    # Book category
    category = Column(String(100))

    # Published year
    published_year = Column(Integer)

    # Total copies
    total_copies = Column(Integer, nullable=False)

    # Available copies
    available_copies = Column(Integer, nullable=False)

    # Created time
    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )

 
    # Book borrow records
    borrow_records = relationship(
    "Borrow",
    back_populates="book"
    )
   
