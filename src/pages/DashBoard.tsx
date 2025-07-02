import { getAuth } from "firebase/auth";
import Expense from "./EmotionRecord";

const DashBoard = () => {
  const user = getAuth().currentUser;
  console.log(user);
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">감정 가계부 대시보드</h1>
      {user && (
        <p className="mt-2 text-gray-600">
          환영합니다! <br />
          <strong>UID:</strong> {user.uid} <br />
          <strong>Email:</strong> {user.email}
        </p>
      )}

      <Expense />
    </div>
  );
};

export default DashBoard;
