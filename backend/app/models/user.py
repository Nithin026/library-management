# Import SQLAlchemy column types
from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, text

# Import relationship
from sqlalchemy.orm import relationship

# Import Base class
from app.core.database import Base


# User table
class User(Base):

    # Database table name
    __tablename__ = "users"

    # User ID
    id = Column(Integer, primary_key=True, index=True)

    # User name
    name = Column(String(100), nullable=False)

    # User email
    email = Column(String(255), unique=True, nullable=False)

    # Hashed password
    password_hash = Column(Text, nullable=False)

    # User role
    role = Column(String(20), nullable=False, server_default="member")

    # Account creation time
    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )

    # User borrow records
    borrow_records = relationship(
        "Borrow",
        back_populates="user"
    )