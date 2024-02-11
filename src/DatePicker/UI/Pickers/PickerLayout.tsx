import { PickerType } from "DatePicker/types/PickerType";
import { YearPicker } from "./YearPicker";
import { MonthPicker } from "./MonthPicker";
import { DayPicker } from "./DayPicker";
import { DateType } from "../../types/DateType";

export function PickerLayout({
  pickerType,
  locale,
  disabledDates,
  currentDate,
  selectedDate,
  onYearPick,
  onMonthPick,
  onDayPick,
}: {
  pickerType: PickerType;
  locale: string;
  disabledDates: [Date, Date][];
  currentDate: Date;
  selectedDate: DateType;
  onYearPick: (year: number) => void;
  onMonthPick: (month: number) => void;
  onDayPick: (date: Date) => void;
}) {
  return {
    year: (
      <YearPicker
        disabledDates={disabledDates}
        onPick={onYearPick}
        selectedDate={selectedDate}
      />
    ),
    month: (
      <MonthPicker
        locale={locale}
        disabledDates={disabledDates}
        currentDate={currentDate.getTime() ? currentDate : new Date()}
        selectedDate={selectedDate}
        onPick={onMonthPick}
      />
    ),
    day: (
      <DayPicker
        locale={locale}
        disabledDates={disabledDates}
        currentDate={currentDate.getTime() ? currentDate : new Date()}
        selectedDate={selectedDate}
        onPick={onDayPick}
      />
    ),
  }[pickerType];
}
