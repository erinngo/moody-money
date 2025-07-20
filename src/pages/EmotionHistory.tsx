import { useEffect, useState } from "react";
import { useTransactionStore } from "@/store/useTransactionStores";
// import EmotionBarChart from "@/components/EmotionBarChart";
import EmotionList from "../components/EmotionList";
import EmotionPieChart from "@/components/EmotionPieChart";

import MonthSelector from "@/components/MonthSelector";
// import seedDummyData from "@/utils/seedFirestore";
import type { PieChartDataType } from "@/utils/computePieChart";
// import type { BarMatrix } from "@/utils/computeBarMatrix";
// import {
//   computeEmotionCategoryMatrix,
//   computePieChartData,
// } from "@/utils/computeEmotion";
import { computePieChartData } from "@/utils/computePieChart";
import { computeBarMatrix } from "@/utils/computeBarMatrix";

const EmotionHistory = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("2025-07");

  // zustand store
  const { transactions, fetchTransactionsByMonth } = useTransactionStore();
  // const myDB = getFirestore();
  const [emotionPieData, setEmotionPieData] = useState<PieChartDataType>([]);
  // const [emotionBarData, setEmotionBarData] = useState<BarMatrix>([]);
  // const [rawData, setRawData] = useState<any[]>([]);

  useEffect(() => {
    fetchTransactionsByMonth(selectedMonth);
  }, [selectedMonth]);

  // const applyDataToChart = (data: any[]) => {
  //   const pieData = computePieChartData(data);
  //   const barData = computeBarMatrix(data);
  //   setEmotionPieData(pieData);
  //   setEmotionBarData(barData);
  // };

  //전역데이터 -> 차트데이터 활용
  useEffect(() => {
    if (transactions.length > 0) {
      const pieData = computePieChartData(transactions);
      // const barData = computeBarMatrix(transactions);
      setEmotionPieData(pieData);
      // setEmotionBarData(barData);
    } else {
      setEmotionPieData([]);
      // setEmotionBarData([]);
    }
  }, [transactions]);

  const totalExpense = transactions.reduce((sum, data) => sum + data.amount, 0);
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
      {/* {Object.keys(emotionBarData).length > 0 && (
        <EmotionBarChart data={emotionBarData} />
      )} */}

      <br />
      {Object.keys(emotionPieData).length > 0 && (
        <EmotionPieChart data={emotionPieData} />
      )}
      <br />
      {/* 실제 기록 리스트 */}
      <EmotionList data={transactions} />
    </>
  );
};

export default EmotionHistory;
