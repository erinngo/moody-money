import { useMemo } from "react";
import { motion } from "framer-motion";

interface Transaction {
  selectedEmotion: string;
}

interface TopEmotionCardProps {
  transactions: Transaction[];
}

const TopEmotionCard = ({ transactions }: TopEmotionCardProps) => {
  // 이번 달 가장 많이 기록된 감정 확인
  const topEmotion = useMemo(() => {
    if (transactions.length === 0) return { emotion: "-", count: 0 };

    const counts: Record<string, number> = {};

    transactions.forEach((t) => {
      counts[t.selectedEmotion] = (counts[t.selectedEmotion] || 0) + 1;
    });

    const [emotion, count] = Object.entries(counts).sort(
      (a, b) => b[1] - a[1]
    )[0]; // 최댓값

    return { emotion, count };
  }, [transactions]);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow rounded-lg p-4 text-center"
    >
      <p className="text-gray-500 text-sm">이달의 TOP 감정</p>
      <h2 className="text-2xl font-bold text-purple-700">
        {topEmotion.emotion}
      </h2>
      <p className="text-sm text-gray-400">{topEmotion.count}회 기록</p>
    </motion.div>
  );
};

export default TopEmotionCard;
