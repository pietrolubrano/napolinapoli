"use client"

import { useRouter } from "next/navigation"
import { Button, Form, Input } from "@heroui/react"
import { FormEvent, useState } from "react"

export default function ReservationForm({
    reservationId
} : {
    reservationId: string
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
                errorMessage="Inserisci un ID prenotazione"
                label="ID prenotazione"
                labelPlacement="outside"
                name="reservationId"
                placeholder="Inserisci l'ID della prenotazione"
                type="text"
                value={reservationIdValue}
                onValueChange={setReservationIdValue}
            />
            <Input
                isRequired
                errorMessage="Inserisci un indirizzo email valido"
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Inserisci la tua email"
                type="email"
                value={email}
                onValueChange={setEmail}
            />
            <Button color="primary" className="w-full" type="submit">
                Invia
            </Button>
        </Form>
    )
}
