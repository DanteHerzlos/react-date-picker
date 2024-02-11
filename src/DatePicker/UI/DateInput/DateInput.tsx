import { DatePickerStore } from "../../store/DatePickerStoreContext";
import { useContext, useEffect, useRef } from "react";
import style from "./DateInput.module.css";
import { CalendarIcon } from "../../icons/CalendarIcon";
import { DateValues } from "../../types/DateValues";
import { Input } from "../Input/Input";
import { DateAdapter } from "../../types/DateAdapter";
import { DateUtils } from "../../helpers/DateUtils";
import { DateInputModel } from "../../helpers/InputUtils";
import { DateType } from "../../types/DateType";

const numericKeys = new Set(new Array(10).fill(0).map((_, i) => i.toString()));
const dateValues = new DateValues();

export function DateInput<T extends DateType>({
  defaultValue,
  selectedDate,
  setSelectedDate,
  onCalendarClick,
  isHide = false,
}: {
  defaultValue?: Date;
  selectedDate: T;
  setSelectedDate: (value: T) => void;
  onCalendarClick?: () => void;
  isHide?: boolean;
}) {
  const {
    disabledDates,
    CustomInput,
    readOnly,
    label,
    name,
    required,
    disabled,
    pickerType,
    locale,
  } = useContext(DatePickerStore);
  const inputRef = useRef<HTMLInputElement>(null);
  const dateMask = DateUtils.getDateMask(locale, pickerType);
  const dateInputModel = new DateInputModel(dateMask);
  dateInputModel.setElement(inputRef.current);

  useEffect(() => {
    dateValues.resetValuesByType(pickerType);
  }, [pickerType]);

  useEffect(() => {
    if (selectedDate.isValid()) {
      dateValues.setValuesByDate(selectedDate.getValue());
      inputRef.current!.value = dateMask.getMaskByDates(
        dateValues.getStringValues(),
      );
      if (selectedDate.isInteresept(disabledDates)) {
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
    setSelectedDate(
      dateValues.isAllSet()
        ? (new DateAdapter(dateValues.getDate()) as T)
        : (new DateAdapter() as T),
    );
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
