import { PickerTypeEnum } from "../types/PickerTypesEnum";
import { toTitleCase } from "./toTitleCase";
import { DateMask } from "./DateMask";

export type FormatType = "short" | "long" | "narrow";

export class DateUtils {
  static getDateMask(
    locale: string,
    pickerType: PickerTypeEnum = PickerTypeEnum.DAY,
  ) {
    return new DateMask(locale, pickerType);
  }

  static getFirstDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  static getLastDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  static getYearsInterval(start: number = 1900, end: number = 2100) {
    const years = [];
    for (let i = start; i < end; i++) years.push(i);
    return years;
  }
  
  static getMonthNames(
    locale: string = "default",
    format: FormatType = "long",
  ) {
    const date = new Date(0);
    const monthNames = [];
    for (let i = 0; i < 12; i++) {
      date.setMonth(i);
      const monthName = toTitleCase(
        date.toLocaleString(locale, { month: format }),
      );
      monthNames.push(monthName);
    }
    return monthNames;
  }

  static getWeekNames(
    locale: string = "default",
    format: FormatType = "short",
  ) {
    const date = new Date(0);
    const weekNames = [];
    for (let i = 5; i < 12; i++) {
      date.setDate(i);
      const weekName = toTitleCase(
        date.toLocaleString(locale, { weekday: format }),
      );
      weekNames.push(weekName);
    }
    return weekNames;
  }

  static getDateWithRestriction(date: Date, mode: PickerTypeEnum) {
    if (mode === PickerTypeEnum.YEAR) {
      return new Date(date.getFullYear(), 0, 1);
    }
    if (mode === PickerTypeEnum.MONTH) {
      return new Date(date.getFullYear(), date.getMonth(), 1);
    }
    if (mode === PickerTypeEnum.DAY) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    return new Date(date);
  }
}
