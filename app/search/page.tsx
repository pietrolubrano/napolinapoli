import SearchForm from "./(components)/SearchForm"
import RoomCard from "./(components)/RoomCard"
import { Suspense } from "react"
import Loading from "../loading"

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

          <div className="container mx-auto flex justify-center p-8">
            <SearchForm
              arrivalDate={arrivalDate as string}
              departureDate={departureDate as string}
              guests={guests as string}
            />
          </div>

          <Suspense fallback={<Loading></Loading>}>
            <CardWrapper
              arrivalDate={arrivalDate as string}
              departureDate={departureDate as string}
              guests={guests as string}
            />
          </Suspense>

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
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 p-8 gap-8">
      {response?.availableApartments?.map((apartmentId: number) => 
        apartmentId !== 260797 &&
          <div key={apartmentId}>
            <RoomCard apartmentId={apartmentId} response={response}></RoomCard>
          </div>
        )}
    </div>
  )
}