import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface EmotionBarChartProps {
  data: Record<string, Record<string, number>>;
}
const EmotionBarChart = ({ data }: EmotionBarChartProps) => {
  const chartData = {
    // labels: ["기쁨", "우울", "스트레스", "충동", "지루함"],
    labels: Object.keys(data),
    datasets: [
      {
        label: "식비",
        data: [5000, 12000, 3000, 1000, 1000],
        backgroundColor: "#facc15",
      },
      {
        label: "쇼핑",
        data: [2000, 10000, 4000, 3000, 1000],
        backgroundColor: "#f87171",
      },
      {
        label: "취미",
        data: [8000, 2000, 1000, 0, 1000],
        backgroundColor: "#60a5fa",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      // legend: {
      //   position: "top" as const,
      // },
      // tooltip: {
      //   mode: "index" as const,
      //   intersect: false,
      // },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h3 className="text-lg font-semibold text-center mb-4">
        감정 × 카테고리 소비 분석
      </h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EmotionBarChart;
