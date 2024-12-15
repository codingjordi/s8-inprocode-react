import { useState } from "react";
import { getTasksRequest, deleteTaskRequest, getTaskById, updateTaskRequest, toggleTaskDoneRequest } from "../api/task.api";
import { TaskContext } from "./TaskContext";
import { createTaskRequest } from "../api/task.api";

export const TaskContextProvider = ({ children }) => {

    const [tasks, setTasks] = useState([])

    const loadTasks = async () => {
        const response = await getTasksRequest()
        setTasks(response.data)
    }

    const getTask = async (id) => {
        try {
            const response = await getTaskById(id)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const deleteTask = async (id) => {
        try {
            const response = await deleteTaskRequest(id)
            setTasks(tasks.filter(task => task.id !== id))
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const createTask = async (task) => {
        try {
            const response = await createTaskRequest(task)
            setTasks([...tasks, response.data])
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const updateTask = async (id, newFields) => {
        try {
            const response = await updateTaskRequest(id, newFields)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const toggleTaskDone = async (id) => {
        try {
            const fetchedTask = tasks.find((task) => task.id === id);
            await toggleTaskDoneRequest(id, fetchedTask.done === 0 ? true : false)
            
            setTasks(tasks.map(task => 
                task.id === id 
                    ? { ...task, done: task.done === 0 ? 1 : 0 } 
                    : task
            ));
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <TaskContext.Provider value={{ tasks, loadTasks, getTask, deleteTask, createTask, updateTask, toggleTaskDone }}>
            {children}
        </TaskContext.Provider>
    );
}