import { useState } from 'react'
import { CalendarContext } from './CalendarContext'
import { getEventsRequest } from '@/api/calendar.api'

export default function CalendarProvider({ children }) {

    const [events, setEvents] = useState([])

    const loadEvents = async () => {
       try {
         const response = await getEventsRequest();
         setEvents(response)
       } catch (error) {
        console.error(error)
       }
    }

    const createEvent = async () => {
        try {
          const response = await getEventsRequest();
          setEvents(response)
        } catch (error) {
         console.error(error)
        }
     }

     const deleteEvent = async () => {
        try {
          const response = await getEventsRequest();
          setEvents(response)
        } catch (error) {
         console.error(error)
        }
     }



    return (
        <CalendarContext.Provider value={{ events, loadEvents, createEvent, deleteEvent }}>
            {children}
        </CalendarContext.Provider>
    )
}
