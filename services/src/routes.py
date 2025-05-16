from fastapi import APIRouter
from src.modules.tasks.routes import router as tasks_router

router = APIRouter()

router.include_router(tasks_router, prefix="/tasks")
