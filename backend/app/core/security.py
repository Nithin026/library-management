# Import datetime
from datetime import datetime, timedelta, timezone

# Import JWT
from jose import jwt, JWTError

# Import password hashing
from passlib.context import CryptContext

# Import FastAPI
from fastapi import Depends, HTTPException, status

# Import HTTP Bearer
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# Import database session
from sqlalchemy.orm import Session

# Import settings
from app.core.config import settings

# Import database dependency
from app.core.database import get_db

# Import User model
from app.models.user import User


# Password hashing
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# HTTP Bearer authentication
security = HTTPBearer()


# Hash password
def hash_password(password: str):

    return pwd_context.hash(password)


# Verify password
def verify_password(
    plain_password: str,
    hashed_password: str
):

    return pwd_context.verify(
        plain_password,
        hashed_password
    )


# Create JWT token
def create_access_token(data: dict):

    # Copy payload
    to_encode = data.copy()

    # Token expiry
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    # Add expiry
    to_encode.update({"exp": expire})

    # Create token
    token = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )

    return token


# Get logged in user
def get_current_user(

    # JWT token
    credentials: HTTPAuthorizationCredentials = Depends(security),

    # Database session
    db: Session = Depends(get_db)

):

    # Extract JWT token
    token = credentials.credentials

    # Invalid token exception
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid token"
    )

    try:

        # Decode token
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )

        # Read email
        email = payload.get("sub")

        # Check email
        if email is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    # Find user
    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    # User not found
    if user is None:
        raise credentials_exception

    # Return user
    return user

# Check admin user
def get_current_admin(

    # Logged in user
    current_user: User = Depends(get_current_user)

):

    # Check role
    if current_user.role != "admin":

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required."
        )

    # Return admin user
    return current_user