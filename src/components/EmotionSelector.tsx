interface EmotionSelectorProps {
  selected: string;
  onSelect: (emotion: string) => void;
}

const EMOTIONS = [
  { value: "기쁨", icon: "😊" },
  { value: "우울", icon: "😔" },
  { value: "스트레스", icon: "😡" },
  { value: "충동", icon: "🤯" },
  { value: "지루함", icon: "😐" },
];

const EmotionSelector = ({ selected, onSelect }: EmotionSelectorProps) => {
  return (
    <div className="flex gap-2 mb-4">
      {EMOTIONS.map(({ value, icon }) => (
        <button
          key={value}
          onClick={() => onSelect(value)}
          className={`btn btn-sm rounded-full px-3 ${
            selected === value ? "btn-accent" : "btn-outline"
          }`}
        >
          {icon} {value}
        </button>
      ))}
    </div>
  );
};

export default EmotionSelector;
