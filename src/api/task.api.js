import axios from 'axios'

export const getTasksRequest = async () => {
    return await axios.get('https://s8-inprocode-db-railway-production.up.railway.app/tasks')
}

export const getTaskById = async (id) => {
    return await axios.get('https://s8-inprocode-db-railway-production.up.railway.app/tasks/' + id)
}

export const createTaskRequest = async (task) => {
     return await axios.post('https://s8-inprocode-db-railway-production.up.railway.app/tasks/', task)
}

export const deleteTaskRequest = async (id) => {
    return await axios.delete('https://s8-inprocode-db-railway-production.up.railway.app/tasks/' + id)
}

export const updateTaskRequest = async (id, newFields) => {
    return await axios.put('https://s8-inprocode-db-railway-production.up.railway.app/tasks/' + id, newFields)
}

export const toggleTaskDoneRequest = async (id, done) => { // ha de ser done porque ha de matcheear con la col de la db (creo)
    return await axios.put('https://s8-inprocode-db-railway-production.up.railway.app/tasks/' + id, {
        done,
    })
}

