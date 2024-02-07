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

export function getPickerStyleMapByType(type: "day" | "month" | "year") {
  const pickerStyleMap: { [key in PickerStyleTypesEnum]: string } = {
    default: style[type],
    active: [style[type], style._active].join(" "),
    current: [style[type], style._current].join(" "),
    disabled: [style[type], style._disabled].join(" "),
    startRange: [style[type], style._startRange].join(" "),
    middleRange: [style[type], style._middleRange].join(" "),
    endRange: [style[type], style._endRange].join(" "),
  };
  return pickerStyleMap;
}
