import { useMemo } from "react";
import {
  DatePickerStore,
  createDatePickerStore,
} from "./store/DatePickerStoreContext";
import { DatePickerWithContext } from "./DatePickerWithContext";
import { FormatType } from "./helpers/DateUtils";
import { ModeType } from "./types/ModeType";


export interface IDatePickerOptions {
  locale?: string;
  monthFormat?: FormatType;
  weekFormat?: FormatType;
  startYear?: number;
  endYear?: number;
  pickerType?: PickerType;
}

interface IBaseDatePickerProps<DateType> {
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  label?: string;
  pickerType?: PickerType;
  mode?: ModeType;
  disabledDates?: [Date, Date][];
  options?: IDatePickerOptions;
  onChange?: (selected: DateType) => void;
  defaultValue?: DateType;
  value?: DateType;
  /**
   * @experimental
   * Custom React input element.
  */
  customInput?: React.ReactElement;
}

export function DatePicker(props: IBaseDatePickerProps<Date>) {
  const mode = props.mode || 'input';
  const store = useMemo(() => createDatePickerStore(props), [props]);
  return (
    <DatePickerStore.Provider value={store}>
      <DatePickerWithContext onChange={props.onChange} mode={mode} />
    </DatePickerStore.Provider>
  );
}
