import style from "./Pickers.module.css";
import { DatePickerStore } from "../../store/DatePickerStoreContext";
import { MultiDate } from "../../types/MultiDate";
import { RangeDate } from "../../types/RangeDate";
import { getPickerStyleMapByType } from "./const/pickerStyleMap";
import { getMonthModel } from "./models/MonthModel";
import { DateAdapter } from "DatePicker/types/DateAdapter";

const pickerStyleMap = getPickerStyleMapByType("month");

export function MonthPicker({
  currentDate,
  selectedDate,
  onPick,
}: {
  currentDate: Date;
  selectedDate: DateAdapter | MultiDate | RangeDate;
  onPick: (month: number) => void;
}) {
  const [locale] = DatePickerStore.useStore((s) => s.locale);
  const [disabledDates] = DatePickerStore.useStore((s) => s.disabledDates);
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
