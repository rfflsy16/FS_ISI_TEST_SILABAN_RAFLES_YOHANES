from fastapi import APIRouter, HTTPException
from src.modules.tasks.service import TaskService
from src.modules.tasks.schema import Task, TaskCreate, TaskUpdate

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"]
)

@router.get("/", response_model=list[Task])
async def get_all_tasks():
    return await TaskService.get_all_tasks()


@router.get("/ongoing")
async def get_ongoing_tasks():
    return await TaskService.get_ongoing_tasks()

@router.get("/completed")
async def get_completed_tasks():
    return await TaskService.get_completed_tasks()

@router.get("/{task_id}", response_model=Task)
async def get_task(task_id: int):
    task = await TaskService.get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.post("/", response_model=Task)
async def create_task(task: TaskCreate):
    return await TaskService.create_task(task)

@router.put("/{task_id}", response_model=Task)
async def update_task(task_id: int, task: TaskUpdate):
    updated = await TaskService.update_task(task_id, task)
    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated

@router.delete("/{task_id}")
async def delete_task(task_id: int):
    deleted = await TaskService.delete_task(task_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted"}

