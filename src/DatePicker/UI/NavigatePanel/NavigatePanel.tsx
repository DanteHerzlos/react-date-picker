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
  onNextClick,
  onPrevClick,
}: {
  date: Date
  onYearClick?: () => void
  onNextClick?: () => void;
  onPrevClick?: () => void;
}) {
  const store = useContext(DatePickerStoreContext);
  const monthName = toTitleCase(
    date.toLocaleString(store.locale, { month: "long" }),
  );

  return (
    <div className={style.navPanel}>
      <div onClick={() => onYearClick && onYearClick()} className={style.yearPicker}>
        <div>{monthName}</div>
        <div>{date.getFullYear()}</div>
        <ArrowDropDownIcon className={style.dropDownIcon} />
      </div>
      <div className={style.monthPicker}>
        <NavigateBeforeIcon onClick={onPrevClick} />
        <NavigateNextIcon onClick={onNextClick}/>
      </div>
    </div>
  );
}
