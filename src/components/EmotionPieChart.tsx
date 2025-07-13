// src/components/EmotionPieChart.tsx

//chart.js + react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { useRef, useState } from "react";
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const chartRef = useRef<any>(null);

  const totalAmount = data.reduce((sum, curr) => sum + curr.amount, 0);
  const chartData = {
    // labels: ["기쁨", "우울", "스트레스", "충동", "지루함"],
    labels: data.map((item) => item.emotion),
    datasets: [
      {
        label: "감정별 소비",
        // data: [3, 5, 8, 2, 1]
        data: data.map((item) => item.amount),
        //TODO : 라벨 키 별로 색 맵핑
        //EMOTION_COLORS[라벨키] -- 동적 키의 형태로 넣기
        backgroundColor: data.map((item) => item.color),
        borderWidth: 2,
        hoverOffset: 15,
        offset: data.map((_, idx) => (idx === selectedIndex ? 15 : 0)), // 클릭 시 강조
      },
    ],
  };

  const chartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%", // 도넛 내부 공간
    plugins: {
      legend: {
        display: false,
      },
      // legend: {
      //   position: "top" as const,
      //   labels: {
      //     boxWidth: 12,
      //     padding: 16,
      //   },
      // },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw as number;
            return `${context.label}: ${value.toLocaleString()}원`;
          },
        },
      },
    },
    onClick: (_, elements) => {
      if (!elements.length) return;

      const idx = elements[0].index;
      setSelectedIndex(idx);
    },
  };

  const selectedEmotion = selectedIndex !== null ? data[selectedIndex] : null;

  return (
    <div className="w-full max-w-md mx-auto mb-8 r">
      <h3 className="text-lg font-semibold text-center mb-4">
        감정별 지출 비율
      </h3>
      {/* 도넛 차트 중앙 텍스트 ----- 도넛차트 부분만 height 고정 */}
      <div className="relative h-[200px]">
        <Doughnut ref={chartRef} data={chartData} options={chartOptions} />

        {selectedEmotion && (
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-sm text-gray-500">
              {selectedEmotion.emotion}
            </div>
            {/* <div className="text-lg font-bold text-gray-800">
            {selectedEmotion.amount.toLocaleString()}원
          </div> */}
            <div className="text-xl font-bold text-gray-600">
              {Math.round((selectedEmotion.amount / totalAmount) * 100)}%
            </div>
          </div>
        )}
      </div>
      {/* 하단 감정 리스트 */}
      <ul className="mt-6 space-y-2">
        {data.map((item) => {
          const percent = (item.amount / totalAmount) * 100;
          return (
            <li
              key={item.emotion}
              className="flex items-center justify-between text-sm px-2 py-1"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-700">{item.emotion}</span>
                <span className="text-xs text-gray-400">
                  {percent.toFixed(1)}%
                </span>
              </div>
              <div className="text-gray-800 font-medium">
                {item.amount.toLocaleString()}원 &nbsp;&gt;
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EmotionPieChart;
