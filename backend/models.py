from pydantic import BaseModel
from typing import List, Dict, Any

class GeneExpressionData(BaseModel):
    data: List[Dict[str, Any]]
