import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { CATEGORY_ITEMS } from "@/constants/categories";
import { EMOTION_ITEMS } from "@/constants/emotion";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  // ...생략
};

// const app = initializeApp(firebaseConfig);
// 초기화 중복 방지 코드
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// 날짜 생성 유틸
const getRandomDate = () => {
  const start = new Date("2025-01-01").getTime();
  const end = new Date().getTime();
  return new Date(start + Math.random() * (end - start));
};

// 감정/카테고리 불러오기
const emotions = EMOTION_ITEMS.map((item) => item.label);
const categories = CATEGORY_ITEMS.map((item) => item.label);

const seedDummyData = async (uid: string) => {
  for (let i = 0; i < 10; i++) {
    await addDoc(collection(db, "transactions"), {
      userId: uid, // 로그인한 유저의 UID
      amount: Math.floor(Math.random() * 10000 + 1000),
      selectedEmotion: emotions[Math.floor(Math.random() * emotions.length)],
      selectedCategory:
        categories[Math.floor(Math.random() * categories.length)],
      memo: `더미 메모 ${i + 1}`,
      date: getRandomDate(),
    });
  }
};

export default seedDummyData;
