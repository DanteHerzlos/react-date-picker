import { useEffect, useState } from "react";
import { NavigatePanel } from "../NavigatePanel/NavigatePanel";
import style from "./Calendar.module.css";
import { YearPicker } from "../Pickers/YearPicker";
import { DayPicker } from "../Pickers/DayPicker";
import { MonthPicker } from "../Pickers/MonthPicker";
import { PickerTypeEnum } from "../../../DatePicker/types/PickerTypesEnum";
import { DatePickerStore } from "DatePicker/store/DatePickerStoreContext";

export function Calendar({
  onChange,
  onClose,
}: {
  onChange?: (date: Date) => void;
  onClose?: () => void;
}) {
  const [date, setDate] = DatePickerStore.useStore((s) => s.selectedDate);
  const [defaultValue] = DatePickerStore.useStore((s) => s.defaultValue);
  const [currentDate, setCurrentDate] = useState<Date>(date || defaultValue);
  const [initPickerType] = DatePickerStore.useStore((s) => s.initialPickerType);
  const [pickerType, setPickerType] = DatePickerStore.useStore(
    (s) => s.pickerType,
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
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    if (onClose && initPickerType === PickerTypeEnum.YEAR) onClose();
    onChange && onChange(newDate);
    setDate({ selectedDate: newDate });
    setPickerType({ pickerType: initPickerType });
  }

  function onMonthPickHandler(month: number) {
    const newDate = new Date(currentDate);
    newDate.setMonth(month);
    if (onClose && initPickerType === PickerTypeEnum.MONTH) onClose();
    onChange && onChange(newDate);
    setDate({ selectedDate: newDate });
    setPickerType({ pickerType: initPickerType });
  }

  function onDayPickHandler(date: Date) {
    onClose && onClose();
    onChange && onChange(date);
    setDate({ selectedDate: date });
  }

  return (
    <div className={style.container}>
      <NavigatePanel
        isMonthPicker={pickerType !== PickerTypeEnum.YEAR}
        isMonthNavigation={pickerType === PickerTypeEnum.DAY}
        date={currentDate.getTime() ? currentDate : new Date()}
        onPrevClick={() => onChangeMonthHandler(-1)}
        onNextClick={() => onChangeMonthHandler(1)}
        onMonthClick={() =>
          setPickerType({
            pickerType:
              pickerType === initPickerType
                ? PickerTypeEnum.MONTH
                : initPickerType,
          })
        }
        onYearClick={() =>
          setPickerType({
            pickerType:
              pickerType === initPickerType
                ? PickerTypeEnum.YEAR
                : initPickerType,
          })
        }
      />
      {
        {
          year: (
            <YearPicker
              onPick={onYearPickHandler}
              selectedYear={date.getFullYear() || new Date().getFullYear()}
            />
          ),
          month: (
            <MonthPicker
              selectedMonth={date.getMonth() || new Date().getMonth()}
              onPick={onMonthPickHandler}
            />
          ),
          day: (
            <DayPicker
              currentDate={currentDate.getTime() ? currentDate : new Date()}
              selectedDate={date}
              onPick={onDayPickHandler}
            />
          ),
        }[pickerType]
      }
    </div>
  );
}