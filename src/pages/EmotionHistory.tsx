import { useEffect, useState } from "react";
import EmotionBarChart from "@/components/EmotionBarChart";
import EmotionList from "../components/EmotionList";
import EmotionPieChart from "@/components/EmotionPieChart";
import type { PieChartDataType } from "@/utils/computePieChart";
import type { BarMatrix } from "@/utils/computeBarMatrix";
// import {
//   computeEmotionCategoryMatrix,
//   computePieChartData,
// } from "@/utils/computeEmotion";
import { computePieChartData } from "@/utils/computePieChart";
import { computeBarMatrix } from "@/utils/computeBarMatrix";

import "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
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
  const [emotionPieData, setEmotionPieData] = useState<PieChartDataType>([]);
  const [emotionBarData, setEmotionBarData] = useState<BarMatrix>([]);

  const fetchData = async (uid: string) => {
    const q = query(
      collection(myDB, "transactions"),
      where("userId", "==", uid)
    );
    const snapshot = await getDocs(q);
    // TODO: any타입으로 임시방편, 타입 정비하기
    const data = snapshot.docs.map((doc) => doc.data() as any);
    console.log(data);

    const pieData = computePieChartData(data);

    setEmotionPieData(pieData);

    const barData = computeBarMatrix(data);
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

      {Object.keys(emotionPieData).length > 0 && (
        <EmotionPieChart data={emotionPieData} />
      )}

      {/* 실제 기록 리스트 */}
      <EmotionList />
    </div>
  );
};

export default EmotionHistory;
