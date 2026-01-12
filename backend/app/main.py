from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine
from . import models
from .routers import auth, products, predict, eoq

app = FastAPI(title="Smart Inventory Forecaster")


models.Base.metadata.create_all(bind=engine)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://smart-inventory-forecaster-frontend.vercel.app",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],   
    allow_headers=["*"],   
)


app.include_router(auth.router)
app.include_router(products.router)
app.include_router(predict.router)
app.include_router(eoq.router)
