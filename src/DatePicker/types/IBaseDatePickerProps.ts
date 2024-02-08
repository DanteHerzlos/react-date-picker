import { FormatType } from "DatePicker/helpers/DateUtils";
import { PickerType } from "./PickerType";
import { ModeType } from "./ModeType";

export interface IDatePickerOptions {
  locale?: string;
  monthFormat?: FormatType;
  weekFormat?: FormatType;
  startYear?: number;
  endYear?: number;
  pickerType?: PickerType;
}

export interface IBaseDatePickerProps<DateType> {
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

