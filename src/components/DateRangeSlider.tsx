import { useState } from "react";
import { Range } from "react-range";
type DateRange = {
  start: Date;
  end: Date;
};

interface DateRangeSliderProps {
  onChange: (range: DateRange) => void;
}

const min = new Date("2025-01-01").getTime();
const max = new Date().getTime();

const STEP = 24 * 60 * 60 * 1000; //하루를 밀리초 단위로
const DateRangeSlider = ({ onChange }: DateRangeSliderProps) => {
  const [values, setValues] = useState([min, max]);

  const formatDate = (ts: number) => new Date(ts).toISOString().slice(0, 10);

  return (
    <div className="p-4 bg-base-200 rounded-xl">
      <h2 className="text-lg font-bold mb-3">📆 날짜 범위</h2>

      <Range
        values={values}
        step={STEP}
        min={min}
        max={max}
        onChange={(vals) => {
          setValues(vals);
          onChange({ start: new Date(vals[0]), end: new Date(vals[1]) });
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="w-full h-2 bg-gray-300 rounded"
            style={{ ...props.style }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="w-4 h-4 bg-secondary border-2 border-white rounded-full shadow cursor-pointer"
          />
        )}
      />

      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>{formatDate(values[0])}</span>
        <span>{formatDate(values[1])}</span>
      </div>
    </div>
  );
};

export default DateRangeSlider;
