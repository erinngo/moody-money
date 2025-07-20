import { useEffect } from "react";
import { useTransactionStore } from "@/store/useTransactionStores";
import Heatmap from "@/components/Heatmap";
import { generateHeatmapData } from "@/utils/generateHeatmapData";
import { generateMonths } from "@/utils/generateMonths";
import { EMOTION_ITEMS } from "@/constants/emotion";
import { useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHistory = location.pathname.includes("history");
  const isRecord = location.pathname.includes("record");

  const { transactions, fetchAllTransactions } = useTransactionStore();
  useEffect(() => {
    fetchAllTransactions();
  }, []);

  const months = generateMonths(12);
  const emotions = EMOTION_ITEMS.map((e) => e.label);
  const heatmapData = generateHeatmapData(transactions, emotions, months);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl font-bold mb-4">월별 감정 패턴</h1>
      <Heatmap data={heatmapData} months={months} emotions={emotions} />

      {/* 페이지 이동 버튼 */}
      <nav className="flex border-b">
        <button
          onClick={() => navigate("/record")}
          className={`flex-1 text-center py-2 font-medium bg-white ${
            isRecord
              ? "text-black border-b-2 border-purple-800"
              : "text-gray-400"
          }`}
        >
          기록
        </button>
        <button
          onClick={() => navigate("/history")}
          className={`flex-1 text-center py-2 font-medium border-b-1 bg-white ${
            isHistory
              ? "text-black border-b-2 border-purple-800"
              : "text-gray-400 bg-white"
          }`}
        >
          히스토리
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;
