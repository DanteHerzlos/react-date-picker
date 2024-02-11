import { useMemo } from "react";
import { DatePickerStore } from "./store/DatePickerStoreContext";
import { IBaseDatePickerProps } from "./types/IBaseDatePickerProps";
import { DatePickerWithContext } from "./DatePickerWithContext";
import { createBaseDatePickerStore } from "./store/createBaseDatePickerStore";

export function RangeDatePicker(props: IBaseDatePickerProps<[Date, Date]>) {
  const store = useMemo(() => createBaseDatePickerStore(props), [props]);
  return (
    <DatePickerStore.Provider value={store}>
      <DatePickerWithContext
        dateType="range"
        onChange={props.onChange}
        mode={props.mode || "input"}
        value={props.value}
        defaultValue={props.defaultValue}
      />
    </DatePickerStore.Provider>
  );
}
