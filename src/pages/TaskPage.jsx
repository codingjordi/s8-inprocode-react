import { useEffect } from "react"
import TaskCard from "../components/TaskCard"
import { useTasks } from "../hooks/useTasks"

export default function TaskPage() {

  const { tasks, loadTasks } = useTasks()

  useEffect(() => {
    loadTasks();
  }, [])

  return (
    <div className="flex flex-col items-center my-6 px-5">
      <h1>Tasks</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid- gap-6 my-5">
        {tasks.length === 0 ? 'No tasks yet' : tasks.map(task => {
          return (
            <TaskCard task={task} key={task.id} />
          );
        })}
      </div>
    </div>
  )
}
