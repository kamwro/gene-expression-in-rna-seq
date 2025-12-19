from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # API Configuration
    api_title: str = "Gene Expression Analysis API"
    api_version: str = "1.0.0"

    # CORS Configuration
    allowed_origins: List[str] = ["http://localhost:3000"]

    # Server Configuration
    host: str = "0.0.0.0"
    port: int = 8000
    reload: bool = True

    # CSV Upload Configuration
    max_file_size_mb: int = 50
    allowed_file_types: List[str] = [".csv"]

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
