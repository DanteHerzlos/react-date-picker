import { useMemo } from "react";
import {
  DatePickerStore,
  createDatePickerStore,
} from "./store/DatePickerStoreContext";
import { IBaseDatePickerProps } from "./types/IBaseDatePickerProps";
import { RangeDate } from "./types/RangeDate";
import { RangeDatePickerWithContext } from "./RangeDatePickerWithContext";

export function RangeDatePicker(props: IBaseDatePickerProps<[Date, Date]>) {
  const mode = props.mode || "input";
  const store = useMemo(
    () =>
      createDatePickerStore({
        ...props,
        defaultValue: new RangeDate(props.defaultValue),
        value: new RangeDate(props.value),
      }),
    [props],
  );
  return (
    <DatePickerStore.Provider value={store}>
      <RangeDatePickerWithContext onChange={props.onChange} mode={mode} />
    </DatePickerStore.Provider>
  );
}
