from fastapi import APIRouter, HTTPException
import pandas as pd

from src.models import GeneExpressionData
from src.schemas import GeneExpressionResponse
from src.services import gene_expression_service as service

router = APIRouter()


@router.post("/process", response_model=GeneExpressionResponse)
def process_data(gene_expression_data: GeneExpressionData):
    """
    Process gene expression data and return statistical summary with gene counts.
    """
    try:
        # Convert the incoming data into a DataFrame
        df = pd.DataFrame(gene_expression_data.data)

        # Validate required columns
        if "gene" not in df.columns or "expression_level" not in df.columns:
            raise HTTPException(
                status_code=400,
                detail="Data must contain 'gene' and 'expression_level' columns",
            )

        gene_count_dict = service.get_gene_count(df)

        # Prepare the result dictionary
        result = df.describe().to_dict()

        # Combine the statistical summary and gene counts
        result.update({"gene_counts": gene_count_dict})

        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
