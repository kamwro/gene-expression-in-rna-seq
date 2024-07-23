from fastapi import APIRouter, Response

from src.services import sample_csv_service as service

router = APIRouter()


@router.get("/sample-csv")
async def get_sample_csv():
    num_records = 1000
    sample_data = await service.generate_random_gene_expression(num_records)
    content = await service.resolve_csv_content(sample_data)

    return Response(
        content,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=sample_data.csv"},
    )
