from pydantic import BaseModel
from typing import Any, Dict, List


class GeneExpressionRequest(BaseModel):
    gene: str
    expression_level: float


class GeneExpressionData(BaseModel):
    data: List[Dict[str, Any]]


class GeneratePdfData(BaseModel):
    expression_level: Dict[str, float]
    gene_counts: Dict[str, int]


class GeneratePdfRequest(BaseModel):
    data: GeneratePdfData
