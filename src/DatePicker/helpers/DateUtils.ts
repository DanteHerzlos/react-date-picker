import { toTitleCase } from "./toTitleCase";

export class DateUtils {
  static getFirstDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  static getLastDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  static getWeekNames(
    locale: string,
    format: "short" | "long" | "narrow" = "short",
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
}
