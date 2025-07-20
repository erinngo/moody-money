import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";
  // const isHistory = location.pathname.includes("history");
  // const isRecord = location.pathname.includes("record");

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b z-50">
      <div className="max-w-3xl mx-auto px-4">
        {isDashboard ? (
          // Dashboard용 헤더
          <div className="flex justify-center py-4">
            <h1 className="text-xl font-bold text-gray-500">Moody-Money</h1>
          </div>
        ) : (
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
        )}
      </div>
    </header>
  );
};

export default Header;
