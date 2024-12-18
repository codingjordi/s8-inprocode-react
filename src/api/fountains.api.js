import axios from "axios"

export const getFountainsRequest = async () => {
    return await axios.get(import.meta.env.API_GET_URL)
}