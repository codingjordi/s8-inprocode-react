import { useContext } from "react"
import { FountainsContext } from "../context/FountainsContext"

export const useFountains = () => {
    const context = useContext(FountainsContext)
    if (context === undefined) {
        throw new Error("🚨 => useFountains must be used within a FountainsContextProvider")
    }
    return context
}