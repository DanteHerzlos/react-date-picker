import { useEffect, useRef } from "react";
import style from "./Pickers.module.css";
import { getYearModel } from "./models/YearModel";
import { DateType } from "../../types/DateType";
import {
  PickerStyleTypesEnum,
  getPickerStyleMapByType,
} from "./const/pickerStyleMap";

const pickerStyleMap = getPickerStyleMapByType("year");
export function YearPicker({
  selectedDate,
  disabledDates,
  onPick,
}: {
  disabledDates: [Date, Date][]
  selectedDate: DateType;
  onPick?: (year: number) => void;
}) {
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
