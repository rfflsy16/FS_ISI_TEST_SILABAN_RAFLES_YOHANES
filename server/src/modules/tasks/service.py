from src.modules.tasks.repository import TaskRepository
from src.modules.tasks.schema import TaskCreate, TaskUpdate
from fastapi import HTTPException
class TaskService:
    @staticmethod
    async def get_all_tasks():
        return await TaskRepository.get_all_tasks()

    @staticmethod
    async def get_task(task_id: int):
        tasks = await TaskRepository.get_task(task_id)

        if not tasks:
            raise HTTPException(status_code=404, detail="Task not found")

        return tasks

    @staticmethod
    async def create_task(task: TaskCreate):
        return await TaskRepository.create_task(task)

    @staticmethod
    async def update_task(task_id: int, task: TaskUpdate):
        updated = await TaskRepository.update_task(task_id, task)

        if not updated:
            raise HTTPException(status_code=404, detail="Task not found")

        return updated

    @staticmethod
    async def delete_task(task_id: int):
        deleted = await TaskRepository.delete_task(task_id)

        if not deleted:
            raise HTTPException(status_code=404, detail="Task not found")

        return deleted

    @staticmethod
    async def get_ongoing_tasks():
        tasks = await TaskRepository.get_ongoing_tasks()

        if not tasks:
            raise HTTPException(status_code=404, detail="No ongoing tasks found")

        return tasks

    @staticmethod
    async def get_completed_tasks():
        tasks = await TaskRepository.get_completed_tasks()

        if not tasks:
            raise HTTPException(status_code=404, detail="No completed tasks found")

        return tasks
