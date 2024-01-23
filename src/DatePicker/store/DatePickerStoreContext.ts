import { toTitleCase } from "DatePicker/helpers/toTitleCase";
import { createContext } from "react";

const locale = "default";
const date = new Date(0);
const weekNames = [];
const years = []
for (let i = 5; i <= 12; i++) {
  date.setDate(i);
  const weekName = toTitleCase(
    date.toLocaleString(locale, { weekday: "short" }),
  );
  weekNames.push(weekName);
}
for (let i = 1970; i < 2100; i++) years.push(i);
const store = { locale, weekNames, years };
export const DatePickerStoreContext = createContext(store);
