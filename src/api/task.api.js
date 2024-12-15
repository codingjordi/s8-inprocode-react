import axios from 'axios'

export const getTasksRequest = async () => {
    return await axios.get('http://localhost:4000/tasks')
}

export const getTaskById = async (id) => {
    return await axios.get('http://localhost:4000/tasks/' + id)
}

export const createTaskRequest = async (task) => {
     return await axios.post('http://localhost:4000/tasks', task)
}

export const deleteTaskRequest = async (id) => {
    return await axios.delete('http://localhost:4000/tasks/' + id)
}

export const updateTaskRequest = async (id, newFields) => {
    return await axios.put('http://localhost:4000/tasks/' + id, newFields)
}

export const toggleTaskDoneRequest = async (id, done) => { // ha de ser done porque ha de matcheear con la col de la db (creo)
    return await axios.put('http://localhost:4000/tasks/' + id, {
        done,
    })
}

