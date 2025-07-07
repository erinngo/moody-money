// src/components/EmotionPieChart.tsx
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { EMOTION_ITEMS } from "@/constants/emotion";

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
  data: Record<string, number>;
}
const EmotionPieChart = ({ data }: EmotionPieChartProps) => {
  const chartData = {
    // labels: ["기쁨", "우울", "스트레스", "충동", "지루함"],
    labels: Object.keys(data),
    datasets: [
      {
        label: "감정별 소비 합계",
        // data: [3, 5, 8, 2, 1]
        data: Object.values(data),
        //TODO : 라벨 키 별로 색 맵핑
        //EMOTION_COLORS[라벨키] -- 동적 키의 형태로 넣기
        backgroundColor: Object.keys(data).map(
          (emotionLabel) =>
            EMOTION_ITEMS.find((e) => e.label === emotionLabel)?.color
        ),
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
