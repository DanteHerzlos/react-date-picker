import { useMemo } from "react";
import { DatePickerStore } from "./store/DatePickerStoreContext";
import { DatePickerWithContext } from "./DatePickerWithContext";
import { IBaseDatePickerProps } from "./types/IBaseDatePickerProps";
import { createBaseDatePickerStore } from "./store/createBaseDatePickerStore";

export function DatePicker(props: IBaseDatePickerProps<Date>) {
  const store = useMemo(() => createBaseDatePickerStore(props), [props]);
  return (
    <DatePickerStore.Provider value={store}>
      <DatePickerWithContext
        dateType="one"
        onChange={props.onChange}
        mode={props.mode || "input"}
        value={props.value}
        defaultValue={props.defaultValue}
      />
    </DatePickerStore.Provider>
  );
}
