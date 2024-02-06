import style from "../Pickers.module.css";

export const enum PickerStyleTypesEnum {
  DEFAULT = "default",
  ACTIVE = "active",
  CURRENT = "current",
  DISABLED = "disabled",
  START_RANGE = "startRange",
  MIDDLE_RANGE = "middleRange",
  END_RANGE = "endRange",
}

export const pickerStyleMap: { [key in PickerStyleTypesEnum]: string } = {
  default: style.day,
  active: [style.day, style._active].join(" "),
  current: [style.day, style._current].join(" "),
  disabled: [style.day, style._disabled].join(" "),
  startRange: [style.day, style._startRange].join(" "),
  middleRange: [style.day, style._middleRange].join(" "),
  endRange: [style.day, style._endRange].join(" "),
};

