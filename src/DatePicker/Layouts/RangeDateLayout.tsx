import { ModeType } from "../types/ModeType";
import { useEffect, useState } from "react";
import { CalendarWithHideInput } from "./CalendarWithHideInput/CalendarWithHideInput";
import { CalendarWithInput } from "./CalendarWithInput/CalendarWithInput";
import { RangeDate } from "../types/RangeDate";

export function RangeDateLayout({
  mode,
  value,
  defaultValue,
  onChange,
}: {
  mode: ModeType;
  value?: [Date, Date];
  defaultValue?: [Date, Date];
  onChange?: (selected: [Date, Date]) => void;
}) {
  let initDate = new RangeDate();
  if (defaultValue) initDate = new RangeDate(defaultValue);
  if (value) initDate = new RangeDate(value);
  const [selectedDate, setSelectedDate] = useState<RangeDate>(initDate);

  useEffect(() => {
    onChange && onChange(selectedDate.getValue());
  }, [selectedDate.toString()]);

  return (
    <>
      {
        {
          calendar: (
            <CalendarWithHideInput
              defaultValue={defaultValue}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          ),
          input: (
            <CalendarWithInput
              defaultValue={defaultValue}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          ),
        }[mode]
      }
    </>
  );
}

