import style from "./Pickers.module.css";
import { DatePickerStore } from "DatePicker/store/DatePickerStoreContext";

export function MonthPicker({
  selectedMonth,
  onPick,
}: {
  selectedMonth: number;
  onPick: (month: number) => void;
}) {
  const [monthNames] = DatePickerStore.useStore((s) => s.monthNames);
  return (
    <div className={style.monthPicker}>
      {monthNames.map((monthName, index) => (
        <div
          className={
            index === selectedMonth
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
