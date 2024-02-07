import { DatePickerStore } from "../../store/DatePickerStoreContext";
import { useEffect, useRef, useState } from "react";
import style from "./Input.module.css";
import { CalendarIcon } from "../../icons/CalendarIcon";
import { DateValues } from "../../types/DateValues";

const numericKeys = new Set(new Array(10).fill(0).map((_, i) => i.toString()));
const dateValues = new DateValues();

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
  const [dateInputModel] = DatePickerStore.useStore((s) => s.dateInputModel);
  dateInputModel.setElement(inputRef.current);
  const [dateMask] = DatePickerStore.useStore((s) => s.dateMask);
  const [defaultValue] = DatePickerStore.useStore((s) => s.defaultValue);
  const [pickerType] = DatePickerStore.useStore((s) => s.pickerType);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [validationMessage, setValidatiopnMessage] = useState<string>("");
  const [selectedDate, setSelectedDate] = DatePickerStore.useStore(
    (s) => s.selectedDate,
  );

  useEffect(() => {
    dateValues.resetValuesByType(pickerType);
  }, [pickerType]);

  useEffect(() => {
    if (!isNaN(selectedDate.getTime())) {
      dateValues.setValuesByDate(selectedDate);
      inputRef.current!.value = dateMask.getMaskByDates(
        dateValues.getStringValues(),
      );
      setInvalid(false);
    } else {
      setInvalid(true);
    }
  }, [selectedDate.toString()]);

  function onKeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const target = event.currentTarget;
    const position = target.selectionStart!;
    const { start, end, type } = dateInputModel.getSelectionRangeByPosition(position);
    target.setSelectionRange(start, end);

    if (event.key === "ArrowLeft") dateInputModel.setPrevRange();
    if (event.key === "ArrowRight") dateInputModel.setNextRange();
    if (event.key === "Tab") dateInputModel.setCircleNextRange();
    if (event.key === "Enter") target.blur();
    if (event.key === "Backspace") {
      dateValues.clear(type);
      dateInputModel.setValueByDateValue(dateValues);
      target.setSelectionRange(start, end);
    }

    if (numericKeys.has(event.key)) {
      type && dateValues.appendDigitToValueByType(type, event.key);
      dateInputModel.setValueByDateValue(dateValues);
      target.setSelectionRange(start, end);
    }
  }

  function onClickHandler(event: React.FormEvent<HTMLInputElement>) {
    const target = event.currentTarget;
    if (!target.value) target.value = dateMask.mask;
    dateInputModel.setCurrentRange();
  }

  function onInvalidHandler(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    setInvalid(true);
    if (customValidationMessage) setValidatiopnMessage(customValidationMessage);
    else setValidatiopnMessage(e.currentTarget.validationMessage);
    if (onInvalid) onInvalid(e);
  }

  function onBlurHandler() {
    setSelectedDate({
      selectedDate: dateValues.isAllSet() ? dateValues.getDate() : new Date(""),
    });
  }

  return (
    <div className={style.container}>
      <input
        onInvalid={onInvalidHandler}
        onBlur={onBlurHandler}
        defaultValue={defaultValue?.toLocaleDateString() || ""}
        onKeyDown={onKeyDownHandler}
        className={
          invalid ? [style.input, style._invalid].join(" ") : style.input
        }
        placeholder={dateMask.mask}
        onClick={onClickHandler}
        ref={inputRef}
        type="text"
      />
      <label className={style.label}>{label}</label>
      {invalid && (
        <span className={style.validationMessage}>{validationMessage}</span>
      )}
      <CalendarIcon className={style.icon} onClick={onCalendarClick} />
    </div>
  );
}
