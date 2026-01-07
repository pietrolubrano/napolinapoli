"use client"

import {Card, CardHeader, CardBody, Image, Button} from "@heroui/react";
import { rooms } from "@/data/roomsData";
import { SmoobuAvailabilityResponseData } from "../page";

export default function App({
    apartmentId,
    response
} : {
    apartmentId: number
    response: SmoobuAvailabilityResponseData
}) {
  return (
    <Card className="border-4 border-black ">
      <CardHeader className="pb-0 pt-2 flex-col items-start">
        <h4 className="font-bold text-large">{ rooms[apartmentId].name}</h4>
        <p className="text-tiny uppercase font-bold">
            {response.prices[apartmentId].price }
            {response.prices[apartmentId].currency}
        </p>
        {/* <small className="text-default-500">12 Tracks</small> */}
      </CardHeader>
        
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover"
          src="https://heroui.com/images/hero-card-complete.jpeg"
          width={270}
        />
        <Button>prenota ora</Button>
      </CardBody>
    </Card>
  );
}
