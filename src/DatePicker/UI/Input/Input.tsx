import {
  DatePickerStoreContext,
  IDatePickerStore,
} from "DatePicker/store/DatePickerStoreContext";
import { useRef } from "react";
import style from "./Input.module.css";

const numericKeys = new Set(new Array(10).fill(0).map((_, i) => i.toString()));

export function Input({
  value,
  options,
}: {
  value: Date;
  options?: IDatePickerStore;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dateMask] = DatePickerStoreContext.useStore(store => store.dateMask);
  let dayValue = "";
  let monthValue = "";
  let yearValue = "";

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
      console.log(dayValue, monthValue, yearValue);
      target.value = dateMask.getMaskByDates(dayValue, monthValue, yearValue);

      target.setSelectionRange(start, end);
      console.log(new Date(+yearValue, +monthValue-1, +dayValue))
    }
  }

  function getSelectionRangeByPosition(position: number) {
    let start = 0;
    let end = 0;
    let type;
    for (let i = 0; i < dateMask.positions.length; i++) {
      type = dateMask.positions[i];
      const sectionLength = dateMask.positions[i].length;
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

  return (
    <div>
      <input
        onKeyDown={onKeyDownHandler}
        className={style.input}
        placeholder={dateMask.mask}
        onClick={onClickHandler}
        ref={inputRef}
        type="text"
        inputMode="numeric"
      />
    </div>
  );
}
