import { useEffect, useState } from "react";
import { useTransactionStore } from "@/store/useTransactionStores";
import EmotionList from "../components/EmotionList";
import EmotionPieChart from "@/components/EmotionPieChart";
import MonthSelector from "@/components/MonthSelector";
// import seedDummyData from "@/utils/seedFirestore";

//공통 hook
import { useChartData } from "@/hooks/useChartData";

const EmotionHistory = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("2025-07");

  // zustand store
  const { transactions, fetchTransactionsByMonth } = useTransactionStore();

  useEffect(() => {
    fetchTransactionsByMonth(selectedMonth);
  }, [selectedMonth]);

  //TODO: useChartData 커스텀 훅 만들기 - DashBoard, EmotionHistory 에서 동일 로직
  const { pieData } = useChartData(transactions);
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
      <br />
      {Object.keys(pieData).length > 0 && <EmotionPieChart data={pieData} />}
      <br />
      {/* 실제 기록 리스트 */}
      <EmotionList data={transactions} />
    </>
  );
};

export default EmotionHistory;
