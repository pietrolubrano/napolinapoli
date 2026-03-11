import { Room } from "@/data/roomsData"
import { Locale } from "@/i18n-config"

export default function RoomServicesList({
  services,
  lang
} : {
  services: Room[number]['services']
  lang: Locale
}){
  return(
    <ul className="space-y-2 bg-white p-8">
      {services.map(service => <li key={service.description.it} className="flex items-center text-gray-500 font-bold">
          <span className=" inline-block me-2 text-xl text-background">{service.icon}</span>{service.description[lang as Locale]}
        </li>)}
    </ul>
  )
}