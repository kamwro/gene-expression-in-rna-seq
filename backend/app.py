from fastapi import FastAPI
from routers import gene_expression

app = FastAPI()

app.include_router(gene_expression.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Gene Expression Analysis API"}
