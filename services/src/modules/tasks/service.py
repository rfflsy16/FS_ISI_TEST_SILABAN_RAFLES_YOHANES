def get_all_todo_service():
    return {"message": "hello from get_all_todo_service"}

def create_todo_service():
    return {"message": "hello from create_todo_service"}

def get_todo_service(todo_id: int):
    return {"message": f"hello from get_todo_service {todo_id}"}

def update_todo_service(todo_id: int):
    return {"message": f"hello from update_todo_service {todo_id}"}

def delete_todo_service(todo_id: int):
    return {"message": f"hello from delete_todo_service {todo_id}"}
