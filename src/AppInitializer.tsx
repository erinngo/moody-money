import { useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
// import seedDummyData from "@/utils/seedFirestore";
import { useTransactionStore } from "@/store/useTransactionStores";

export default function AppInitializer() {
  const { setUser } = useTransactionStore();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setUser(user); //zustand 저장
      // if (user) {
      //   console.log("로그인 감지 → 더미 데이터 추가 실행");
      //   await seedDummyData(user.uid);
      // }
    });

    return () => unsubscribe();
  }, [setUser]);

  //렌더링 x , 데이터 추가 동작만 실행
  return null;
}
