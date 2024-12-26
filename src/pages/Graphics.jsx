import BarGraph from "@/components/BarGraph";
import LineGraph from "@/components/LineGraph.jsx";
import { useGraphicData } from "@/hooks/useGraphicData";
import { useEffect } from "react";

export default function Graphics() {
 
  const { graphicData, loadGraphicData } = useGraphicData()

  useEffect(() => {
    loadGraphicData();
  }, [])

  const chartData = {
    labels: graphicData.map(item => item.year), // Extrae los años
    datasets: [
      {
        label: 'Gains',
        data: graphicData.map(item => parseFloat(item.gains)), // Extrae y convierte los valores de 'gains' a números
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.2)'
      },
      {
        label: 'Loss',
        data: graphicData.map(item => parseFloat(item.loss)), // Extrae y convierte los valores de 'loss' a números
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)'
      }
    ]
  };

  return (
    <div className="flex flex-col items-center my-6">
      <h1 className="text-center">Graphics</h1>
      <div className="w-3/4">
      <h2>Financial report</h2>
        <div className="md:flex justify-between">
          <div className="w-auto">
            <LineGraph data={chartData} />
          </div>
          
          <div className="w-auto">
            <BarGraph data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}
