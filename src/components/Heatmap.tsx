import React from "react";
// import { generateMonths } from "@/utils/generateMonths";
interface HeatmapProps {
  data: {
    [month: string]: {
      [emotion: string]: number;
    };
  };
  months: string[];
  emotions: string[];
}

const Heatmap = ({ data, months, emotions }: HeatmapProps) => {
  // const months = generateMonths(12);
  //색상 농도 - 히트맵 데이터 중 최대감정빈도를 찾기
  const maxValue = Math.max(
    Number(...Object.values(data).flatMap((month) => Object.values(month)))
  );

  const getColorRange = (count: number) => {
    if (count === 0) return "bg-gray-100";
    const ratio = count / maxValue;
    if (ratio <= 0.25) return "bg-purple-200";
    if (ratio <= 0.5) return "bg-purple-400";
    if (ratio <= 0.75) return "bg-purple-600";
    return "bg-purple-800";
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">월별 감정 히트맵</h2>

      {/* 색상 범례 */}
      <div className="flex items-center gap-2 mb-4 text-sm">
        <span>적음</span>
        <div className="w-4 h-4 bg-purple-200"></div>
        <div className="w-4 h-4 bg-purple-400"></div>
        <div className="w-4 h-4 bg-purple-600"></div>
        <div className="w-4 h-4 bg-purple-800"></div>
        <span>많음</span>
      </div>

      {/* 히트맵 */}
      <div>
        {/* 헤더 */}
        <div className="grid grid-cols-[40px_repeat(12,minmax(40px,1fr))] gap-1 mb-2">
          <div></div> {/* 왼쪽 공백 */}
          {months.map((m) => (
            <div key={m} className="text-xs text-center font-semibold">
              {m.split("-")[1]}월
            </div>
          ))}
        </div>

        {/* 감정별 행 */}
        {emotions.map((emotion) => (
          <div
            key={emotion}
            className="grid grid-cols-[50px_repeat(12,minmax(40px,1fr))] gap-1 mb-1"
          >
            {/* 감정 라벨 */}
            <div className="text-xs text-right pr-2">{emotion}</div>
            {/* 월별 데이터 */}
            {months.map((month) => {
              const count = data[month]?.[emotion] || 0;
              return (
                <div
                  key={`${month}-${emotion}`}
                  className={`w-8 h-8 rounded ${getColorRange(
                    count
                  )} flex items-center justify-center text-xs text-white`}
                  title={`${emotion} (${month}): ${count}`}
                >
                  {count > 0 ? count : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Heatmap;
