// Task interface from API
export type Task = {
    id: number
    title: string
    created_at: string
    completed: boolean
}

// Backend task interface (untuk mapping)
type BackendTask = {
    id: number
    title: string
    created_at: string
    is_completed: boolean
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Helper to map backend response to frontend Task type
function mapTask(task: BackendTask): Task {
    return {
        id: task.id,
        title: task.title,
        created_at: task.created_at,
        completed: task.is_completed
    };
}

/**
 * Get all tasks (not used directly)
 */
export async function getTasks(): Promise<Task[]> {
    const res = await fetch(`${API_URL}/api/tasks`)
    if (!res.ok) throw new Error('Failed to fetch tasks')
    const data = await res.json() as BackendTask[]
    return data.map(mapTask)
}

/**
 * Get only ongoing tasks
 */
export async function getOngoingTasks(): Promise<Task[]> {
    const res = await fetch(`${API_URL}/api/tasks/ongoing`)
    if (!res.ok) throw new Error('Failed to fetch ongoing tasks')

    try {
        const data = await res.json() as BackendTask[]
        return Array.isArray(data) ? data.map(mapTask) : []
    } catch (error) {
        console.error('Error parsing ongoing tasks response:', error)
        return []
    }
}

/**
 * Get only completed tasks
 */
export async function getCompletedTasks(): Promise<Task[]> {
    const res = await fetch(`${API_URL}/api/tasks/completed`)
    if (!res.ok) throw new Error('Failed to fetch completed tasks')

    try {
        const data = await res.json() as BackendTask[]
        return Array.isArray(data) ? data.map(mapTask) : []
    } catch (error) {
        console.error('Error parsing completed tasks response:', error)
        return []
    }
}

/**
 * Create a new task
 */
export async function createTask(title: string): Promise<Task> {
    const res = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    })
    if (!res.ok) throw new Error('Failed to create task')
    const data = await res.json() as BackendTask
    return mapTask(data)
}

/**
 * Update an existing task
 */
export async function updateTask(id: number, title: string, is_completed: boolean = false): Promise<Task> {
    const res = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, is_completed })
    })
    if (!res.ok) throw new Error('Failed to update task')
    const data = await res.json() as BackendTask
    return mapTask(data)
}

/**
 * Delete a task by ID
 */
export async function deleteTask(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'DELETE'
    })
    if (!res.ok) throw new Error('Failed to delete task')
}

/**
 * Complete a task by updating its completed status
 */
export async function completeTask(id: number, title: string): Promise<Task> {
    const res = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, is_completed: true })
    })
    if (!res.ok) throw new Error('Failed to complete task')
    const data = await res.json() as BackendTask
    return mapTask(data)
} 