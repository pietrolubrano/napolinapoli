import { Locale } from "@/i18n-config"
import ReservationDetails from "./ReservationDetails"
import { Button } from "@headlessui/react";
import { clearReservationCookie } from "@/app/actions/cookieActions";
import { MdLogout } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";

export default function ReservationHome({
    reservation,
    lang
} : {
    reservation: Reservation
    lang: Locale
}) {
    return (
        <div className="container mx-auto bg-white text-gray-600 p-8 space-y-4 relative">
            <p>
                {lang === 'it' ? 'Benvenuto/a' : 'Welcome'} <strong>{reservation.firstname}</strong> 🙂,
                <Button
                    onClick={() => clearReservationCookie()}
                    className="ml-4 text-red-300 hover:text-red-600 p-1 rounded float-end absolute right-4 top-4"
                >
                    <IoIosCloseCircle size={'1.8em'} />
                </Button>
            </p>
            
                {
                    lang === 'it' ?
                    <p> La tua camera è la <span className="font-bold text-background">{reservation.apartment.name}</span></p>
                    :
                    <p>Your Room is <span className="font-bold text-background">{reservation.apartment.name}</span></p>
                }
                
            <ReservationDetails reservation={reservation} lang={lang} />
        </div>
    )
}
