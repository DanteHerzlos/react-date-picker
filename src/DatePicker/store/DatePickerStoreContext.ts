import { DateUtils, FormatType } from "DatePicker/helpers/DateUtils";
import createContextStore from "./createContextStore";
import { PickerTypeEnum } from "DatePicker/types/PickerTypesEnum";

export interface IDatePickerStore {
  locale?: string;
  monthFormat?: FormatType;
  weekFormat?: FormatType;
  startYear?: number;
  endYear?: number;
  pickerType?: PickerTypeEnum;
}

export function createDatePickerStore(
  {
    locale = "default",
    monthFormat,
    weekFormat,
    startYear,
    endYear,
  }: IDatePickerStore,
  pickerType = PickerTypeEnum.DAY,
) {
  const monthNames = DateUtils.getMonthNames(locale, monthFormat);
  const weekNames = DateUtils.getWeekNames(locale, weekFormat);
  const years = DateUtils.getYearsInterval(startYear, endYear);
  const dateMask = DateUtils.getDateMask(locale, pickerType);
  const selectedDate = new Date();
  return { locale, weekNames, monthNames, years, dateMask, selectedDate };
}

export const defaultStore = createDatePickerStore({});
export const DatePickerStoreContext = createContextStore(defaultStore);
