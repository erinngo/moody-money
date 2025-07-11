/**
 *
 * computeAmountsByEmotion
 * 감정별로 금액을 합산한 객체를 반환
 * {
 * 기쁨: '20000'
 * 충동: '30000'
 * }
 *
 */
import { EMOTION_ITEMS } from "@/constants/emotion";
type PieRowData = {
  selectedEmotion: string;
  amount: number;
}[];
export type PieChartDataType = {
  emotion: string;
  amount: number;
  color: string;
}[];

/**
 * pie chart를 그리기 위해 필요한 data 정리
 * emotion, amount, color 배열
 *
 *
 */

export const computePieChartData = (data: PieRowData): PieChartDataType => {
  //1. 감정 별 합계 구하기
  // {
  //   "기쁨": 4000,
  //   "우울": 1500,
  // }

  console.log("raw data:", data);
  const emotionSumMap = data.reduce<Record<string, number>>((acc, curr) => {
    const emotion = curr.selectedEmotion;
    const amount = curr.amount;

    acc[emotion] = (acc[emotion] || 0) + amount;
    return acc;
  }, {});

  console.log(emotionSumMap);
  //2. color 추가하기 - EMOTION_ITEMS에서 정보 가져오기
  /**
   * Object.entries(객체)
   * [['기쁨', 4000], ['우울', 1500]]
   */
  const pieChartData = Object.entries(emotionSumMap).map(
    ([emotion, amount]) => {
      const color =
        EMOTION_ITEMS.find((item) => item.label === emotion)?.color ?? "gray";
      return { emotion, amount, color };
    }
  );
  console.log(pieChartData);

  return pieChartData;
};
