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
type PieDataType = {
  emotion: string;
  amount: number;
}[];
type BarDataType = {
  emotion: string;
  category: string;
  amount: number;
}[];
export const computeAmountsByEmotion = (
  data: PieDataType
): Record<string, number> => {
  return data.reduce((acc, curr) => {
    acc[curr.emotion] = (acc[curr.emotion] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);
};

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
 */

export const computePieChartData = () => {};
