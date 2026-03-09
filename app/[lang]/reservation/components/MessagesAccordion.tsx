import { Accordion, AccordionItem } from "@heroui/react"
import { FaCalendar, FaClock, FaUserCircle } from "react-icons/fa"
import MessageToHostForm from "./MessageToHostForm"
import { Locale } from "@/i18n-config"

export default function MessagesAccordion({
    messages,
    reservation,
    lang
}:{
    messages: ReservationMessageResponse
    reservation: Reservation
    lang: Locale
}) {
    
    return (
        <div className="container mx-auto">
            <p className="font-bold p-4">
                {lang === 'it' ? 'I tuoi messaggi:' : 'Your messages:'}
            </p>
            {
                messages.messages.length > 0 &&
                <Accordion className='p-0! mb-8' selectionMode="multiple">
                    {
                        messages.messages.map((message) => (
                            <AccordionItem key={message.id} className='bg-gray-100 px-4' title={message.subject || 'Message'}>
                                
                                <div className='mb-2 flex w-full items-center text-sm text-gray-500 justify-between'>
                                    <div>
                                        <FaUserCircle className='inline' size={'1.5em'} /> <span className='font-bold'>{message.type === 1 ? 'ME' : 'HOST'}</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='float-right text-xs flex items-center'><FaCalendar className='inline mr-1' />{new Date(message.createdAt).toLocaleDateString(lang)}</span>
                                        <span className='float-right text-xs flex items-center'><FaClock className='inline mr-1' />{new Date(message.createdAt).getHours()}:{new Date(message.createdAt).getMinutes().toString().padStart(2, '0')}</span>
                                    </div>
                                </div>
                                
                                <div className=' bg-gray-100 mb-4 px-3 text-black' /* dangerouslySetInnerHTML={{ __html:message.htmlMessage }} */>
                                    {message.message.split(/\n/g).map((line, i) => <p className='mb-3' key={i}>{line}</p>)}
                                </div>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            }
            <div className="flex w-full justify-center">
                <MessageToHostForm reservationId={reservation.id.toString()} lang={lang} />
            </div>
        </div>
  )
}
