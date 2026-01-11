from fastapi import APIRouter
from typing import List

router = APIRouter(prefix="/api/predict", tags=["Prediction"])

@router.post("/")
def predict_demand(sales: List[int]):
    last_three = sales[-3:]
    prediction = sum(last_three) / len(last_three)
    return {"predicted_demand": prediction}
    
