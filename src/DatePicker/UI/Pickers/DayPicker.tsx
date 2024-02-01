import { DateUtils } from "../../helpers/DateUtils";
import { DatePickerStore } from "../../store/DatePickerStoreContext";
import style from "./Pickers.module.css";

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
  const firstDayOfMonth = DateUtils.getFirstDayOfMonth(currentDate);
  const lastDayOfMonth = DateUtils.getLastDayOfMonth(currentDate);
  const days: { value: number; active: boolean; current: boolean }[] = [];
  const colSpan = firstDayOfMonth.getDay() - 1;
  for (let i = firstDayOfMonth.getDate(); i <= lastDayOfMonth.getDate(); i++) {
    let active = false;
    let current = false;
    if (
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear() &&
      i === selectedDate.getDate()
    ) {
      active = true;
    }
    if (
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getFullYear() === new Date().getFullYear() &&
      i === new Date().getDate()
    ) {
      current = true;
    }
    days.push({ value: i, active, current });
  }
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
      {colSpan ? <div style={{ gridColumn: `span ${colSpan}` }} /> : ""}
      {days.map((day, index) => (
        <div
          onClick={() => onDatePickHandler(day.value)}
          key={index}
          className={
            {
              default: style.day,
              active: [style.day, style._active].join(" "),
              current: [style.day, style._current].join(" "),
            }[day.active ? "active" : day.current ? "current" : "default"]
          }
        >
          {day.value}
        </div>
      ))}
    </div>
  );
}
