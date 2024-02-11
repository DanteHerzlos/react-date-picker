import style from "./Pickers.module.css";
import { getPickerStyleMapByType } from "./const/pickerStyleMap";
import { getMonthModel } from "./models/MonthModel";
import { DateType } from "../../types/DateType";

const pickerStyleMap = getPickerStyleMapByType("month");

export function MonthPicker({
  locale,
  disabledDates,
  currentDate,
  selectedDate,
  onPick,
}: {
  locale: string
  disabledDates: [Date, Date][]
  currentDate: Date;
  selectedDate: DateType;
  onPick: (month: number) => void;
}) {
  const monthModel = getMonthModel(
    currentDate,
    selectedDate,
    disabledDates,
    locale,
  );
  return (
    <div className={style.monthPicker}>
      {monthModel.months.map((month, index) => (
        <div
          className={pickerStyleMap[month.styleType]}
          key={index}
          onClick={() => onPick && onPick(index)}
        >
          {month.name}
        </div>
      ))}
    </div>
  );
}
