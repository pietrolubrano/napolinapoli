import { Suspense } from "react"
import Loading from "../loading"
import Image from "next/image";
import { Locale } from "@/i18n-config"
import MainWrapper from "./components/MainWrapper";
import { checkApartmentAvailability, getVacancies } from "@/app/actions/smoobuActions";

export default async function Page({
  searchParams,
  params
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  params: Promise<{ lang: Locale }>
}) {

  const { lang } = await params
  const { arrivalDate, departureDate, guests = '2' } = await searchParams
  let data: SmoobuAvailabilityResponseData | undefined
  let vacancies: Vacancy[] | undefined
  if(arrivalDate && departureDate && guests){
    data = await checkApartmentAvailability(arrivalDate as string, departureDate as string, guests as string)
  }
  if(data?.availableApartments.length === 0){
    vacancies = await getVacancies(arrivalDate as string)
  }
    return (
        <main className="bg-black/70">

          <div className="container mx-auto flex flex-col items-center p-8 min-h-[calc(100svh-70px)] relative">
            <Image src="https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/sfondi/spaccanapoli-1068x712.jpg" preload alt="Napoli" width={1068} height={712} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/70"></div>

              <Suspense fallback={<Loading></Loading>}>
                <MainWrapper
                  arrivalDate={arrivalDate as string}
                  departureDate={departureDate as string}
                  guests={guests as string}
                  lang={lang}
                  data={data}
                  vacancies={vacancies}
                />
              </Suspense>

          </div>

        </main>
    )
}
