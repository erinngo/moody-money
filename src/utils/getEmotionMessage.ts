import { EMOTION_MESSAGES } from "./../constants/emotion";

export const getEmotionMessage = (emotion: string): string => {
  const messages = EMOTION_MESSAGES[emotion];
  if (!messages) return "오늘도 힘내세요!";
  return messages[Math.floor(Math.random() * messages.length)];
};
