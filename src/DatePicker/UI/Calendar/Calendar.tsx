import { useEffect, useState } from "react";
import { NavigatePanel } from "../NavigatePanel/NavigatePanel";
import style from "./Calendar.module.css";
import { YearPicker } from "../Pickers/YearPicker";
import { DayPicker } from "../Pickers/DayPicker";

export function Calendar({
  date,
  onChange,
}: {
  date: Date;
  onChange?: (date: Date) => void;
}) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [pickerType, setPickerType] = useState<"day" | "month" | "year">("day");

  useEffect(() => {
    if (date) setCurrentDate(new Date(date));
  }, [date]);

  function onChangeMonthHandler(diff: number) {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + diff);
    setCurrentDate(newDate);
  }

  function onYearPickHandler(year: number) {
    const newDate = new Date(date);
    newDate.setFullYear(year);
    onChange && onChange(newDate);
    setPickerType("day");
  }

  return (
    <div className={style.container}>
      <NavigatePanel
        date={currentDate}
        onYearClick={() => setPickerType(pickerType === "day" ? "year" : "day")}
        onPrevClick={() => onChangeMonthHandler(-1)}
        onNextClick={() => onChangeMonthHandler(1)}
      />
      {
        {
          year: (
            <YearPicker
              onPick={onYearPickHandler}
              selectedYear={date.getFullYear()}
            />
          ),
          month: <h1>Month</h1>,
          day: (
            <DayPicker
              currentDate={currentDate}
              selectedDate={date}
              onPick={(date) => onChange && onChange(date)}
            />
          ),
        }[pickerType]
      }
    </div>
  );
}
