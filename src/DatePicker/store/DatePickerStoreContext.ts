import { DateUtils, FormatType } from "../helpers/DateUtils";
import createContextStore from "./createContextStore";
import { PickerTypeEnum } from "../types/PickerTypesEnum";
import { DateInputModel } from "../helpers/InputUtils";

export interface IDatePickerStore {
  locale?: string;
  monthFormat?: FormatType;
  weekFormat?: FormatType;
  startYear?: number;
  endYear?: number;
  pickerType?: PickerTypeEnum;
  disabledDates?: [Date, Date][];
}

export function createDatePickerStore(
  {
    locale = "default",
    monthFormat,
    weekFormat,
    startYear,
    endYear,
    disabledDates = [],
  }: IDatePickerStore,
  pickerType: PickerTypeEnum = PickerTypeEnum.DAY,
  defaultValue?: Date,
  value?: Date,
  name?: string
) {
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
    inputName: name,
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
    disabledDates
  };
}

export const defaultStore = createDatePickerStore({});
export const DatePickerStore = createContextStore(defaultStore);
