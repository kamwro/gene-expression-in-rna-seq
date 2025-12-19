from pydantic import BaseModel, Field
from typing import Dict


class GeneExpressionEntry(BaseModel):
    gene: str = Field(..., min_length=1, description="Gene name")
    expression_level: float = Field(..., ge=0, description="Expression level value")


class GeneExpressionResponse(BaseModel):
    expression_level: Dict[str, Dict[str, float]]
    gene_counts: Dict[str, int]

    class Config:
        json_schema_extra = {
            "example": {
                "expression_level": {
                    "count": {"gene1": 10.0, "gene2": 5.0},
                    "mean": {"gene1": 2.5, "gene2": 3.0},
                },
                "gene_counts": {"gene1": 5, "gene2": 3},
            }
        }


class ErrorResponse(BaseModel):
    detail: str
    status_code: int


class HealthCheckResponse(BaseModel):
    status: str
    version: str
