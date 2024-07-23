from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
from io import StringIO

from src.services import csv_to_json_service as service

router = APIRouter()


@router.post("/csv-to-json")
async def upload_csv(file: UploadFile = File(...)):
    try:
        # Read the CSV file content
        contents = await file.read()
        csv_data = StringIO(contents.decode("utf-8"))
        json_object = await service.resolve_json_object(csv_data)
        return JSONResponse(content=json_object)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)
