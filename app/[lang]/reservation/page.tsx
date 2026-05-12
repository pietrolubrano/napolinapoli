import ReservationNotFount from "./components/ReservationNotFount"
import ReservationForm from "./components/ReservationForm"
import { Locale } from "@/i18n-config"
import ReservationPageLayout from "./components/ReservationPageLayout"
import { getReservation, getReservationMessages } from "@/app/actions/smoobuActions"
import { cookies } from 'next/headers'

export default async function Page({
    params
    } : PageProps<'/[lang]'>
) {
    const cookieStore = await cookies()
    const reservationId = cookieStore.get('reservationId')?.value
    const email = cookieStore.get('email')?.value

    const { lang } = await params;

    if(email && reservationId){

        const response = await getReservation(reservationId as string)
        const reservation: Reservation = await response.json()

        if(reservation.status === 404){
            const message = {
                it: "Prenotazione non trovata",
                en: "Reservation not found"
            }
            return<ReservationNotFount lang={lang as Locale} message={message} />
        }

        if(email !== reservation.email){
            return(
                <ReservationNotFount lang={lang as Locale} message={{
                    it: "Email non corrispondente alla prenotazione",
                    en: "Email does not match the reservation"
                }}/>
            )
        } else {
            const messagesResponse = await getReservationMessages(reservationId as string)
            const messages: ReservationMessageResponse = await messagesResponse.json()
            return <ReservationPageLayout reservation={reservation} messages={messages} lang={lang as Locale} />
        }
    }

    return (
        <main className=" flex justify-center items-center w-full">
            <div className="text-gray-600 p-8 min-w-sm">
                <ReservationForm reservationId={reservationId as string} lang={lang as Locale} />
            </div>
        </main>
    )
}
