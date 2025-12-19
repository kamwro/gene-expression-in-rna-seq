from pydantic import BaseModel, field_validator
from typing import Any, Dict, List


class GeneExpressionRequest(BaseModel):
    gene: str
    expression_level: float

    @field_validator("gene")
    @classmethod
    def validate_gene(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("Gene name cannot be empty")
        return v.strip()

    @field_validator("expression_level")
    @classmethod
    def validate_expression_level(cls, v: float) -> float:
        if v < 0:
            raise ValueError("Expression level must be non-negative")
        return v


class GeneExpressionData(BaseModel):
    data: List[Dict[str, Any]]

    @field_validator("data")
    @classmethod
    def validate_data(cls, v: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        if not v:
            raise ValueError("Data cannot be empty")
        if len(v) > 100000:
            raise ValueError(
                "Data exceeds maximum allowed size (100,000 rows)"
            )

        # Validate each entry has required fields
        for idx, entry in enumerate(v):
            if "gene" not in entry:
                raise ValueError(f"Entry at index {idx} missing 'gene' field")
            if "expression_level" not in entry:
                raise ValueError(
                    f"Entry at index {idx} missing 'expression_level' field"
                )

        return v


class GeneratePdfData(BaseModel):
    expression_level: Dict[str, float]
    gene_counts: Dict[str, int]


class GeneratePdfRequest(BaseModel):
    data: GeneratePdfData
