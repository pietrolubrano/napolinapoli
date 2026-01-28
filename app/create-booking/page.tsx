import { rooms } from "@/data/roomsData"
import BookingForm from "./(components)/BookingForm"
import BookingHeader from "./(components)/BookingHeader"
import { checkAvailability } from "../actions/smoobuActions"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const { arrivalDate, departureDate, guests, apartmentId } = await searchParams

    const response = await checkAvailability(
        arrivalDate as string,
        departureDate as string,
        guests as string,
        [apartmentId as string]
    )
    const data = await response.json()
    
    const apartmentName = rooms[Number(apartmentId)].name

    if(data.availableApartments[0] === Number(apartmentId)){
        return (
            <main className="bg-black/70">
                <div className="container mx-auto bg-white text-gray-600 p-8">

                    <div className="text-2xl font-bold mb-8 text-center">
                        Nuova Prenotazione
                    </div>

                    <BookingHeader
                        arrivalDate={arrivalDate as string}
                        departureDate={departureDate as string}
                        guests={guests as string}
                        price={data.prices[Number(apartmentId)]}
                        apartmentId={Number(apartmentId)}
                    />
                    <BookingForm 
                        arrivalDate={arrivalDate as string}
                        departureDate={departureDate as string}
                        guests={guests as string}
                        price={data.prices[Number(apartmentId)]}
                        apartmentId={Number(apartmentId)}
                    />

                </div>
            </main>
        )
    }

    return (
        <main className="bg-black/70">
            <div className="container mx-auto bg-white text-gray-600 p-8">

                <div className="text-2xl font-bold mb-8 text-center">
                    Appartamento non disponibile
                </div>

                <div className="text-center">
                    Ci dispiace, l&apos;appartamento {apartmentName} non è disponibile per le date selezionate.
                </div>

            </div>
        </main>
    )
}