from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TaskBase(BaseModel):
    title: str

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    is_completed: bool

class Task(TaskBase):
    id: int
    title: str
    is_completed: bool
    created_at: datetime

    class Config:
        from_attributes = True
