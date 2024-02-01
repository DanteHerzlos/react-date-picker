import { Calendar } from "./UI/Calendar/Calendar";
import { ModeTypeEnum } from "./DatePicker";
import { CalendarWithInput } from "./UI/CalendarWithInput/CalendarWithInput";
import { DatePickerStore } from "./store/DatePickerStoreContext";
import { useEffect } from "react";

export function DatePickerWithContext({
  mode,
  onChange,
}: {
  mode: ModeTypeEnum;
  onChange?: (selected: Date | Date[]) => void;
}) {
  const [selectedDate] = DatePickerStore.useStore(s => s.selectedDate)
  useEffect(() => {
    onChange && onChange(selectedDate)
  },[selectedDate])
  return (
    <>
      {
        {
          [ModeTypeEnum.INPUT]: <CalendarWithInput/>,
          [ModeTypeEnum.CALENDAR]: <Calendar/>,
        }[mode]
      }
    </>
  );
}
