import { DateUtils } from "../../../helpers/DateUtils";
import { PickerStyleTypesEnum } from "../const/pickerStyleMap";
import { RangeDate } from "../../../types/RangeDate";
import { MultiDate } from "../../../types/MultiDate";
import { DateAdapter } from "DatePicker/types/DateAdapter";

type CheckDateFnType = (day: number) => false | PickerStyleTypesEnum;

class BaseDaysModel<SelectedDateType> {
  checkDateFns: CheckDateFnType[] = [
    (day: number) => this.isNow(day) && PickerStyleTypesEnum.CURRENT,
    (day: number) => this.isDisabled(day) && PickerStyleTypesEnum.DISABLED,
  ];
  days: { value: number; styleType: PickerStyleTypesEnum }[] = [];
  colSpan: number;
  currentDate: Date;
  selectedDate: SelectedDateType;
  disabledDates: [Date, Date][];
  constructor(
    currentDate: Date,
    selectedDate: SelectedDateType,
    disabledDates: [Date, Date][],
    extendCheckDateFns?: CheckDateFnType[],
  ) {
    extendCheckDateFns && this.checkDateFns.push(...extendCheckDateFns);
    const firstDayOfMonth = DateUtils.getFirstDayOfMonth(currentDate);
    this.colSpan = firstDayOfMonth.getDay() - 1;
    this.disabledDates = disabledDates;
    this.currentDate = currentDate;
    this.selectedDate = selectedDate;
  }

  isNow(day: number) {
    const now = new Date();
    return (
      this.currentDate.getFullYear() === now.getFullYear() &&
      this.currentDate.getMonth() === now.getMonth() &&
      day === now.getDate()
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

  generateDays() {
    const firstDayOfMonth = DateUtils.getFirstDayOfMonth(this.currentDate);
    const lastDayOfMonth = DateUtils.getLastDayOfMonth(this.currentDate);
    const start = firstDayOfMonth.getDate();
    const end = lastDayOfMonth.getDate();
    const days = [];
    for (let day = start; day <= end; day++) {
      let styleType: PickerStyleTypesEnum = PickerStyleTypesEnum.DEFAULT;
      for (const checkDateFn of this.checkDateFns) {
        const type = checkDateFn(day);
        if (type) styleType = type;
      }
      days.push({ value: day, styleType });
    }
    this.days = days;
    return days;
  }
}

class DaysModel extends BaseDaysModel<DateAdapter> {
  constructor(
    currentDate: Date,
    selectedDate: DateAdapter,
    disabledDates: [Date, Date][],
  ) {
    const extendCheckDateFns = [
      (day: number) => this.isSelected(day) && PickerStyleTypesEnum.ACTIVE,
    ];
    super(currentDate, selectedDate, disabledDates, extendCheckDateFns);
  }
  isSelected(day: number) {
    return (
      this.currentDate.getFullYear() === this.selectedDate.getValue().getFullYear() &&
      this.currentDate.getMonth() === this.selectedDate.getValue().getMonth() &&
      day === this.selectedDate.getValue().getDate()
    );
  }
}

class RangeDaysModel extends BaseDaysModel<RangeDate> {
  constructor(
    currentDate: Date,
    selectedDate: RangeDate,
    disabledDates: [Date, Date][],
  ) {
    const extendCheckDateFns = [
      (day: number) =>
        this.isStartRange(day) && PickerStyleTypesEnum.START_RANGE,
      (day: number) =>
        this.isMiddleRange(day) && PickerStyleTypesEnum.MIDDLE_RANGE,
      (day: number) => this.isEndRange(day) && PickerStyleTypesEnum.END_RANGE,
    ];
    super(currentDate, selectedDate, disabledDates, extendCheckDateFns);
  }
  isStartRange(day: number) {
    const startDate = this.selectedDate.getStartDate();
    return (
      this.currentDate.getFullYear() === startDate.getFullYear() &&
      this.currentDate.getMonth() === startDate.getMonth() &&
      day === startDate.getDate()
    );
  }

  isMiddleRange(day: number) {
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
    return false;
  }

  isEndRange(day: number) {
    const endDate = this.selectedDate.getEndDate();
    return (
      this.currentDate.getFullYear() === endDate.getFullYear() &&
      this.currentDate.getMonth() === endDate.getMonth() &&
      day === endDate.getDate()
    );
  }
}

class MultiDaysModel extends BaseDaysModel<MultiDate> {
  constructor(
    currentDate: Date,
    selectedDate: MultiDate,
    disabledDates: [Date, Date][],
  ) {
    const extendCheckDateFns = [
      (day: number) => this.isSelected(day) && PickerStyleTypesEnum.ACTIVE,
    ];
    super(currentDate, selectedDate, disabledDates, extendCheckDateFns);
  }
  isSelected(day: number) {
    for (const date of this.selectedDate.getValue()) {
      if (
        this.currentDate.getFullYear() === date.getFullYear() &&
        this.currentDate.getMonth() === date.getMonth() &&
        day === date.getDate()
      ) {
        return true;
      }
    }
    return false;
  }
}

export function getDaysModel<SelectedDateType>(
  currentDate: Date,
  selectedDate: SelectedDateType,
  disabledDates: [Date, Date][],
) {
  if(selectedDate instanceof DateAdapter) {
    const model = new DaysModel(currentDate, selectedDate, disabledDates)
    model.generateDays()
    return model
  }
  if(selectedDate instanceof RangeDate) {
    const model = new RangeDaysModel(currentDate, selectedDate, disabledDates)
    model.generateDays()
    return model
  }
  if(selectedDate instanceof MultiDate) {
    const model = new MultiDaysModel(currentDate, selectedDate, disabledDates)
    model.generateDays()
    return model
  }
  throw new Error("Can't generate DaysModel. Wrong type for selectedDate")
}
