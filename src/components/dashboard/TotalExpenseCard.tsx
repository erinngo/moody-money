import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTransactionStore } from "@/store/useTransactionStores";
import { generateMonths } from "@/utils/generateMonths";
const TotalExpenseCard = () => {
  const { fetchTransactionsByMonth } = useTransactionStore();

  const [thisMonth, prevMonth] = generateMonths(2); // ["2025-07", "2025-06"]

  const [currentMonthTransactions, setCurrentMonthTransactions] = useState<
    any[]
  >([]);
  const [prevMonthTransactions, setPrevMonthTransactions] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const currentData = await fetchTransactionsByMonth(thisMonth);
      const prevData = await fetchTransactionsByMonth(prevMonth);

      setCurrentMonthTransactions(currentData || []);
      setPrevMonthTransactions(prevData || []);
    };

    loadData();
  }, [thisMonth, prevMonth, fetchTransactionsByMonth]);

  const currentTotal = useMemo(() => {
    return currentMonthTransactions.reduce(
      (sum, t) => sum + (t.amount || 0),
      0
    );
  }, [currentMonthTransactions]);

  const prevTotal = useMemo(() => {
    return prevMonthTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  }, [prevMonthTransactions]);

  //   console.log({ prevTotal });

  const changeRate = prevTotal
    ? (((currentTotal - prevTotal) / prevTotal) * 100).toFixed(1)
    : "0";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow rounded-lg p-4 text-center"
    >
      <p className="text-gray-500 text-sm">총 지출</p>
      <h2 className="text-2xl font-bold text-purple-700">
        ₩ {currentTotal.toLocaleString()}
      </h2>
      <p className="text-sm text-gray-400">
        {prevTotal
          ? `지난달 대비 ${Number(changeRate) >= 0 ? "+" : ""}${changeRate}%`
          : "지난달 데이터 없음"}
      </p>
    </motion.div>
  );
};
export default TotalExpenseCard;
