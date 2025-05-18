import { useState, useEffect } from "react"

interface FormProps {
    onSubmit: (title: string) => void
    onCancel?: () => void
    initialTitle?: string
    isEdit?: boolean
}

export default function Form({ onSubmit, onCancel, initialTitle = "", isEdit = false }: FormProps) {
    const [title, setTitle] = useState(initialTitle)

    useEffect(() => {
        setTitle(initialTitle)
    }, [initialTitle])

    return (
        <div>
            <p className="font-poppins">Title</p>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    if (title.trim()) onSubmit(title.trim())
                }}
            >
                <div className="input-container">
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                
                <div className="button-container">
                    {isEdit ? (
                        <>
                            <button
                                type="submit"
                                className="update-button"
                            >
                                Update Task
                            </button>
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            type="submit"
                            className="add-button"
                        >
                            Add Task
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}