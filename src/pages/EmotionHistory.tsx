import { useEffect, useState } from "react";
import EmotionBarChart from "@/components/EmotionBarChart";
import EmotionList from "../components/EmotionList";
import EmotionPieChart from "@/components/EmotionPieChart";

import MonthSelector from "@/components/MonthSelector";
// import seedDummyData from "@/utils/seedFirestore";
import type { PieChartDataType } from "@/utils/computePieChart";
import type { BarMatrix } from "@/utils/computeBarMatrix";
// import {
//   computeEmotionCategoryMatrix,
//   computePieChartData,
// } from "@/utils/computeEmotion";
import { computePieChartData } from "@/utils/computePieChart";
import { computeBarMatrix } from "@/utils/computeBarMatrix";
import { getMonthRange } from "@/utils/getMonthRange";

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
  const [selectedMonth, setSelectedMonth] = useState<string>("2025-07");

  const myDB = getFirestore();
  const [emotionPieData, setEmotionPieData] = useState<PieChartDataType>([]);
  const [emotionBarData, setEmotionBarData] = useState<BarMatrix>([]);
  const [rawData, setRawData] = useState<any[]>([]);

  const applyDataToChart = (data: any[]) => {
    const pieData = computePieChartData(data);
    const barData = computeBarMatrix(data);
    setEmotionPieData(pieData);
    setEmotionBarData(barData);
  };

  //fechData by month
  const fetchData = async (uid: string, month: string) => {
    const { start, end } = getMonthRange(month);
    const q = query(
      collection(myDB, "transactions"),
      where("userId", "==", uid),
      where("date", ">=", start),
      where("date", "<=", end)
    );
    const snapshot = await getDocs(q);
    // TODO: any타입으로 임시방편, 타입 정비하기
    const data = snapshot.docs.map((doc) => doc.data() as any);
    console.log(data);
    setRawData(data);

    //차트 초기화
    applyDataToChart(data);
  };

  //더미데이터 10개씩 추가
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(
  //     getAuth(),
  //     async (user: User | null) => {
  //       if (user) {
  //         // 로그인된 경우에만 더미 데이터 삽입
  //         await seedDummyData(user.uid);
  //         fetchData(user.uid); // 기존 데이터 fetch
  //       } else {
  //         console.log("유저없음");
  //       }
  //     }
  //   );

  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    // 로그인 상태 변화 시 실행되는 콜백
    const unsubscribe = onAuthStateChanged(getAuth(), (user: User | null) => {
      if (user) {
        fetchData(user.uid, selectedMonth);
      } else {
        console.log("유저없음");
      }
    });

    return () => unsubscribe();
  }, [selectedMonth]);

  const totalExpense = rawData.reduce((sum, data) => sum + data.amount, 0);
  return (
    <>
      <MonthSelector value={selectedMonth} onChange={setSelectedMonth} />
      {/* 총지출  */}
      <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 mb-4 shadow-sm">
        <span className="text-gray-500 text-sm">총지출</span>
        <span className="text-xl font-bold text-gray-800">
          {totalExpense.toLocaleString()}원
        </span>
      </div>

      {/* <h2 className="text-2xl font-bold mb-4"> 감정 소비 분석</h2> */}
      <br />
      {/* 감정 소비 패턴 시각화 */}
      {/* <EmotionBarChart /> */}
      {Object.keys(emotionBarData).length > 0 && (
        <EmotionBarChart data={emotionBarData} />
      )}

      <br />
      {Object.keys(emotionPieData).length > 0 && (
        <EmotionPieChart data={emotionPieData} />
      )}
      <br />
      {/* 실제 기록 리스트 */}
      <EmotionList data={rawData} />
    </>
  );
};

export default EmotionHistory;
