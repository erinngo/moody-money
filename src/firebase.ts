import { initializeApp } from "firebase/app";

/**
 * firebase.ts는 Firebase 앱을 초기화하는 역할만 수행
 * 전역에서 Firebase 서비스를 사용할 수 있도록 세팅
 * 이후 로그인/DB 작업 시 getAuth(), getFirestore() 등을 각 컴포넌트에서 호출
 */

const firebaseConfig = {
  apiKey: "AIzaSyCUi1ipC0_e_AntYYjGzbyEff212tG3exA",
  authDomain: "moody-money.firebaseapp.com",
  projectId: "moody-money",
  storageBucket: "moody-money.firebasestorage.app",
  messagingSenderId: "530581465909",
  appId: "1:530581465909:web:cfaca93e7477d4259afa7c",
  measurementId: "G-FFMHM8ZRBV",
};

initializeApp(firebaseConfig); // 초기화 용도
