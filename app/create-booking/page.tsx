import { FaPerson, FaRegCalendarCheck } from "react-icons/fa6"
import BookingForm from "./(components)/BookingForm"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const { arrivalDate, departureDate, guests } = await searchParams

    return (
        <main className="bg-black/70">
            <div className="container mx-auto bg-white text-gray-600 p-8">

                <div className="text-2xl font-bold mb-8 text-center">
                    Crea Prenotazione
                </div>

                <div className="grid grid-cols-3 mb-8">

                    <div className="flex flex-col justify-center items-center text-center gap-3 font-bold">
                        <FaRegCalendarCheck className="text-background" size={'2em'}></FaRegCalendarCheck> Check-in <br /> {new Date(arrivalDate as string).toLocaleDateString()}
                    </div>
                    <div className="flex flex-col justify-center items-center text-center gap-3 font-bold">
                        <FaRegCalendarCheck className="text-background" size={'2em'}></FaRegCalendarCheck> Check-out<br /> {new Date(departureDate as string).toLocaleDateString()}
                    </div>
                    <div className="flex flex-col justify-center items-center text-center gap-3 font-bold">
                        <FaPerson className="text-background me-1" size={'2em'}></FaPerson>{guests} <br /> Persone
                    </div>
                </div>

                <BookingForm></BookingForm>

            </div>
        </main>
    )
}
