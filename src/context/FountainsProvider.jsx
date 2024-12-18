import { useState } from 'react'
import { FountainsContext } from './FountainsContext'
import { getFountainsRequest } from '../api/fountains.api'

export default function FountainsProvider( { children }) {

    const [fountains, setFountains] = useState([]);

    const loadFountains = async () => {
        try {
            const response = await getFountainsRequest()
            console.log(response)
            setFountains(response.data)
        } catch (error) {
            console.error('Error ❌: ', error)
        }
    }
    
  return (
    <FountainsContext.Provider value={{fountains, loadFountains}}>
        {children}
    </FountainsContext.Provider>
  )
}
