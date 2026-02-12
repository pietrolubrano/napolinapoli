
import ReservationPage from "./(components)/ReservationPage"
import ReservationNotFount from "./(components)/ReservationNotFount"
import Link from "next/link"
import { Button } from "@heroui/button"
import ReservationForm from "./(components)/reservationForm"

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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const { email, reservationId } = await searchParams

    if(email && reservationId){
        const response = await getReservation(reservationId as string)
        const reservation: Reservation = await response.json()

        if(reservation.status === 404){
            return<ReservationNotFount></ReservationNotFount>
        }

        if(email === reservation.email){
            return <ReservationPage reservation={reservation}></ReservationPage>
        } else {
            return(
                <main className=" flex justify-center items-center w-full">
                    <div className="text-gray-600 p-4 bg-white text-center">
                        <p className="mb-4">
                            L&apos;indirizzo email non corrisponne <br /> a quello della prenotazione.
                        </p>
                        <Link href={{ 
                            pathname: '/reservation',
                            query: {
                                reservationId
                            }
                            }}>
                            <Button className="bg-background text-white">
                                Riprova
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
                <ReservationForm reservationId={reservationId as string} />
            </div>
        </main>
    )
}
