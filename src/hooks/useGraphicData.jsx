import { useContext } from "react";
import { GraphicDataContext } from "@/context/GraphicDataContext";

export const useGraphicData = () => {
    const context = useContext(GraphicDataContext)
    if (context === undefined) {
        throw new Error("🚨 => useGraphicData must be used within a GraphicDataProvider")
    }
    return context
}