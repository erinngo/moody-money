/**
 * computePieChartData.ts
 * 감정별 합산 → 퍼센트 계산 → Chart.js & 리스트용 데이터 생성
 */

import { EMOTION_ITEMS } from "@/constants/emotion";

// 타입
type PieRowData = {
  selectedEmotion: string;
  amount: number;
}[];

export interface DetailDataType {
  emotion: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface ChartDataType {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
}

interface PieChartResult {
  chartData: ChartDataType;
  detailData: DetailDataType[];
}

/**
 * ✅ 감정별 금액 합산 후 PieChart 데이터 생성
 * - Chart.js 데이터 (labels, datasets)
 * - Detail 리스트 데이터 (emotion, amount, percentage, color)
 */
export const computePieChartData = (data: PieRowData): PieChartResult => {
  // 1. 감정별 금액 합산
  const emotionSumMap = data.reduce<Record<string, number>>((acc, curr) => {
    const emotion = curr.selectedEmotion;
    const amount = curr.amount;
    acc[emotion] = (acc[emotion] || 0) + amount;
    return acc;
  }, {});

  // 2. 전체 합계 (퍼센트 계산용)
  const totalAmount = Object.values(emotionSumMap).reduce(
    (sum, v) => sum + v,
    0
  );

  // 3. 리스트용 데이터 (퍼센트 & 색상 추가)
  const detailData: DetailDataType[] = Object.entries(emotionSumMap).map(
    ([emotion, amount]) => {
      const color =
        EMOTION_ITEMS.find((item) => item.label === emotion)?.color ?? "#ccc";
      const percentage = totalAmount > 0 ? (amount / totalAmount) * 100 : 0;
      return {
        emotion,
        amount,
        percentage: Number(percentage.toFixed(1)),
        color,
      };
    }
  );

  // 4. Chart.js용 데이터
  const chartData: ChartDataType = {
    labels: detailData.map((item) => item.emotion),
    datasets: [
      {
        data: detailData.map((item) => item.percentage),
        backgroundColor: detailData.map((item) => item.color),
      },
    ],
  };

  return { chartData, detailData };
};
