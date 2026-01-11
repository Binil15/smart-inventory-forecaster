from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.dialects.postgresql import ARRAY
from .database import Base
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.types import JSON




class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    unit_price = Column(Float, nullable=False)
    current_stock = Column(Integer, nullable=False)
    monthly_sales = Column(JSON, nullable=False)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)
