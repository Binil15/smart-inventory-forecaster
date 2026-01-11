from pydantic import BaseModel
from typing import List

class ProductCreate(BaseModel):
    name: str
    unit_price: float
    current_stock: int
    monthly_sales: List[int]

class ProductResponse(ProductCreate):
    id: int

    class Config:
        orm_mode = True
class UserLogin(BaseModel):
    username: str
    password: str
class EOQRequest(BaseModel):
    demand: float
    ordering_cost: float
    holding_cost: float