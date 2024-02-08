import { DatePickerStore } from "../../store/DatePickerStoreContext";
import style from "./Pickers.module.css";
import { RangeDate } from "../../types/RangeDate";
import { MultiDate } from "../../types/MultiDate";
import { getPickerStyleMapByType } from "./const/pickerStyleMap";
import { getDaysModel } from "./models/DaysModel";
import { DateAdapter } from "../../types/DateAdapter";

const pickerStyleMap = getPickerStyleMapByType("day");

export function DayPicker({
  currentDate,
  selectedDate,
  onPick,
}: {
  currentDate: Date;
  selectedDate: DateAdapter | RangeDate | MultiDate;
  onPick: (date: Date) => void;
}) {
  const [weekNames] = DatePickerStore.useStore((s) => s.weekNames);
  const [disabledDates] = DatePickerStore.useStore((s) => s.disabledDates);
  const daysModel = getDaysModel(currentDate, selectedDate, disabledDates);

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
