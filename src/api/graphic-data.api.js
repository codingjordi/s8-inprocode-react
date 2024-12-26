
export const getGraphicData = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_GET_URL}graphic-data`)
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); 
      console.log("Data fetched successfully:", data); 
      return data;
    } catch (error) {
      console.error("Error in getGraphicData:", error);
      throw error; 
  };
}


