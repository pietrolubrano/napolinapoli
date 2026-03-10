"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@headlessui/react"
import { Locale } from "@/i18n-config"

import MessagesAccordion from "./MessagesAccordion"
import ReservationDetails from "./ReservationDetails"
import ReservationHome from "./ReservationHome"

import { FaEllipsisV, FaHome, FaRegEnvelope, FaWhatsapp } from "react-icons/fa"

export default function ReservationPageLayout({
    reservation,
    messages,
    lang
} : {
    reservation: Reservation
    messages: ReservationMessageResponse
    lang: Locale
}) {

const components = [
  {
    name: 'home',
    icon: <FaHome />,
    component: <ReservationHome reservation={reservation} lang={lang} />
  },{
    name: 'messages',
    icon: <FaRegEnvelope />,
    component: <MessagesAccordion messages={messages} reservation={reservation} lang={lang} />
  },{
    name: 'details',
    icon: <FaEllipsisV />,
    component: <ReservationDetails reservation={reservation} lang={lang} />
  }
]

  const [currentComponent, setCurrentComponent] = useState(0)

  const handleClick = (index: number) => {
    setCurrentComponent(index)
    window.scrollTo(0, 0)
  }

  return(<>
      {
        components[currentComponent].component
      }
      <div className="fixed bottom-0 z-50 w-full flex justify-center">
        <div className="mb-4 space-x-4 backdrop-blur p-3 rounded-full">
          {
            components.map((component, index) => 
              <Button
                key={index}
                className={`${currentComponent === index ? 'scale-125' : ''} transition-all text-3xl rounded-full bg-white text-background p-2 border`}
                onClick={() => handleClick(index)}>
                {component.icon}
              </Button>
            )
          }
          <Button as={Link} href={'https://wa.me/393484370034'} target="_blank" className="inline-flex transition-all text-3xl rounded-full bg-white text-background p-2 border">
            <FaWhatsapp />
          </Button>
        </div>
    </div>
  </>)
  
}