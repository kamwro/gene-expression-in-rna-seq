from fastapi import APIRouter
import pandas as pd
from src.models import GeneExpressionData

router = APIRouter()


@router.post("/process")
async def process_data(gene_expression_data: GeneExpressionData):
    # Convert the incoming data into a DataFrame
    df = pd.DataFrame(gene_expression_data.data)

    # Calculate gene counts
    gene_count = df["gene"].value_counts()
    gene_count_dict = gene_count.to_dict()

    # Prepare the result dictionary
    result = df.describe().to_dict()

    # Combine the statistical summary and gene counts
    result.update({"gene_counts": gene_count_dict})

    return result
