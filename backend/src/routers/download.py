from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from src.models import GeneratePdfRequest
from src.services import download_service as service

router = APIRouter()


@router.post("/generate-pdf")
async def generate_pdf(generate_pdf_data: GeneratePdfRequest):
    buffer = await service.build_pdf(generate_pdf_data)
    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=results.pdf"},
    )
