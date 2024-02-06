import { useEffect, useState } from "react";
import { DatePickerStore } from "../../store/DatePickerStoreContext";
import style from "./Pickers.module.css";
import { pickerStyleMap } from "./const/pickerStyleMap";
import { DaysModel } from "./DaysModel";

export function DayPicker({
  currentDate,
  selectedDate,
  onPick,
}: {
  currentDate: Date;
  selectedDate: Date;
  onPick: (date: Date) => void;
}) {
  const [weekNames] = DatePickerStore.useStore((s) => s.weekNames);
  const [disabledDates] = DatePickerStore.useStore((s) => s.disabledDates);
  // const daysModel = new DaysModel(currentDate, selectedDate, disabledDates)
  const [daysModel, setDaysModel] = useState(
    new DaysModel(currentDate, selectedDate, disabledDates),
  );

  useEffect(() => {
    setDaysModel(new DaysModel(currentDate, selectedDate, disabledDates));
  }, [currentDate.toString(), selectedDate.toString(), disabledDates]);

  function onDatePickHandler(day: number) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const selectedDate = new Date(year, month, day);
    onPick && onPick(selectedDate);
  }

  return (
    <div className={style.dayPicker}>
      {weekNames.map((el, index) => (
        <div key={index}>{el}</div>
      ))}
      {daysModel.colSpan ? (
        <div style={{ gridColumn: `span ${daysModel.colSpan}` }} />
      ) : (
        ""
      )}
      {daysModel.days.map((day, index) => (
        <div
          onClick={() => onDatePickHandler(day.value)}
          key={index}
          className={pickerStyleMap[day.styleType]}
        >
          {day.value}
        </div>
      ))}
    </div>
  );
}
