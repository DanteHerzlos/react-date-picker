import { NavigateBeforeIcon } from "../../icons/NavigateBeforeIcon";
import { NavigateNextIcon } from "../../icons/NavigateNextIcon";
import { ArrowDropDownIcon } from "../../icons/ArrowDropDownIcon";
import style from "./NavigatePanel.module.css";
import { toTitleCase } from "../../helpers/toTitleCase";
import { useContext } from "react";
import { DatePickerStoreContext } from "DatePicker/store/DatePickerStoreContext";

export function NavigatePanel({
  date,
  onYearClick,
  onMonthClick,
  onNextClick,
  onPrevClick,
}: {
  date: Date;
  onYearClick?: () => void;
  onMonthClick?: () => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}) {
  const store = useContext(DatePickerStoreContext);
  const monthName = toTitleCase(
    date.toLocaleString(store.locale, { month: "long" }),
  );

  return (
    <div className={style.navPanel}>
      <div className={style.pickersBtns}>
        <div
          className={style.pickerBtn}
          onClick={() => onYearClick && onYearClick()}
        >
          {date.getFullYear()}
        </div>
        <div
          className={style.pickerBtn}
          onClick={() => onMonthClick && onMonthClick()}
        >
          {monthName}
        </div>
      </div>
      <div className={style.monthArrows}>
        <NavigateBeforeIcon onClick={onPrevClick} />
        <NavigateNextIcon onClick={onNextClick} />
      </div>
    </div>
  );
}
