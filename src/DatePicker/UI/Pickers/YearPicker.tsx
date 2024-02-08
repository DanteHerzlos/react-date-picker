import { useEffect, useRef } from "react";
import style from "./Pickers.module.css";
import { DatePickerStore } from "../../store/DatePickerStoreContext";
import { getYearModel } from "./models/YearModel";
import { MultiDate } from "../../types/MultiDate";
import { RangeDate } from "../../types/RangeDate";
import {
  PickerStyleTypesEnum,
  getPickerStyleMapByType,
} from "./const/pickerStyleMap";
import { DateAdapter } from "DatePicker/types/DateAdapter";

const pickerStyleMap = getPickerStyleMapByType("year");
export function YearPicker({
  selectedDate,
  onPick,
}: {
  selectedDate: DateAdapter | MultiDate | RangeDate;
  onPick?: (year: number) => void;
}) {
  const [disabledDates] = DatePickerStore.useStore((s) => s.disabledDates);
  const yearModel = getYearModel(selectedDate, disabledDates);
  const activeYearRef = useRef<HTMLDivElement | null>();
  useEffect(() => {
    if (activeYearRef)
      activeYearRef.current?.scrollIntoView({ block: "center" });
  }, []);

  return (
    <div className={style.yearPicker}>
      {yearModel.years.map((year) => (
        <div
          ref={(r) =>
            year.styleType === PickerStyleTypesEnum.ACTIVE &&
            (activeYearRef.current = r)
          }
          className={pickerStyleMap[year.styleType]}
          key={year.value}
          onClick={() => onPick && onPick(year.value)}
        >
          {year.value}
        </div>
      ))}
    </div>
  );
}
