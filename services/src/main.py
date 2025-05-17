from fastapi import FastAPI
from src.routes.routes import router as api_router
from fastapi.responses import Response
from fastapi.exceptions import HTTPException
from src.core.error import http_exception_handler, global_exception_handler
from src.core.database import db
app = FastAPI(
    title="Todo API",
    description="A simple API for managing todos",
    version="1.0.0",
)

app.include_router(api_router, prefix="/api")

app.add_exception_handler(HTTPException, http_exception_handler)
app.add_exception_handler(Exception, global_exception_handler)

@app.on_event("startup")
async def startup_event():
    await db.connect()
    print("🚀 Todo API server is running! Endpoint: http://localhost:8000/api")

@app.on_event("shutdown")
async def shutdown_event():
    await db.disconnect()
    print("👋 Todo API server is shutting down...")

@app.get("/")
async def root():
    return {"message": "API is running!"}