"use client"

import {Button} from "@heroui/button";

import {parseDate} from "@internationalized/date";
import CustomDateRangePicker from '@/app/search/(components)/CustomDateRangePicker'
import { useState } from 'react'
import Link from "next/link";
import { Input } from "@heroui/react";

export default function SearchForm({
    arrivalDate,
    departureDate,
    guests
} : {
    arrivalDate?: string,
    departureDate?: string,
    guests?: string
}) {

    const [value, setValue] = useState({
        start: parseDate(arrivalDate ? arrivalDate : new Date().toISOString().substring(0,10)),
        end: parseDate(departureDate ? departureDate : new Date().toISOString().substring(0,10)),
    });
    const [guestsValue, setGuestsValue] = useState(guests ? guests : '2')

    return (
        <div className="grid grid-cols-5 max-w-2xl">

             <CustomDateRangePicker
                value={value}
                setValueAction={setValue}
            />

            <div className="col-span-5 md:col-span-2 grid grid-cols-3">
                <Input
                    className="col-span-1 w-full"
                    value={guestsValue}
                    onChange={(event) => setGuestsValue(event.target.value)}
                    label="Ospiti"
                    type="number"
                />
                <Link href={{ 
                    pathname: '/search',
                    query: {
                        arrivalDate: value.start.toString(),
                        departureDate: value.end.toString(),
                        guests: guestsValue
                    }
                }}
                className="col-span-2"
                >
                    <Button className="h-14 w-full">
                        Cerca
                    </Button>
                </Link>
            </div>
            
        </div>
    )
}

