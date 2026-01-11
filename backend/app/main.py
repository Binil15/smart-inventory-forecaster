from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, products, predict, eoq
from .database import engine
from . import models

app = FastAPI(title="Smart Inventory Forecaster")

models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(predict.router, prefix="/api/predict", tags=["Forecast"])
app.include_router(eoq.router, prefix="/api/eoq", tags=["EOQ"])
