import style from "./Pickers.module.css";
import { getPickerStyleMapByType } from "./const/pickerStyleMap";
import { getDaysModel } from "./models/DaysModel";
import { DateUtils } from "../../helpers/DateUtils";
import { DateType } from "../../types/DateType";

const pickerStyleMap = getPickerStyleMapByType("day");

export function DayPicker({
  disabledDates,
  locale,
  currentDate,
  selectedDate,
  onPick,
}: {
  locale:string
  currentDate: Date;
  selectedDate: DateType;
  disabledDates: [Date, Date][]
  onPick: (date: Date) => void;
}) {
  const daysModel = getDaysModel(currentDate, selectedDate, disabledDates);
  const weekNames = DateUtils.getWeekNames(locale)

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
