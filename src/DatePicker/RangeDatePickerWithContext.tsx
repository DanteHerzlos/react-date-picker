import { CalendarWithHideInput } from "./Layouts/CalendarWithHideInput/CalendarWithHideInput";
import { CalendarWithInput } from "./Layouts/CalendarWithInput/CalendarWithInput";
import { DatePickerStore } from "./store/DatePickerStoreContext";
import { useEffect } from "react";
import { ModeType } from "./types/ModeType";
import { RangeDate } from "./types/RangeDate";

export function RangeDatePickerWithContext({
  mode,
  onChange,
}: {
  mode: ModeType;
  onChange?: (selected: RangeDate) => void;
}) {
  const [selectedDate] = DatePickerStore.useStore((s) => s.selectedDate);

  useEffect(() => {
    onChange && onChange(selectedDate);
  }, [selectedDate.toString()]);

  return (<></>)
  // return (
  //   <>
  //     {
  //       {
  //         input: <CalendarWithInput />,
  //         calendar: <CalendarWithHideInput />,
  //       }[mode]
  //     }
  //   </>
  // );
}

