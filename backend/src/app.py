from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import gene_expression

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(gene_expression.router, prefix="/api")


@app.get("/")
def read_root():
    return {"message": "Welcome to the Gene Expression Analysis API"}
