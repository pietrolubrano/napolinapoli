"use client"

import { FaPerson, FaRegCalendarCheck, FaKitchenSet } from "react-icons/fa6";
import {Card, CardHeader, CardBody, Image, Button} from "@heroui/react";
import { rooms } from "@/data/roomsData";
import { SmoobuAvailabilityResponseData } from "../page";

export default function App({
    apartmentId,
    response,
    arrivalDate,
    departureDate,
    guests
} : {
    apartmentId: number
    response: SmoobuAvailabilityResponseData
    arrivalDate: string
    departureDate: string
    guests: string
}) {
  return (
    <Card className="border-1 border-gray-500 text-gray-500 font-bold">
      <CardHeader className="pb-1 pt-2 flex-col items-start">
        <h4 className="font-bold text-large w-full text-background">
          { rooms[apartmentId].name}
          <span className="float-end">
            {response.prices[apartmentId].price }
            {response.prices[apartmentId].currency}
          </span>
        </h4>

        <ul className="text-tiny p-1">
          <li>
            <FaRegCalendarCheck className="inline text-background"></FaRegCalendarCheck> Check-in {new Date(arrivalDate).toLocaleDateString()}
          </li>
          <li>
            <FaRegCalendarCheck className="inline text-background"></FaRegCalendarCheck> Check-out {new Date(departureDate).toLocaleDateString()}
          </li>
          <li>
            <FaPerson className="inline text-background me-1"></FaPerson>{guests} Persone
          </li>
          <li>
            <FaKitchenSet className="inline text-background me-1"/>
            {rooms[apartmentId].services.find(service => service.description.it === 'Angolo cottura') ? 'Angolo cottura' : 'Cucina in comune'}
          </li>
          
        </ul>
        {/* <small className="text-default-500">12 Tracks</small> */}
      </CardHeader>
        
      <CardBody className="overflow-visible p-0">
        <Image
          alt="Card background"
          className="object-cover bg-red-400"
          src={rooms[apartmentId].images[0]}
          width={700}
        />
        <Button className="bg-background text-white font-bold uppercase">seleziona</Button>
      </CardBody>
    </Card>
  );
}
