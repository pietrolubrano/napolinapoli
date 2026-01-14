"use client"

import { FaPerson, FaRegCalendarCheck } from "react-icons/fa6"

export default function BookingHeader({
    arrivalDate,
    departureDate,
    guests
} : {
    arrivalDate: string
    departureDate: string
    guests: string
}) {
    return (
        <div className="grid grid-cols-3 mb-8">

            <div className="flex flex-col justify-center items-center text-center gap-3 font-bold">
                <FaRegCalendarCheck className="text-background" size={'2em'}></FaRegCalendarCheck> Check-in <br /> {new Date(arrivalDate as string).toLocaleDateString()}
            </div>
            <div className="flex flex-col justify-center items-center text-center gap-3 font-bold">
                <FaRegCalendarCheck className="text-background" size={'2em'}></FaRegCalendarCheck> Check-out<br /> {new Date(departureDate as string).toLocaleDateString()}
            </div>
            <div className="flex flex-col justify-center items-center text-center gap-3 font-bold">
                <FaPerson className="text-background me-1" size={'2em'}></FaPerson>{guests} <br /> Persone
            </div>
            
        </div>
    )
}
