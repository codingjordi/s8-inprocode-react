import axios from "axios"

export const getFountainsRequest = async () => {
    return await axios.get(`${import.meta.env.VITE_API_GET_URL}fountains`)
}