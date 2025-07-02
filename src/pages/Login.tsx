import { useState } from "react";
import { useNavigate } from "react-router-dom";
import appImg from "@/assets/images/moody-money.png";

import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const auth = getAuth();
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // 로그인 성공 시 이동할 페이지
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-w-4">
      <div className="card w-full bg-base-100 ">
        <div className="card-body ">
          <h2 className="text-center text-2xl font-bold">Moody Money</h2>
          <img
            src={appImg}
            alt="moody-money 로고"
            className="w-20 h-auto object-contain mx-auto"
          />
          <p>
            테스트 계정
            <br />
            test1@gmail.com
            <br />
            비밀번호: test11
          </p>

          <input
            type="email"
            name="email"
            placeholder="이메일"
            //daisyUI - input 삭제
            className="w-full border border-gray-300 rounded px-4 py-3 text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            className="w-full border border-gray-300 rounded px-4 py-3 text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin} className="btn btn-primary w-full mt-3">
            로그인
          </button>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full"
          >
            구글 로그인
          </button>

          <p className="text-sm text-center mt-2">
            계정이 없으신가요?{" "}
            <a className="text-blue-500 underline" href="/signup">
              회원가입
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
