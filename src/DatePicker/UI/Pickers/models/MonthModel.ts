import { RangeDate } from "../../../types/RangeDate";
import { MultiDate } from "../../../types/MultiDate";
import { DateUtils, FormatType } from "../../../helpers/DateUtils";
import { PickerStyleTypesEnum } from "../const/pickerStyleMap";
import { DateAdapter } from "../../../types/DateAdapter";

type CheckDateFnType = (month: number) => false | PickerStyleTypesEnum;
type MonthsListType = {
  value: number;
  styleType: PickerStyleTypesEnum;
  name: string;
};

class BaseMonthsModel<SelectedDateType> {
  checkDateFns: CheckDateFnType[] = [
    (month: number) => this.isNow(month) && PickerStyleTypesEnum.CURRENT,
    (month: number) => this.isDisabled(month) && PickerStyleTypesEnum.DISABLED,
  ];
  months: MonthsListType[] = [];
  monthNames: string[];
  currentDate: Date;
  selectedDate: SelectedDateType;
  disabledDates: [Date, Date][];
  constructor(
    currentDate: Date,
    selectedDate: SelectedDateType,
    disabledDates: [Date, Date][],
    locale?: string,
    monthFormat?: FormatType,
    extendCheckDateFns?: CheckDateFnType[],
  ) {
    extendCheckDateFns && this.checkDateFns.push(...extendCheckDateFns);
    this.monthNames = DateUtils.getMonthNames(locale, monthFormat);
    this.disabledDates = disabledDates;
    this.currentDate = currentDate;
    this.selectedDate = selectedDate;
  }

  isNow(month: number) {
    const now = new Date();
    return (
      this.currentDate.getFullYear() === now.getFullYear() &&
      month === now.getMonth()
    );
  }

  isDisabled(month: number) {
    for (const disabledRange of this.disabledDates) {
      const start = disabledRange[0];
      const end = disabledRange[1];
      const currentYear = this.currentDate.getFullYear();
      const currentDateStartMonth = new Date(currentYear, month, 1);
      const currentDateEndMonth = new Date(currentYear, month + 1, 0);
      if (start <= currentDateStartMonth && end >= currentDateEndMonth) {
        return true;
      }
    }
    return false;
  }

  generateMonths() {
    const months = [];
    for (let month = 0; month < 12; month++) {
      let styleType: PickerStyleTypesEnum = PickerStyleTypesEnum.DEFAULT;
      for (const checkDateFn of this.checkDateFns) {
        const type = checkDateFn(month);
        if (type) styleType = type;
      }
      months.push({ value: month, styleType, name: this.monthNames[month] });
    }
    this.months = months;
  }
}

class DateMonthModel extends BaseMonthsModel<DateAdapter> {
  constructor(
    currentDate: Date,
    selectedDate: DateAdapter,
    disabledDates: [Date, Date][],
    locale?: string,
    monthFormat?: FormatType,
  ) {
    const extendCheckDateFns = [
      (month: number) => this.isSelected(month) && PickerStyleTypesEnum.ACTIVE,
    ];
    super(
      currentDate,
      selectedDate,
      disabledDates,
      locale,
      monthFormat,
      extendCheckDateFns,
    );
  }

  isSelected(month: number) {
    return (
      this.currentDate.getFullYear() === this.selectedDate.getValue().getFullYear() &&
      month === this.selectedDate.getValue().getMonth()
    );
  }
}

class RangeMonthModel extends BaseMonthsModel<RangeDate> {
  constructor(
    currentDate: Date,
    selectedDate: RangeDate,
    disabledDates: [Date, Date][],
    locale?: string,
    monthFormat?: FormatType,
  ) {
    const extendCheckDateFns = [
      (month: number) =>
        this.isStartRange(month) && PickerStyleTypesEnum.START_RANGE,
      (month: number) =>
        this.isMiddleRange(month) && PickerStyleTypesEnum.MIDDLE_RANGE,
      (month: number) =>
        this.isEndRange(month) && PickerStyleTypesEnum.END_RANGE,
      (month: number) =>
        this.isOneMonthRange(month) && PickerStyleTypesEnum.MIDDLE_RANGE,
    ];
    super(
      currentDate,
      selectedDate,
      disabledDates,
      locale,
      monthFormat,
      extendCheckDateFns,
    );
  }

  isStartRange(month: number) {
    const startDate = this.selectedDate.getStartDate();
    return (
      this.currentDate.getFullYear() === startDate.getFullYear() &&
      month === startDate.getMonth()
    );
  }

  isMiddleRange(month: number) {
    const startDate = this.selectedDate.getStartDate();
    const endDate = this.selectedDate.getEndDate();
    const currentDateWithDay = new Date(
      this.currentDate.getFullYear(),
      month,
      1,
    );
    if (startDate < currentDateWithDay && endDate > currentDateWithDay) {
      return true;
    }
    return false;
  }

  isEndRange(month: number) {
    const endDate = this.selectedDate.getEndDate();
    return (
      this.currentDate.getFullYear() === endDate.getFullYear() &&
      month === endDate.getMonth()
    );
  }

  isOneMonthRange(month: number) {
    return this.isStartRange(month) && this.isEndRange(month);
  }
}

class MultiMonthModel extends BaseMonthsModel<MultiDate> {
  constructor(
    currentDate: Date,
    selectedDate: MultiDate,
    disabledDates: [Date, Date][],
    locale?: string,
    monthFormat?: FormatType,
  ) {
    const extendCheckDateFns = [
      (day: number) => this.isSelected(day) && PickerStyleTypesEnum.ACTIVE,
    ];
    super(
      currentDate,
      selectedDate,
      disabledDates,
      locale,
      monthFormat,
      extendCheckDateFns,
    );
  }

  isSelected(month: number) {
    for (const date of this.selectedDate.getValue()) {
      if (
        this.currentDate.getFullYear() === date.getFullYear() &&
        month === date.getMonth()
      ) {
        return true;
      }
    }
    return false;
  }
}

export function getMonthModel<SelectedDateType>(
  currentDate: Date,
  selectedDate: SelectedDateType,
  disabledDates: [Date, Date][],
  locale?: string,
) {
  if (selectedDate instanceof DateAdapter) {
    const model = new DateMonthModel(
      currentDate,
      selectedDate,
      disabledDates,
      locale,
    );
    model.generateMonths();
    return model;
  }
  if (selectedDate instanceof RangeDate) {
    const model = new RangeMonthModel(
      currentDate,
      selectedDate,
      disabledDates,
      locale,
    );
    model.generateMonths();
    return model;
  }
  if (selectedDate instanceof MultiDate) {
    const model = new MultiMonthModel(
      currentDate,
      selectedDate,
      disabledDates,
      locale,
    );
    model.generateMonths();
    return model;
  }
  throw new Error("Can't generate MonthModel. Wrong type for selectedDate");
}
