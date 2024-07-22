from fastapi import APIRouter
import pandas as pd
from src.models import GeneExpressionData
from src.database import get_db_connection

router = APIRouter()


@router.post("/process")
async def process_data(gene_expression_data: GeneExpressionData):
    df = pd.DataFrame(gene_expression_data.data)
    result = df.describe().to_dict()
    return result


@router.get("/results")
async def get_results():
    conn = get_db_connection()
    data = conn.execute("SELECT * FROM results").fetchall()
    return [dict(row) for row in data]
