import { InvalidDate } from "./InvalidDate";

export class RangeDate {
  value: [Date, Date] = [new InvalidDate(), new InvalidDate()];
  constructor(start: Date, end: Date) {
    this.setStartDate(start);
    this.setEndDate(end);
  }

  setStartDate(date: Date) {
    this.value[0] = date;
  }

  setEndDate(date: Date) {
    if (date < this.getStartDate()) {
      this.value[1] = this.value[0];
      this.value[0] = date;
    } else {
      this.value[1] = date;
    }
  }

  getStartDate() {
    return this.value[0];
  }

  getEndDate() {
    return this.value[1];
  }

  getValue() {
    return this.value;
  }
}
