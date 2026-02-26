
import ReservationPage from "./components/ReservationPage"
import ReservationNotFount from "./components/ReservationNotFount"
import Link from "next/link"
import { Button } from "@heroui/button"
import ReservationForm from "./components/reservationForm"
import { Locale } from "@/i18n-config"
import { getDictionary } from "@/get-dictionary"

const getReservation = async (
  reservationId: string,
) => fetch(`https://login.smoobu.com/api/reservations/${reservationId}`,{
    headers: {
      'Api-Key' : process.env.API_KEY as string,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: "GET",
})

const getReservationMessages = async (
  reservationId: string,
) => fetch(`https://login.smoobu.com/api/reservations/${reservationId}/messages`,{
    headers: {
      'Api-Key' : process.env.API_KEY as string,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: "GET",
})

export default async function Page({
    searchParams,
    params
    } : PageProps<'/[lang]'>
) {

    const { lang } = await params;
    
    const dictionary = await getDictionary(lang as Locale);

    const { email, reservationId } = await searchParams

    if(email && reservationId){
        const response = await getReservation(reservationId as string)
        const reservation: Reservation = await response.json()

        if(reservation.status === 404){
            return<ReservationNotFount lang={lang as Locale} />
        }

        if(email === reservation.email){
            const messagesResponse = await getReservationMessages(reservationId as string)
            const messages: ReservationMessageResponse = await messagesResponse.json()
            return <ReservationPage reservation={reservation} messages={messages} lang={lang as Locale} />
        } else {
            return(
                <main className=" flex justify-center items-center w-full">
                    <div className="text-gray-600 p-4 bg-white text-center">
                        <p className="mb-4">
                            {lang === "it"?
                                "L'indirizzo email non corrisponde a quello della prenotazione."
                                :
                                "The email address does not match the reservation."
                            }
                        </p>
                        <Link href={{ 
                            pathname: `/${lang}/reservation`,
                            query: {
                                reservationId
                            }
                            }}>
                            <Button className="bg-background text-white">
                                {lang === "it" ? "Riprova" : "Try again"}
                            </Button>
                        </Link>
                    </div>
                </main>
            )
        }
    }

    return (
        <main className=" flex justify-center items-center w-full">
            <div className="text-gray-600 p-8 min-w-sm">
                <ReservationForm reservationId={reservationId as string} lang={lang as Locale} />
            </div>
        </main>
    )
}
