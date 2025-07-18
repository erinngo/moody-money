import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHistory = location.pathname.includes("history");
  const isRecord = location.pathname.includes("record");

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b z-50">
      <div className="max-w-3xl mx-auto px-4">
        {/* 상단바 - 이전페이지이동 + 제목 */}
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-xl font-bold bg-white text-black "
          >
            ←
          </button>
          <h1 className="text-lg font-semibold">감정 X 소비</h1>
          <button className="text-xl  bg-white text-black">⋮</button>{" "}
          {/* 옵션 메뉴 자리 */}
        </div>

        {/* 탭 (감정관리) */}
        <nav className="flex border-b">
          <button
            onClick={() => navigate("/record")}
            className={`flex-1 text-center py-2 font-medium bg-white ${
              isRecord
                ? "text-black border-b-2 border-purple-800"
                : "text-gray-400"
            }`}
          >
            기록
          </button>
          <button
            onClick={() => navigate("/history")}
            className={`flex-1 text-center py-2 font-medium border-b-1 bg-white ${
              isHistory
                ? "text-black border-b-2 border-purple-800"
                : "text-gray-400 bg-white"
            }`}
          >
            히스토리
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
