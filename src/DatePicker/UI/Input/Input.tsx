import {
  DatePickerStoreContext,
  IDatePickerStore,
} from "DatePicker/store/DatePickerStoreContext";
import { useContext, useRef } from "react";
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
  const { dateMask } = useContext(DatePickerStoreContext);

  function onKeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const target = event.currentTarget;
    const position = target.selectionStart!;
    const { start, end } = getSelectionRangeByPosition(position);
    target.setSelectionRange(start, end);
    if (numericKeys.has(event.key)) {
      console.log(event.key);
    }
  }

  // function onInputHandler(event: React.FormEvent<HTMLInputElement>) {
  //   const target = event.currentTarget;
  //   const position = target.selectionStart!;
  //   const { start, end } = getSelectionRangeByPosition(position);
  //   target.setSelectionRange(start, end);
  // }

  function getSelectionRangeByPosition(position: number) {
    let start = 0;
    let end = 0;
    for (let i = 0; i < dateMask.positions.length; i++) {
      const sectionLength = dateMask.positions[i].length;
      if (sectionLength >= position) {
        end = start + sectionLength;
        break;
      } else {
        start += sectionLength + dateMask.separator.length;
        position -= sectionLength + dateMask.separator.length;
      }
    }
    return { start, end };
  }

  function onClickHandler(event: React.FormEvent<HTMLInputElement>) {
    const target = event.currentTarget;
    const position = target.selectionStart!;
    const { start, end } = getSelectionRangeByPosition(position);
    target.setSelectionRange(start, end);
  }

  function onFocusHandler(event: React.FormEvent<HTMLInputElement>) {
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
        onFocus={onFocusHandler}
        // onInput={onInputHandler}
        ref={inputRef}
        type="text"
        inputMode="numeric"
      />
    </div>
  );
}
