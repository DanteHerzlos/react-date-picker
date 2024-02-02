import { Calendar } from "./UI/Calendar/Calendar";
import { ModeTypeEnum } from "./DatePicker";
import { CalendarWithInput } from "./UI/CalendarWithInput/CalendarWithInput";
import { DatePickerStore } from "./store/DatePickerStoreContext";
import { useEffect } from "react";

export function DatePickerWithContext({
  label,
  mode,
  onChange,
}: {
  label?: string;
  mode: ModeTypeEnum;
  onChange?: (selected: Date) => void;
}) {
  const [selectedDate] = DatePickerStore.useStore((s) => s.selectedDate);

  useEffect(() => {
    onChange && onChange(selectedDate);
  }, [selectedDate.toString()]);

  return (
    <>
      {
        {
          [ModeTypeEnum.INPUT]: <CalendarWithInput label={label} />,
          [ModeTypeEnum.CALENDAR]: <Calendar />,
        }[mode]
      }
    </>
  );
}
