import { PickerTypeEnum } from "DatePicker/types/PickerTypesEnum";
import { toTitleCase } from "./toTitleCase";
import { DateValuesType } from "./DateValues";

export type FormatType = "short" | "long" | "narrow";

export class DateUtils {
  static getDateMask(
    locale: string,
    pickerType: PickerTypeEnum = PickerTypeEnum.DAY,
  ) {
    const date = new Date(1970, 11, 29);
    const localeString = date.toLocaleDateString(locale);
    const separators = localeString.replace(/[0-9]/g, "");
    const separator = separators.slice(0, separators.length / 2);
    const dateArr = localeString.split(separator);
    let positions = dateArr.map((d) => {
      if (d === "1970") return "YYYY";
      if (d === "12") return "MM";
      if (d === "29") return "DD";
    });
    let types: DateValuesType[] = dateArr.map((d) => {
      if (d === "1970") return "year";
      if (d === "12") return "month";
      if (d === "29") return "day";
      return "day"
    });
    if (pickerType === PickerTypeEnum.YEAR) {
      positions = positions.filter((d) => d !== "MM" && d !== "DD");
    } else if (pickerType === PickerTypeEnum.MONTH) {
      positions = positions.filter((d) => d !== "DD");
    }
    const yearIndex = positions.findIndex((el) => el === "YYYY");
    const monthIndex = positions.findIndex((el) => el === "MM");
    const dayIndex = positions.findIndex((el) => el === "DD");
    const mask = positions.join(separator);

    function getMaskByDates({
      dayValue,
      monthValue,
      yearValue,
    }: {
      dayValue?: string;
      monthValue?: string;
      yearValue?: string;
    }) {
      const date = new Array(positions.length);
      date[yearIndex] = (yearValue || "YYYY").padStart(4, "0");
      if (dayIndex !== -1) {
        date[dayIndex] = (dayValue || "DD").padStart(2, "0");
      }
      if (monthIndex !== -1) {
        date[monthIndex] = (monthValue || "MM").padStart(2, "0");
      }
      return date.join(separator);
    }
    return { types, positions, separator, mask, getMaskByDates };
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
