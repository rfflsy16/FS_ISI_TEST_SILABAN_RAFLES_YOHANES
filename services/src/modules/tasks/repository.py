from src.core.database import db
from src.modules.tasks.schema import TaskCreate, TaskUpdate

class TaskRepository:
    @staticmethod
    def _record_to_dict(record):
        return dict(record)

    @staticmethod
    async def get_all_tasks():
        query = """
            SELECT * FROM tasks
            ORDER BY is_completed ASC, created_at DESC
        """
        records = await db.fetch(query)
        return [TaskRepository._record_to_dict(record) for record in records]

    @staticmethod
    async def get_task(task_id: int):
        query = "SELECT * FROM tasks WHERE id = $1"
        result = await db.fetch(query, task_id)
        return TaskRepository._record_to_dict(result[0]) if result else None

    @staticmethod
    async def create_task(task: TaskCreate):
        query = "INSERT INTO tasks (title) VALUES ($1) RETURNING *"
        result = await db.fetch(query, task.title)
        return TaskRepository._record_to_dict(result[0])

    @staticmethod
    async def update_task(task_id: int, task: TaskUpdate):
        query = """
            UPDATE tasks SET title = $1, is_completed = $2 WHERE id = $3 RETURNING *
        """
        result = await db.fetch(query, task.title, task.is_completed, task_id)
        return TaskRepository._record_to_dict(result[0]) if result else None

    @staticmethod
    async def delete_task(task_id: int):
        query = "DELETE FROM tasks WHERE id = $1 RETURNING *"
        result = await db.fetch(query, task_id)
        return TaskRepository._record_to_dict(result[0]) if result else None

    @staticmethod
    async def get_ongoing_tasks():
        query = "SELECT * FROM tasks WHERE is_completed = FALSE ORDER BY created_at ASC"
        records = await db.fetch(query)
        return [TaskRepository._record_to_dict(record) for record in records]

    @staticmethod
    async def get_completed_tasks():
        query = "SELECT * FROM tasks WHERE is_completed = TRUE ORDER BY created_at DESC"
        records = await db.fetch(query)
        return [TaskRepository._record_to_dict(record) for record in records]
