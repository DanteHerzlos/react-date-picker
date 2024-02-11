import { NavigateBeforeIcon } from "../../icons/NavigateBeforeIcon";
import { NavigateNextIcon } from "../../icons/NavigateNextIcon";
import style from "./NavigatePanel.module.css";
import { toTitleCase } from "../../helpers/toTitleCase";

export function NavigatePanel({
  locale,
  isMonthPicker,
  isMonthNavigation,
  date,
  onYearClick,
  onMonthClick,
  onNextClick,
  onPrevClick,
}: {
  locale: string
  isMonthPicker: boolean;
  isMonthNavigation: boolean;
  date: Date;
  onYearClick?: () => void;
  onMonthClick?: () => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}) {
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
