import EmotionChart from "../components/EmotionChart";
import EmotionList from "../components/EmotionList";
const EmotionHistory = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">감정 소비 히스토리</h1>

      {/* 감정 소비 패턴 시각화 */}
      <EmotionChart />

      {/* 실제 기록 리스트 */}
      <EmotionList />
    </div>
  );
};

export default EmotionHistory;
