import { useEffect, useState } from "react";
import { useTransactionStore } from "@/store/useTransactionStores";
import { generateMonths } from "@/utils/generateMonths";

import Header from "@/components/common/Header";
import logo from "../assets/images/moody-money.png";
import { useNavigate } from "react-router-dom";

import EmotionPieChart from "@/components/EmotionPieChart";
import { computePieChartData } from "@/utils/computePieChart"; // 확장 버전
import EmotionBarChart from "@/components/EmotionBarChart";
import { computeBarMatrix } from "@/utils/computeBarMatrix";
import type { BarMatrix } from "@/utils/computeBarMatrix";
import type { PieChartDataType } from "@/utils/computePieChart";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import TopEmotionCard from "@/components/dashboard/TopEmotionCard";
import TotalExpenseCard from "@/components/dashboard/TotalExpenseCard";

const Dashboard = () => {
  const navigate = useNavigate();

  const thisMonth = generateMonths(1)[0];

  //transactions
  const { fetchTransactionsByMonth } = useTransactionStore();
  const [username, setUsername] = useState<string>("");
  const [barData, setBarData] = useState<BarMatrix>([]);
  const [pieData, setPieData] = useState<PieChartDataType>([]);
  const [loading, setLoading] = useState(true);
  /**
   * 로그인 확인 후
   * 1. 유저 이름 설정
   * 2. zustand 데이터 fetch
   */
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUsername(user.displayName || user.email || "사용자");
        setLoading(true);
        await fetchTransactionsByMonth(thisMonth);

        //차트 가공
        setBarData(
          computeBarMatrix(useTransactionStore.getState().transactions)
        );
        setPieData(
          computePieChartData(useTransactionStore.getState().transactions)
        );

        setLoading(false);
      } else {
        setUsername("게스트");
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [thisMonth, fetchTransactionsByMonth]);

  useEffect(() => {
    fetchTransactionsByMonth(thisMonth);
  }, [thisMonth]);

  // const barData = useMemo(() => computeBarMatrix(transactions), [transactions]);
  // const pieData = useMemo(
  //   () => computePieChartData(transactions),
  //   [transactions]
  // );

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-10">데이터 로딩 중...</div>
    );
  }

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

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TopEmotionCard />
        <TotalExpenseCard />
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

      {/* 히트맵 */}
      {/* <div className="bg-white shadow rounded-lg p-4">
        <h3 className="font-bold mb-4">
          {parseInt(thisMonth.slice(-2))}월, 감정 소비 분석
        </h3>
        <div className="text-gray-400 h-48 flex items-center justify-center">
          <EmotionBarChart data={barData} />
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
