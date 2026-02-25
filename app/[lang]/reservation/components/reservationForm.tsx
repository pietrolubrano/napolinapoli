"use client"

import { useRouter } from "next/navigation"
import { Button, Form, Input } from "@heroui/react"
import { FormEvent, useState } from "react"
import { Locale } from "@/i18n-config"

export default function ReservationForm({
    reservationId,
    lang
} : {
    reservationId: string
    lang: Locale
}) {
    const [email, setEmail] = useState('')
    const [reservationIdValue, setReservationIdValue] = useState(reservationId)

    const router = useRouter()

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        router.push(`/reservation?reservationId=${encodeURIComponent(reservationIdValue)}&email=${encodeURIComponent(email)}`)
    };

    return (
        <Form
            className="w-full p-4 max-w-xs flex flex-col gap-4 bg-white "
            onSubmit={onSubmit}
            >
            <Input
                isRequired
                errorMessage={lang === "it" ? "Inserisci un ID prenotazione" : "Enter a reservation ID"}
                label={lang === "it" ? "ID prenotazione" : "Reservation ID"}
                labelPlacement="outside"
                name="reservationId"
                placeholder={lang === "it" ? "Inserisci l'ID della prenotazione" : "Enter the reservation ID"}
                type="tel"
                value={reservationIdValue}
                onValueChange={setReservationIdValue}
            />
            <Input
                isRequired
                errorMessage={lang === "it" ? "Inserisci un indirizzo email valido" : "Enter a valid email address"}
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder={lang === "it" ? "Inserisci la tua email" : "Enter your email"}
                type="email"
                value={email}
                onValueChange={setEmail}
            />
            <Button color="primary" className="w-full" type="submit">
                {lang === "it" ? "Invia" : "Submit"}
            </Button>
        </Form>
    )
}
