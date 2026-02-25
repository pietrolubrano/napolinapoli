import type { Metadata } from 'next'

import { FaKitchenSet, FaPerson } from "react-icons/fa6";

import { rooms } from "@/data/roomsData"
import { notFound } from 'next/navigation';
import { Button } from "@heroui/button";

import Link from "next/link";
import Carousel from "@/app/[lang]/components/Carousel";
import { Locale } from '@/i18n-config';

export async function generateMetadata(
  { params } : { params: Promise<{ slug: string, lang: Locale }> }
): Promise<Metadata> {
  
  const { slug, lang } = await params
  // fetch post information
  const room = Object.values(rooms).find(room => room.slug === slug)
  
  if(room){
    return {
      title: `Napoli Napoli Rooms - Guest House - ${lang === 'it' ? 'Camera' : 'Room'} ${room.name}`,
      description: room.description[lang],
      openGraph: {
        images: [room.opengraphImage],
      }
    }
  }

  return {
    title: `Napoli Napoli Rooms - Guest House - ${lang === 'it' ? 'Camera non trovata' : 'Room not found'}`,
    description: lang === 'it' ? 'Camera non trovata' : 'Room not found',
    openGraph: {
      images: ['/images/napoli-napoli-logo.png']
    }
  }
}

const MaxOccupancy = ({ maxOccupancy } : { maxOccupancy: number }) => {

  const arr = []
  for (let index = 0; index < maxOccupancy; index++) {
    arr.push(<FaPerson key={index} className="inline max-w-3 mb-2" />)
  }
  return arr
}

export default async function Page({
  params,
}: PageProps<'/[lang]/room/[slug]'>) {

  const { slug, lang } = await params

  const room = Object.values(rooms).find(room => room.slug === slug)

  if(room){

    const { name, description, maxOccupancy, services } = room 

    return (
      <main className="bg-gray-100 min-h-screen">

        <div className="lg:hidden grid grid-cols-3">
          {
            Object.values(rooms).slice(0,3).map((room) => (
              <Link href={`/${lang}/room/${room.slug}`} key={room.name} className="text-background font-bold col-span-1">
                <Button className={`w-full uppercase text-sm font-bold ${room.slug === slug ? 'bg-gray-200 text-background' : 'bg-background text-white' }`}>
                  {room.name}
                </Button>
              </Link>
            ))
          }
        </div>

        <h2 className="lg:hidden text-2xl text-background font-bold p-8 bg-gray-200">{name}
          {/* <span className="text-gray-500 text-sm uppercase font-bold ms-1">Room</span> */}
          <span className="float-end">
            {services.find(service => service.description.it === 'Angolo cottura') && <FaKitchenSet className="inline max-w-5 me-2 mb-2" />}
            <MaxOccupancy maxOccupancy={maxOccupancy} />
          </span>
        </h2>

        <div className="flex">

          {/* Left column - only visible on large screens */}

          <div className="w-full hidden lg:block">
            {/* Additional content for the right column */}
            <h2 className="text-4xl text-background font-bold p-8 pb-0">{name}
              <span className="text-gray-500 text-sm uppercase font-bold ms-1">Room</span>
              <span className="float-end">
                {services.find(service => service.description.it === 'Angolo cottura') && <FaKitchenSet className="inline max-w-5 me-2 mb-2" />}
                <MaxOccupancy maxOccupancy={maxOccupancy} />
              </span>
            </h2>

            <p className="text-gray-500 text-xl mb-8 p-10 italic ">
              {description[lang as Locale]}
            </p>
          </div>

          <Carousel images={room.images}></Carousel>

        </div>
        
        <div className="md:pb-8">

          <div className="container mx-auto max-w-2xl md:border-4 border-background bg-white text-gray-500 font-bold">

            <div className="p-8">
              <p className="lg:hidden text-gray-500 font-bold mb-8">
                {description[lang as Locale]}
              </p>

              <ul className="space-y-2 mb-8">
                {services.map(service => <li key={service.description.it} className="flex items-center">
                    <span className=" inline-block me-2 text-xl text-background">{service.icon}</span>{service.description[lang as Locale]}
                  </li>)}
              </ul>
              
              <div className="flex w-full justify-end sticky bottom-4 md:static">
                  <Link href={`/${lang}/search`} className="w-full sm:w-fit">
                    <Button className="bg-background w-full sm:w-fit p-4 text-white text-sm font-bold uppercase">
                      {lang === 'it' ? 'Verifica la disponibilità' : 'Check availability'}
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
