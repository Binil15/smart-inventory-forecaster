from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import products, predict, eoq
from .routers import products, predict, eoq, auth
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
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(predict.router)
app.include_router(eoq.router)
