import SearchForm from "./components/SearchForm"
import RoomCard from "./components/RoomCard"
import { Suspense } from "react"
import Loading from "../loading"
import Image from "next/image"
import { checkApartmentAvailability } from "../../actions/smoobuActions"
import { Locale } from "@/i18n-config"

export default async function Page({
  searchParams,
  params
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  params: Promise<{ lang: Locale }>
}) {

  const { lang } = await params
  const { arrivalDate, departureDate, guests = '3' } = await searchParams

    return (
        <main className="bg-black/70">

          <div className="container mx-auto flex flex-col items-center p-8 min-h-[calc(100svh-70px)] relative">
            <Image src="https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/sfondi/spaccanapoli-1068x712.jpg" alt="Napoli" width={1068} height={712} className="absolute inset-0 h-full object-cover" />
            <div className="absolute inset-0 bg-black/70"></div>
            
              <div className="text-gray-600 p-3 max-w-2xl bg-gray-300 font-bold w-full z-0">
                {lang === "it" ? "Seleziona la date e cerca" : "Select the dates and search"}
              </div>

              <SearchForm
                arrivalDate={arrivalDate as string}
                departureDate={departureDate as string}
                guests={guests as string}
                lang={lang}
              />

              <Suspense fallback={<Loading></Loading>}>
                <CardWrapper
                  arrivalDate={arrivalDate as string}
                  departureDate={departureDate as string}
                  guests={guests as string}
                  lang={lang}
                />
              </Suspense>
              
          </div>

        </main>
    )
}

async function CardWrapper({ 
  arrivalDate,
  departureDate,
  guests,
  lang
 }: {
  arrivalDate: string
  departureDate: string
  guests: string,
  lang: Locale
  }) {

let data

  if(arrivalDate && departureDate && guests){
    data = await checkApartmentAvailability(arrivalDate, departureDate, guests)
    console.log('Smoobu availability response:', data);
  }

  if(!data || !data.availableApartments){
    return (
      <div className="text-white text-center mt-8 bg-red-500 z-10 max-w-2xl p-4 rounded">
        <h3 className="text-2xl font-bold mb-4">{lang === "it" ? "🙁 Errore" : "🙁 Error"}</h3>
        <p>{lang === "it" ? "Per favore prova a riformulare la richiesta." : "Please try rephrasing your request."}</p>
      </div>
    )
  }

  if(data.availableApartments.length === 0){
    console.log('No available apartments for the selected dates and number of guests.');
    return (
      <div className="text-white text-center mt-8 bg-red-500 z-10 max-w-2xl p-4 rounded">
        <h3 className="text-2xl font-bold mb-4">{lang === "it" ? "🙁 Nessun appartamento disponibile" : "🙁 No available apartments"}</h3>
        <p>{lang === "it" ? "Ci dispiace, ma non ci sono appartamenti disponibili per le date selezionate. Ti invitiamo a modificare le date del soggiorno o il numero di ospiti e riprovare." : "We're sorry, but there are no available apartments for the selected dates. Please modify the check-in/check-out dates or the number of guests and try again."}</p>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 pt-8">
      {data?.availableApartments?.map((apartmentId: number) => 
        apartmentId !== 260797 &&
          <div key={apartmentId}>
            <RoomCard
              apartmentId={apartmentId}
              response={data}
              arrivalDate={arrivalDate as string}
              departureDate={departureDate as string}
              guests={guests as string}
              lang={lang}
            />
          </div>
        )}
    </div>
  )
}