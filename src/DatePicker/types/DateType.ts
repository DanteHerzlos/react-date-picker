import { DateAdapter } from "./DateAdapter";
import { MultiDate } from "./MultiDate";
import { RangeDate } from "./RangeDate";

export type DateType = DateAdapter | RangeDate | MultiDate;
export type InputDateType = [Date, Date] | Date[] | Date;
export type InputTypeByDateType<T> = T extends RangeDate
  ? [Date, Date]
  : T extends MultiDate
    ? Date[]
    : T extends DateAdapter
      ? Date
      : Date;
//
// type DateTypeByStoreType<T> = T extends "multi"
//   ? MultiDate
//   : T extends "range"
//     ? RangeDate
//     : DateAdapter;
