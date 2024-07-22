from pydantic import BaseModel
from typing import Any, Dict, List


class GeneExpressionRequest(BaseModel):
    gene: str
    expression_level: float


class GeneExpressionData(BaseModel):
    data: List[Dict[str, Any]]
