import BarGraph from "@/components/BarGraph";
import LineGraph from "@/components/LineGraph.jsx";
import { useGraphicData } from "@/hooks/useGraphicData";
import { useEffect } from "react";

export default function Graphics() {
  const { graphicData, loadGraphicData } = useGraphicData();

  useEffect(() => {
    loadGraphicData();
  }, []);

  const chartData = {
    labels: graphicData.map((item) => item.year), // Extrae los años
    datasets: [
      {
        label: "Gains",
        data: graphicData.map((item) => parseFloat(item.gains)), // Valores de 'gains'
        borderColor: "green",
        backgroundColor: "rgba(0, 128, 0, 0.2)",
      },
      {
        label: "Loss",
        data: graphicData.map((item) => parseFloat(item.loss)), // Valores de 'loss'
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center my-6 px-4 max-w-screen-lg mx-auto">
      <h1 className="text-center text-2xl font-bold mb-4">Graphics</h1>
      <div className="w-full flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-4">Financial Reports</h2>
        <div className="flex flex-wrap justify-center items-center gap-6">
          <div className="w-full md:w-3/4">
            <h3 className="text-left text-xl font-medium mb-2">Line Chart</h3>
            <div className="bg-white shadow-md p-4 rounded-lg">
              <LineGraph data={chartData} />
            </div>
          </div>

          <div className="w-full md:w-3/4">
            <h3 className="text-left text-xl font-medium mb-2">Bar Chart</h3>
            <div className="bg-white shadow-md p-4 rounded-lg">
              <BarGraph data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
