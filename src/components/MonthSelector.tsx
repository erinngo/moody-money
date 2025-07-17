/**
 *
 * 현재 달,
 * Onchange -> 선택된 값 -> EmotionHistory 에 업데이트
 */
const MonthSelector = () => {
  return (
    <div>
      7월: 달 선택 로직 추가
      <button className="w-full flex justify-between items-center px-4 py-2 bg-white border rounded-lg shadow">
        <span> 00 월</span>
        {/* <span className="text-gray-500">▼</span> */}
      </button>
      {/* popup */}
      <div className="absolute top-full left-0 mt-2 w-full bg-white border rounded-lg shadow-lg z-50">
        <ul className="max-h-64 overflow-y-auto">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">00월</li>
        </ul>
      </div>
    </div>
  );
};

export default MonthSelector;
