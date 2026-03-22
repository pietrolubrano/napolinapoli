import { rooms } from "@/data/roomsData"
import BookingForm from "./components/BookingForm"
import BookingHeader from "./components/BookingHeader"
import { checkApartmentAvailability } from "../../actions/smoobuActions"
import { Locale } from "@/i18n-config"
import Carousel from '../components/Carousel';
import {Chip} from "@heroui/chip";

export default async function Page({
    params,
    searchParams,
}: PageProps<'/[lang]'>) {

    const { lang } = await params
    const { arrivalDate, departureDate, guests, apartmentId } = await searchParams

    const data = await checkApartmentAvailability(
        arrivalDate as string,
        departureDate as string,
        guests as string,
        [apartmentId as string]
    )

    const room = rooms[Number(apartmentId)]

    if(data && data.availableApartments[0] === Number(apartmentId)){

        return (
            <main className="bg-black/70">
                <div className="container mx-auto max-w-2xl bg-background pb-8">
                    <div className="bg-white text-black pb-1">

                        <h4 className="text-2xl bg-background py-6 text-white font-bold mb-8 text-center">
                           {lang === "it" ? "Nuova Prenotazione" : "New Booking"}
                        </h4>

                        <BookingHeader
                            arrivalDate={arrivalDate as string}
                            departureDate={departureDate as string}
                            guests={guests as string}
                            apartmentId={Number(apartmentId)}
                            lang={lang as Locale}
                        />

                    </div>
                    
                    <Carousel images={room.images} />

                    <div className="space-y-2 space-x-2 p-4 bg-white">
                        {
                            room.services.map(service => <Chip key={service.description[lang as Locale]} size="sm" variant="bordered" className="bg-white border-background">
                                <div className="inline-flex gap-1 items-center text-gray-800">
                                    <span className="text-background">
                                        {service.icon}
                                    </span>
                                    {service.description[lang as Locale]}
                                </div>
                                </Chip>)
                        }
                    </div>
                    {/* <RoomServicesList services={room.services} lang={lang as Locale} /> */}

                    <BookingForm
                        arrivalDate={arrivalDate as string}
                        departureDate={departureDate as string}
                        guests={guests as string}
                        price={data.prices[Number(apartmentId)]}
                        apartmentId={Number(apartmentId)}
                        lang={lang as Locale}
                    />

                </div>
            </main>
        )
    }

    return (
        <main className="bg-black/70">
            <div className="container mx-auto bg-white text-gray-600 p-8">

                <div className="text-2xl font-bold mb-8 text-center">
                    {lang === "it" ? "Appartamento non disponibile" : "Apartment not available"}
                </div>

                <div className="text-center">
                    {lang === "it" ?
                        `Ci dispiace, l'appartamento ${room.name} non è disponibile per le date selezionate.`
                        :
                        `Sorry, the apartment ${room.name} is not available for the selected dates.`
                    }
                </div>

            </div>
        </main>
    )
}