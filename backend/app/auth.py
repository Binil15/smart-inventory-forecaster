from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import timedelta
from .jwt_handler import create_access_token

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str

users = {
    "admin": {
        "password": "admin123",
        "role": "admin"
    },
    "clerk": {
        "password": "clerk123",
        "role": "clerk"
    }
}

@router.post("/login")
def login(data: LoginRequest):
    user = users.get(data.username)
    if not user or user["password"] != data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(
        data={"sub": data.username, "role": user["role"]}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user["role"]
    }
