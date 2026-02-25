import BookingHeader from '@/app/[lang]/create-booking/components/BookingHeader'
import { Locale } from '@/i18n-config'

export default function ReservationPage({
    reservation,
    lang
} : {
    reservation: Reservation
    lang: Locale
}) {
    return (
        <main>
            <div className="font-bold p-4">
                ID prenotazione: {reservation.id}
            </div>
            <div className="container mx-auto bg-white text-gray-600 p-8 space-y-4">
                Benvenuto <strong>{reservation.firstname}</strong> 🙂,
                <p>
                    ecco i dettagli della tua prenotazione:
                </p>
                <div>
                    <BookingHeader
                        arrivalDate={reservation.arrival}
                        departureDate={reservation.departure}
                        guests={reservation.adults.toString()}
                        apartmentId={reservation.apartment.id}
                        lang={lang}
                    />
                </div>
                <div>
                    Come raggiungerci <br />
                    Nome rete wifi: <br />
                    Password: <br />
                    Cosa visitare <br />
                </div>
            </div>
        </main>
    )
}
