import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import DashBoard from "../pages/DashBoard";
import EmotionLayout from "@/components/common/EmotionLayout";
import EmotionRecord from "../pages/EmotionRecord";
import EmotionHistory from "../pages/EmotionHistory";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/dashboard" element={<DashBoard />}></Route>
      {/* 중첩라우트 -> Outlet */}
      <Route element={<EmotionLayout />}>
        <Route path="/history" element={<EmotionHistory />} />
        <Route path="/record" element={<EmotionRecord />} />
      </Route>
    </Routes>
  );
};

export default Router;
