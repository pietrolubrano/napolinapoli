"use client"

import { Button, Form, Input, Textarea } from "@heroui/react"
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
            className="w-full p-4 flex flex-col gap-4"
            action={formAction}
            validationErrors={errors}
            >
            <input type="text" name="reservationId" defaultValue={reservationId} className="sr-only" />
            <Input
                isRequired
                errorMessage={lang === "it" ? "Inserisci l'oggetto del messaggio" : "Enter the subject of the message"}
                label={lang === "it" ? "Oggetto" : "Subject"}
                labelPlacement="outside"
                name="subject"
                placeholder={lang === "it" ? "Inserisci l'oggetto del messaggio" : "Enter the subject of the message"}
                type="text"
            />
            <Textarea
                
                errorMessage={lang === "it" ? "Inserisci il tuo messaggio" : "Enter your message"}
                label={lang === "it" ? "Messaggio" : "Message"}
                labelPlacement="outside"
                name="messageBody"
                placeholder={lang === "it" ? "Inserisci il tuo messaggio" : "Enter your message"}
            />
            <Button color="primary" className="w-full" type="submit">
                {lang === "it" ? "Invia" : "Submit"}
            </Button>
        </Form>
    )
}
