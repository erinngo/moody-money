// import { generateMonths } from "@/utils/generateMonths";

//rawData, emotions, months 가져오기

/**
 * {
  "2025-01": { 기쁨: 5, 우울: 3, 스트레스: 2 },
 */
export interface HeatmapData {
  [month: string]: {
    [emotion: string]: number;
  };
}

export const generateHeatmapData = (
  rawData: any[],
  emotions: string[],
  months: string[]
): HeatmapData => {
  // 1. 초기화
  const heatmapData: HeatmapData = {};
  months.forEach((month) => {
    heatmapData[month] = {};
    emotions.forEach((emotion) => {
      heatmapData[month][emotion] = 0;
    });
  });

  // 2. 데이터 집계
  rawData.forEach((item) => {
    const dateObj = item.date?.toDate?.() || new Date(item.date);
    const monthKey = `${dateObj.getFullYear()}-${String(
      dateObj.getMonth() + 1
    ).padStart(2, "0")}`;

    if (heatmapData[monthKey] && emotions.includes(item.selectedEmotion)) {
      heatmapData[monthKey][item.selectedEmotion] += 1;
    }
  });

  return heatmapData;
};
