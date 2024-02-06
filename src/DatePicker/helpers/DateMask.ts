import { PickerTypeEnum } from "DatePicker/types/PickerTypesEnum";
import { DateValuesType } from "./DateValues";

type PositionType = "YYYY" | "MM" | "DD" | "NN" 

export class DateMask {
  types: DateValuesType[]
  positions: PositionType[]
  separator: string
  mask: string

  private dayIndex: number
  private monthIndex: number
  private yearIndex: number

  constructor(
    locale: string,
    pickerType: PickerTypeEnum = PickerTypeEnum.DAY,
  ) {
    const date = new Date(1970, 11, 29);
    const localeString = date.toLocaleDateString(locale);
    const separators = localeString.replace(/[0-9]/g, "");
    this.separator = separators.slice(0, separators.length / 2);
    const dateArr = localeString.split(this.separator);
    this.positions = dateArr.map((d) => {
      if (d === "1970") return "YYYY";
      if (d === "12") return "MM";
      if (d === "29") return "DD";
      return "NN"
    });
    this.types = dateArr.map((d) => {
      if (d === "1970") return "year";
      if (d === "12") return "month";
      if (d === "29") return "day";
      return "day"
    });
    if (pickerType === PickerTypeEnum.YEAR) {
      this.positions = this.positions.filter((d) => d !== "MM" && d !== "DD");
    } else if (pickerType === PickerTypeEnum.MONTH) {
      this.positions = this.positions.filter((d) => d !== "DD");
    }
    this.positions = this.positions
    this.yearIndex = this.positions.findIndex((el) => el === "YYYY");
    this.monthIndex = this.positions.findIndex((el) => el === "MM");
    this.dayIndex = this.positions.findIndex((el) => el === "DD");
    this.mask = this.positions.join(this.separator);
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
