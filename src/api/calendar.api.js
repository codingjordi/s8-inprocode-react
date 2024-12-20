import axios from 'axios'

export const getEventsRequest = async () => {
    return await axios.get('https://s8-inprocode-db-railway-production.up.railway.app/calendar/')
}

export const createEventRequest = async (event) => {
     return await axios.post('https://s8-inprocode-db-railway-production.up.railway.app/calendar/', event)
}

export const deleteEventRequest = async (id) => {
    return await axios.delete('https://s8-inprocode-db-railway-production.up.railway.app/calendar/' + id)
}