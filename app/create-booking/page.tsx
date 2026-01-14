import BookingForm from "./(components)/BookingForm"
import BookingHeader from "./(components)/BookingHeader"

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

                <BookingHeader
                    arrivalDate={arrivalDate as string}
                    departureDate={departureDate as string}
                    guests={guests as string}
                />

                <BookingForm></BookingForm>

            </div>
        </main>
    )
}
