import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { BarMatrix } from "@/utils/computeBarMatrix";
import { CATEGORY_COLORS } from "@/constants/categories";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

/**
 * 필요한 데이터?
 * 감정
 * 카테고리
 * 카테고리별로 각 감정에 얼만큼 사용했는지 확인할 수 있어야함
 * 
 * [
  {
    emotion: "기쁨",
    data: [
      { category: "식비", amount: 5000 },
      { category: "쇼핑", amount: 3000 },
    ]
  },
  {
    emotion: "우울",

  }
  ]

 */
interface EmotionBarChartProps {
  data: BarMatrix;
}
const EmotionBarChart = ({ data }: EmotionBarChartProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center text-gray-400">
        데이터 로딩 중...
      </div>
    );
  }
  //감정 추출
  const labels = data.map((d) => d.emotion);

  //카테고리 추출 (중복없이)
  const allCategoriesSet = new Set<string>();
  data.forEach((emotionGroup) => {
    emotionGroup.data.forEach((catItem) => {
      allCategoriesSet.add(catItem.category);
    });
  });

  //chart를 그리기 위한 datasets 만들기
  const allCategories = Array.from(allCategoriesSet); // 완전한 배열로 변경
  console.log(allCategories);
  const datasets = allCategories.map((category) => {
    return {
      label: category, //식비,쇼핑 ...
      data: data.map((emotionGroup) => {
        const match = emotionGroup.data.find(
          (item) => item.category === category
        );
        return match ? match.amount : 0;
      }),
      backgroundColor: CATEGORY_COLORS[category] ?? "#ccc",
    };
  });

  const chartData = {
    labels,
    datasets,
  };

  // const chartData = {
  //   // labels: ["기쁨", "우울", "스트레스", "충동", "지루함"],
  //   labels: Object.keys(data),
  //   datasets: [
  //     {
  //       label: "식비",
  //       data: [5000, 12000, 3000, 1000, 1000],
  //       backgroundColor: "#facc15",
  //     },
  //     {
  //       label: "쇼핑",
  //       data: [2000, 10000, 4000, 3000, 1000],
  //       backgroundColor: "#f87171",
  //     },
  //     {
  //       label: "취미",
  //       data: [8000, 2000, 1000, 0, 1000],
  //       backgroundColor: "#60a5fa",
  //     },
  //   ],
  // };

  const options = {
    indexAxis: "y" as const,
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      // legend: {
      //   display: false, //범례 숨김
      // },
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
    <div className="w-full max-w-3xl mx-auto h-96">
      {/* <h3 className="text-lg font-semibold text-center mb-4">
        감정 × 카테고리 소비 분석
      </h3> */}
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EmotionBarChart;
