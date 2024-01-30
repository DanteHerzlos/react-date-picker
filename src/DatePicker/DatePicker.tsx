import { useEffect, useMemo, useState } from "react";
import { Calendar } from "./UI/Calendar/Calendar";
import {
  DatePickerStoreContext,
  IDatePickerStore,
  createDatePickerStore,
} from "./store/DatePickerStoreContext";
import { DateUtils } from "./helpers/DateUtils";
import { Input } from "./UI/Input/Input";
import { PickerTypeEnum } from "./types/PickerTypesEnum";
import { createPortal } from "react-dom";

export enum ModeTypeEnum {
  INPUT = "input",
  CALENDAR = "calendar",
}

export function DatePicker({
  pickerMode = PickerTypeEnum.DAY,
  mode = ModeTypeEnum.CALENDAR,
  defaultDate,
  options,
  onChange,
}: {
  pickerMode?: PickerTypeEnum;
  mode?: ModeTypeEnum;
  defaultDate?: Date;
  options?: IDatePickerStore;
  onChange?: (selected: Date | Date[]) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date>(
    defaultDate || DateUtils.getDateWithRestriction(new Date(), pickerMode),
  );
  useEffect(() => {
    if (defaultDate) setSelectedDate(defaultDate);
  }, [defaultDate]);

  function onChangeHandler(date: Date) {
    onChange && onChange(date);
    setSelectedDate(new Date(date));
  }

  const store = useMemo(
    () => createDatePickerStore(options || {}, pickerMode),
    [options],
  );

  return (
    <DatePickerStoreContext.Provider value={store}>
      {
        {
          [ModeTypeEnum.INPUT]: (
            <>
              <Input options={options} value={selectedDate} />
              {createPortal(
                <div>
                  <Calendar
                    pickerMode={pickerMode}
                    onChange={onChangeHandler}
                    date={selectedDate}
                  />
                </div>,
                document.body,
              )}
            </>
          ),
          [ModeTypeEnum.CALENDAR]: (
            <Calendar
              pickerMode={pickerMode}
              onChange={onChangeHandler}
              date={selectedDate}
            />
          ),
        }[mode]
      }
    </DatePickerStoreContext.Provider>
  );
}
