import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        setError("로그인 정보를 다시 확인하세요.");
      } else {
        setError(error.message);
        console.log(error);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate("/dashboard");
  };

  return (
    <div className="w-full min-h-[100dvh] flex justify-center items-center">
      <div className="w-full sm:max-w-md bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Moody Money</h2>
        <img src={appImg} alt="logo" className="w-24 h-auto mx-auto mb-6" />

        <p>
          test1@gmail.com
          <br />
          test11
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <div className="mt-5 space-y-3">
          <button className="btn btn-primary w-full" onClick={handleLogin}>
            로그인
          </button>
          <button
            className="btn btn-outline w-full"
            onClick={handleGoogleLogin}
          >
            구글 로그인
          </button>
        </div>

        <p className="text-sm text-center mt-4">
          계정이 없으신가요?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
