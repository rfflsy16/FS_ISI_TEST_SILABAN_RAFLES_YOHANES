import { useEffect, useState } from "react"
import type { Task } from "../api/task"
import {
    getOngoingTasks,
    getCompletedTasks,
    createTask,
    updateTask,
    deleteTask,
    completeTask
} from "../api/task"
import { Pencil, XCircle, CheckCircle, Circle } from "lucide-react"
import Form from "../components/Form"

export default function Tasks() {
    const [ongoingTasks, setOngoingTasks] = useState<Task[]>([])
    const [completedTasks, setCompletedTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [editTask, setEditTask] = useState<Task | null>(null)

    useEffect(() => {
        fetchTasks()
    }, [])

    const fetchTasks = async () => {
        setLoading(true)
        setError("")

        try {
            const ongoing = await getOngoingTasks().catch(err => {
                console.error("Failed to fetch ongoing tasks:", err);
                setError("Failed to fetch ongoing tasks");
                return [];
            });
            
            const completed = await getCompletedTasks().catch(err => {
                console.error("Failed to fetch completed tasks:", err);
                setError(prev => prev ? `${prev}, and failed to fetch completed tasks` : "Failed to fetch completed tasks");
                return [];
            });
            
            setOngoingTasks(ongoing);
            setCompletedTasks(completed);
        } finally {
            setLoading(false)
        }
    }

    const handleCreateTask = async (title: string) => {
        try {
            await createTask(title)
            fetchTasks()
        } catch {
            setError("Failed to create task")
        }
    }

    const handleUpdateTask = async (title: string) => {
        if (!editTask) return
        
        try {
            await updateTask(editTask.id, title, editTask.completed)
            setEditTask(null)
            setEditMode(false)
            fetchTasks()
        } catch {
            setError("Failed to update task")
        }
    }

    const handleEditTask = (task: Task) => {
        setEditTask(task)
        setEditMode(true)
    }

    const handleCancelEdit = () => {
        setEditTask(null)
        setEditMode(false)
    }

    const handleDeleteTask = async (id: number) => {
        try {
            await deleteTask(id)
            if (editTask?.id === id) {
                setEditTask(null)
                setEditMode(false)
            }
            fetchTasks()
        } catch {
            setError("Failed to delete task")
        }
    }

    const handleCompleteTask = async (id: number, title: string) => {
        try {
            await completeTask(id, title)
            if (editTask?.id === id) {
                setEditTask(null)
                setEditMode(false)
            }
            fetchTasks()
        } catch {
            setError("Failed to complete task")
        }
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
    }

    return (
        <div className="min-h-screen">
            <div className="header">
                <h1>Task Management</h1>
            </div>
            
            <div className="container mx-auto px-4 max-w-lg">
                <div className="form-section">
                    {editMode ? (
                        <Form 
                            onSubmit={handleUpdateTask}
                            onCancel={handleCancelEdit}
                            initialTitle={editTask?.title || ""}
                            isEdit={true}
                        />
                    ) : (
                        <Form 
                            onSubmit={handleCreateTask}
                            isEdit={false}
                        />
                    )}
                    
                    {error && <p className="error-message">{error}</p>}
                </div>

                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <div className="tasks-container">
                        <div className="task-section">
                            <h2 className="font-bold">Ongoing Task</h2>
                            {ongoingTasks.length === 0 ? (
                                <p className="empty-message">Belum ada task ongoing</p>
                            ) : (
                                <div className="task-list">
                                    {ongoingTasks.map(task => (
                                        <div 
                                            key={task.id} 
                                            className={`task-card ${editTask?.id === task.id ? 'selected' : ''}`}
                                        >   
                                            <div className="task-content">
                                                <div className="task-title">
                                                    <span>{task.title}</span>
                                                    <Pencil 
                                                        size={16} 
                                                        className="edit-icon" 
                                                        onClick={() => handleEditTask(task)}
                                                    />
                                                </div>
                                                <div className="task-date">
                                                    {formatDate(task.created_at)}
                                                </div>
                                            </div>
                                            <div className="task-actions">
                                                <XCircle
                                                    size={20}
                                                    className="delete-icon"
                                                    onClick={() => handleDeleteTask(task.id)}
                                                />
                                                <Circle
                                                    size={20}
                                                    className="complete-icon"
                                                    onClick={() => handleCompleteTask(task.id, task.title)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="task-section">
                            <h2 className="font-poppins">Completed Task</h2>
                            {completedTasks.length === 0 ? (
                                <p className="empty-message">Belum ada task completed</p>
                            ) : (
                                <div className="task-list">
                                    {completedTasks.map(task => (
                                        <div 
                                            key={task.id} 
                                            className={`task-card ${editTask?.id === task.id ? 'selected' : ''}`}
                                        >
                                            <div className="task-content">
                                                <div className="task-title">
                                                    <span className="completed">{task.title}</span>
                                                    <Pencil 
                                                        size={16} 
                                                        className="edit-icon" 
                                                        onClick={() => handleEditTask(task)}
                                                    />
                                                </div>
                                                <div className="task-date">
                                                    {formatDate(task.created_at)}
                                                </div>
                                            </div>
                                            <div className="task-actions">
                                                <XCircle
                                                    size={20}
                                                    className="delete-icon"
                                                    onClick={() => handleDeleteTask(task.id)}
                                                />
                                                <CheckCircle
                                                    size={20}
                                                    className="completed-icon"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}