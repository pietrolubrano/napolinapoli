import { rooms } from "@/data/roomsData"
import { Locale } from "@/i18n-config"
import ReservationDetails from "./ReservationDetails"

export default function ReservationHome({
    reservation,
    lang
} : {
    reservation: Reservation
    lang: Locale
}) {
    return (
        <div className="container mx-auto bg-white text-gray-600 p-8 space-y-4">
            <p>
                {lang === 'it' ? 'Benvenuto' : 'Welcome'} <strong>{reservation.firstname}</strong> 🙂,
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
