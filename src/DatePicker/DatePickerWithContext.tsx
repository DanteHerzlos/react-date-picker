import { DateAdapterLayout } from "./Layouts/DateAdapterLayout";
import { RangeDateLayout } from "./Layouts/RangeDateLayout";
import { InputDateType } from "./types/DateType";
import { ModeType } from "./types/ModeType";

export function DatePickerWithContext({
  dateType,
  value,
  defaultValue,
  mode,
  onChange,
}: {
  dateType: "range" | "one";
  value?: InputDateType;
  defaultValue?: InputDateType;
  mode: ModeType;
  onChange?: (selected: InputDateType) => void;
}) {
  return {
    one: (
      <DateAdapterLayout
        mode={mode}
        onChange={onChange}
        value={value as Date}
        defaultValue={defaultValue as Date}
      />
    ),
    range: (
      <RangeDateLayout
        mode={mode}
        onChange={onChange}
        value={value as [Date, Date]}
        defaultValue={defaultValue as [Date, Date]}
      />
    ),
  }[dateType];
}
