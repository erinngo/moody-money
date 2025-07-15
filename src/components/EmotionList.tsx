import { useEffect, useState } from "react";
//query 객체 - query, where,orderBy,
import { getFirestore, collection, getDocs } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
import "../firebase";
import { EMOTION_ITEMS } from "@/constants/emotion";

interface TransactionData {
  id: string;
  amount: number;
  selectedCategory: string;
  selectedEmotion: string;
  memo?: string;
  date: any;
}
//UI용 확장타입 정의
type TransactionWithFormattedDate = TransactionData & {
  formattedDate: string;
};
type GroupByDate = Record<
  string, // key: 날짜 - "7월 15일"
  {
    total: number;
    items: TransactionWithFormattedDate[];
  }
>;

const EmotionList = () => {
  const [transactions, setTransactions] = useState<
    TransactionWithFormattedDate[]
  >([]);
  // const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchData = async () => {
      //TODO: auth.currentUer과 일치하는 정보만 거르기
      const myRef = collection(db, "transactions");
      const docSnap = await getDocs(myRef);
      // console.log(docSnap);
      //   docSnap.forEach((doc) => {
      //     console.log(doc.id, doc.data());
      //   });
      const data = docSnap.docs.map((doc) => {
        const raw = doc.data();
        const t = raw.date.toDate(); // Firestore Timestamp → JS Date
        const formattedDate = `${t.getMonth() + 1}월 ${t.getDate()}일`;
        return {
          id: doc.id,
          ...raw,
          formattedDate,
        } as TransactionWithFormattedDate;
      });
      //날짜가공 -- '7월15일' 형태로
      setTransactions(data);
    };
    fetchData();
  }, []);

  //transactions를 날짜별로 그룹핑
  /**
   * 1. 날짜를 key로
   * 2. value는 날짜 별 소비 합계, 해당 날짜의 소비 리스트
   */
  const groupedByDate: GroupByDate = {};

  transactions.forEach((item) => {
    if (!groupedByDate[item.formattedDate]) {
      groupedByDate[item.formattedDate] = { total: 0, items: [] };
    }
    groupedByDate[item.formattedDate].total += item.amount;
    groupedByDate[item.formattedDate].items.push(item);
  });
  console.log(Object.entries(groupedByDate));

  return (
    <div className="space-y-6">
      {/* 날짜 그룹 */}
      {Object.entries(groupedByDate).map(([date, group]) => (
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 font-medium">{date}</span>
            <span className="text-gray-900 font-bold">
              {group.total.toLocaleString()}원
            </span>
          </div>

          <ul className="space-y-5">
            {/* 개별 항목 */}
            {group.items.map((item) => {
              const emotionData = EMOTION_ITEMS.find(
                (emotion) => emotion.label === item.selectedEmotion
              );

              return (
                <li className="flex justify-between items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center"
                      style={{
                        backgroundColor: emotionData?.color || "#f3f4f6",
                      }}
                    >
                      {emotionData?.emoji}
                      {/* 감정 이모티콘 */}
                    </div>
                    <div class="text-left">
                      {/* text 중앙정렬 */}
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
      ))}
    </div>
  );
};
export default EmotionList;
