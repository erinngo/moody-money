interface EmotionSelectorProps {
  selectedEmotion: string;
  onChange: (emotion: string) => void;
  emotions: { label: string; emoji: string; color: string }[];
}

// const emotions = ["기쁨", "우울", "스트레스", "충동", "지루함"];

export default function EmotionSelector({
  selectedEmotion,
  onChange,
  emotions,
}: EmotionSelectorProps) {
  return (
    <div className="mt-4">
      <p className="text-sm text-gray-400 mb-2">감정을 선택하세요</p>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
        {emotions.map((emotion) => {
          const isSelected = selectedEmotion === emotion.label;
          return (
            <button
              type="button"
              key={emotion.label}
              onClick={() => onChange(emotion.label)}
              className={`w-25 h-25 rounded-full flex flex-col items-center justify-center 
              text-sm font-semibold shadow transition
              ${
                isSelected
                  ? "scale-110 bg-purple-300 text-black border-cyan-600"
                  : "bg-purple-100 text-black  hover:border-white"
              }`}
              style={{ backgroundColor: `${emotion.color}` }}
            >
              <span className="text-2xl">{emotion.emoji}</span>
              <span className="whitespace-nowrap">{emotion.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
