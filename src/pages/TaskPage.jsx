import { useEffect, useState } from "react"
import TaskCard from "../components/TaskCard"
import TaskCardSkeleton from "../components/TaskCardSkeleton"
import { useTasks } from "../hooks/useTasks"

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
    <div className="flex flex-col items-center my-6 px-5">
      <h1>Tasks</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid- gap-6 my-5">
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

