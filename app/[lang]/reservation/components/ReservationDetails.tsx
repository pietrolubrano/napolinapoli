"use client"

import BookingHeader from '@/app/[lang]/create-booking/components/BookingHeader'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { IoLogoWhatsapp } from 'react-icons/io'

export default function ReservationDetails({
    reservation,
    lang
} : {
    reservation: Reservation
    lang: Locale
}) {

    return (<>
            <div className="">
                {lang === 'it' ? 'ID prenotazione:' : 'Reservation ID:'} {reservation.id}
            </div>
            <div className="container mx-auto bg-white text-gray-600 p-8 space-y-4">
                <p>
                    {lang === 'it' ? 'Ecco i dettagli della tua prenotazione:' : 'Here are the details of your reservation:'}
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
                <table className="table-auto font-bold mx-auto p-8">
                    <tbody>
                        {
                            [
                                { description: {it: 'Importo totale:', en: 'Total amount:'}, value: reservation.price },
                                { description: {it: 'Acconto pagato:', en: 'Prepayment paid:'}, value: reservation.prepayment },
                                { description: {it: 'Da saldare in struttura*:', en: 'Balance to pay in the accommodation*:' }, value: reservation.price - reservation.prepayment },
                            ].map((item, index) => (
                                <tr key={index}>
                                    <td className={`${index === 2 && 'py-1'} pr-4`}>{item.description[lang]}</td>
                                    <td className='text-right'>{item.value}€</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <p className="text-xs text-gray-500">{lang === 'it' ? '* La tassa di soggiorno di 4,50 € per persona al giorno da pagare in struttura non è inclusa nel prezzo' : '* The tourism tax of €4.50 per person per day to be paid in the accommodation is not included in the price'}</p>
            </div>
            {/* <MessagesAccordion reservation={reservation} messages={messages} lang={lang} /> */}
                    {/* Come raggiungerci <br />
                    Nome rete wifi: <br />
                    Password: <br />
                    Cosa visitare <br /> */}
            <div className='p-8'>
                {lang === 'it' ? 'Per qualsiasi informazione o richiesta non esitare a contattarci!' : 'For any information or request do not hesitate to contact us!'}
            </div>
    </>)
}
