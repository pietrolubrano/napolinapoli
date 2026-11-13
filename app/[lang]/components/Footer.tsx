import Link from "next/link";
import Image from "next/image";

import { FaCcPaypal, FaCcVisa, FaCcMastercard, FaCreditCard } from "react-icons/fa6";
import { FaLocationDot, FaInstagram, FaEnvelope } from "react-icons/fa6";
import { FaTripadvisor } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { TbBrandBooking } from "react-icons/tb";
import TripAdvisor from "./TripAdvisor";
import { Locale } from "@/i18n-config";

export default async function Footer(props: { lang: Locale }){
    
    const { lang } = props

    return (
        <footer className="w-full p-8 bg-background text-white mt-auto">
            <div className="container mx-auto grid grid-cols-3">

                <div className="col-span-3 md:col-span-1 space-y-2 mb-6">
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

                <div className="col-span-3 md:col-span-1 space-y-3 mb-6 md:mb-0">
                    <Link href={`/${lang}/napoli`} className="block underline">
                        {lang === "it" ? "Info utili per il soggiorno" : "Useful info for your stay"}
                    </Link>
                    <div className="italic">
                        Secure payment with:
                        <div className="flex gap-3 mt-1">
                            <FaCcPaypal size={'3em'} />
                            <FaCcVisa size={'3em'} />
                            <FaCcMastercard size={'3em'} />
                            <FaCreditCard size={'3em'} />
                        </div>
                    </div>
                </div>

                {/* <div className="col-span-3 md:col-span-1 flex gap-4 justify-center p-4">
                    <Link href={'https://www.instagram.com/_napolinapoli'} target="_blank" className="flex items-center">
                        <FaInstagram size={'3em'} />
                    </Link>
                </div> */}
                
            </div>
        </footer>
    )
}
