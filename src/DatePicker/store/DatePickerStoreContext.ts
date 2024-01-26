import { DateUtils, FormatType } from "DatePicker/helpers/DateUtils";
import { createContext } from "react";

export function createDatePickerStore({
  locale = "default",
  monthFormat,
  weekFormat,
  startYear,
  endYear,
}: {
  locale?: string;
  monthFormat?: FormatType;
  weekFormat?: FormatType;
  startYear?: number;
  endYear?: number;
}) {
  const monthNames = DateUtils.getMonthNames(locale, monthFormat);
  const weekNames = DateUtils.getWeekNames(locale, weekFormat);
  const years = DateUtils.getYearsInterval(startYear, endYear);
  return { locale, weekNames, monthNames, years };
}

export const defaultStore = createDatePickerStore({});
export const DatePickerStoreContext = createContext(defaultStore);
