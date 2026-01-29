import Link from "next/link";
import Image from "next/image";

import { FaLocationDot, FaInstagram, FaEnvelope } from "react-icons/fa6";
import { FaTripadvisor } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { TbBrandBooking } from "react-icons/tb";
import TripAdvisor from "./TripAdvisor";

export default function Footer() {
  return (
    <footer className="w-full p-8 bg-background text-white mt-auto">
        <div className="container mx-auto grid grid-cols-3">

            <div className="col-span-3 mb-6 flex flex-col md:flex-row gap-8 items-center justify-center md:justify-start">
                 <TripAdvisor></TripAdvisor>
                 <Link href={'https://www.booking.com/hotel/it/palepolib-amp-b.it.html'} target="_blank" className="flex items-center">
                    <Image loading="eager" src="https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/booking-award/Digital-Award-TRA-2025.png" alt="Logo" width={200} height={200}></Image>
                 </Link>
            </div>

            <div className="col-span-3 md:col-span-1 space-y-2">
                <Link href={'https://maps.app.goo.gl/JiRPB1kuNRNkfqVPA'} target="_blank" className="flex items-center">
                    <FaLocationDot size={'1.5em'} />
                    <p className="ms-2">
                        Vico Maiorani, 29 <br />80138 - Napoli (NA)
                    </p>
                </Link>
                <Link href={'https://wa.me/393484370034'} target="_blank" className="flex items-center">
                    <IoLogoWhatsapp size={'1.5em'} />
                    <p className="ms-2">
                        +39 348 4370034
                    </p>
                </Link>
                <Link href={'mailto:nnnapolinapoli@gmail.com'} target="_blank" className="flex items-center">
                    <FaEnvelope size={'1.5em'} />
                    <p className="ms-2">
                        nnnapolinapoli@gmail.com
                    </p>
                </Link>
            </div>

            <div className="col-span-3 md:col-span-1">

            </div>

            <div className="col-span-3 md:col-span-1 flex gap-4 justify-center p-4">
                <Link href={'https://www.instagram.com/_napolinapoli'} target="_blank" className="flex items-center">
                    <FaInstagram size={'3em'} />
                </Link>
            </div>
            
        </div>
    </footer>
  )
}
