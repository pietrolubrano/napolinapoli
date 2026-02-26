"use client"

import BookingHeader from '@/app/[lang]/create-booking/components/BookingHeader'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { IoLogoWhatsapp } from 'react-icons/io'
import { Accordion, AccordionItem } from "@heroui/react";
import { FaUserCircle, FaCalendar } from "react-icons/fa";

export default function ReservationPage({
    reservation,
    messages,
    lang
} : {
    reservation: Reservation
    lang: Locale
    messages: ReservationMessageResponse
}) {

    return (
        <main>
            <div className="font-bold p-4">
                {lang === 'it' ? 'ID prenotazione:' : 'Reservation ID:'} {reservation.id}
            </div>
            <div className="container mx-auto bg-white text-gray-600 p-8 space-y-4">
                {lang === 'it' ? 'Benvenuto' : 'Welcome'} <strong>{reservation.firstname}</strong> 🙂,
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
                <div>
                    <p className="font-bold">
                        {lang === 'it' ? 'I tuoi messaggi:' : 'Your messages:'}
                    </p>
                    {
                        messages.messages.length > 0 &&
                        <Accordion className='p-0!' selectionMode="multiple">
                            {
                                messages.messages.map((message) => (
                                    <AccordionItem key={message.id} className='bg-gray-100 px-4' title={message.subject || 'Message'}>
                                        
                                        <div className='mb-2 flex w-full items-center text-sm text-gray-500 justify-between'>
                                            <div>
                                                <FaUserCircle className='inline' size={'1.5em'} /> <span className='font-bold'>{message.type === 1 ? 'ME' : 'HOST'}</span>
                                            </div>
                                            <div>
                                                <span className='float-right text-xs flex items-center'><FaCalendar className='inline mr-1' />{new Date(message.createdAt).toLocaleDateString(lang)}</span>
                                            </div>
                                        </div>
                                        
                                        <div className='py-8 bg-gray-100 mb-8 rounded-2xl' dangerouslySetInnerHTML={{ __html:message.htmlMessage }}>
                                            {/* {message.message.split(/\n/g).map((line, i) => <p className='mb-3' key={i}>{line}</p>)} */}
                                        </div>
                                    </AccordionItem>
                                ))
                            }
                        </Accordion>
                    }
                    {/* Come raggiungerci <br />
                    Nome rete wifi: <br />
                    Password: <br />
                    Cosa visitare <br /> */}
                </div>
                <div>
                    {lang === 'it' ? 'Per qualsiasi informazione o richiesta non esitare a contattarci!' : 'For any information or request do not hesitate to contact us!'}
                </div>
                <div>
                    <Link href={'https://wa.me/393484370034'} target="_blank" className="flex items-center fixed bottom-4 right-4 bg-white rounded-full p-1 border-2 border-green-600">
                        <IoLogoWhatsapp size={'2em'} className='text-green-600' />
                    </Link>
                </div>
            </div>
        </main>
    )
}
