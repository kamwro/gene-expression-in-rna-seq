import csv
import io
import random

from src.utils.gene_names import GENE_NAMES


async def generate_random_gene_expression(num_records: int):
    data = []
    for _ in range(num_records):
        gene_id = random.choice(GENE_NAMES)
        expression_value = round(random.uniform(0.0, 100.0), 2)
        data.append({"gene": gene_id, "expression_level": expression_value})
    return data


async def resolve_csv_content(sample_data: list):
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=["gene", "expression_level"])
    writer.writeheader()
    writer.writerows(sample_data)
    content = output.getvalue()

    return content
