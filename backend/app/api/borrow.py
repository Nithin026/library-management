# Import APIRouter
from fastapi import APIRouter, Depends, HTTPException, status

# Import database session
from sqlalchemy.orm import Session

# Import database
from app.core.database import get_db

# Import security
from app.core.security import get_current_user

# Import model
from app.models.user import User

# Import schemas
from app.schemas.borrow import BorrowCreate, BorrowResponse

# Import services
from app.services.borrow_service import (
    borrow_book,
    return_book,
    get_user_borrow_history
)

# Create router
router = APIRouter(
    prefix="/borrow",
    tags=["Borrow"]
)


# Borrow book
@router.post(
    "",
    response_model=BorrowResponse,
    status_code=status.HTTP_201_CREATED
)
def borrow(

    borrow: BorrowCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)

):

    borrow_record, error = borrow_book(
        borrow,
        current_user,
        db
    )

    if error:

        raise HTTPException(
            status_code=400,
            detail=error
        )

    return borrow_record


# Return book
@router.put(
    "/return/{borrow_id}",
    response_model=BorrowResponse
)
def return_borrowed_book(

    borrow_id: int,

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)

):

    borrow_record, error = return_book(
        borrow_id,
        current_user,
        db
    )

    if error:

        raise HTTPException(
            status_code=400,
            detail=error
        )

    return borrow_record


# Borrow history
@router.get(
    "",
    response_model=list[BorrowResponse]
)
def borrow_history(

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)

):

    return get_user_borrow_history(
        current_user,
        db
    )