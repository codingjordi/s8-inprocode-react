import axios from "axios"

export const getFountainsRequest = async () => {
    return await axios.get(import.meta.env.VITE_MAPBOX_TOKEN)
}