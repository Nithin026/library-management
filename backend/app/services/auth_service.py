# Import SQLAlchemy session
from sqlalchemy.orm import Session

# Import User model
from app.models.user import User

# Import User schema
from app.schemas.user import UserCreate

# Import password hashing function
from app.core.security import hash_password

# Import JWT function
from app.core.security import create_access_token

# Import password verification
from app.core.security import verify_password

# Import login schema
from app.schemas.user import UserLogin


# Register new user
def register_user(user: UserCreate, db: Session):

    # Check if email already exists
    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    # Return None if email exists
    if existing_user:
        return None

    # Create new user object
    new_user = User(
        name=user.name,
        email=user.email,
        password_hash=hash_password(user.password)
    )

    # Add user to database
    db.add(new_user)

    # Save changes
    db.commit()

    # Refresh object
    db.refresh(new_user)

    # Return created user
    return new_user

# Login user
def login_user(user: UserLogin, db: Session):

    # Find user by email
    db_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    # Check if user exists
    if not db_user:
        return None

    # Check password
    if not verify_password(
        user.password,
        db_user.password_hash
    ):
        return None

    # Create access token
    access_token = create_access_token(
        {
            "sub": db_user.email
        }
    )

    # Return token
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }