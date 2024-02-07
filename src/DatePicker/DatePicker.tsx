import { useMemo } from "react";
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
  label,
  name,
  defaultValue,
  value,
  options,
  onChange,
}: {
  name?: string;
  label?: string;
  pickerType?: PickerTypeEnum;
  mode?: ModeTypeEnum;
  defaultValue?: Date;
  value?: Date;
  options?: IDatePickerStore;
  onChange?: (selected: Date) => void;
}) {
  const store = useMemo(
    () => createDatePickerStore(options || {}, pickerType, defaultValue, value, name),
    [options, pickerType, value, name],
  );
  return (
    <DatePickerStore.Provider value={store}>
      <DatePickerWithContext label={label} onChange={onChange} mode={mode} />
    </DatePickerStore.Provider>
  );
}
