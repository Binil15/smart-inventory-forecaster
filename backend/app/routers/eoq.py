from fastapi import APIRouter
from pydantic import BaseModel
import math

router = APIRouter(prefix="/api/eoq", tags=["EOQ"])

class EOQRequest(BaseModel):
    demand: float
    ordering_cost: float
    holding_cost: float

@router.post("")
def calculate_eoq(data: EOQRequest):
    D = data.demand
    S = data.ordering_cost
    H = data.holding_cost

    if D <= 0 or S <= 0 or H <= 0:
        return {"error": "Invalid EOQ inputs"}

    eoq = math.sqrt((2 * D * S) / H)

    return {"eoq": eoq}
