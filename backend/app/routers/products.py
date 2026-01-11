from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import jwt

from ..database import SessionLocal
from ..crud import create_product, get_products, delete_product
from ..schemas import ProductCreate
from ..auth import SECRET_KEY, ALGORITHM

router = APIRouter(prefix="/api/products", tags=["Products"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return payload

@router.get("/")
def read_products(db: Session = Depends(get_db)):
    return get_products(db)

@router.post("/")
def add_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admins only")
    return create_product(db, product)

@router.delete("/{product_id}")
def remove_product(
    product_id: int,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)  # admin + clerk allowed
):
    deleted = delete_product(db, product_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted"}
