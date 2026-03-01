import Image from "next/image";
import Link from "next/link";
import { rooms } from "@/data/roomsData";
import { Locale } from "@/i18n-config";
import Carousel from "./Carousel";

interface RoomCardProps {
    room: typeof rooms[number];
    lang: Locale;
    index: number;
}

export default function RoomCard({ room, lang, index }: RoomCardProps) {
    return (
        <div key={room.name} className="grid md:grid-cols-3 border-b border-gray-300 bg-white">

            <div className={`md:col-span-2 ${index % 2 !== 0 && 'md:order-last'}`}>
                {/* <Image width={1920} height={1080} src={room.images[0]} alt={room.name} className="w-full h-auto object-cover" /> */}
                <Carousel images={room.images}></Carousel>
            </div>

            <div className="p-4 md:p-8 flex flex-col justify-between w-full">
            <div className=" ">
                <h4 className="w-full text-xl text-background font-bold mb-2">{room.name}</h4>
                <p className="w-full text-gray-600 mb-4">{room.description[lang as Locale]}</p>
            </div>
            <Link href={`/${lang}/room/${room.slug}`} className="text-background font-bold underline text-center">
                {lang === 'it' ? 'Scopri di più' : 'Show more'}
            </Link>
            </div>
            
        </div>
    )
}
