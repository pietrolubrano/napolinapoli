"use client"

import { Button, Form, TextField, Label, Input, FieldError } from "@heroui/react"
import { FormEvent, useState } from "react"
import { Locale } from "@/i18n-config"
import { setReservationCookie } from "@/app/actions/cookieActions";

export default function ReservationForm({
    reservationId,
    lang
} : {
    reservationId: string
    lang: Locale
}) {
    const [email, setEmail] = useState('')
    const [reservationIdValue, setReservationIdValue] = useState(reservationId)

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await setReservationCookie(reservationIdValue, email)
    };

    return (
        <Form
            className="w-full p-4 max-w-xs flex flex-col gap-4 bg-white "
            onSubmit={onSubmit}
            >
            <TextField
                isRequired
                name="reservationId"
                type="tel"
                value={reservationIdValue}
                onChange={setReservationIdValue}
            >
                <Label>{lang === "it" ? "ID prenotazione" : "Reservation ID"}</Label>
                <Input placeholder={lang === "it" ? "Inserisci l'ID della prenotazione" : "Enter the reservation ID"} />
                <FieldError>
                    {lang === "it" ? "Inserisci un ID prenotazione" : "Enter a reservation ID"}
                </FieldError>
            </TextField>
            <TextField
                isRequired
                name="email"
                type="email"
                value={email}
                onChange={setEmail}
            >
                <Label>Email</Label>
                <Input placeholder={lang === "it" ? "Inserisci la tua email" : "Enter your email"} />
                <FieldError>
                    {lang === "it" ? "Inserisci un indirizzo email valido" : "Enter a valid email address"}
                </FieldError>
            </TextField>
            <Button variant="primary" className="w-full" type="submit" fullWidth>
                {lang === "it" ? "Invia" : "Submit"}
            </Button>
        </Form>
    )
}
