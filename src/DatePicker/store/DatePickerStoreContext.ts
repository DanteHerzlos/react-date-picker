// import { DateUtils } from "../helpers/DateUtils";
// import createContextStore from "./createContextStore";
// import { DateInputModel } from "../helpers/InputUtils";
// import { ModeType } from "../types/ModeType";
// import { PickerType } from "../types/PickerType";
// import { IDatePickerOptions } from "../types/IBaseDatePickerProps";
// import { DateAdapter } from "../types/DateAdapter";
// import { RangeDate } from "../types/RangeDate";
// import { MultiDate } from "../types/MultiDate";
import { createBaseDatePickerStore } from "./createBaseDatePickerStore";
import { createContext } from "react";

export const defaultDateStore = createBaseDatePickerStore({});
export const DatePickerStore = createContext(defaultDateStore);
//
// type DateType = DateAdapter | RangeDate | MultiDate;
// export type InputDateType = [Date, Date] | Date[] | Date
//
// interface IDatePickerStoreProps<T> {
//   options?: IDatePickerOptions;
//   required?: boolean;
//   disabled?: boolean;
//   readOnly?: boolean;
//   name?: string;
//   label?: string;
//   pickerType?: PickerType;
//   mode?: ModeType;
//   disabledDates?: [Date, Date][];
//   customInput?: React.ReactElement | any;
//   defaultValue?: T;
//   value?: T;
// }
//
// export function createDatePickerStore(props: IDatePickerStoreProps<Date>) {
//   const baseStore = createBaseDatePickerStore(props);
//   const { locale, pickerType } = baseStore;
//   const { value, defaultValue } = props;
//   const dateMask = DateUtils.getDateMask(locale, pickerType);
//   const dateInputModel = new DateInputModel(dateMask);
//   let selectedDate = new DateAdapter();
//   if (value || defaultValue) {
//     selectedDate = new DateAdapter(value || defaultValue);
//     selectedDate.restrictDateByType(pickerType);
//   }
//
//   return { ...baseStore, selectedDate, defaultValue, dateInputModel, dateMask };
// }
//
// export function createRangeDatePickerStore(
//   props: IDatePickerStoreProps<[Date, Date]>,
// ) {
//   const baseStore = createBaseDatePickerStore(props);
//   const { locale, pickerType } = baseStore;
//   const { value, defaultValue } = props;
//   const dateMask = DateUtils.getDateMask(locale, pickerType);
//   const dateInputModel = new DateInputModel(dateMask);
//   let selectedDate = new RangeDate();
//   if (value || defaultValue) {
//     selectedDate = new RangeDate(value || defaultValue);
//     selectedDate.restrictDateByType(pickerType);
//   }
//   return { ...baseStore, selectedDate, defaultValue, dateInputModel, dateMask };
// }
//
// type InputTypeByDateType<T> = T extends RangeDate
//   ? [Date, Date]
//   : T extends MultiDate
//     ? Date[]
//     : T extends DateAdapter
//       ? Date
//       : Date;
//
// type DateTypeByStoreType<T> = T extends "multi"
//   ? MultiDate
//   : T extends "range"
//     ? RangeDate
//     : DateAdapter;
//
// type PropsTypeByStoreType<T> = IDatePickerStoreProps<
//   InputTypeByDateType<DateTypeByStoreType<T>>
// >;
// type storeType = "one" | "range" | "multi";
//
// type DateClassType<T extends DateType> = new (
//   date?: InputTypeByDateType<T>,
// ) => T;
//
// export class DatePickerStoreFactory {
//   static createStore<T extends storeType>(
//     type: T,
//     props: PropsTypeByStoreType<T>,
//   ) {
//     if (type === "one") {
//       return this.create(DateAdapter, props as PropsTypeByStoreType<"one">);
//     } else if (type === "range") {
//       return this.create(RangeDate, props as PropsTypeByStoreType<"range">);
//     } else if (type === "multi") {
//       return this.create(MultiDate, props as PropsTypeByStoreType<"multi">);
//     } else {
//       throw new Error("Wrong store type!");
//     }
//   }
//
//   static create<T extends DateType>(
//     dateClass: DateClassType<T>,
//     props: IDatePickerStoreProps<InputTypeByDateType<T>>,
//   ) {
//     const baseStore = createBaseDatePickerStore(props);
//     const { locale, pickerType } = baseStore;
//     const { value, defaultValue } = props;
//     const dateMask = DateUtils.getDateMask(locale, pickerType);
//     const dateInputModel = new DateInputModel(dateMask);
//     let selectedDate = new dateClass();
//     if (value || defaultValue) {
//       selectedDate = new dateClass(value || defaultValue);
//       selectedDate.restrictDateByType(pickerType);
//     }
//     return {
//       ...baseStore,
//       selectedDate,
//       defaultValue,
//       dateInputModel,
//       dateMask,
//     };
//   }
// }
//
// export const defaultRangeDateStore = DatePickerStoreFactory.createStore(
//   "range",
//   {},
// );
// export const RangeDatePickerStore = createContextStore(defaultRangeDateStore);

