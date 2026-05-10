"use client"

import RoomCard from './RoomCard';

import { rooms } from "@/data/roomsData";
import { Locale } from "@/i18n-config";
import { FaArrowRight } from "react-icons/fa6";
import SearchForm from "./SearchForm";
import { useState } from "react";
import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";

export default function MainWrapper({
  arrivalDate,
  departureDate,
  guests,
  lang,
  data,
  vacancies
 }: {
  arrivalDate: string
  departureDate: string
  guests: string,
  lang: Locale
  data: SmoobuAvailabilityResponseData | undefined,
  vacancies: Vacancy[] | undefined
 }) {
  
  const router = useRouter()
  const [arrvalDateState, setArrivalDateState] = useState(arrivalDate)
  const [departureDateState, setDepartureDateState] = useState(departureDate)

  const handleClick = (from: string, to: string) => {
    setArrivalDateState(from)
    setDepartureDateState(to)
    router.push(`/${lang}/search?arrivalDate=${from}&departureDate=${to}&guests=${guests}`)
  }

  return (<>
      <div className="text-gray-600 p-3 max-w-2xl bg-gray-300 font-bold w-full z-0">
        {lang === "it" ? "Seleziona la date e cerca" : "Select the dates and search"}
      </div>
      <SearchForm arrivalDate={arrvalDateState} departureDate={departureDateState} guests={guests} lang={lang} />
      {
        !data || !data.availableApartments &&
          <div className="text-white text-center mt-8 bg-red-500 z-10 max-w-2xl p-4 rounded">
            <h3 className="text-2xl font-bold mb-4">{lang === "it" ? "🙁 Errore" : "🙁 Error"}</h3>
          <p>{lang === "it" ? "Per favore prova a riformulare la richiesta." : "Please try rephrasing your request."}</p>
        </div>
      }
      {
        data?.availableApartments.length !== 0 ?
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
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
        :
        <>
          <div className="text-white text-center mt-8 bg-red-500 z-10 max-w-2xl p-4 rounded">
            <h3 className="text-2xl font-bold mb-4">{lang === "it" ? "🙁 Nessun appartamento disponibile" : "🙁 No available apartments"}</h3>
            <p>{lang === "it" ? "Ci dispiace, ma non ci sono appartamenti disponibili per le date selezionate. Ti invitiamo a modificare le date del soggiorno o il numero di ospiti e riprovare." : "We're sorry, but there are no available apartments for the selected dates. Please modify the check-in/check-out dates or the number of guests and try again."}</p>
          </div>

          <div className="text-gray-600 text-center mt-8 z-10 rounded md:min-w-2xl">
            <h3 className="text-xl font-bold mb-4 md:mb-6 bg-background text-white p-4 rounded">{lang === "it" ? "🙂 Abbiamo camere disponibili in questi periodi" : "🙂 We have rooms available in these periods"}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vacancies?.map((apartment) => (
                <div key={apartment.apartmentId} className="bg-gray-200 p-4 rounded">
                  <h4 className="font-bold mb-2 text-xl">{rooms[+apartment.apartmentId]?.name || apartment.apartmentId}</h4>
                  {apartment.vacancies.length > 0 ? (
                    apartment.vacancies.map((vacancy, index) => (
                      <Button 
                        onClick={() => handleClick(new Date(vacancy.from).toLocaleDateString('en-CA'), new Date(vacancy.to).toLocaleDateString('en-CA'))}
                        key={index}
                        className="mb-2 flex items-center justify-center gap-1 w-full text-background font-bold"
                        >
                        {new Date(vacancy.from).toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: '2-digit' })}
                        <FaArrowRight className="mb-0.5" />
                        {new Date(vacancy.to).toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: '2-digit' })}
                      </Button>
                    ))
                  ) : (
                    <p>{lang === "it" ? "Nessuna disponibilità" : "No availability"}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </>
      }
  </>)
}