import { DateValuesType } from "../types/DateValues";
import { PickerType, PickerTypeEnum } from "../types/PickerType";

type PositionType = "YYYY" | "MM" | "DD";

export class DateMask {
  positions: {
    defaultValue: PositionType;
    type: DateValuesType;
  }[];
  separator: string;
  mask: string;

  private dayIndex: number;
  private monthIndex: number;
  private yearIndex: number;
  private dateParse = new Date(1970, 11, 29);

  constructor(locale: string, pickerType: PickerType = "day") {
    const { separator, positions } = this.getSeparatorAndPositions(locale);
    this.separator = separator;
    this.positions = positions;
    this.filterPositionsByPickerType(pickerType);
    this.yearIndex = this.positions.findIndex((el) => el.type === "year");
    this.monthIndex = this.positions.findIndex((el) => el.type === "month");
    this.dayIndex = this.positions.findIndex((el) => el.type === "day");
    this.mask = this.positions
      .map((el) => el.defaultValue)
      .join(this.separator);
  }

  private getSeparatorAndPositions(locale: string) {
    const localeString = this.dateParse.toLocaleDateString(locale);
    const separators = localeString.replace(/[0-9]/g, "");
    const separator = separators.slice(0, separators.length / 2);
    const dateArr = localeString.split(this.separator);
    const positions: {
      defaultValue: PositionType;
      type: DateValuesType;
    }[] = dateArr.map((d) => {
      if (d === "1970") return { defaultValue: "YYYY", type: "year" };
      if (d === "12") return { defaultValue: "MM", type: "month" };
      if (d === "29") return { defaultValue: "DD", type: "day" };
      return { defaultValue: "DD", type: "day" };
    });
    return { separator, positions };
  }

  private filterPositionsByPickerType(pickerType: PickerType) {
    if (pickerType === PickerTypeEnum.YEAR) {
      this.positions = this.positions.filter(
        (d) => d.type !== "month" && d.type !== "day",
      );
    } else if (pickerType === PickerTypeEnum.MONTH) {
      this.positions = this.positions.filter((d) => d.type !== "day");
    }
  }

  getMaskByDates({
    dayValue,
    monthValue,
    yearValue,
  }: {
    dayValue?: string;
    monthValue?: string;
    yearValue?: string;
  }) {
    const date = new Array(this.positions.length);
    date[this.yearIndex] = (yearValue || "YYYY").padStart(4, "0");
    if (this.dayIndex !== -1) {
      date[this.dayIndex] = (dayValue || "DD").padStart(2, "0");
    }
    if (this.monthIndex !== -1) {
      date[this.monthIndex] = (monthValue || "MM").padStart(2, "0");
    }
    return date.join(this.separator);
  }
}
