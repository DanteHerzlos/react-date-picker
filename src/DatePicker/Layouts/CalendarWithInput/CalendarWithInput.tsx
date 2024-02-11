import { DateInput } from "../../UI/DateInput/DateInput";
import { Calendar } from "../../UI/Calendar/Calendar";
import style from "./CalendarWithInput.module.css";
import { useState } from "react";
import { createPortal } from "react-dom";
import { DateType, InputTypeByDateType } from "../../types/DateType";

export function CalendarWithInput<T extends DateType>({
  defaultValue,
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: T;
  setSelectedDate: (value: T) => void;
  defaultValue?: InputTypeByDateType<T>;
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  return (
    <>
      <div className={style.container}>
        <DateInput
          defaultValue={defaultValue}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onCalendarClick={() => setIsCalendarOpen((prev) => !prev)}
        />
        {isCalendarOpen && (
          <div className={style.calendar}>
            <Calendar
              date={selectedDate}
              setDate={setSelectedDate}
              onClose={() => setIsCalendarOpen(false)}
            />
            {createPortal(
              <div
                className={style.blurBg}
                onClick={() => setIsCalendarOpen(false)}
              />,
              document.body,
            )}
          </div>
        )}
      </div>
    </>
  );
}
