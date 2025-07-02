import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../firebase"; // firebase 초기화
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import EmotionSelector from "../components/EmotionSelector";
const EmotionRecord = () => {
  const nav = useNavigate();
  /**
   * amount, category, emotion, memo
   */
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [emotion, setEmotion] = useState("");
  const [memo, setMemo] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth();

  // TODO: db 분리 작업
  const db = getFirestore();

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) {
      setError("로그인이 필요합니다.");
      return;
    }
    if (!amount || !category) {
      setError("금액, 카테고리, 감정은 필수입니다.");
      return;
    }

    try {
      const testRef = await addDoc(collection(db, "transactions"), {
        userId: user.uid,
        amount: parseInt(amount),
        category,
        emotion,
        memo,
        date: serverTimestamp(),
      });
      console.log(testRef.id);
      setAmount("");
      setCategory("");
      setEmotion("");
      setMemo("");
      setError("");
      alert("지출이 저장되었습니다.");
      nav("/history");
    } catch (err: any) {
      setError("저장 중 오류가 발생했습니다: " + err.message);
    }
  };
  const move = () => {
    nav("/history");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <button onClick={move} className="btn btn-primary w-full">
        history 이동
      </button>
      <h2 className="text-2xl font-bold mb-4">지출 입력</h2>
      <input
        type="number"
        placeholder="금액"
        className="input input-bordered w-full mb-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="카테고리 (예: 식비, 교통 등)"
        className="input input-bordered w-full mb-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <EmotionSelector selected={emotion} onSelect={setEmotion} />

      <textarea
        placeholder="메모 (선택)"
        className="textarea textarea-bordered w-full mb-2"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <button onClick={handleSubmit} className="btn btn-primary w-full">
        저장하기
      </button>
    </div>
  );
};

export default EmotionRecord;
