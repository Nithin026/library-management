# Import APIRouter
from fastapi import APIRouter, Depends, HTTPException

# Import database session
from sqlalchemy.orm import Session

# Import database dependency
from app.core.database import get_db

# Import schemas
from app.schemas.user import (
    UserCreate,
    UserResponse,
    UserLogin,
    Token
)

# Import services
from app.services.auth_service import (
    register_user,
    login_user
)

# Import current user dependency
from app.core.security import get_current_user

# Import User model
from app.models.user import User

# Create router
router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# Register API
@router.post(
    "/register",
    response_model=UserResponse
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    # Register user
    new_user = register_user(user, db)

    # Email already exists
    if new_user is None:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Return created user
    return new_user

# Login API
@router.post(
    "/login",
    response_model=Token
)
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    # Login user
    token = login_user(user, db)

    # Invalid credentials
    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Return JWT token
    return token

# Get current user
@router.get(
    "/me",
    response_model=UserResponse
)
def get_me(

    # Logged in user
    current_user: User = Depends(get_current_user)

):

    # Return current user
    return current_user