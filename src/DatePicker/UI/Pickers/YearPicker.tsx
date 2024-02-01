import { useEffect, useRef } from "react";
import style from "./Pickers.module.css";
import { DatePickerStore } from "../../store/DatePickerStoreContext";

export function YearPicker({
  selectedYear,
  onPick,
}: {
  selectedYear: number;
  onPick?: (year: number) => void;
}) {
  const [years] = DatePickerStore.useStore((s) => s.years);
  const activeYearRef = useRef<HTMLDivElement | null>();
  useEffect(() => {
    if (activeYearRef)
      activeYearRef.current?.scrollIntoView({ block: "center" });
  }, []);

  return (
    <div className={style.yearPicker}>
      {years.map((year) => (
        <div
          className={
            year === selectedYear
              ? [style.year, style._active].join(" ")
              : style.year
          }
          ref={(r) => year === selectedYear && (activeYearRef.current = r)}
          key={year}
          onClick={() => onPick && onPick(year)}
        >
          {year}
        </div>
      ))}
    </div>
  );
}
