import { useEffect, useMemo, useState } from "react";
import { Calendar } from "./UI/Calendar/Calendar";
import {
  DatePickerStoreContext,
  createDatePickerStore,
} from "./store/DatePickerStoreContext";

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

  const store = useMemo(() => createDatePickerStore({locale}), [locale]);

  return (
    <DatePickerStoreContext.Provider value={store}>
      <h1>{selectedDate.toLocaleDateString(locale)}</h1>
      <Calendar onChange={onChangeHandler} date={selectedDate} />
    </DatePickerStoreContext.Provider>
  );
}
