import { useEffect, useState } from "react";
import { NavigatePanel } from "../NavigatePanel/NavigatePanel";
import style from "./Calendar.module.css";
import { YearPicker } from "../Pickers/YearPicker";
import { DayPicker } from "../Pickers/DayPicker";
import { MonthPicker } from "../Pickers/MonthPicker";
import { DatePickerStore } from "../../store/DatePickerStoreContext";
import { PickerTypeEnum } from "DatePicker/types/PickerType";

export function Calendar({ onClose }: { onClose?: () => void }) {
  const [date, setDate] = DatePickerStore.useStore((s) => s.selectedDate);
  const [defaultValue] = DatePickerStore.useStore((s) => s.defaultValue);
  const [disabled] = DatePickerStore.useStore((s) => s.disabled);
  const [readOnly] = DatePickerStore.useStore((s) => s.readOnly);
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
    if (initPickerType === PickerTypeEnum.YEAR) {
      setDate({ selectedDate: newDate });
    } else {
      setCurrentDate(newDate);
    }
    setPickerType({ pickerType: initPickerType });
  }

  function onMonthPickHandler(month: number) {
    const newDate = new Date(currentDate);
    newDate.setMonth(month);
    if (onClose && initPickerType === PickerTypeEnum.MONTH) onClose();
    if (initPickerType === PickerTypeEnum.MONTH) {
      setDate({ selectedDate: newDate });
    } else {
      setCurrentDate(newDate);
    }
    setPickerType({ pickerType: initPickerType });
  }

  function onDayPickHandler(date: Date) {
    if (disabled || readOnly) return;
    onClose && onClose();
    setDate({ selectedDate: date });
  }

  function onMonthClickHandler() {
    setPickerType({
      pickerType:
        pickerType === initPickerType ? PickerTypeEnum.MONTH : initPickerType,
    });
    if (disabled || readOnly) return;
  }

  function onYearClickHandler() {
    setPickerType({
      pickerType:
        pickerType === initPickerType ? PickerTypeEnum.YEAR : initPickerType,
    });
    if (disabled || readOnly) return;
  }

  return (
    <div
      className={
        disabled
          ? [style.container, style._disabled].join(" ")
          : style.container
      }
    >
      <NavigatePanel
        isMonthPicker={pickerType !== PickerTypeEnum.YEAR}
        isMonthNavigation={pickerType === PickerTypeEnum.DAY}
        date={currentDate.getTime() ? currentDate : new Date()}
        onPrevClick={() => onChangeMonthHandler(-1)}
        onNextClick={() => onChangeMonthHandler(1)}
        onMonthClick={onMonthClickHandler}
        onYearClick={onYearClickHandler}
      />
      {
        {
          year: <YearPicker onPick={onYearPickHandler} selectedDate={date} />,
          month: (
            <MonthPicker
              currentDate={currentDate.getTime() ? currentDate : new Date()}
              selectedDate={date}
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
