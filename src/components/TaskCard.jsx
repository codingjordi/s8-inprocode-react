import { useTasks } from "../hooks/useTasks"
import { useNavigate } from "react-router-dom"

export default function TaskCard({ task }) {

    const { deleteTask, toggleTaskDone } = useTasks()
    const navigate = useNavigate()

    const handleDone = async () => {
        await toggleTaskDone(task.id)
    }

    return (
        <div className="bg-zinc-700 py-4 px-4 rounded-[10px]">
            <div className="flex flex-col">
                <h2>{task.title}</h2>
                <p>{task.description}</p>
            
                <div>
                <span>
                    {new Date(task.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
                <span>{task.done === 1 ? '✅' : '❌'}</span>
                </div>
                

            </div>
            <div className="flex gap-2 pt-3 h-15">
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                <button onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
                <button onClick={() => handleDone(task.done)}>Check task</button>
            </div>
        </div>
    )
}
