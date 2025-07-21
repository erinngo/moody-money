//query 객체 - query, where,orderBy,

import { EMOTION_ITEMS } from "@/constants/emotion";
import { groupTransactionsByDate } from "@/utils/groupTransactionsByDate";
import type { Transaction } from "@/store/useTransactionStores";
import { sortByDateKey } from "@/utils/sortByDateKey";

/**
 * 날짜로 그룹핑된 데이터
 * 날짜별 합계, 날짜별 리스트
 */

const EmotionList = ({ data }: { data: Transaction[] }) => {
  const groupedByDate = groupTransactionsByDate(data);
  // console.log(data);
  if (data.length === 0) {
    return <p className="text-center text-gray-500">데이터가 없습니다.</p>;
  }

  //Object.keys ["7월 15일", "7월 18일", "6월 25일"]
  //날짜 내림차순 정렬
  const sortedDates = sortByDateKey(Object.keys(groupedByDate));

  return (
    <div className="space-y-6">
      {sortedDates.map((date) => {
        const group = groupedByDate[date];
        return (
          <div key={date} className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-medium">{date}</span>
              <span className="text-gray-900 font-bold">
                {group.total.toLocaleString()}원
              </span>
            </div>
            <ul className="space-y-5">
              {group.items.map((item) => {
                const emotionData = EMOTION_ITEMS.find(
                  (emotion) => emotion.label === item.selectedEmotion
                );
                return (
                  <li
                    key={item.id}
                    className="flex justify-between items-center gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: emotionData?.color || "#f3f4f6",
                        }}
                      >
                        {emotionData?.emoji}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-800">
                          {item.selectedCategory}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.amount.toLocaleString()}원
                        </p>
                      </div>
                    </div>
                    {item.memo && (
                      <div className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                        메모: {item.memo}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
export default EmotionList;
