import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTransactionStore } from "@/store/useTransactionStores";
import { generateMonths } from "@/utils/generateMonths";

const EmotionChangeCard = () => {
  const { fetchTransactionsByMonth } = useTransactionStore();
  const [currentTopEmotion, setCurrentTopEmotion] = useState<{
    emotion: string;
    count: number;
  }>({ emotion: "-", count: 0 });
  const [prevTopEmotion, setPrevTopEmotion] = useState<{
    emotion: string;
    count: number;
  }>({ emotion: "-", count: 0 });

  const [thisMonth, prevMonth] = generateMonths(2); // ["2025-07", "2025-06"]

  useEffect(() => {
    const getTopEmotion = (data: any[]) => {
      if (!data.length) return { emotion: "-", count: 0 };
      const counts: Record<string, number> = {};
      data.forEach((t) => {
        counts[t.selectedEmotion] = (counts[t.selectedEmotion] || 0) + 1;
      });
      const [emotion, count] = Object.entries(counts).sort(
        (a, b) => b[1] - a[1]
      )[0];
      return { emotion, count };
    };

    // 이번 달,  지난달 데이터 가져오기
    const loadData = async () => {
      const currentData = await fetchTransactionsByMonth(thisMonth); // rawData return
      const prevData = await fetchTransactionsByMonth(prevMonth);

      setCurrentTopEmotion(getTopEmotion(currentData));
      setPrevTopEmotion(getTopEmotion(prevData));
    };

    loadData();
  }, [thisMonth, prevMonth, fetchTransactionsByMonth]);

  // 변화 상태 판단 ---> 아이콘
  const isSame = currentTopEmotion.emotion === prevTopEmotion.emotion;
  const changeIcon = isSame ? "→" : "↑";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow rounded-lg p-4 text-center"
    >
      <p className="text-gray-500 text-sm">감정 변화</p>
      <h2 className="text-lg font-bold text-purple-700">
        {isSame ? "변화 없음" : "감정 변화 있음"}
      </h2>
      <p className="text-sm text-gray-400">
        {prevTopEmotion.emotion} → {currentTopEmotion.emotion} {changeIcon}
      </p>
    </motion.div>
  );
};

export default EmotionChangeCard;
