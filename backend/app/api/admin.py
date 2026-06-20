# Import APIRouter
from fastapi import APIRouter, Depends

# Import database session
from sqlalchemy.orm import Session

# Import database dependency
from app.core.database import get_db

# Import admin dependency
from app.core.security import get_current_admin

# Import User model
from app.models.user import User

# Import schema
from app.schemas.admin import DashboardResponse

# Import service
from app.services.admin_service import get_dashboard


# Create router
router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


# Dashboard API
@router.get(
    "/dashboard",
    response_model=DashboardResponse
)
def dashboard(

    # Database session
    db: Session = Depends(get_db),

    # Logged in admin
    current_user: User = Depends(get_current_admin)

):

    # Get dashboard data
    return get_dashboard(db)