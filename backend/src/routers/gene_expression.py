from fastapi import APIRouter
import pandas as pd

from src.models import GeneExpressionData
from src.services import gene_expression_service as service

router = APIRouter()


@router.post("/process")
async def process_data(gene_expression_data: GeneExpressionData):
    # Convert the incoming data into a DataFrame
    df = pd.DataFrame(gene_expression_data.data)
    gene_count_dict = await service.get_gene_count(df)

    # Prepare the result dictionary
    result = df.describe().to_dict()

    # Combine the statistical summary and gene counts
    result.update({"gene_counts": gene_count_dict})

    return result
