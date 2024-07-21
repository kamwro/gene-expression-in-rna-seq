from pydantic import BaseModel
from typing import List, Dict, Any

class GeneExpressionRequest(BaseModel):
    gene: str
    expression_level: float

class GeneExpressionData(BaseModel):
    data: List[GeneExpressionRequest]