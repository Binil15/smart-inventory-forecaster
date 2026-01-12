from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User
from ..schemas import UserLogin
from ..auth import verify_password, create_access_token, get_password_hash


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()

    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({
        "sub": db_user.username,
        "role": db_user.role
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": db_user.role
    }
@router.post("/seed")
def seed_users(db: Session = Depends(get_db)):
    users = [
        ("admin", "admin123", "admin"),
        ("clerk", "clerk123", "clerk")
    ]

    created = []

    for username, password, role in users:
        existing = db.query(User).filter(User.username == username).first()
        if not existing:
            hashed = get_password_hash(password)
            user = User(
                username=username,
                hashed_password=hashed,
                role=role
            )
            db.add(user)
            created.append(username)

    db.commit()

    return {
        "message": "Users seeded successfully",
        "created": created
    }
