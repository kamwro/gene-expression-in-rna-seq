from fastapi import APIRouter, Response
import csv
import io
import random
from src.utils.gene_names import GENE_NAMES

router = APIRouter()


def generate_random_gene_expression(num_records):
    data = []
    for _ in range(num_records):
        gene_id = random.choice(GENE_NAMES)
        expression_value = round(random.uniform(0.0, 100.0), 2)
        data.append({"gene": gene_id, "expression_level": expression_value})
    return data


@router.get("/sample-csv")
async def get_sample_csv():
    num_records = 1000
    sample_data = generate_random_gene_expression(num_records)

    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=["gene", "expression_level"])
    writer.writeheader()
    writer.writerows(sample_data)
    content = output.getvalue()

    return Response(
        content,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=sample_data.csv"},
    )
