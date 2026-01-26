"use client"

import { useRouter } from "next/navigation"
import { Button, Form, Input } from "@heroui/react"
import Link from "next/link"
import { useState } from "react"

export default function ReservationForm() {
    const [email, setEmail] = useState('')
    const [reservationId, setReservationId] = useState('')

    const router = useRouter()

    const onSubmit = () => {
        router.push(`/reservation?reservationId=${reservationId}&email=${email}`)
    };

    return (
        <Form
            className="w-full p-4 max-w-xs flex flex-col gap-4 bg-white"
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
            />
            <Input
                isRequired
                errorMessage="Inserisci un indirizzo email valido"
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Inserisci la tua email"
                type="email"
            />
            <Link

                href={{ 
                    pathname: 'reservation',
                    query: {
                        reservationId,
                        email
                    }
                    }}
                    className="w-full"
            >
                <Button color="primary" className="w-full" type="submit">
                    Invia
                </Button>
            </Link>
        </Form>
    )
}
