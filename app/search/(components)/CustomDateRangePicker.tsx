"use client"

import {I18nProvider} from "@react-aria/i18n";
import {DateRangePicker, RangeValue} from "@heroui/react";
import {CalendarDate} from "@internationalized/date";
import { Dispatch, SetStateAction } from "react";

export default function CustomDateRangePicker({
  value,
  setValueAction
} : {
  value: RangeValue<CalendarDate>,
  setValueAction: Dispatch<SetStateAction<RangeValue<CalendarDate>>>
}) {

  return (
    <I18nProvider locale="IT-it">
      <DateRangePicker
        aria-label="date-range-picker"
        className="col-span-5 md:col-span-3"
        value={value}
        onChange={setValueAction as ((value: RangeValue<CalendarDate> | null) => void) | undefined}
        label="Durata del soggiorno"
        minValue={new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())}
      />
    </I18nProvider>
  );
}
