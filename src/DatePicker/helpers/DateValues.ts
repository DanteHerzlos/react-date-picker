// export enum DateValuesType {
//   DAY = "day",
//   MONTH = "month",
//   YEAR = "year",
// }

export type DateValuesType = "day" | "month" | "year";

class DateValue {
  value: number;
  private size: number;
  private defaultValue: number;
  private emptyValue: number;
  constructor(
    size: number,
    defaultValue: number,
    value?: number,
    emptyValue?: number,
  ) {
    this.size = size;
    this.defaultValue = defaultValue;
    this.emptyValue = emptyValue || -1;
    this.value = value || this.emptyValue;
  }

  setDefault() {
    this.value = this.defaultValue;
  }

  clear() {
    this.value = this.emptyValue;
  }

  toString() {
    if (this.value === this.emptyValue) return "";
    return this.value.toString().padStart(this.size, "0").slice(-this.size);
  }

  setValueFromString(str: string) {
    this.value = Number(str.padStart(this.size, "0").slice(-this.size));
    return this.value;
  }
}

export class DateValues {
  valueTypes: { [key in DateValuesType]: DateValue };
  constructor(yearValue?: number, monthValue?: number, dayValue?: number) {
    this.dayValue = new DateValue(2, 1, dayValue);
    this.monthValue = new DateValue(2, 0, monthValue);
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
      this.dayValue.clear();
      this.monthValue.clear();
      this.yearValue.clear();
    } else {
      this.valueTypes[type].clear();
    }
  }
}
