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
        <div key={room.name} className="grid md:grid-cols-3 border-4 border-gray-300 bg-white">

            <div className={`md:col-span-2 ${index % 2 !== 0 && 'md:order-last'}`}>
                {/* <Image width={1920} height={1080} src={room.images[0]} alt={room.name} className="w-full h-auto object-cover" /> */}
                <Carousel images={room.images} showAlwaysArrows></Carousel>
            </div>

            <div className="md:p-8 flex flex-col justify-between w-full border-gray-300">

                <div>
                </div>

                <div className="text-center">
                    <h4 className="w-full text-5xl lg:text-6xl text-background font-bold pt-4 font-birthstone">
                        {room.name}
                    </h4>
                    <p className="w-full text-gray-600 mb-4 p-4">
                        {room.description[lang as Locale]}
                    </p>
                </div>
                <Link href={`/${lang}/room/${room.slug}`} className="bg-background p-4 font-bold underline text-center">
                    {lang === 'it' ? 'Scopri di più' : 'Show more'}
                </Link>
            </div>

        </div>
    )
}
