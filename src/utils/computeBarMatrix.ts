/**
 * 
 * [
   {
     emotion: "기쁨",
     data: [
       { category: "식비", amount: 5000, color: "" },
       { category: "쇼핑", amount: 3000, color: "" },
       ...
     ]
   },
   {
    emotion: "우울",
    data: [
    
    ]
    
   }
 */
import { CATEGORY_COLORS } from "@/constants/categories";
type BarRawData = {
  selectedEmotion: string;
  selectedCategory: string;
  amount: number;
}[];

export type BarMatrix = {
  emotion: string;
  data: {
    category: string;
    amount: number;
    color: string;
  }[];
}[];

export const computeBarMatrix = (data: BarRawData): BarMatrix => {
  //1. 감정-카테고리-금액 합산
  //   {
  //     기쁨:{식비:5000, 쇼핑:3000},

  // }
  const sumByCat: Record<string, Record<string, number>> = {};
  data.forEach((item) => {
    const emotion = item.selectedEmotion;
    const category = item.selectedCategory;
    const amount = item.amount;

    // 감정 키가 없으면 초기화
    if (!sumByCat[emotion]) {
      sumByCat[emotion] = {};
    }

    sumByCat[emotion][category] = (sumByCat[emotion][category] || 0) + amount;
  });

  //2. BarMatrix 형태로 변환
  return Object.entries(sumByCat).map(([emotion, categoryObj]) => ({
    emotion,
    data: Object.entries(categoryObj).map(([category, amount]) => ({
      category,
      amount,
      color: CATEGORY_COLORS[category],
    })),
  }));
};
