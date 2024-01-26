import { useEffect, useState } from "react";
import { NavigatePanel } from "../NavigatePanel/NavigatePanel";
import style from "./Calendar.module.css";
import { YearPicker } from "../Pickers/YearPicker";
import { DayPicker } from "../Pickers/DayPicker";
import { MonthPicker } from "../Pickers/MonthPicker";

enum PickerTypeEnum {
  DAY = "day",
  MONTH = "month",
  YEAR = "year",
}

export function Calendar({
  date,
  onChange,
}: {
  date: Date;
  onChange?: (date: Date) => void;
}) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [pickerType, setPickerType] = useState<PickerTypeEnum>(
    PickerTypeEnum.DAY,
  );

  useEffect(() => {
    if (date) setCurrentDate(new Date(date));
  }, [date]);

  function onChangeMonthHandler(diff: number) {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + diff);
    setCurrentDate(newDate);
  }

  function onYearPickHandler(year: number) {
    const newDate = new Date(date);
    newDate.setFullYear(year);
    onChange && onChange(newDate);
    setPickerType(PickerTypeEnum.DAY);
  }

  function onMonthPickHandler(month: number) {
    const newDate = new Date(date);
    newDate.setMonth(month);
    onChange && onChange(newDate);
    setPickerType(PickerTypeEnum.DAY);
  }

  return (
    <div className={style.container}>
      <NavigatePanel
        date={currentDate}
        onMonthClick={() =>
          setPickerType(
            pickerType === PickerTypeEnum.DAY
              ? PickerTypeEnum.MONTH
              : PickerTypeEnum.DAY,
          )
        }
        onYearClick={() =>
          setPickerType(
            pickerType === PickerTypeEnum.DAY
              ? PickerTypeEnum.YEAR
              : PickerTypeEnum.DAY,
          )
        }
        onPrevClick={() => onChangeMonthHandler(-1)}
        onNextClick={() => onChangeMonthHandler(1)}
      />
      {
        {
          year: (
            <YearPicker
              onPick={onYearPickHandler}
              selectedYear={date.getFullYear()}
            />
          ),
          month: (
            <MonthPicker
              selectedMonth={date.getMonth()}
              onPick={onMonthPickHandler}
            />
          ),
          day: (
            <DayPicker
              currentDate={currentDate}
              selectedDate={date}
              onPick={(date) => onChange && onChange(date)}
            />
          ),
        }[pickerType]
      }
    </div>
  );
}
