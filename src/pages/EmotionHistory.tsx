import { useEffect, useState } from "react";
import EmotionBarChart from "@/components/EmotionBarChart";
import EmotionList from "../components/EmotionList";
import EmotionPieChart from "@/components/EmotionPieChart";
import {
  computeAmountsByEmotion,
  computeEmotionCategoryMatrix,
} from "@/utils/computeEmotion";

import "../firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  // serverTimestamp,
  query,
  where,
} from "firebase/firestore";

const EmotionHistory = () => {
  const myDB = getFirestore();
  const [emotionAmount, setEmotionAmount] = useState<Record<string, number>>(
    {}
  );
  const [emotionBarData, setEmotionBarData] = useState<
    Record<string, Record<string, number>>
  >({});

  const fetchData = async (uid: string) => {
    const q = query(
      collection(myDB, "transactions"),
      where("userId", "==", uid)
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => doc.data());
    console.log(data);

    const pieData = computeAmountsByEmotion(data);
    setEmotionAmount(pieData);

    const barData = computeEmotionCategoryMatrix(data);
    setEmotionBarData(barData);
  };

  useEffect(() => {
    //로그인 상태 변할때 실행되는 콜백
    const unsubscribe = onAuthStateChanged(getAuth(), (user: User | null) => {
      if (user) {
        fetchData(user.uid);
      } else {
        console.log("유저없음"); // 유저 없음
      }
    });

    return () => unsubscribe(); // cleanup
  }, []);
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4">📊 감정 소비 분석</h2>

      {/* 감정 소비 패턴 시각화 */}
      {/* <EmotionBarChart /> */}
      {Object.keys(emotionBarData).length > 0 && (
        <EmotionBarChart data={emotionBarData} />
      )}

      {Object.keys(emotionAmount).length > 0 && (
        <EmotionPieChart data={emotionAmount} />
      )}

      {/* 실제 기록 리스트 */}
      <EmotionList />
    </div>
  );
};

export default EmotionHistory;
