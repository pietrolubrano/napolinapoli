"use client"

import RoomCard from './RoomCard';

import { Locale } from "@/i18n-config";
import SearchForm from "./SearchForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import VacancyCard from './VacancyCard';

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
    router.push(`/${lang}/search?arrivalDate=${from}&departureDate=${to}&guests=${guests}`)
    setArrivalDateState(from)
    setDepartureDateState(to)
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
              {vacancies?.map((apartmentVacancies) => <VacancyCard key={apartmentVacancies.apartmentId} apartmentVacancies={apartmentVacancies} handleClick={handleClick} lang={lang} />)}
            </div>
          </div>
        </>
      }
  </>)
}