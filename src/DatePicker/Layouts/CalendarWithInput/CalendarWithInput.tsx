import { DateInput } from "../../UI/DateInput/DateInput";
import { Calendar } from "../../UI/Calendar/Calendar";
import style from "./CalendarWithInput.module.css";
import { useState } from "react";
import { createPortal } from "react-dom";

export function CalendarWithInput() {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  return (
    <>
      <div className={style.container}>
        <DateInput onCalendarClick={() => setIsCalendarOpen((prev) => !prev)} />
        {isCalendarOpen && (
          <div className={style.calendar}>
            <Calendar onClose={() => setIsCalendarOpen(false)} />
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
