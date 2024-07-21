from pydantic import BaseModel
from typing import List


class GeneExpressionRequest(BaseModel):
    gene: str
    expression_level: float


class GeneExpressionData(BaseModel):
    data: List[GeneExpressionRequest]
