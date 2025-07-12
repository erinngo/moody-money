import { useEffect, useState } from "react";
//query 객체 - query, where,orderBy,
import { getFirestore, collection, getDocs } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
import "../firebase";

interface TransactionData {
  id: string;
  amount: number;
  category: string;
  emotion: string;
  memo?: string;
  date: any;
}
const EmotionList = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  // const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchData = async () => {
      //TODO: auth.currentUer과 일치하는 정보만 거르기
      const myRef = collection(db, "transactions");
      const docSnap = await getDocs(myRef);
      //   console.log(docSnap);
      //   docSnap.forEach((doc) => {
      //     console.log(doc.id, doc.data());
      //   });
      const data = docSnap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as TransactionData)
      );
      setTransactions(data);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-4 relative">
      <h2 className="text-xl font-semibold">감정 소비 내역</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500">기록된 내역이 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map(({ id, amount, category, emotion, memo, date }) => (
            <li
              key={id}
              className="p-4 border rounded-lg shadow-sm bg-base-100"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">
                  ₩{amount.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600">
                  {date?.toDate
                    ? new Date(date.toDate()).toLocaleDateString()
                    : "날짜 없음"}
                </span>
              </div>
              <div className="text-sm mt-1">
                <span className="font-medium">{emotion}</span> ·{" "}
                <span>{category}</span>
              </div>
              {memo && <p className="text-sm text-gray-700 mt-1">"{memo}"</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default EmotionList;
