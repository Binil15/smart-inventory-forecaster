from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, SessionLocal
from . import models
from .auth import create_default_users
from .routers import auth, products, predict, eoq
import os

app = FastAPI(title="Smart Inventory Forecaster")

models.Base.metadata.create_all(bind=engine)

if os.getenv("ENV") != "production":
    from app.auth import create_default_users
    from app.database import SessionLocal

    db = SessionLocal()
    create_default_users(db)
    db.close()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(products.router)
app.include_router(predict.router)
app.include_router(eoq.router)
