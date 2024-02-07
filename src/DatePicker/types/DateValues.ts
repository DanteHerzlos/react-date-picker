import { InvalidDate } from "./InvalidDate";

export type DateValuesType = "day" | "month" | "year";

class DateValue {
  value: number;
  private size: number;
  private defaultValue: number;
  private emptyValue: number;
  private valueOffset: number;
  constructor(
    size: number,
    defaultValue: number,
    value?: number,
    emptyValue: number = -1,
    valueOffset: number = 0,
  ) {
    this.size = size;
    this.defaultValue = defaultValue;
    this.emptyValue = emptyValue;
    this.value = value || this.emptyValue;
    this.valueOffset = valueOffset;
  }

  isEmpty() {
    return this.value === this.emptyValue;
  }

  setDefault() {
    this.value = this.defaultValue;
  }

  clear() {
    this.value = this.emptyValue;
  }

  toString() {
    if (this.value === this.emptyValue) return "";
    return (this.value + this.valueOffset)
      .toString()
      .padStart(this.size, "0")
      .slice(-this.size);
  }

  setValueFromString(str: string) {
    this.value =
      Number(str.padStart(this.size, "0").slice(-this.size)) - this.valueOffset;
    return this.value;
  }
}

export class DateValues {
  private valueTypes: { [key in DateValuesType]: DateValue };
  constructor(yearValue?: number, monthValue?: number, dayValue?: number) {
    this.dayValue = new DateValue(2, 1, dayValue);
    this.monthValue = new DateValue(2, 0, monthValue, -1, 1);
    this.yearValue = new DateValue(4, 1900, yearValue);
    this.valueTypes = {
      day: this.dayValue,
      month: this.monthValue,
      year: this.yearValue,
    };
  }

  dayValue: DateValue;
  monthValue: DateValue;
  yearValue: DateValue;

  resetValuesByType(type: DateValuesType) {
    if (type === "month") this.dayValue.setDefault();
    if (type === "year") {
      this.dayValue.setDefault();
      this.monthValue.setDefault();
    }
  }

  setValuesByDate(date: Date) {
    this.dayValue.value = date.getDate();
    this.monthValue.value = date.getMonth();
    this.yearValue.value = date.getFullYear();
  }

  getValues() {
    return {
      day: this.dayValue.value,
      month: this.monthValue.value,
      year: this.yearValue.value,
    };
  }

  getDate() {
    if (this.isOneEmpty()) return new InvalidDate();
    return new Date(
      this.yearValue.value,
      this.monthValue.value,
      this.dayValue.value,
    );
  }

  getStringValues() {
    return {
      dayValue: this.dayValue.toString(),
      monthValue: this.monthValue.toString(),
      yearValue: this.yearValue.toString(),
    };
  }

  appendDigitToValueByType(type: DateValuesType, digit: string) {
    this.valueTypes[type].setValueFromString(
      `${this.valueTypes[type]}${digit}`,
    );
  }

  isAllSet() {
    return this.dayValue && this.monthValue && this.yearValue;
  }

  clear(type?: DateValuesType) {
    if (!type) {
      for (const value of Object.values(this.valueTypes)) {
        value.clear();
      }
    } else {
      this.valueTypes[type].clear();
    }
  }

  isOneEmpty() {
    let isEmpty = false;
    for (const value of Object.values(this.valueTypes)) {
      isEmpty ||= value.isEmpty();
    }
    return isEmpty;
  }
}
