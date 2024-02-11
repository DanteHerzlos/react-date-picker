import { Calendar } from "../../UI/Calendar/Calendar";
import { DateInput } from "../../UI/DateInput/DateInput";
import { DateType, InputTypeByDateType } from "../../types/DateType";

export function CalendarWithHideInput<T extends DateType>({
  defaultValue,
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: T;
  setSelectedDate: (value: T) => void;
  defaultValue?: InputTypeByDateType<T>;
}) {
  return (
    <>
      <Calendar date={selectedDate} setDate={setSelectedDate} />
      <DateInput
        isHide
        defaultValue={defaultValue}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </>
  );
}
