import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/common/Header";

const EmotionLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHistory = location.pathname.includes("history");
  const isRecord = location.pathname.includes("record");
  return (
    <>
      <Header />
      <div className="mt-[80px] bg-white sticky z-40">
        {/* 탭 네비게이션 */}
        <nav className="flex max-w-3xl mx-auto">
          <button
            onClick={() => navigate("/record")}
            className={`flex-1 text-center py-2 font-medium ${
              isRecord
                ? "text-black border-b-2 border-purple-800"
                : "text-gray-400"
            }`}
          >
            기록
          </button>
          <button
            onClick={() => navigate("/history")}
            className={`flex-1 text-center py-2 font-medium ${
              isHistory
                ? "text-black border-b-2 border-purple-800"
                : "text-gray-400"
            }`}
          >
            히스토리
          </button>
        </nav>
      </div>
      <main className="p-6 max-w-3xl mx-auto space-y-6">
        <Outlet /> {/* EmotionHistory / EmotionRecord */}
      </main>
    </>
  );
};

export default EmotionLayout;
