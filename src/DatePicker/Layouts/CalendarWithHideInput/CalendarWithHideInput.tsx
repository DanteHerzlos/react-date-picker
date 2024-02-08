import { Calendar } from "../../UI/Calendar/Calendar";
import { DateInput } from "../../UI/DateInput/DateInput";

export function CalendarWithHideInput() {
  return (
    <>
      <Calendar />
      <DateInput isHide />
    </>
  );
}
