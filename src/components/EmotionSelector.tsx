interface EmotionSelectorProps {
  selected: string;
  onSelect: (emotion: string) => void;
  emotions: { label: string; emoji: string; color: string }[];
}

// const emotions = ["기쁨", "우울", "스트레스", "충동", "지루함"];

export default function EmotionSelector({
  selected,
  onSelect,
  emotions,
}: EmotionSelectorProps) {
  return (
    <div className="mt-4">
      <p className="text-sm text-gray-400 mb-2">감정을 선택하세요</p>
      <div className="grid grid-cols-3 gap-1 sm:grid-cols-5">
        {emotions.map((emotion) => {
          const isSelected = selected === emotion.label;
          return (
            <button
              key={emotion.label}
              onClick={() => onSelect(emotion.label)}
              className={`w-25 h-25 rounded-full flex flex-col items-center justify-center 
              text-sm font-semibold shadow transition
              ${
                selected === emotion.label
                  ? "scale-105 ring-2 ring-white"
                  : "opacity-80 hover:scale-105 hover:ring-1"
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
