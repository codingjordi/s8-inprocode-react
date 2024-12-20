import BarGraph from "@/components/BarGraph";
import LineGraph from "@/components/LineGraph.jsx";

export default function Graphics() {
 

  return (
    <div className="flex flex-col items-center my-6">
      <h1 className="text-center">Graphics</h1>
      <div className="w-3/4">
        <LineGraph />
        <BarGraph />
      </div>
    </div>
  );
}
