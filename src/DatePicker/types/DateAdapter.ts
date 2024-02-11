import { DateUtils } from "../helpers/DateUtils";
import { PickerType } from "./PickerType";
import { InvalidDate } from "./InvalidDate";

export class DateAdapter {
  value: Date = new InvalidDate();
  constructor(date?: Date) {
    if (date) {
      this.value = date;
    }
  }

  setValue(value?: Date) {
    if (value) {
      this.value = new Date(value);
    } else {
      this.value = new InvalidDate();
    }
  }

  isValid() {
    return !isNaN(this.value.getTime());
  }

  setDate(date: Date) {
    this.value = date;
  }

  getValue() {
    return this.value;
  }

  isInteresept(dates: [Date, Date][]) {
    for (const [start, end] of dates) {
      if (this.value >= start && this.value <= end) return true;
    }
    return false;
  }

  restrictDateByType(mode: PickerType) {
    this.value = DateUtils.getDateWithRestriction(this.value, mode);
  }

  toString(){
    return this.value.toString()
  }

  getCopy(){
    return new DateAdapter(this.getValue())
  }
}
