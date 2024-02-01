import { useMemo} from "react";
import {
  DatePickerStore,
  IDatePickerStore,
  createDatePickerStore,
} from "./store/DatePickerStoreContext";
import { PickerTypeEnum } from "./types/PickerTypesEnum";
import { DatePickerWithContext } from "./DatePickerWithContext";

export enum ModeTypeEnum {
  INPUT = "input",
  CALENDAR = "calendar",
}

export function DatePicker({
  pickerType = PickerTypeEnum.DAY,
  mode = ModeTypeEnum.CALENDAR,
  defaultValue,
  value,
  options,
  onChange,
}: {
  pickerType?: PickerTypeEnum;
  mode?: ModeTypeEnum;
  defaultValue?: Date;
  value?: Date;
  options?: IDatePickerStore;
  onChange?: (selected: Date | Date[]) => void;
}) {
  const store = useMemo(
    () => createDatePickerStore(options || {}, pickerType, defaultValue, value),
    [options, pickerType, value],
  );

  return (
    <DatePickerStore.Provider value={store}>
      <DatePickerWithContext onChange={onChange} mode={mode} />
    </DatePickerStore.Provider>
  );
}
