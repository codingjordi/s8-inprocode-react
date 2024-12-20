import { Line } from 'react-chartjs-2';
import { initialData } from '../initialData.js'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export default function LineGraph() {

  return (
    <div>
      <Line data={initialData} options={{}}/>
    </div>
  )
}
