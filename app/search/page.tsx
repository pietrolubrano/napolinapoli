import SearchForm from "./(components)/SearchForm"
import RoomCard from "./(components)/RoomCard"
import { Suspense } from "react"
import Loading from "../loading"
import Image from "next/image"

export type SmoobuAvailabilityResponseData = {
  availableApartments: number[]
  errorMessages: string[]
  prices: {
    price: number
    currency: string
  }[]
}

const checkAvailability = async (
  arrivalDate: string,
  departureDate: string,
  guests: string
) => fetch("https://login.smoobu.com/booking/checkApartmentAvailability",{
    headers: {
      'Api-Key' : process.env.API_KEY as string,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      
    },
    method: "POST",
    body: JSON.stringify({
      arrivalDate,
      departureDate,
      guests: +guests,
      "apartments": [],
      "customerId": process.env.CUSTOMER_ID
    })
})

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const { arrivalDate, departureDate, guests = '3' } = await searchParams

    return (
        <main className="bg-black/70">

          <div className="container mx-auto flex flex-col items-center p-8 min-h-[calc(100svh-70px)] relative">
            <Image src="https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/sfondi/napoli-sfondo.webp" alt="Napoli" width={1920} height={1080} className="absolute inset-0 h-full object-cover" />
            <div className="absolute inset-0 bg-black/70"></div>

              <SearchForm
                arrivalDate={arrivalDate as string}
                departureDate={departureDate as string}
                guests={guests as string}
              />

              <Suspense fallback={<Loading></Loading>}>
                <CardWrapper
                  arrivalDate={arrivalDate as string}
                  departureDate={departureDate as string}
                  guests={guests as string}
                />
              </Suspense>
              
          </div>

        </main>
    )
}

async function CardWrapper({ 
  arrivalDate,
  departureDate,
  guests
 }: {
  arrivalDate: string
  departureDate: string
  guests: string
  }) {

  let data
  let response
  if(arrivalDate && departureDate && guests){
    data = await checkAvailability(arrivalDate as string, departureDate as string, guests as string)
    response = await data.json()
    console.log('Smoobu availability response:', response);
  }

  if(!response || !response.availableApartments){
    return (
      null
    )
  }

  if(response.availableApartments.length === 0){
    console.log('No available apartments for the selected dates and number of guests.');
    return (
      <div className="text-white text-center mt-8 bg-red-500 z-10 max-w-2xl p-4 rounded">
        <h3 className="text-2xl font-bold mb-4">🙁 Nessun appartamento disponibile</h3>
        <p>Ci dispiace, ma non ci sono appartamenti disponibili per le date selezionate. Ti invitiamo a modificare le date del soggiorno o il numero di ospiti e riprovare.</p>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 pt-8">
      {response?.availableApartments?.map((apartmentId: number) => 
        apartmentId !== 260797 &&
          <div key={apartmentId}>
            <RoomCard
              apartmentId={apartmentId}
              response={response}
              arrivalDate={arrivalDate as string}
              departureDate={departureDate as string}
              guests={guests as string}
            />
          </div>
        )}
    </div>
  )
}