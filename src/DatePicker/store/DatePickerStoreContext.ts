import { DateUtils } from "../helpers/DateUtils";
import createContextStore from "./createContextStore";
import { DateInputModel } from "../helpers/InputUtils";
import { IDatePickerOptions } from "../DatePicker";
import { ModeType } from "../types/ModeType";
import { PickerType, PickerTypeEnum } from "DatePicker/types/PickerType";

interface IDatePickerStoreProps {
  options?: IDatePickerOptions;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  label?: string;
  pickerType?: PickerType;
  mode?: ModeType;
  disabledDates?: [Date, Date][];
  defaultValue?: Date;
  value?: Date;
  customInput?: React.ReactElement | any;
}

export function createDatePickerStore({
  options = {},
  disabledDates = [],
  pickerType = PickerTypeEnum.DAY,
  defaultValue,
  value,
  name,
  readOnly = false,
  disabled = false,
  required = false,
  label,
  customInput,
}: IDatePickerStoreProps) {
  const {
    locale = "default",
    monthFormat,
    weekFormat,
    startYear,
    endYear,
  } = options;
  const initialPickerType = pickerType;
  const weekNames = DateUtils.getWeekNames(locale, weekFormat);
  const years = DateUtils.getYearsInterval(startYear, endYear);
  const dateMask = DateUtils.getDateMask(locale, pickerType);
  const dateInputModel = new DateInputModel(dateMask);
  let selectedDate = new Date("");
  if (value || defaultValue) {
    selectedDate = DateUtils.getDateWithRestriction(
      value || defaultValue!,
      pickerType,
    );
  }

  return {
    required,
    disabled,
    readOnly,
    name,
    locale,
    weekNames,
    monthFormat,
    years,
    dateMask,
    selectedDate,
    pickerType,
    initialPickerType,
    defaultValue,
    dateInputModel,
    disabledDates,
    label,
    CustomInput: customInput,
  };
}

export const defaultStore = createDatePickerStore({});
export const DatePickerStore = createContextStore(defaultStore);
