from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
import pandas as pd
from io import StringIO

router = APIRouter()


@router.post("/csv-to-json")
async def upload_csv(file: UploadFile = File(...)):
    try:
        # Read the CSV file content
        contents = await file.read()
        csv_data = StringIO(contents.decode("utf-8"))

        # Use pandas to read the CSV data
        df = pd.read_csv(csv_data)

        # Convert DataFrame to JSON
        df_array = df.to_dict(orient="tight")

        keys = df_array["columns"]

        # Convert DataFrame object to the list of dictionares
        data_array = [dict(zip(keys, item)) for item in df_array["data"]]

        json_object = {"data": data_array}

        return JSONResponse(content=json_object)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)
