import { useEffect } from "react"
import TaskCard from "../components/TaskCard"
import { useTasks } from "../hooks/useTasks"

export default function TaskPage() {

  const {tasks, loadTasks} =  useTasks()

useEffect(() => {
  loadTasks(); 
}, [])

  return (
    <div>
      <h1>Tasks</h1>
      {tasks.length === 0 ? 'No tasks yet' : tasks.map(task => {
        return(
          <TaskCard task={task} key={task.id} />
        );
      })}
    </div>
  )
}
