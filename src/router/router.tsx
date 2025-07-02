import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import DashBoard from "../pages/DashBoard";
import EmotionRecord from "../pages/EmotionRecord";
import EmotionHistory from "../pages/EmotionHistory";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/dashboard" element={<DashBoard />}></Route>
      <Route path="/expense" element={<EmotionRecord />}></Route>
      <Route path="/history" element={<EmotionHistory />}></Route>
    </Routes>
  );
};

export default Router;
