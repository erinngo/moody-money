/**
 *
 * 현재 달,
 * Onchange -> 선택된 값 -> EmotionHistory 에 업데이트
 */
import { useEffect, useState, useRef } from "react";
import { generateMonths } from "@/utils/generateMonths";

interface MonthSelectorProps {
  value: string;
  onChange: (month: string) => void;
}

const MonthSelector = ({ onChange, value }: MonthSelectorProps) => {
  /**
   * 상태: 팝업, month
   */
  const [isOpen, setIsOpen] = useState(false);
  const [monthList, setMonthList] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  console.log("ref.current", ref.current);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      console.log("e.target", e.target);
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * [
   * "2025-07", "2025-06"..
   *  ]
   */
  useEffect(() => {
    const months = generateMonths(12);
    console.log({ months });
    setMonthList(months);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      7월: 달 선택 로직 추가
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 bg-white border rounded-lg shadow"
      >
        <span> {value.replace("-", "년 ")}월</span>
        <span className="text-gray-500">▼</span>
      </button>
      {/* popup - isOpen 조건부렌더링 */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border rounded-lg shadow-lg z-50">
          <ul className="max-h-64 overflow-y-auto">
            {monthList.map((month) => (
              <li
                key={month}
                onClick={() => {
                  onChange(month);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  month === value ? "bg-gray-200 font-bold" : ""
                }`}
              >
                {month.replace("-", "년 ")}월
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MonthSelector;
