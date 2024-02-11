import { useContext, useState } from "react";
import { NavigatePanel } from "../NavigatePanel/NavigatePanel";
import style from "./Calendar.module.css";
import { DatePickerStore } from "../../store/DatePickerStoreContext";
import { PickerType, PickerTypeEnum } from "../../types/PickerType";
import { PickerLayout } from "../Pickers/PickerLayout";
import { DateType } from "../../types/DateType";

export function Calendar<T extends DateType>({
  initCurrentDate,
  date,
  setDate,
  onClose,
}: {
  initCurrentDate?: Date;
  date: T;
  setDate: (value: T) => void;
  onClose?: () => void;
}) {
  const {
    locale,
    disabledDates,
    disabled,
    readOnly,
    pickerType: initPickerType,
  } = useContext(DatePickerStore);
  const [pickerType, setPickerType] = useState<PickerType>(initPickerType);
  const [currentDate, setCurrentDate] = useState<Date>(
    initCurrentDate || new Date(),
  );

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
      date.setDate(newDate);
      setDate(date.getCopy() as T);
    } else {
      setCurrentDate(newDate);
    }
    setPickerType(initPickerType);
  }

  function onMonthPickHandler(month: number) {
    const newDate = new Date(currentDate);
    newDate.setMonth(month);
    if (onClose && initPickerType === PickerTypeEnum.MONTH) onClose();
    if (initPickerType === PickerTypeEnum.MONTH) {
      date.setDate(newDate);
      setDate(date.getCopy() as T);
    } else {
      setCurrentDate(newDate);
    }
    setPickerType(initPickerType);
  }

  function onDayPickHandler(value: Date) {
    if (disabled || readOnly) return;
    if (onClose && date.isValid()) {
      onClose();
    }
    date.setDate(value);
    setDate(date.getCopy() as T);
  }

  function onMonthClickHandler() {
    setPickerType(
      pickerType === initPickerType ? PickerTypeEnum.MONTH : initPickerType,
    );
    if (disabled || readOnly) return;
  }

  function onYearClickHandler() {
    setPickerType(
      pickerType === initPickerType ? PickerTypeEnum.YEAR : initPickerType,
    );
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
        locale={locale}
        isMonthPicker={pickerType !== PickerTypeEnum.YEAR}
        isMonthNavigation={pickerType === PickerTypeEnum.DAY}
        date={currentDate.getTime() ? currentDate : new Date()}
        onPrevClick={() => onChangeMonthHandler(-1)}
        onNextClick={() => onChangeMonthHandler(1)}
        onMonthClick={onMonthClickHandler}
        onYearClick={onYearClickHandler}
      />
      <PickerLayout
        pickerType={pickerType}
        locale={locale}
        disabledDates={disabledDates}
        currentDate={currentDate}
        selectedDate={date}
        onYearPick={onYearPickHandler}
        onMonthPick={onMonthPickHandler}
        onDayPick={onDayPickHandler}
      />
    </div>
  );
}
