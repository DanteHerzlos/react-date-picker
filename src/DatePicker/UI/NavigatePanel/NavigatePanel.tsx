import { NavigateBeforeIcon } from "../../icons/NavigateBeforeIcon";
import { NavigateNextIcon } from "../../icons/NavigateNextIcon";
import style from "./NavigatePanel.module.css";
import { toTitleCase } from "../../helpers/toTitleCase";
import { DatePickerStore } from "DatePicker/store/DatePickerStoreContext";

export function NavigatePanel({
  isMonthPicker,
  isMonthNavigation,
  date,
  onYearClick,
  onMonthClick,
  onNextClick,
  onPrevClick,
}: {
  isMonthPicker: boolean;
  isMonthNavigation: boolean;
  date: Date;
  onYearClick?: () => void;
  onMonthClick?: () => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}) {
  const [locale] = DatePickerStore.useStore(s => s.locale);
  const monthName = toTitleCase(
    date.toLocaleString(locale, { month: "long" }),
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
        {isMonthPicker && (
          <div
            className={style.pickerBtn}
            onClick={() => onMonthClick && onMonthClick()}
          >
            {monthName}
          </div>
        )}
      </div>
      {isMonthNavigation && (
        <div className={style.monthArrows}>
          <NavigateBeforeIcon onClick={onPrevClick} />
          <NavigateNextIcon onClick={onNextClick} />
        </div>
      )}
    </div>
  );
}