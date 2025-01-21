import { useEffect, useState } from "react"
import TaskCard from "../components/TaskCard"
import TaskCardSkeleton from "../components/TaskCardSkeleton"
import { useTasks } from "../hooks/useTasks"
import { Link } from "react-router-dom"

export default function TaskPage() {
  const { tasks, loadTasks } = useTasks()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
      await loadTasks();
      setLoading(false);
    };
    fetchTasks();
  }, [])

  return (
    <div className="flex flex-col items-center  justify-center my-6 max-w-screen-xl mx-auto bg-white dark:bg-zinc-800">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="">Tasks</h1>
        <div className="flex justify-end gap-2 lg:gap-4">
          <input type="text" placeholder="Comprar..." className="rounded-full w-2/5 lg:w-full" />
          <Link to='/new'>
            <button className="flex items-center h-12">
              <svg className="me-2" xmlns="http://www.w3.org/2000/svg" height="18" width="15" viewBox="0 0 448 512"><path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" /></svg>
              Create Task
            </button>
          </Link>
        </div>


      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
        {loading ? (
          // Display skeleton cards while loading
          Array.from({ length: 6 }).map((_, index) => (
            <TaskCardSkeleton key={index} />
          ))
        ) : tasks.length === 0 ? (
          'No tasks yet'
        ) : (
          tasks.map(task => (
            <TaskCard task={task} key={task.id} />
          ))
        )}
      </div>
    </div>
  )
}

