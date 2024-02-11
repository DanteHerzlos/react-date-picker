import { DateAdapter } from "../types/DateAdapter";
import { ModeType } from "../types/ModeType";
import { useEffect, useState } from "react";
import { CalendarWithHideInput } from "./CalendarWithHideInput/CalendarWithHideInput";
import { CalendarWithInput } from "./CalendarWithInput/CalendarWithInput";

export function DateAdapterLayout({
  mode,
  value,
  defaultValue,
  onChange,
}: {
  mode: ModeType;
  value?: Date;
  defaultValue?: Date;
  onChange?: (selected: Date) => void;
}) {
  let initDate = new DateAdapter();
  if (defaultValue) initDate = new DateAdapter(defaultValue);
  if (value) initDate = new DateAdapter(value);
  const [selectedDate, setSelectedDate] = useState<DateAdapter>(initDate);

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
