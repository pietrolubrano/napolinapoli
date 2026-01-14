"use client"

import {Button} from "@heroui/button";
import {parseDate} from "@internationalized/date";
import CustomDateRangePicker from '@/app/search/(components)/CustomDateRangePicker'
import { useState } from 'react'
import Link from "next/link";
import { NumberInput } from "@heroui/react";

export default function SearchForm({
    arrivalDate,
    departureDate,
    guests
} : {
    arrivalDate?: string,
    departureDate?: string,
    guests?: string
}) {

    /* const handleGuestsValueChange = (action:string) => {
        if(action === 'add'){
            setGuestsValue(prevState => prevState + 1)
        }
        if(action === 'remove' && +guestsValue > 1){
            setGuestsValue(prevState => prevState - 1)
        }
    } */

    const [value, setValue] = useState({
        start: parseDate(arrivalDate ? arrivalDate : new Date().toISOString().substring(0,10)),
        end: parseDate(departureDate ? departureDate : new Date().toISOString().substring(0,10)),
    });
    const [guestsValue, setGuestsValue] = useState(guests ? +guests : 2)

    return (
        <div className="grid grid-cols-5 max-w-2xl">

             <CustomDateRangePicker
                value={value}
                setValueAction={setValue}
            />

            <div className="col-span-5 md:col-span-2 grid grid-cols-3">
                <div className="flex">
                    <NumberInput
                        className="col-span-1 w-full"
                        value={guestsValue}
                        onValueChange={setGuestsValue}
                        label="Ospiti"
                        type="number"
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

