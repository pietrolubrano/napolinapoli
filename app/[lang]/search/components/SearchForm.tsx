"use client"

import {Button} from "@heroui/button";
import {parseDate} from "@internationalized/date";
import CustomDateRangePicker from '@/app/[lang]/search/components/CustomDateRangePicker'
import { useState } from 'react'
import Link from "next/link";
import { NumberInput } from "@heroui/react";
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

    const [value, setValue] = useState({
        start: parseDate(arrivalDate ? arrivalDate : new Date().toISOString().substring(0,10)),
        end: parseDate(departureDate ? departureDate : new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().substring(0,10))
    });
    const [guestsValue, setGuestsValue] = useState(guests ? +guests : 2)

    const handeGuestsValueChange = (value: number) => {
        if(value < 1){
            setGuestsValue(1)
            return
        }
        if(value >= 4){
            setGuestsValue(4)
            return
        }
        setGuestsValue(value)
    }

    return (
        <div className="grid grid-cols-5 max-w-2xl">

             <CustomDateRangePicker
                value={value}
                setValueAction={setValue}
                lang={lang}
            />

            <div className="col-span-5 md:col-span-2 grid grid-cols-3">
                <div className="flex">
                    <NumberInput
                        className="col-span-1 w-full"
                        value={guestsValue}
                        onValueChange={handeGuestsValueChange}
                        label={lang === "it" ? "Ospiti" : "Guests"}
                        type="number"
                        min={1}
                        max={4}
                    />
                    {/* <div className="flex flex-col w-10 ">
                        <Button onPress={() => handleGuestsValueChange('add')} className="px-2 min-w-0.5 h-full bg-gray-100">
                            <FaPlus></FaPlus>
                        </Button>
                        <Button onPress={() => handleGuestsValueChange('remove')} className="px-2 min-w-0.5 h-full bg-gray-100">
                            <FaMinus></FaMinus>
                        </Button>
                    </div> */}
                    
                </div>
                <Link href={{
                    pathname: `/${lang}/search`,
                    query: {
                        arrivalDate: value.start.toString(),
                        departureDate: value.end.toString(),
                        guests: guestsValue
                    }
                }}
                className="col-span-2"
                >
                    <Button className="h-14 w-full">
                        {lang === "it" ? "Cerca" : "Search"}
                    </Button>
                </Link>
            </div>
            
        </div>
    )
}

