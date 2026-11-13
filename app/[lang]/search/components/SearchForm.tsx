"use client"

import { Button, Label, NumberField } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import CustomDateRangePicker, {
  type DateRangeValue,
} from "@/app/[lang]/search/components/CustomDateRangePicker";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Locale } from "@/i18n-config";

export default function SearchForm({
    arrivalDate,
    departureDate,
    guests,
    lang
} : {
    arrivalDate?: string,
    departureDate?: string,
    guests?: string
    lang: Locale
}) {

    const [value, setValue] = useState<DateRangeValue>({
        start: parseDate(arrivalDate ? arrivalDate : new Date().toISOString().substring(0,10)),
        end: parseDate(departureDate ? departureDate : new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().substring(0,10))
    });
    const [guestsValue, setGuestsValue] = useState(guests ? +guests : 2)

    const handeGuestsValueChange = (value: number | null) => {
        const next = value ?? 1
        if(next < 1){
            setGuestsValue(1)
            return
        }
        if(next >= 4){
            setGuestsValue(4)
            return
        }
        setGuestsValue(next)
    }

    useEffect(() => {
        setValue({
            start: parseDate(arrivalDate ? arrivalDate : new Date().toISOString().substring(0,10)),
            end: parseDate(departureDate ? departureDate : new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().substring(0,10))
        })
        setGuestsValue(guests ? +guests : 2)
    }, [arrivalDate, departureDate, guests])

    return (
        <div className="grid grid-cols-5 max-w-2xl">

             <CustomDateRangePicker
                value={value}
                setValueAction={setValue}
                lang={lang}
            />

            <div className="col-span-5 md:col-span-2 grid grid-cols-3">
                <div className="flex">
                    <NumberField
                        className="col-span-1 w-full"
                        value={guestsValue}
                        onChange={handeGuestsValueChange}
                        minValue={1}
                        maxValue={4}
                    >
                        <Label>{lang === "it" ? "Ospiti" : "Guests"}</Label>
                        <NumberField.Group>
                            <NumberField.DecrementButton />
                            <NumberField.Input />
                            <NumberField.IncrementButton />
                        </NumberField.Group>
                    </NumberField>
                </div>
                <Link href={{
                    pathname: `/${lang}/search`,
                    query: {
                        arrivalDate: value?.start.toString(),
                        departureDate: value?.end.toString(),
                        guests: guestsValue
                    }
                }}
                className="col-span-2"
                >
                    <Button className="h-14 w-full" fullWidth variant="primary">
                        {lang === "it" ? "Cerca" : "Search"}
                    </Button>
                </Link>
            </div>
            
        </div>
    )
}
