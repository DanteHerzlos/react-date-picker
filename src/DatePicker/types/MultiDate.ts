import { DateUtils } from "DatePicker/helpers/DateUtils";
import { PickerType } from "./PickerType";

export class MultiDate {
  value: Map<string, Date>;
  constructor(dates: Date[]) {
    this.value = this.getMapFromArray(dates);
  }

  addDate(date: Date) {
    this.value.set(date.toString(), date);
  }

  removeDate(date: Date) {
    this.value.delete(date.toString());
  }

  toggleDate(date: Date) {
    if (this.value.has(date.toString())) {
      this.removeDate(date);
    } else {
      this.addDate(date);
    }
  }

  getValue() {
    return [...this.value.values()];
  }

  clear() {
    this.value.clear();
  }
  setDates(dates: Date[]) {
    this.clear();
    this.value = this.getMapFromArray(dates);
  }

  private getMapFromArray(dates: Date[]) {
    return new Map(dates.map((date) => [date.toString(), date]));
  }

  isValid() {
    for (const value of this.value.values()) {
      if (isNaN(value.getTime())) return false;
    }
    return true;
  }

  setDate(date: Date) {
    this.toggleDate(date);
  }

  setValue(value: Date[]){
    this.value = this.getMapFromArray(value)
  }

  isInteresept(dates: [Date, Date][]) {
    for (const [start, end] of dates) {
      for (const value of this.value.values()) {
        if (value >= start && value <= end) return true;
      }
    }
    return false;
  }

  restrictDateByType(mode: PickerType) {
    this.value.forEach((value, key) => {
      const restrictedValue = DateUtils.getDateWithRestriction(value, mode);
      this.value.set(key, restrictedValue);
    });
  }

  toString(){
    return [...this.value.values()].map(d => d.toString()).join("")
  }
}
