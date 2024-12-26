import { getGraphicData } from "@/api/graphic-data.api.js";
import { GraphicDataContext } from "../context/GraphicDataContext.jsx";
import { useState } from "react";

export default function GraphicDataProvider ({ children }) {

    const [graphicData, setGraphicData] = useState([])

    const loadGraphicData = async () => {
        try {
            const response = await getGraphicData();
            console.log('Data fetched from api: ', response)
            setGraphicData(response)
        } catch (error) {
            console.error('Error while loadGraphicData', error)
        }

    }

    console.log("graphicData in provider:", graphicData); // Revisa el estado actual del contexto


    return (
        <GraphicDataContext.Provider value={{ graphicData, loadGraphicData }}>
            {children}
        </GraphicDataContext.Provider>
    );
}
