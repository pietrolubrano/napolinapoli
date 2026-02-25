"use client"

import {I18nProvider} from "@react-aria/i18n";
import {DateRangePicker, RangeValue} from "@heroui/react";
import {CalendarDate} from "@internationalized/date";
import { Dispatch, SetStateAction } from "react";
import useWindowDimensions from "@/app/[lang]/components/useWindowDimensions";
import { Locale } from "@/i18n-config";

export default function CustomDateRangePicker({
  value,
  setValueAction,
  lang
} : {
  value: RangeValue<CalendarDate>,
  setValueAction: Dispatch<SetStateAction<RangeValue<CalendarDate>>>
  lang: Locale
}) {
  
  const { width } = useWindowDimensions();

  return (
    <I18nProvider locale={lang === "it" ? "IT-it" : "EN-en"}>
      <DateRangePicker
        aria-label="date-range-picker"
        className="col-span-5 md:col-span-3"
        value={value}
        onChange={setValueAction as ((value: RangeValue<CalendarDate> | null) => void) | undefined}
        label={lang === "it" ? "Durata del soggiorno" : "Duration of stay"}
        visibleMonths={width > 640 ? 2 : 1}
        minValue={new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())}
      />
    </I18nProvider>
  );
}
