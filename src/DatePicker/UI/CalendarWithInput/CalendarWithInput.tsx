import { Input } from "../Input/Input";
import { Calendar } from "../Calendar/Calendar";
import style from "./CalendarWithInput.module.css";
import { useState } from "react";
import { createPortal } from "react-dom";

export function CalendarWithInput({ label }: { label?: string }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  return (
    <>
      <div className={style.container}>
        <Input
          label={label}
          onCalendarClick={() => setIsCalendarOpen((prev) => !prev)}
        />
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
