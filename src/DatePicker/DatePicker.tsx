import { useEffect, useMemo, useState } from "react";
import { Calendar } from "./UI/Calendar/Calendar";
import { DatePickerStoreContext } from "./store/DatePickerStoreContext";
import { DateUtils } from "./helpers/DateUtils";

export function DatePicker({
  defaultDate,
  locale,
  onChange,
}: {
  defaultDate?: Date;
  locale?: string;
  onChange?: (selected: Date | Date[]) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date>(
    defaultDate || new Date(),
  );
  useEffect(() => {
    if (defaultDate) setSelectedDate(defaultDate);
  }, [defaultDate]);

  function onChangeHandler(date: Date) {
    onChange && onChange(date);
    setSelectedDate(new Date(date));
  }

  const weekNames = useMemo(
    () => DateUtils.getWeekNames(locale || "default"),
    [locale],
  );
  const years = [];
  for (let i = 1970; i < 2100; i++) years.push(i);
  return (
    <DatePickerStoreContext.Provider
      value={{ locale: locale || "default", weekNames, years }}
    >
      <h1>{selectedDate.toLocaleDateString(locale)}</h1>
      <Calendar onChange={onChangeHandler} date={selectedDate} />
    </DatePickerStoreContext.Provider>
  );
}
