import { DatePickerStore } from "../../store/DatePickerStoreContext";
import { useEffect, useRef } from "react";
import style from "./DateInput.module.css";
import { CalendarIcon } from "../../icons/CalendarIcon";
import { DateValues } from "../../types/DateValues";
import { Input } from "../Input/Input";

const numericKeys = new Set(new Array(10).fill(0).map((_, i) => i.toString()));
const dateValues = new DateValues();

function isDisabledDate(date: Date, disabledDates: [Date, Date][]) {
  for (const [start, end] of disabledDates) {
    if (date >= start && date <= end) {
      return true;
    }
  }
  return false;
}

export function DateInput({
  onCalendarClick,
  isHide = false,
}: {
  onCalendarClick?: () => void;
  isHide?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dateInputModel] = DatePickerStore.useStore((s) => s.dateInputModel);
  dateInputModel.setElement(inputRef.current);
  const [dateMask] = DatePickerStore.useStore((s) => s.dateMask);
  const [disabledDates] = DatePickerStore.useStore((s) => s.disabledDates);
  const [readOnly] = DatePickerStore.useStore((s) => s.readOnly);
  const [label] = DatePickerStore.useStore((s) => s.label);
  const [required] = DatePickerStore.useStore((s) => s.required);
  const [disabled] = DatePickerStore.useStore((s) => s.disabled);
  const [name] = DatePickerStore.useStore((s) => s.name);
  const [CustomInput] = DatePickerStore.useStore((s) => s.CustomInput);
  const [pickerType] = DatePickerStore.useStore((s) => s.pickerType);

  const [defaultValue] = DatePickerStore.useStore((s) => s.defaultValue);
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
      if (isDisabledDate(selectedDate, disabledDates)) {
        inputRef.current?.setCustomValidity("selecte disabled date");
      } else {
        inputRef.current?.setCustomValidity("");
      }
    } else if (required) {
      inputRef.current?.setCustomValidity("feild is required");
    }
    inputRef.current?.checkValidity();
  }, [selectedDate.toString()]);

  function onKeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (readOnly || disabled) return;
    event.preventDefault();
    const target = event.currentTarget;
    const position = target.selectionStart!;
    const { start, end, type } =
      dateInputModel.getSelectionRangeByPosition(position);
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
    if (disabled || readOnly) return;
    dateInputModel.setCurrentRange();
  }

  function onBlurHandler() {
    if (disabled) return;
    setSelectedDate({
      selectedDate: dateValues.isAllSet() ? dateValues.getDate() : new Date(""),
    });
  }
  return (
    <div
      className={
        isHide ? [style.container, style._hide].join(" ") : style.container
      }
    >
      {CustomInput ? (
        <CustomInput
          onBlur={onBlurHandler}
          defaultValue={defaultValue?.toLocaleDateString() || ""}
          onKeyDown={onKeyDownHandler}
          placeholder={dateMask.mask}
          onClick={onClickHandler}
          ref={inputRef}
        />
      ) : (
        <Input
          label={label}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          name={name}
          onBlur={onBlurHandler}
          defaultValue={defaultValue?.toLocaleDateString() || ""}
          onKeyDown={onKeyDownHandler}
          placeholder={dateMask.mask}
          onClick={onClickHandler}
          ref={inputRef}
        />
      )}
      <CalendarIcon
        className={
          disabled || readOnly
            ? [style.icon, style._disabled].join(" ")
            : style.icon
        }
        onClick={onCalendarClick}
      />
    </div>
  );
}
