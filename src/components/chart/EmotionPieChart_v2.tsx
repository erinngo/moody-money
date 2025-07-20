import { Pie } from "react-chartjs-2";
import EmotionPieDetailList from "./EmotionPieDetailList";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

interface EmotionData {
  emotion: string;
  percentage: number;
  color: string;
}

interface EmotionPieChartProps {
  data: any; // Chart.js용 데이터
  detailData?: EmotionData[]; // 리스트용 데이터
  showDetailList?: boolean;
}

const EmotionPieChart = ({
  data,
  detailData,
  showDetailList = true,
}: EmotionPieChartProps) => {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex flex-col items-center">
        <div className="w-100 h-100">
          {/* <Pie data={data} /> */}
          {data?.datasets?.length ? (
            <Pie data={data} />
          ) : (
            <p className="text-gray-400 text-sm">데이터 없음</p>
          )}
        </div>

        {showDetailList && detailData && (
          <EmotionPieDetailList data={detailData} />
        )}
      </div>
    </div>
  );
};

export default EmotionPieChart;
