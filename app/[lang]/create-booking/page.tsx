import { rooms } from "@/data/roomsData"
import BookingForm from "./components/BookingForm"
import BookingHeader from "./components/BookingHeader"
import { checkApartmentAvailability } from "../../actions/smoobuActions"
import { Locale } from "@/i18n-config"

export default async function Page({
    params,
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    params: Promise<{ lang: Locale }>
}) {

    const { lang } = await params
    const { arrivalDate, departureDate, guests, apartmentId } = await searchParams

    const data = await checkApartmentAvailability(
        arrivalDate as string,
        departureDate as string,
        guests as string,
        [apartmentId as string]
    )

    const apartmentName = rooms[Number(apartmentId)].name

    if(data.availableApartments[0] === Number(apartmentId)){

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
                            lang={lang}
                        />

                    </div>
                    
                    <BookingForm
                        arrivalDate={arrivalDate as string}
                        departureDate={departureDate as string}
                        guests={guests as string}
                        price={data.prices[Number(apartmentId)]}
                        apartmentId={Number(apartmentId)}
                        lang={lang}
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
                        `Ci dispiace, l'appartamento ${apartmentName} non è disponibile per le date selezionate.`
                        :
                        `Sorry, the apartment ${apartmentName} is not available for the selected dates.`
                    }
                </div>

            </div>
        </main>
    )
}