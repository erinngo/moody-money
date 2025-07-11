// src/components/EmotionPieChart.tsx
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import type { PieChartDataType } from "@/utils/computePieChart";

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * 1. 색상 Utils
 * 2. 감정별 지출 건수 집계
 *
 * 필요한 Props
 * - 감정들, 감정별 지출 금액 합, 컬러
 *
 */
interface EmotionPieChartProps {
  data: PieChartDataType;
}
const EmotionPieChart = ({ data }: EmotionPieChartProps) => {
  const chartData = {
    // labels: ["기쁨", "우울", "스트레스", "충동", "지루함"],
    labels: data.map((item) => item.emotion),
    datasets: [
      {
        label: "감정별 소비 합계",
        // data: [3, 5, 8, 2, 1]
        data: data.map((item) => item.amount),
        //TODO : 라벨 키 별로 색 맵핑
        //EMOTION_COLORS[라벨키] -- 동적 키의 형태로 넣기
        backgroundColor: data.map((item) => item.color),
        borderWidth: 1,
      },
    ],
  };

  console.log(Object.keys(data));

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-center mb-4">
        감정별 지출 비율
      </h3>
      <Pie data={chartData} />
    </div>
  );
};

export default EmotionPieChart;
