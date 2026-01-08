import { FaKitchenSet, FaPerson } from "react-icons/fa6";

import { rooms } from "@/data/roomsData"
import { notFound } from 'next/navigation';
import { Button } from "@headlessui/react";
import Link from "next/link";

const MaxOccupancy = ({ maxOccupancy } : { maxOccupancy: number }) => {

  const arr = []
  for (let index = 0; index < maxOccupancy; index++) {
    arr.push(<FaPerson key={index} className="inline max-w-3 mb-2" />)
  }
  return arr
}

export default async function Room({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params

  const room = Object.values(rooms).find(room => room.slug === slug)

  if(room){

    const { name, description, maxOccupancy, services } = room 

    return (
      <main className="bg-black/70">

        <div className="md:p-8 bg-white">

          <h2 className="text-2xl text-background font-bold p-8 md:p-0">{name}
            <span className="text-gray-500 text-sm uppercase font-bold ms-1">Room</span>
            <span className="float-end">
              {services.find(service => service.description.it === 'Angolo cottura') && <FaKitchenSet className="inline max-w-5 me-2 mb-2" />}
              <MaxOccupancy maxOccupancy={maxOccupancy} />
            </span>
          </h2>

          <div className="container mx-auto bg-white text-gray-500 font-bold">
            {/* carosello */}

            <div className="p-8">
              <p className="text-gray-500 font-bold mb-8">
                {description}
              </p>

              <ul className="space-y-2 mb-8">
                {services.map(service => <li key={service.description.it} className="flex items-center">
                    <span className=" inline-block me-2 text-xl text-background">{service.icon}</span>{service.description.it}
                  </li>)}
              </ul>
              
              <div className="flex w-full justify-end">
                  <Link href={'/search'} className="w-full sm:w-fit">
                    <Button className="bg-background w-full sm:w-fit p-4 text-white">
                        Verifica la disponibilità
                    </Button>
                  </Link>
              </div>

            </div>
            
          </div>

        </div>
        
      </main>
    )
  }

  return notFound()
}
