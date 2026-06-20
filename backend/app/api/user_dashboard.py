# Import APIRouter
from fastapi import APIRouter, Depends

# Import database session
from sqlalchemy.orm import Session

# Import database dependency
from app.core.database import get_db

# Import current user dependency
from app.core.security import get_current_user

# Import User model
from app.models.user import User

# Import schema
from app.schemas.user import UserDashboardResponse

# Import service function
from app.services.borrow_service import get_user_dashboard

# Create router
router = APIRouter(
    prefix="/user",
    tags=["User"]
)


# User Dashboard API
@router.get(
    "/dashboard",
    response_model=UserDashboardResponse
)
def user_dashboard(

    # Database session
    db: Session = Depends(get_db),

    # Logged in user
    current_user: User = Depends(get_current_user)

):

    # Get dashboard stats
    return get_user_dashboard(current_user, db)
