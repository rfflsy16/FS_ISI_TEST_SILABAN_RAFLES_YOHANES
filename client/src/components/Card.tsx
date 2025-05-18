import { Pencil, XCircle, CheckCircle } from "lucide-react"

interface CardProps {
    id?: number
    title: string
    date: string
    completed: boolean
    selected?: boolean
    onEdit: () => void
    onDelete: () => void
    onComplete: () => void
}

export default function Card({ 
    title, 
    date, 
    completed, 
    selected = false,
    onEdit, 
    onDelete, 
    onComplete 
}: CardProps) {
    return (
        <div className={`task-card ${selected ? 'selected' : ''}`}>
            <div className="flex flex-col">
                <div className="flex items-center gap-1">
                    <span className={completed ? "line-through text-gray-500" : ""}>
                        {title}
                    </span>
                    <Pencil 
                        size={16} 
                        className="icon" 
                        onClick={onEdit} 
                    />
                </div>
                <span className="text-xs text-gray-500">{date}</span>
            </div>
            <div className="flex gap-2">
                <XCircle 
                    size={20} 
                    className="icon" 
                    onClick={onDelete}
                />
                {!completed && (
                    <CheckCircle 
                        size={20} 
                        className="icon" 
                        onClick={onComplete}
                    />
                )}
            </div>
        </div>
    )
}