from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from src.routers import gene_expression, sample_csv, csv_to_json, download
from src.config import settings
from src.middleware import error_handler
from src.schemas import HealthCheckResponse

app = FastAPI(title=settings.api_title, version=settings.api_version)

# Exception handlers
app.add_exception_handler(
    RequestValidationError, error_handler.validation_exception_handler
)
app.add_exception_handler(
    StarletteHTTPException, error_handler.http_exception_handler
)
app.add_exception_handler(Exception, error_handler.generic_exception_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

app.include_router(
    gene_expression.router, prefix="/api/v1", tags=["Gene Expression"]
)
app.include_router(sample_csv.router, prefix="/api/v1", tags=["Sample Data"])
app.include_router(
    csv_to_json.router, prefix="/api/v1", tags=["CSV Processing"]
)
app.include_router(download.router, prefix="/api/v1", tags=["Downloads"])


@app.get("/", response_model=HealthCheckResponse)
def read_root():
    """Health check endpoint."""
    return {"status": "healthy", "version": settings.api_version}


@app.get("/health", response_model=HealthCheckResponse)
def health_check():
    """Health check endpoint for monitoring."""
    return {"status": "healthy", "version": settings.api_version}
