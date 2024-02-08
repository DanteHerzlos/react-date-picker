import { DateUtils } from "../helpers/DateUtils";
import { IDatePickerOptions } from "../types/IBaseDatePickerProps";
import { ModeType } from "../types/ModeType";
import { PickerType, PickerTypeEnum } from "../types/PickerType";

interface IBaseDatePickerStoreProps {
  options?: IDatePickerOptions;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  label?: string;
  pickerType?: PickerType;
  mode?: ModeType;
  disabledDates?: [Date, Date][];
  customInput?: React.ReactElement | any;
}

export function createBaseDatePickerStore({
  options = {},
  disabledDates = [],
  pickerType = PickerTypeEnum.DAY,
  name,
  readOnly = false,
  disabled = false,
  required = false,
  label,
  customInput,
}: IBaseDatePickerStoreProps) {
  const {
    locale = "default",
    monthFormat,
    weekFormat,
    startYear,
    endYear,
  } = options;
  const initialPickerType = pickerType;
  const weekNames = DateUtils.getWeekNames(locale, weekFormat);
  const years = DateUtils.getYearsInterval(startYear, endYear);

  return {
    required,
    disabled,
    readOnly,
    name,
    locale,
    weekNames,
    monthFormat,
    years,
    pickerType,
    initialPickerType,
    disabledDates,
    label,
    CustomInput: customInput,
  };
}

