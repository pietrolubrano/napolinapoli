"use client"

import { clearReservationCookie } from "@/app/actions/cookieActions";
import { Locale } from "@/i18n-config";
import { Button } from "@heroui/button";

export default function ReservationNotFount({
    lang,
    message
} : {
    lang: Locale,
    message: {
        'it': string,
        'en': string
    }
}) {
    return (
        <main className=" flex justify-center items-center w-full">
            <div className="text-gray-600 p-4 bg-white text-center">
                <p className="mb-4">
                    {lang === "it" ? message.it : message.en}
                </p>
                <Button onPress={() => clearReservationCookie()} className="bg-background text-white">
                    {lang === "it" ? "Riprova" : "Try again"}
                </Button>
            </div>
        </main>
    )
}
