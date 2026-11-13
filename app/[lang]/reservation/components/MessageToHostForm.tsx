"use client"

import { Button, Form, TextField, Label, Input, TextArea, FieldError } from "@heroui/react"
import { Locale } from "@/i18n-config"
import { sendMessageToHost } from "@/app/actions/smoobuActions"

import {useActionState} from "react";

export default function MessageToHostForm({
    reservationId,
    lang
} : {
    reservationId: string
    lang: Locale
}) {
    const [{errors}, formAction] = useActionState(sendMessageToHost, {
        errors: {},
    });

    return (
        <Form
            className="w-full p-4 flex flex-col gap-4 max-w-md bg-white"
            action={formAction}
            validationErrors={errors}
            >
            <h3 className="font-bold text-lg text-gray-500">{lang === "it" ? "Nuovo messaggio" : "New message"}</h3>
            <input type="text" name="reservationId" defaultValue={reservationId} className="sr-only" />
            <TextField isRequired name="subject">
                <Label>{lang === "it" ? "Oggetto" : "Subject"}</Label>
                <Input placeholder={lang === "it" ? "Inserisci l'oggetto del messaggio" : "Enter the subject of the message"} />
                <FieldError>
                    {lang === "it" ? "Inserisci l'oggetto del messaggio" : "Enter the subject of the message"}
                </FieldError>
            </TextField>
            <TextField isRequired name="messageBody">
                <Label>{lang === "it" ? "Messaggio" : "Message"}</Label>
                <TextArea placeholder={lang === "it" ? "Inserisci il tuo messaggio" : "Enter your message"} />
                <FieldError>
                    {lang === "it" ? "Inserisci il tuo messaggio" : "Enter your message"}
                </FieldError>
            </TextField>
            <Button variant="primary" className="w-full" type="submit" fullWidth>
                {lang === "it" ? "Invia" : "Submit"}
            </Button>
        </Form>
    )
}
