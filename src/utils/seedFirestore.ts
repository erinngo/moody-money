import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { CATEGORY_ITEMS } from "@/constants/categories";
import { EMOTION_ITEMS } from "@/constants/emotion";

const getRandomDate = () => {
  const start = new Date("2024-08-01").getTime();
  // const end = new Date("2024-12-30").getTime();
  const end = new Date().getTime();
  return new Date(start + Math.random() * (end - start));
};

const emotions = EMOTION_ITEMS.map((item) => item.label);
const categories = CATEGORY_ITEMS.map((item) => item.label);

const seedDummyData = async (uid: string) => {
  for (let i = 0; i < 30; i++) {
    await addDoc(collection(db, "transactions"), {
      userId: uid,
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
