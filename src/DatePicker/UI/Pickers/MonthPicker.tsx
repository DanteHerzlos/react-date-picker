import style from "./Pickers.module.css";
import { DatePickerStore } from "../../store/DatePickerStoreContext";

export function MonthPicker({
  currentDate,
  selectedDate,
  onPick,
}: {
  currentDate: Date;
  selectedDate: Date;
  onPick: (month: number) => void;
}) {
  const [monthNames] = DatePickerStore.useStore((s) => s.monthNames);
  return (
    <div className={style.monthPicker}>
      {monthNames.map((monthName, index) => (
        <div
          className={
            index === selectedDate.getMonth() &&
            currentDate.getFullYear() === selectedDate.getFullYear()
              ? [style.month, style._active].join(" ")
              : style.month
          }
          key={index}
          onClick={() => onPick && onPick(index)}
        >
          {monthName}
        </div>
      ))}
    </div>
  );
}
