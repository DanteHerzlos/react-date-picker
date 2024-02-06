import { DateUtils } from "../../helpers/DateUtils";
import { PickerStyleTypesEnum } from "./const/pickerStyleMap";
import { RangeDate } from "../../helpers/RangeDate";
import { MultiDate } from "../../helpers/MultiDate";

export class DaysModel {
  days: { value: number; styleType: PickerStyleTypesEnum }[];
  colSpan: number;
  currentDate: Date;
  selectedDate: RangeDate | Date | MultiDate;
  disabledDates: [Date, Date][];
  constructor(
    currentDate: Date,
    selectedDate: RangeDate | Date,
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
    const now = new Date();
    return (
      this.currentDate.getFullYear() === now.getFullYear() &&
      this.currentDate.getMonth() === now.getMonth() &&
      day === now.getDate()
    );
  }

  isSelected(day: number) {
    if (!(this.selectedDate instanceof Date)) {
      return false;
    }

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
      const currentDateWithDay = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        day,
      );
      if (start <= currentDateWithDay && end >= currentDateWithDay) {
        return true;
      }
    }
    return false;
  }

  isStartRange(day: number) {
    if (!(this.selectedDate instanceof RangeDate)) return false;
    const startDate = this.selectedDate.getStartDate();
    return (
      this.currentDate.getFullYear() === startDate.getFullYear() &&
      this.currentDate.getMonth() === startDate.getMonth() &&
      day === startDate.getDate()
    );
  }

  isMiddleRange(day: number) {
    if (!(this.selectedDate instanceof RangeDate)) return false;
    const startDate = this.selectedDate.getStartDate();
    const endDate = this.selectedDate.getEndDate();
    const currentDateWithDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      day,
    );
    if (startDate < currentDateWithDay && endDate > currentDateWithDay) {
      return true;
    }
  }

  isEndRange(day: number) {
    if (!(this.selectedDate instanceof RangeDate)) return false;
    const endDate = this.selectedDate.getEndDate();
    return (
      this.currentDate.getFullYear() === endDate.getFullYear() &&
      this.currentDate.getMonth() === endDate.getMonth() &&
      day === endDate.getDate()
    );
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
      if (this.isStartRange(day)) {
        styleType = PickerStyleTypesEnum.START_RANGE;
      }
      if (this.isMiddleRange(day)) {
        styleType = PickerStyleTypesEnum.MIDDLE_RANGE;
      }
      if (this.isEndRange(day)) {
        styleType = PickerStyleTypesEnum.END_RANGE;
      }
      days.push({ value: day, styleType });
    }
    return days;
  }
}
