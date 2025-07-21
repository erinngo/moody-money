import { motion } from "framer-motion";

interface Transaction {
  amount: number;
}

interface TotalExpenseCardProps {
  transactions: Transaction[];
}

const TotalExpenseCard = ({ transactions }: TotalExpenseCardProps) => {
  const currentTotal = transactions.reduce(
    (sum, t) => sum + (t.amount || 0),
    0
  );
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow rounded-lg p-4 text-center"
    >
      <p className="text-gray-500 text-sm">총 지출</p>
      <h2 className="text-2xl font-bold text-purple-700">
        ₩ {currentTotal.toLocaleString()}
      </h2>
      {/* TODO:지난 달 비교 로직 추가
      <p className="text-sm text-gray-400"></p> */}
    </motion.div>
  );
};
export default TotalExpenseCard;
