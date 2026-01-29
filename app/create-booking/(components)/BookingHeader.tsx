"use client"

interface Props {
    arrivalDate: string
    departureDate: string
    guests: string
    price: {
        price: number
        currency: string
        priceElements: {
            type: 'basePrice' | 'longStayDiscount' | 'CleaningFee'
            amount: number
        }[]
    },
    apartmentId: number
}

import { rooms } from "@/data/roomsData"
import {
    FaPerson,
    FaRegCalendarCheck,
    FaCalendarCheck,
    FaDoorOpen 
} from "react-icons/fa6"

export default function BookingHeader({
    arrivalDate,
    departureDate,
    guests,
    price,
    apartmentId
} : Props) {

    const apartment = rooms[apartmentId]

    return (
        <div className="grid md:grid-cols-4 mb-8 gap-1 md:gap-6 px-4 max-w-lg mx-auto text-gray-600">

            <div className="flex md:flex-col md:justify-center items-center text-center gap-3 font-bold">
                <FaCalendarCheck className="text-background text-xl md:text-4xl" /> Check-in: <br className="hidden md:block" /> {new Date(arrivalDate as string).toLocaleDateString()}
            </div>
            <div className="flex md:flex-col md:justify-center items-center text-center gap-3 font-bold">
                <FaRegCalendarCheck className="text-background text-xl md:text-4xl" /> Check-out:<br className="hidden md:block" /> {new Date(departureDate as string).toLocaleDateString()}
            </div>
            <div className="flex md:flex-col md:justify-center items-center text-center gap-3 font-bold">
                <FaPerson className="text-background text-xl md:text-4xl" />N. Persone: <br className="hidden md:block" /> {guests}
            </div>
            <div className="flex md:flex-col md:justify-center items-center text-center gap-3 font-bold">
                <FaDoorOpen className="text-background text-xl md:text-4xl" />Stanza: <br className="hidden md:block" />{apartment.name}
            </div>
        </div>
    )
}
