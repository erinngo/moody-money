// export const EMOTION_COLORS: Record<string, string> = {
//   기쁨: "#facc15",
//   우울: "#a5b4fc",
//   스트레스: "#f87171",
//   충동: "#fb923c",
//   지루함: "#94a3b8",
// };

// constants/emotions.ts
export interface EmotionItem {
  label: string;
  emoji: string;
  color: string;
}

export const EMOTION_ITEMS: EmotionItem[] = [
  { label: "기쁨", emoji: "😄", color: "#facc15" },
  { label: "우울", emoji: "😢", color: "#a5b4fc" },
  { label: "스트레스", emoji: "😠", color: "#f87171" },
  { label: "충동", emoji: "🌀", color: "#fb923c" },
  { label: "지루함", emoji: "😐", color: "#94a3b8" },
];
