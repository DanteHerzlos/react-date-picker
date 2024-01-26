import { PickerTypeEnum } from "DatePicker/UI/Calendar/Calendar";
import { toTitleCase } from "./toTitleCase";

export type FormatType = "short" | "long" | "narrow";

export class DateUtils {
  static getDateMask(locale: string) {
    const date = new Date(1970, 11, 29);
    const localeString = date.toLocaleDateString(locale);
    const separators = localeString.replace(/[0-9]/g, "");
    const separator = separators.slice(0,separators.length/2);
    const dateArr = localeString.split(separator);
    const yearIndex = dateArr.findIndex((el) => el === "1970");
    const monthIndex = dateArr.findIndex((el) => el === "12");
    const dayIndex = dateArr.findIndex((el) => el === "29");
    const positions = new Array(3);
    positions[yearIndex] = "YYYY";
    positions[monthIndex] = "MM";
    positions[dayIndex] = "DD";
    const mask = positions.join(separator)
    return { positions, separator, mask };
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
