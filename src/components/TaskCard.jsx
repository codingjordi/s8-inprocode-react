import { useTasks } from "../hooks/useTasks"
import { useNavigate } from "react-router-dom"

export default function TaskCard({ task }) {

    const { deleteTask, toggleTaskDone } = useTasks()
    const navigate = useNavigate()

    const handleDone = async () => {
        await toggleTaskDone(task.id)
    }

    return (
        <div className="py-4 px-4 rounded-[10px] bg-zinc-300 dark:bg-zinc-600">
            <div className="flex flex-col">
                <h2 className="">{task.title}</h2>
                <p>{task.description}</p>
            
                <div className="flex gap-3">
                <span className='font-medium'>
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
                <button className='dark:text-zinc-50 bg-gray-100 dark:bg-zinc-800 text-black px-4 py-2 rounded-lg font-semibold text-center transition duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-zinc-900' onClick={() => deleteTask(task.id)}>Delete</button>
                <button className='dark:text-zinc-50 bg-gray-100 dark:bg-zinc-800 text-black px-4 py-2 rounded-lg font-semibold text-center transition duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-zinc-900' onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
                <button className='dark:text-zinc-50 bg-gray-100 dark:bg-zinc-800 text-black px-4 py-2 rounded-lg font-semibold text-center transition duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-zinc-900' onClick={() => handleDone(task.done)}>Check task</button>
            </div>
        </div>
    )
}
