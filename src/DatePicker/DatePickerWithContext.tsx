import { CalendarWithHideInput } from "./Layouts/CalendarWithHideInput/CalendarWithHideInput";
import { CalendarWithInput } from "./Layouts/CalendarWithInput/CalendarWithInput";
import { DatePickerStore } from "./store/DatePickerStoreContext";
import { useEffect } from "react";
import { ModeType } from "./types/ModeType";

export function DatePickerWithContext({
  mode,
  onChange,
}: {
  mode: ModeType;
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
          input: <CalendarWithInput />,
          calendar: <CalendarWithHideInput />,
        }[mode]
      }
    </>
  );
}
