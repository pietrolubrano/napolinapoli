"use client"

import Link from "next/link";

import { FaPerson, FaRegCalendarCheck, FaKitchenSet } from "react-icons/fa6";
import { Card, Button } from "@heroui/react";
import { rooms } from "@/data/roomsData";
import { Locale } from "@/i18n-config";
import Carousel from '../../components/Carousel';

export default function RoomCard({
    apartmentId,
    response,
    arrivalDate,
    departureDate,
    guests,
    lang
} : {
    apartmentId: number
    response: SmoobuAvailabilityResponseData
    arrivalDate: string
    departureDate: string
    guests: string
    lang: Locale
}) {
  return (
    <Card className="border border-gray-500 text-gray-500 font-bold animate-fade-in md:hover:scale-105 ">
      <Card.Header className="pb-1 pt-2 flex-col items-start">
        <Card.Title className="font-bold text-large w-full text-background">
          { rooms[apartmentId].name}
          <span className="float-end">
            {response.prices[apartmentId].price }
            {response.prices[apartmentId].currency}
          </span>
        </Card.Title>

        <ul className="text-tiny p-1">
          <li>
            <FaRegCalendarCheck className="inline text-background"></FaRegCalendarCheck> Check-in {new Date(arrivalDate).toLocaleDateString(lang)}
          </li>
          <li>
            <FaRegCalendarCheck className="inline text-background"></FaRegCalendarCheck> Check-out {new Date(departureDate).toLocaleDateString(lang)}
          </li>
          <li>
            <FaPerson className="inline text-background me-1"></FaPerson>{guests} {lang === "it" ? "Persone" : "Guests"}
          </li>
          <li>
            <FaKitchenSet className="inline text-background me-1"/>
            {rooms[apartmentId].services.find(service => service.description.it === 'Angolo cottura') ? (lang === "it" ? "Angolo cottura" : "Kitchen area") : lang === "it" ? "Cucina in comune" : "Shared kitchen"}
          </li>
          
        </ul>
      </Card.Header>
        
      <Card.Content className="overflow-visible p-0">
        <Carousel images={rooms[apartmentId].images} showThumbs={false} showAlwaysArrows />

        <Link
          href={{ 
            pathname: `/${lang}/create-booking`,
            query: {
              arrivalDate,
              departureDate,
              guests,
              apartmentId
            }
          }}
          >
          <Button className="bg-background w-full text-white font-bold uppercase" fullWidth variant="primary">
            {lang === "it" ? "Prenota ora" : "Book now"}
          </Button>
        </Link>
      </Card.Content>
    </Card>
  );
}
