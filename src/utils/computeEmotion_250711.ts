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
type PieInputType = {
  emotion: string;
  amount: number;
}[];
export type PieChartDataType = {
  emotion: string;
  amount: number;
  color: string;
}[];
type BarDataType = {
  emotion: string;
  category: string;
  amount: number;
}[];
// export const computeAmountsByEmotion = (
//   data: PieDataType
// ): Record<string, number> => {
//   return data.reduce((acc, curr) => {
//     acc[curr.emotion] = (acc[curr.emotion] || 0) + curr.amount;
//     return acc;
//   }, {} as Record<string, number>);
// };

/**
 * 
 * 감정별, 카테고리별 지출 합계 계산
 * {
  스트레스: { 식비: 12000, 쇼핑: 30000 },
  기쁨: { 취미: 15000 }
}
 */
export const computeEmotionCategoryMatrix = (
  data: BarDataType
): Record<string, Record<string, number>> => {
  const result: Record<string, Record<string, number>> = {};

  data.forEach(({ emotion, category, amount }) => {
    // 감정 키가 없으면 초기화
    if (!result[emotion]) {
      result[emotion] = {};
    }

    result[emotion][category] = (result[emotion][category] || 0) + amount;
  });

  return result;
};

/**
 * pie chart를 그리기 위해 필요한 data 정리
 * emotion, amount, color 배열
 * 
 * [
  {
    emotion: "기쁨",
    categories: [
      { label: "식비", amount: 5000, color: "" },
      { label: "쇼핑", amount: 3000, color: "" },
      ...
    ]
  },
 */

export const computePieChartData = (data: PieInputType): PieChartDataType => {
  //1. 감정 별 합계 구하기
  // {
  //   "기쁨": 4000,
  //   "우울": 1500,
  // }
  const emotionSumMap = data.reduce<Record<string, number>>((acc, curr) => {
    acc[curr.emotion] = (acc[curr.emotion] || 0) + curr.amount;
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
