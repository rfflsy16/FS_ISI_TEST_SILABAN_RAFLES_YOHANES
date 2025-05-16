from fastapi import APIRouter
from src.modules.tasks import service

router = APIRouter()

@router.get("/")
async def get_all_todo():
    return service.get_all_todo_service()

@router.post("/")
async def create_todo():
    return service.create_todo_service()

@router.get("/{todo_id}")
async def get_todo(todo_id: int):
    return service.get_todo_service(todo_id)

@router.put("/{todo_id}")
async def update_todo(todo_id: int):
    return service.update_todo_service(todo_id)

@router.delete("/{todo_id}")
async def delete_todo(todo_id: int):
    return service.delete_todo_service(todo_id)
