import { Locale } from "@/i18n-config";
import { Button } from "@heroui/button";
import Link from "next/link";

export default function ReservationNotFount({
    lang
} : {
    lang: Locale
}) {
  return (
        <main className=" flex justify-center items-center w-full">
            <div className="text-gray-600 p-4 bg-white text-center">
                <p className="mb-4">
                    {lang === "it" ? "Prenotazione non trovata" : "Reservation not found"}
                </p>
                <Button as={Link} href={`/${lang}/reservation`} className="bg-background text-white">
                    {lang === "it" ? "Riprova" : "Try again"}
                </Button>
            </div>
        </main>
  )
}
