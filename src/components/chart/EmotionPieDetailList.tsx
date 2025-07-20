interface EmotionDetail {
  emotion: string;
  percentage: number;
  color: string;
}

interface EmotionPieDetailListProps {
  data: EmotionDetail[];
}

const EmotionPieDetailList = ({ data }: EmotionPieDetailListProps) => {
  return (
    <div className="mt-6 space-y-3">
      {data.map((item) => (
        <div key={item.emotion} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="text-gray-700 font-medium">{item.emotion}</span>
          </div>
          <span className="text-gray-600">{item.percentage}%</span>
        </div>
      ))}
    </div>
  );
};

export default EmotionPieDetailList;
