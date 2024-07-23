import pandas as pd
from io import StringIO


async def resolve_json_object(csv_data: StringIO):
    # Use pandas to read the CSV data
    df = pd.read_csv(csv_data)

    # Convert DataFrame to JSON
    df_array = df.to_dict(orient="tight")

    keys = df_array["columns"]

    # Convert DataFrame object to the list of dictionares
    data_array = [dict(zip(keys, item)) for item in df_array["data"]]

    json_object = {"data": data_array}

    return json_object
