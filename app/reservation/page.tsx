import { Button } from "@heroui/button"
import BookingHeader from "../create-booking/(components)/BookingHeader"
import ReservationForm from "./(components)/reservationForm"
import Link from "next/link"

type Reservation = {
    "status": number,
    "id": number,
    "reference-id":null | number,
    "type": "reservation",
    "arrival": string,
    "departure":string ,
    "created-at": string,
    "modifiedAt":string,
    "apartment":{
        "id":number,
        "name":string
    },
    "channel":{
        "id": number,
        "channel_id":number,
        "name":string
    },
    "guest-name":string,
    "firstname":string,
    "lastname":string,
    "email":string,
    "phone":string,
    "adults":number,
    "children":number,
    "check-in":string,
    "check-out":string,
    "notice":string,
    "assistant-notice":string,
    "price":number,
    "price-details":string,
    "city-tax": null | number,
    "price-paid":string,
    "commission-included":null | number,
    "prepayment":number,
    "prepayment-paid":string,
    "deposit":number,
    "deposit-paid":string,
    "language":string,
    "guest-app-url":string,
    "is-blocked-booking":boolean,
    "guestId":number,
    "related":{
        "id":number,
        "name":string
    }[]
}

const getReservation = async (
  reservationId: string,
) => fetch(`https://login.smoobu.com/api/reservations/${reservationId}`,{
    headers: {
      'Api-Key' : process.env.API_KEY as string,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: "Get",
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
            return(
                <main className=" flex justify-center items-center w-full">
                    <div className="text-gray-600 p-4 bg-white text-center">
                        <p className="mb-4">
                            Prenotazione non trovata
                        </p>
                        <Link href={'/reservation'}>
                            <Button className="bg-background text-white">
                                Riprova
                            </Button>
                        </Link>
                    </div>
                </main>
            )
        }

        if(email === reservation.email){
            return(
                <main>
                    <div className="font-bold p-4">
                        ID prenotazione: {reservationId}
                    </div>
                    <div className="container mx-auto bg-white text-gray-600 p-8 space-y-4">
                        Benvenuto <strong>{reservation.firstname}</strong> 🙂,
                        <p>
                            ecco i dettagli della tua prenotazione:
                        </p>
                        <div>
                            <BookingHeader
                                arrivalDate={reservation.arrival}
                                departureDate={reservation.departure}
                                guests={reservation.adults.toString()}
                                price={{
                                    price: reservation.price,
                                    currency: '€',
                                    priceElements: [{
                                        type: "basePrice",
                                        amount: reservation.price
                                    }]
                                }}
                                apartmentId={reservation.apartment.id}
                            />
                        </div>
                        <div>
                            Come raggiungerci <br />
                            Nome rete wifi: <br />
                            Password: <br />
                            Cosa visitare <br />

                        </div>
                    </div>
                </main>
            )
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
