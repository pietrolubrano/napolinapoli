"use client"

interface Props {
    arrivalDate: string
    departureDate: string
    guests: string
    price: SmoobuAvailabilityResponseData["prices"][number]
    apartmentId: number
    lang: Locale
}

import TermsAndConditionModal from "@/app/[lang]/components/TermsAndConditionModal"
import { FormEvent, useState } from "react";
import {
  Form,
  TextField,
  Label,
  Input,
  TextArea,
  TimeField,
  Checkbox,
  Button,
  Separator,
  FieldError,
} from "@heroui/react";
import PaypalForm from "./PaypalForm";
import {Time} from "@internationalized/date";
import { Locale } from "@/i18n-config"

export type FormData = {
    email: string
    firstName: string
    lastName: string
    terms: "true" | "false"
    arrivalTime: string
    phone: string
    notice: string
}

type Errors = {
    email?: string,
    firstName?: string,
    lastName?: string,
    terms?: string
}

export default function BookingForm({
    arrivalDate,
    departureDate,
    guests,
    price,
    apartmentId,
    lang
} : Props) {

  const [submitted, setSubmitted] = useState<FormData | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [arrivalTime, setArrivalTime] = useState(new Time(14, 0));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as FormData;
    data.arrivalTime = arrivalTime.toString().substring(0, 5);

    // Custom validation checks
    const newErrors: Errors = {};

    // FirstName validation
    if (data.firstName.length < 3) {
        console.log('errore nome')
      newErrors.firstName = lang === "it" ? "Inserisci un nome valido (minimo 3 caratteri)" : "Enter a valid name (minimum 3 characters)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    if (data.terms !== "true") {
      setErrors({terms: lang === "it" ? "Per favore accetta termini e condizioni" : "Please accept terms and conditions"});

      return;
    }

    // Clear errors and submit
    setErrors({});
    setSubmitted(data);
  };

  const fieldDisabled = submitted !== null;

    return (<>
      <Form
        className="w-full justify-center items-center space-y-4"
        validationErrors={errors}
        onReset={() => setSubmitted(null)}
        onSubmit={onSubmit}
      >
        <div>
          <h2 className="text-xl font-bold pt-4">{lang === "it" ? "Compila il modulo coi tuoi dati" : "Fill in the form with your details"}</h2>
        </div>

        <div className="flex flex-col bg-white gap-4 max-w-md w-full sm:w-fit border-4 p-4 border-gray-300">
          <TextField
            isRequired
            name="firstName"
            isDisabled={fieldDisabled}
            isInvalid={!!errors.firstName}
          >
            <Label>{lang === "it" ? "Nome" : "First Name"}</Label>
            <Input placeholder={lang === "it" ? "Nome" : "First Name"} />
            <FieldError>
              {errors.firstName || (lang === "it" ? "inserisci il tuo nome" : "enter your name")}
            </FieldError>
          </TextField>

          <TextField
            isRequired
            name="lastName"
            isDisabled={fieldDisabled}
            isInvalid={!!errors.lastName}
          >
            <Label>{lang === "it" ? "Cognome" : "Last Name"}</Label>
            <Input placeholder={lang === "it" ? "Cognome" : "Last Name"} />
            <FieldError>
              {errors.lastName || (lang === "it" ? "inserisci il tuo cognome" : "enter your last name")}
            </FieldError>
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            isDisabled={fieldDisabled}
          >
            <Label>Email</Label>
            <Input placeholder={lang === "it" ? "Inserisci la tua email" : "Enter your email"} />
            <FieldError>
              {lang === "it" ? "Per favore inserisci una email valida" : "Please enter a valid email address"}
            </FieldError>
          </TextField>

          <TextField
            name="phone"
            type="tel"
            isDisabled={fieldDisabled}
          >
            <Label>{lang === "it" ? "Telefono" : "Phone"}</Label>
            <Input placeholder={lang === "it" ? "Inserisci il tuo numero di telefono" : "Enter your phone number"} />
          </TextField>

          <div className="grid grid-cols-2">
            <TimeField
              isRequired
              isDisabled={fieldDisabled}
              value={arrivalTime}
              onChange={(value) => value && setArrivalTime(value)}
            >
              <Label>{lang === "it" ? "Orario di arrivo" : "Arrival Time"}</Label>
              <TimeField.Group>
                <TimeField.Input>
                  {(segment) => <TimeField.Segment segment={segment} />}
                </TimeField.Input>
              </TimeField.Group>
            </TimeField>
            <input type="hidden" name="arrivalTime" value={arrivalTime.toString().substring(0, 5)} />
          </div>

          <TextField name="notice" isDisabled={fieldDisabled}>
            <Label>{lang === "it" ? "Note" : "Notes"}</Label>
            <TextArea
              placeholder={lang === "it" ? "Inserisci qui eventuali richieste particolari o informazioni che pensi siano utili per il tuo soggiorno." : "Enter any special requests or information you think would be useful for your stay."}
            />
          </TextField>

          <div className="flex flex-wrap items-center gap-1 text-black">
            <Checkbox
              isRequired
              isInvalid={!!errors.terms}
              name="terms"
              value="true"
              isDisabled={fieldDisabled}
              onChange={() => setErrors((prev) => ({...prev, terms: undefined}))}
            >
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                {lang === "it" ? "Accetto" : "I accept"}
              </Checkbox.Content>
            </Checkbox>
            <TermsAndConditionModal
              lang={lang}
              trigger={
                <Button
                  variant="ghost"
                  className="underline text-background p-0 h-auto min-w-0 hover:bg-transparent"
                >
                  {lang === "it" ? "termini e condizioni" : "terms and conditions"}
                </Button>
              }
            />
          </div>

          {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}

          <div className="flex gap-4">
            {
              submitted === null &&
              <Button className="w-full" variant="primary" type="submit" fullWidth isDisabled={fieldDisabled}>
                {lang === "it" ? "Continua al pagamento" : "Continue to payment"}
              </Button>
            }
            {
              submitted !== null &&
              <Button className="w-full" type="button" onPress={() => setSubmitted(null)} variant="ghost" fullWidth>
                {lang === "it" ? "Modifica i dati" : "Edit data"}
              </Button>
            }

          </div>

          <Separator className="my-4" />

            <div className="text-black space-y-1">
              <p>
                {lang === "it" ? "Importo totale*:" : "Total amount*:"} {price.price}{price.currency}
              </p>
              <p>
                {lang === "it" ? "Acconto da pagare ora: 50€" : "Down payment to be paid now: €50"}
              </p>
              <p className="text-xs text-gray-500">
                {lang === "it" ?
                  "* Tassa di soggiorno di 5,50 € per persona al giorno da pagare in struttura non compresa nel prezzo"
                  :
                  "* Tourism tax of €5,50 per person per day to be paid in the accommodation and not included in the price"
                }
              </p>
            </div>

          <PaypalForm
            arrivalDate={arrivalDate}
            departureDate={departureDate}
            guests={guests}
            price={price}
            apartmentId={apartmentId}
            validatedData={submitted !== null}
            formData={submitted}
            lang={lang}
          />

        </div>

      </Form>

  </>);

}
