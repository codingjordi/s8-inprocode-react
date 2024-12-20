import { Bar } from 'react-chartjs-2';
import { initialData } from '../initialData.js'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default function BarGraph() {

  return (
    <div>
      <Bar data={initialData} options={{}}/>
    </div>
  )
}
