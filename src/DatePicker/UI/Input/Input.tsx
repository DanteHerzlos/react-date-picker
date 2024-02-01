import { DatePickerStore } from "DatePicker/store/DatePickerStoreContext";
import { useEffect, useRef, useState } from "react";
import style from "./Input.module.css";
import { CalendarIcon } from "DatePicker/icons/CalendarIcon";

const numericKeys = new Set(new Array(10).fill(0).map((_, i) => i.toString()));
let dayValue = "";
let monthValue = "";
let yearValue = "";

export function Input({
  onCalendarClick,
  onInvalid,
  label,
  customValidationMessage,
}: {
  onCalendarClick?: () => void;
  onInvalid?: (e: React.FormEvent<HTMLInputElement>) => void;
  label?: string;
  customValidationMessage?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dateMask] = DatePickerStore.useStore((s) => s.dateMask);
  const [selectedDate, setSelectedDate] = DatePickerStore.useStore(
    (s) => s.selectedDate,
  );
  const [defaultValue] = DatePickerStore.useStore((s) => s.defaultValue);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [validationMessage, setValidatiopnMessage] = useState<string>("");

  function onInvalidHandler(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    setInvalid(true);
    if (customValidationMessage) setValidatiopnMessage(customValidationMessage);
    else setValidatiopnMessage(e.currentTarget.validationMessage);
    if (onInvalid) onInvalid(e);
  }

  useEffect(() => {
    if (!isNaN(selectedDate.getTime())) {
      dayValue = selectedDate.getDate().toString();
      monthValue = (selectedDate.getMonth() + 1).toString();
      yearValue = selectedDate.getFullYear().toString();
      inputRef.current!.value = dateMask.getMaskByDates(
        selectedDate.getDate().toString(),
        (selectedDate.getMonth() + 1).toString(),
        selectedDate.getFullYear().toString(),
      );
    }
  }, [selectedDate]);

  function onKeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const target = event.currentTarget;
    const position = target.selectionStart!;
    const { start, end, type } = getSelectionRangeByPosition(position);
    target.setSelectionRange(start, end);
    if (event.key === "ArrowLeft") {
      const newPosition = getSelectionRangeByPosition(
        start - dateMask.separator.length,
      );
      target.setSelectionRange(newPosition.start, newPosition.end);
    }
    if (event.key === "ArrowRight") {
      const newPosition = getSelectionRangeByPosition(
        Math.min(end + dateMask.separator.length, dateMask.mask.length - 1),
      );
      target.setSelectionRange(newPosition.start, newPosition.end);
    }
    if (event.key === "Tab") {
      let newPosition;
      if (end + dateMask.separator.length > dateMask.mask.length) {
        newPosition = getSelectionRangeByPosition(0);
      } else {
        newPosition = getSelectionRangeByPosition(
          end + dateMask.separator.length,
        );
      }
      target.setSelectionRange(newPosition.start, newPosition.end);
    }
    if (event.key === "Enter") {
      target.blur();
    }

    if (event.key === "Backspace") {
      if (type === "DD") dayValue = "";
      if (type === "MM") monthValue = "";
      if (type === "YYYY") yearValue = "";
      target.value = dateMask.getMaskByDates(dayValue, monthValue, yearValue);
      target.setSelectionRange(start, end);
    }

    if (numericKeys.has(event.key)) {
      if (type === "DD") {
        dayValue = (dayValue + event.key).padStart(end - start, "0").slice(-2);
      }
      if (type === "MM") {
        monthValue = (monthValue + event.key)
          .padStart(end - start, "0")
          .slice(-2);
      }
      if (type === "YYYY") {
        yearValue = (yearValue + event.key)
          .padStart(end - start, "0")
          .slice(-4);
      }
      target.value = dateMask.getMaskByDates(dayValue, monthValue, yearValue);
      target.setSelectionRange(start, end);
    }
  }

  function getSelectionRangeByPosition(position: number) {
    let start = 0;
    let end = 0;
    let type;
    for (let i = 0; i < dateMask.positions.length; i++) {
      type = dateMask.positions[i];
      const sectionLength = dateMask.positions[i]?.length || 0;
      if (sectionLength >= position) {
        end = start + sectionLength;
        break;
      } else {
        start += sectionLength + dateMask.separator.length;
        position -= sectionLength + dateMask.separator.length;
      }
    }
    return { start, end, type };
  }

  function onClickHandler(event: React.FormEvent<HTMLInputElement>) {
    const target = event.currentTarget;
    if (!target.value) target.value = dateMask.mask;
    const position = target.selectionStart!;
    const { start, end } = getSelectionRangeByPosition(position);
    target.setSelectionRange(start, end);
  }

  function onBlurHandler() {
    if (yearValue && monthValue && dayValue) {
      const newDate = new Date(
        Number(yearValue),
        Number(monthValue) - 1,
        Number(dayValue),
      );
      yearValue = newDate.getFullYear().toString();
      monthValue = (newDate.getMonth() + 1).toString();
      dayValue = newDate.getDate().toString();

      setSelectedDate({ selectedDate: newDate });
    }else {
      setSelectedDate({selectedDate: new Date("")})
    }
  }

  return (
    <div className={style.container}>
      <input
        onInvalid={onInvalidHandler}
        onBlur={onBlurHandler}
        defaultValue={defaultValue?.toLocaleDateString() || ""}
        onKeyDown={onKeyDownHandler}
        className={style.input}
        placeholder={dateMask.mask}
        onClick={onClickHandler}
        ref={inputRef}
        type="text"
      />
      <label className={style.label}>{"label"}</label>
      {invalid && (
        <span className={style.validationMessage}>{validationMessage}</span>
      )}
      <CalendarIcon className={style.icon} onClick={onCalendarClick} />
    </div>
  );
}
