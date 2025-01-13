import axios from 'axios'

export const getEventsRequest = async () => {
    return await axios.get('https://s8-inprocode-db-railway-production.up.railway.app/events/')
}

export const createEventRequest = async (event) => {
     return await axios.post('https://s8-inprocode-db-railway-production.up.railway.app/events/', event)
}

export const deleteEventRequest = async (id) => {
    return await axios.delete('https://s8-inprocode-db-railway-production.up.railway.app/events/' + id)
}

export const updateEventRequest = async (id, event) => {
    return await axios.put(`https://s8-inprocode-db-railway-production.up.railway.app/events/${id}`, event);
}