import { DateUtils } from "DatePicker/helpers/DateUtils";
import { PickerStyleTypesEnum } from "./const/pickerStyleMap";

export class DaysModel {
  days: { value: number; styleType: PickerStyleTypesEnum }[];
  colSpan: number;
  now = new Date();
  currentDate: Date;
  selectedDate: Date;
  disabledDates: [Date, Date][];
  constructor(
    currentDate: Date,
    selectedDate: Date,
    disabledDates: [Date, Date][],
  ) {
    this.disabledDates = disabledDates;
    this.currentDate = currentDate;
    this.selectedDate = selectedDate;
    this.days = this.generateDays();
    const firstDayOfMonth = DateUtils.getFirstDayOfMonth(currentDate);
    this.colSpan = firstDayOfMonth.getDay() - 1;
  }

  isNow(day: number) {
    return (
      this.currentDate.getFullYear() === this.now.getFullYear() &&
      this.currentDate.getMonth() === this.now.getMonth() &&
      day === this.now.getDate()
    );
  }

  isSelected(day: number) {
    return (
      this.currentDate.getFullYear() === this.selectedDate.getFullYear() &&
      this.currentDate.getMonth() === this.selectedDate.getMonth() &&
      day === this.selectedDate.getDate()
    );
  }

  isDisabled(day: number) {
    for (const disabledRange of this.disabledDates) {
      const start = disabledRange[0];
      const end = disabledRange[1];
      const selectedDateWithDay = new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth(),
        day,
      );
      if (start <= selectedDateWithDay && end >= selectedDateWithDay) {
        return true;
      }
    }
    return false;
  }

  private generateDays() {
    const firstDayOfMonth = DateUtils.getFirstDayOfMonth(this.currentDate);
    const lastDayOfMonth = DateUtils.getLastDayOfMonth(this.currentDate);
    const start = firstDayOfMonth.getDate();
    const end = lastDayOfMonth.getDate();
    const days = [];
    for (let day = start; day <= end; day++) {
      let styleType: PickerStyleTypesEnum = PickerStyleTypesEnum.DEFAULT;
      if (this.isNow(day)) {
        styleType = PickerStyleTypesEnum.CURRENT;
      }
      if (this.isDisabled(day)) {
        styleType = PickerStyleTypesEnum.DISABLED;
      }
      if (this.isSelected(day)) {
        styleType = PickerStyleTypesEnum.ACTIVE;
      }
      days.push({ value: day, styleType });
    }
    return days;
  }
}

