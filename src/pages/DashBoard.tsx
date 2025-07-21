import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactionStore } from "@/store/useTransactionStores";

import { generateMonths } from "@/utils/generateMonths";
import Header from "@/components/common/Header";
import logo from "../assets/images/moody-money.png";

// 컴포넌트
import TopEmotionCard from "@/components/dashboard/TopEmotionCard";
import TotalExpenseCard from "@/components/dashboard/TotalExpenseCard";
import EmotionPieChart from "@/components/EmotionPieChart";
import EmotionBarChart from "@/components/EmotionBarChart";

// 유틸
import { getEmotionMessage } from "@/utils/getEmotionMessage";

//커스텀 훅
import { useChartData } from "@/hooks/useChartData";

/**
 * 대시보드에서 한번 fetch하여 각 컴포넌트에 Props 전달
 * topEmotion, totalExpense, PieChart, BarChart
 *
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const [emotionMessage, setEmotionMessage] = useState<string>("");

  //zustand
  const { user, transactions, fetchTransactionsByMonth, loading } =
    useTransactionStore();
  const username = user?.displayName || user?.email || "게스트";
  const thisMonth = generateMonths(1)[0];

  //fetch -> 하위 컴포넌트에 props로 전달
  useEffect(() => {
    fetchTransactionsByMonth(thisMonth);
  }, [thisMonth, fetchTransactionsByMonth]);

  //fetch 데이터 바로 가공 -> 차트에 활용할 props
  // const pieData = useMemo(
  //   () => computePieChartData(transactions),
  //   [transactions]
  // );
  // const barData = useMemo(() => computeBarMatrix(transactions), [transactions]);

  //useChartData 훅 사용
  const { pieData, barData } = useChartData(transactions);

  //topEmotion 계산 후, message 추가
  //TODO: topEmotionCard에 동일 로직있음 - Util 분리 고려
  useEffect(() => {
    if (transactions.length > 0) {
      const counts: Record<string, number> = {};
      transactions.forEach((t) => {
        counts[t.selectedEmotion] = (counts[t.selectedEmotion] || 0) + 1;
      });
      const [topEmotion] = Object.entries(counts).sort(
        (a, b) => b[1] - a[1]
      )[0];
      setEmotionMessage(getEmotionMessage(topEmotion));
    }
  }, [transactions]);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* 헤더 */}
      <Header />

      {/* 상단 프로필 , 버튼 */}

      <div className="flex flex-col sm:flex-row justify-between items-center pt-9">
        <h1 className="text-2xl font-bold flex pb-2">
          <img src={logo} className="w-12 h-10 pr-3" alt="moody-money" />
          <span>{username} 님,</span>
        </h1>
        <button
          onClick={() => navigate("/record")}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition w-full sm:w-[30%]"
        >
          오늘 감정 기록하기
        </button>
      </div>
      {/* 핵심 메세지 */}
      <div className="bg-purple-100 text-purple-700 rounded-lg p-4 text-center font-medium">
        {emotionMessage}
      </div>

      {/* 로딩중 -> 표시 */}
      {loading && (
        <div className="text-center text-gray-400 text-sm">
          최신 데이터 업데이트 중...
        </div>
      )}

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TopEmotionCard transactions={transactions} />
        <TotalExpenseCard transactions={transactions} />
      </div>

      {/* 차트 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-bold mb-4">
            {parseInt(thisMonth.slice(-1))}월 감정 비율
          </h3>
          <div className=" flex items-center justify-center">
            <EmotionPieChart data={pieData} />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 pr-0">
          <h3 className="font-bold mb-4">
            {parseInt(thisMonth.slice(-2))}월 소비 영역
          </h3>
          <div className="text-gray-400 flex items-center justify-center">
            <EmotionBarChart data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
