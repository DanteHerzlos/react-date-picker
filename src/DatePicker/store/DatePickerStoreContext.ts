import { DateUtils } from "../helpers/DateUtils";
import createContextStore from "./createContextStore";
import { DateInputModel } from "../helpers/InputUtils";
import { ModeType } from "../types/ModeType";
import { PickerType} from "DatePicker/types/PickerType";
import { IDatePickerOptions } from "DatePicker/types/IBaseDatePickerProps";
import { DateAdapter } from "DatePicker/types/DateAdapter";
import { RangeDate } from "DatePicker/types/RangeDate";
import { createBaseDatePickerStore } from "./createBaseDatePickerStore";

// type DateType = DateAdapter | RangeDate | MultiDate

interface IDatePickerStoreProps<DateType> {
  options?: IDatePickerOptions;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  label?: string;
  pickerType?: PickerType;
  mode?: ModeType;
  disabledDates?: [Date, Date][];
  customInput?: React.ReactElement | any;
  defaultValue?: DateType;
  value?: DateType;
}

export function createDatePickerStore(props: IDatePickerStoreProps<Date>) {
  const baseStore = createBaseDatePickerStore(props);
  const { locale, pickerType } = baseStore;
  const { value, defaultValue } = props;
  const dateMask = DateUtils.getDateMask(locale, pickerType);
  const dateInputModel = new DateInputModel(dateMask);
  let selectedDate = new DateAdapter();
  if (value || defaultValue) {
    selectedDate = new DateAdapter(value || defaultValue);
    selectedDate.restrictDateByType(pickerType);
  }

  return { ...baseStore, selectedDate, defaultValue, dateInputModel, dateMask };
}

export function createRangeDatePickerStore(
  props: IDatePickerStoreProps<[Date, Date]>,
) {
  const baseStore = createBaseDatePickerStore(props);
  const { locale, pickerType } = baseStore;
  const { value, defaultValue } = props;
  const dateMask = DateUtils.getDateMask(locale, pickerType);
  const dateInputModel = new DateInputModel(dateMask);
  let selectedDate = new RangeDate();
  if (value || defaultValue) {
    selectedDate = new RangeDate(value || defaultValue);
    selectedDate.restrictDateByType(pickerType);
  }
  return { ...baseStore, selectedDate, defaultValue, dateInputModel, dateMask };
}

export const defaultDateStore = createDatePickerStore({});
export const DatePickerStore = createContextStore(defaultDateStore);
