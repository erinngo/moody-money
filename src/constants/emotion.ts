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

export const EMOTION_MESSAGES: Record<string, string[]> = {
  우울: [
    "마음이 무거운 하루였네요. 스스로를 돌봐줄 시간도 필요해요.",
    "우울한 기분이 많았어요. 자신을 위한 시간을 가져보세요.",
  ],
  기쁨: [
    "행복한 순간이 많았어요! 이 기분 오래 간직하세요 😊",
    "기쁨이 가득했네요! 좋은 에너지를 계속 이어가요.",
  ],
  스트레스: [
    "스트레스가 많이 쌓였어요. 잠깐의 휴식이 필요하지 않을까요?",
    "스트레스가 많네요. 가벼운 산책이나 음악을 들어보세요.",
  ],
  충동: [
    "충동 소비가 잦아요! 잠시 멈추고 다시 생각해보는 건 어떨까요?",
    "충동적인 선택이 많았네요. 조금 더 계획적으로!",
  ],
  지루함: [
    "심심한 하루였군요. 새로운 취미를 찾아보는 건 어떨까요?",
    "지루함이 많네요. 새로운 활동을 시도해보세요!",
  ],
};
