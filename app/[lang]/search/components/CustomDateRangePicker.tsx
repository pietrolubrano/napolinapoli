"use client"

import {
  DateField,
  DateRangePicker,
  I18nProvider,
  Label,
  RangeCalendar,
} from "@heroui/react";
import type { DateValue } from "@internationalized/date";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Dispatch, SetStateAction } from "react";
import useWindowDimensions from "@/app/[lang]/components/useWindowDimensions";
import { Locale } from "@/i18n-config";

export type DateRangeValue = {
  start: DateValue;
  end: DateValue;
} | null;

export default function CustomDateRangePicker({
  value,
  setValueAction,
  lang
} : {
  value: DateRangeValue,
  setValueAction: Dispatch<SetStateAction<DateRangeValue>>,
  lang: Locale
}) {

  const { width } = useWindowDimensions();
  const visibleMonths = width > 640 ? 2 : 1;

  return (
    <I18nProvider locale={lang === "it" ? "it-IT" : "en-US"}>
      <DateRangePicker
        aria-label="date-range-picker"
        className="col-span-5 md:col-span-3 w-full"
        value={value}
        onChange={setValueAction}
        minValue={today(getLocalTimeZone())}
      >
        <Label>{lang === "it" ? "Durata del soggiorno" : "Duration of stay"}</Label>
        <DateField.Group className="w-full">
          <DateField.InputContainer>
            <DateField.Input slot="start">
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateRangePicker.RangeSeparator />
            <DateField.Input slot="end">
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.InputContainer>
          <DateField.Suffix>
            <DateRangePicker.Trigger>
              <DateRangePicker.TriggerIndicator />
            </DateRangePicker.Trigger>
          </DateField.Suffix>
        </DateField.Group>
        <DateRangePicker.Popover>
          <RangeCalendar
            aria-label={lang === "it" ? "Scegli le date" : "Choose dates"}
            visibleDuration={{ months: visibleMonths }}
          >
            <RangeCalendar.Header>
              <RangeCalendar.YearPickerTrigger>
                <RangeCalendar.YearPickerTriggerHeading />
                <RangeCalendar.YearPickerTriggerIndicator />
              </RangeCalendar.YearPickerTrigger>
              <RangeCalendar.NavButton slot="previous" />
              <RangeCalendar.NavButton slot="next" />
            </RangeCalendar.Header>
            <RangeCalendar.Grid>
              <RangeCalendar.GridHeader>
                {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
              </RangeCalendar.GridHeader>
              <RangeCalendar.GridBody>
                {(date) => <RangeCalendar.Cell date={date} />}
              </RangeCalendar.GridBody>
            </RangeCalendar.Grid>
          </RangeCalendar>
        </DateRangePicker.Popover>
      </DateRangePicker>
    </I18nProvider>
  );
}
