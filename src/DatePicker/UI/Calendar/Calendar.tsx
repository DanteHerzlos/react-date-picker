import { useEffect, useState } from "react";
import { NavigatePanel } from "../NavigatePanel/NavigatePanel";
import style from "./Calendar.module.css";
import { YearPicker } from "../Pickers/YearPicker";
import { DayPicker } from "../Pickers/DayPicker";
import { MonthPicker } from "../Pickers/MonthPicker";
import { PickerTypeEnum } from "../../../DatePicker/types/PickerTypesEnum";

export function Calendar({
  pickerMode,
  date,
  onChange,
}: {
  pickerMode: PickerTypeEnum;
  date: Date;
  onChange?: (date: Date) => void;
}) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [pickerType, setPickerType] = useState<PickerTypeEnum>(
    pickerMode,
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
    setPickerType(pickerMode);
  }

  function onMonthPickHandler(month: number) {
    const newDate = new Date(date);
    newDate.setMonth(month);
    onChange && onChange(newDate);
    setPickerType(pickerMode);
  }

  return (
    <div className={style.container}>
      <NavigatePanel
        isMonthPicker={pickerMode !== PickerTypeEnum.YEAR}
        isMonthNavigation={pickerMode === PickerTypeEnum.DAY}
        date={currentDate}
        onPrevClick={() => onChangeMonthHandler(-1)}
        onNextClick={() => onChangeMonthHandler(1)}
        onMonthClick={() =>
          setPickerType(
            pickerType === pickerMode ? PickerTypeEnum.MONTH : pickerMode,
          )
        }
        onYearClick={() =>
          setPickerType(
            pickerType === pickerMode ? PickerTypeEnum.YEAR : pickerMode,
          )
        }
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
