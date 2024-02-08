import { useMemo } from "react";
import {
  DatePickerStore,
  createDatePickerStore,
} from "./store/DatePickerStoreContext";
import { DatePickerWithContext } from "./DatePickerWithContext";
import { IBaseDatePickerProps } from "./types/IBaseDatePickerProps";


export function DatePicker(props: IBaseDatePickerProps<Date>) {
  const mode = props.mode || 'input';
  const store = useMemo(() => createDatePickerStore(props), [props]);
  return (
    <DatePickerStore.Provider value={store}>
      <DatePickerWithContext onChange={props.onChange} mode={mode} />
    </DatePickerStore.Provider>
  );
}
