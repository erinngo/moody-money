import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "../firebase";
const SignUp = () => {
  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const auth = getAuth();

    const handleSignup = async () => {
      if (password !== confirmPassword) {
        setError("비밀번호가 일치하지 않습니다.");
        return;
      }

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("moody-money에 로그인합니다");
        navigate("/dashboard");
      } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
          setError("이미 가입된 이메일입니다.");
        } else if (error.code === "auth/invalid-email") {
          setError("올바른 이메일 주소를 입력하세요. (예: user@example.com)");
        } else {
          setError(error.message);
        }
      }
    };

    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-full sm:max-w-md bg-white shadow-xl rounded-xl p-8 space-y-3">
          <h2 className="text-center text-2xl font-bold">회원가입</h2>

          <input
            type="email"
            placeholder="이메일"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="input input-bordered w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <button
            onClick={handleSignup}
            className="btn btn-primary w-full mt-3"
          >
            회원가입
          </button>

          <p className="text-sm text-center mt-3">
            이미 계정이 있으신가요?{" "}
            <Link className="text-blue-500 underline" to="/">
              로그인
            </Link>
          </p>
        </div>
      </div>
    );
  }
};
export default SignUp;
