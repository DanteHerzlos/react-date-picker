import { DateUtils, FormatType } from "DatePicker/helpers/DateUtils";
import { createContext } from "react";

export interface IDatePickerStore {
  locale?: string;
  monthFormat?: FormatType;
  weekFormat?: FormatType;
  startYear?: number;
  endYear?: number;
}

export function createDatePickerStore({
  locale = "default",
  monthFormat,
  weekFormat,
  startYear,
  endYear,
}: IDatePickerStore) {
  const monthNames = DateUtils.getMonthNames(locale, monthFormat);
  const weekNames = DateUtils.getWeekNames(locale, weekFormat);
  const years = DateUtils.getYearsInterval(startYear, endYear);
  const dateMask = DateUtils.getDateMask(locale)
  return { locale, weekNames, monthNames, years, dateMask };
}

export const defaultStore = createDatePickerStore({});
export const DatePickerStoreContext = createContext(defaultStore);
