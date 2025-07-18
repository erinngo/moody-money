import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";

const EmotionLayout = () => {
  return (
    <>
      <Header />
      <main className="pt-[130px] p-6 max-w-3xl mx-auto space-y-6">
        <Outlet /> {/* EmotionHistory / EmotionRecord */}
      </main>
    </>
  );
};

export default EmotionLayout;
