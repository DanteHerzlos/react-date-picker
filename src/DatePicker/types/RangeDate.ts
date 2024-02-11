import { DateUtils } from "../helpers/DateUtils";
import { InvalidDate } from "./InvalidDate";
import { PickerType } from "./PickerType";

export class RangeDate {
  value: [Date, Date] = [new InvalidDate(), new InvalidDate()];
  constructor(range?: [Date, Date]) {
    if (range && range[0]) {
      this.setStartDate(range[0]);
    }
    if (range && range[1]) {
      this.setEndDate(range[1]);
    }
  }

  setStartDate(date: Date) {
    this.value[0] = new Date(date);
  }

  setEndDate(date: Date) {
    if (date < this.getStartDate()) {
      this.value[1] = this.value[0];
      this.value[0] = new Date(date);
    } else {
      this.value[1] = new Date(date);
    }
  }

  getStartDate() {
    return this.value[0];
  }

  getEndDate() {
    return this.value[1];
  }

  setDate(date: Date) {
    if (isNaN(this.value[0].getTime())) {
      this.setStartDate(date);
    } else if (isNaN(this.value[1].getTime())) {
      this.setEndDate(date);
    } else {
      this.setStartDate(date);
      this.value[1] = new InvalidDate();
    }
  }

  isValid() {
    for (const value of this.value.values()) {
      if (isNaN(value.getTime())) return false;
    }
    return true;
  }

  getValue(): [Date, Date] {
    return [this.value[0], this.value[1]];
  }

  isInteresept(dates: [Date, Date][]) {
    for (const [start, end] of dates) {
      if (
        (this.value[0] >= start && this.value[0] <= end) ||
        (this.value[1] >= start && this.value[1] <= end) ||
        (this.value[0] < start && this.value[1] > end)
      ) {
        return true;
      }
    }
    return false;
  }

  setValue(value: [Date, Date]) {
    this.value = [new Date(value[0]), new Date(value[1])];
  }

  restrictDateByType(mode: PickerType) {
    this.value[0] = DateUtils.getDateWithRestriction(this.value[0], mode);
    this.value[1] = DateUtils.getDateWithRestriction(this.value[1], mode);
  }

  toString() {
    return this.value.map((d) => d.toString()).join("");
  }

  getCopy() {
    return new RangeDate(this.getValue());
  }
}
