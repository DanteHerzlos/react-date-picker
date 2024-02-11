import { RangeDate } from "../../../types/RangeDate";
import { MultiDate } from "../../../types/MultiDate";
import { PickerStyleTypesEnum } from "../const/pickerStyleMap";
import { DateAdapter } from "../../../types/DateAdapter";

type CheckDateFnType = (month: number) => false | PickerStyleTypesEnum;
type YearsListType = {
  value: number;
  styleType: PickerStyleTypesEnum;
};

class BaseYearModel<SelectedDateType> {
  private startYear = 1900;
  private endYear = 2100;
  checkDateFns: CheckDateFnType[] = [
    (year: number) => this.isNow(year) && PickerStyleTypesEnum.CURRENT,
    (year: number) => this.isDisabled(year) && PickerStyleTypesEnum.DISABLED,
  ];
  years: YearsListType[] = [];
  selectedDate: SelectedDateType;
  disabledDates: [Date, Date][];
  constructor(
    selectedDate: SelectedDateType,
    disabledDates: [Date, Date][],
    extendCheckDateFns?: CheckDateFnType[],
  ) {
    extendCheckDateFns && this.checkDateFns.push(...extendCheckDateFns);
    this.disabledDates = disabledDates;
    this.selectedDate = selectedDate;
  }

  isNow(year: number) {
    const now = new Date();
    return year === now.getFullYear();
  }

  isDisabled(year: number) {
    for (const disabledRange of this.disabledDates) {
      const start = disabledRange[0];
      const end = disabledRange[1];
      const currentDateStartYear = new Date(year, 0, 1);
      const currentDateEndYear = new Date(year + 1, 0, 0);
      if (start <= currentDateStartYear && end >= currentDateEndYear) {
        return true;
      }
    }
    return false;
  }

  generateYears() {
    const years = [];
    for (let year = this.startYear; year <= this.endYear; year++) {
      let styleType: PickerStyleTypesEnum = PickerStyleTypesEnum.DEFAULT;
      for (const checkDateFn of this.checkDateFns) {
        const type = checkDateFn(year);
        if (type) styleType = type;
      }
      years.push({ value: year, styleType });
    }
    this.years = years;
  }
}

class DateYearModel extends BaseYearModel<DateAdapter> {
  constructor(selectedDate: DateAdapter, disabledDates: [Date, Date][]) {
    const extendCheckDateFns = [
      (year: number) => this.isSelected(year) && PickerStyleTypesEnum.ACTIVE,
    ];
    super(selectedDate, disabledDates, extendCheckDateFns);
  }

  isSelected(year: number) {
    return year === this.selectedDate.getValue().getFullYear();
  }
}

class RangeYearModel extends BaseYearModel<RangeDate> {
  constructor(selectedDate: RangeDate, disabledDates: [Date, Date][]) {
    const extendCheckDateFns = [
      (year: number) =>
        this.isStartRange(year) && PickerStyleTypesEnum.START_RANGE,
      (year: number) =>
        this.isMiddleRange(year) && PickerStyleTypesEnum.MIDDLE_RANGE,
      (year: number) => this.isEndRange(year) && PickerStyleTypesEnum.END_RANGE,
      (year: number) =>
        this.isOneYearRange(year) && PickerStyleTypesEnum.MIDDLE_RANGE,
    ];
    super(selectedDate, disabledDates, extendCheckDateFns);
  }

  isStartRange(year: number) {
    const startDate = this.selectedDate.getStartDate();
    return year === startDate.getFullYear();
  }

  isMiddleRange(year: number) {
    const startDate = this.selectedDate.getStartDate();
    const endDate = this.selectedDate.getEndDate();
    const currentYear = new Date(year, 0, 1);
    if (startDate < currentYear && endDate > currentYear) {
      return true;
    }
    return false;
  }

  isEndRange(year: number) {
    const endDate = this.selectedDate.getEndDate();
    return year === endDate.getFullYear();
  }

  isOneYearRange(year: number) {
    return this.isStartRange(year) && this.isEndRange(year);
  }
}

class MultiYearModel extends BaseYearModel<MultiDate> {
  constructor(selectedDate: MultiDate, disabledDates: [Date, Date][]) {
    const extendCheckDateFns = [
      (year: number) => this.isSelected(year) && PickerStyleTypesEnum.ACTIVE,
    ];
    super(selectedDate, disabledDates, extendCheckDateFns);
  }

  isSelected(year: number) {
    for (const date of this.selectedDate.getValue()) {
      if (year === date.getFullYear()) {
        return true;
      }
    }
    return false;
  }
}

export function getYearModel<SelectedDateType>(
  selectedDate: SelectedDateType,
  disabledDates: [Date, Date][],
) {
  if (selectedDate instanceof DateAdapter) {
    const model = new DateYearModel(selectedDate, disabledDates);
    model.generateYears();
    return model;
  }
  if (selectedDate instanceof RangeDate) {
    const model = new RangeYearModel(selectedDate, disabledDates);
    model.generateYears();
    return model;
  }
  if (selectedDate instanceof MultiDate) {
    const model = new MultiYearModel(selectedDate, disabledDates);
    model.generateYears();
    return model;
  }
  throw new Error("Can't generate YearModel. Wrong type for selectedDate");
}
