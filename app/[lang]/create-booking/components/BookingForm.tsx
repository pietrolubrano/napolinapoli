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
import {Form, Input, TimeInput, Checkbox, Button, Divider, useDisclosure, Textarea} from "@heroui/react";
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as FormData;

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

    data.arrivalTime = data.arrivalTime.substring(0,5)
    // Clear errors and submit
    setErrors({});
    setSubmitted(data);
  };

  const submittedClassNames = "bg-white border-0 shadow-none hover:bg-white! focus:bg-white! active:bg-white!";

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
          <Input
            isRequired
            errorMessage={({validationDetails}) => {
              if (validationDetails.valueMissing) {
                return lang === "it" ? "inserisci il tuo nome" : "enter your name";
              }

              return errors.firstName;
            }}
            label={lang === "it" ? "Nome" : "First Name"}
            labelPlacement="outside"
            name="firstName"
            placeholder={lang === "it" ? "Nome" : "First Name"}
            disabled={submitted !== null}
            classNames={{
              inputWrapper: submitted !== null && submittedClassNames,
             }}
          />
          <Input
            isRequired
            errorMessage={({validationDetails}) => {
              if (validationDetails.valueMissing) {
                return lang === "it" ? "inserisci il tuo cognome" : "enter your last name";
              }
              return errors.lastName;
            }}
            label={lang === "it" ? "Cognome" : "Last Name"}
            labelPlacement="outside"
            name="lastName"
            placeholder={lang === "it" ? "Cognome" : "Last Name"}
            disabled={submitted !== null}
            classNames={{
              inputWrapper: submitted !== null && submittedClassNames,
             }}
          />

          <Input
            isRequired
            errorMessage={({validationDetails}) => {
              if (validationDetails.valueMissing) {
                return lang === "it" ? "Per favore inserisci la tua email" : "Please enter your email";
              }
              if (validationDetails.typeMismatch) {
                return lang === "it" ? "Inserisci un indirizzo email valido" : "Please enter a valid email address";
              }
            }}
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder={lang === "it" ? "Inserisci la tua email" : "Enter your email"}
            type="email"
            disabled={submitted !== null}
            classNames={{
              inputWrapper: submitted !== null && submittedClassNames,
            }}
          />

          <Input
            label={lang === "it" ? "Telefono" : "Phone"}
            labelPlacement="outside"
            name="phone"
            placeholder={lang === "it" ? "Inserisci il tuo numero di telefono" : "Enter your phone number"}
            type="tel"
            disabled={submitted !== null}
            classNames={{
              inputWrapper: submitted !== null && submittedClassNames,
            }}
          />

          <div className="grid grid-cols-2">
            <TimeInput
              label={lang === "it" ? "Orario di arrivo" : "Arrival Time"}
              labelPlacement="outside"
              name="arrivalTime"
              defaultValue={new Time(14, 0)}
              isRequired
              isDisabled={submitted !== null}
              classNames={{
                inputWrapper: submitted !== null && submittedClassNames,
              }}
            />
          </div>

          <Textarea
            isDisabled={submitted !== null}
            name="notice"
            label={lang === "it" ? "Note" : "Notes"}
            labelPlacement="outside"
            classNames={{
                inputWrapper: submitted !== null && submittedClassNames,
              }}
            placeholder="Inserisci qui eventuali richieste particolari o informazioni che pensi siano utili per il tuo soggiorno"
          />

          <div>
            <Checkbox
              isRequired
              color="primary"
              isInvalid={!!errors.terms}
              name="terms"
              validationBehavior="aria"
              value="true"
              onValueChange={() => setErrors((prev) => ({...prev, terms: undefined}))}
              isDisabled={submitted !== null}
            />
            <span className="text-black">
              {lang === "it" ? "Accetto " : "I accept "} <Button variant="light" onPress={onOpen} className="underline text-background p-0 hover:bg-white!"> {lang === "it" ? "termini e condizioni" : "terms and conditions"}</Button>
            </span>
          </div>
          
          <TermsAndConditionModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}></TermsAndConditionModal>
          {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}

          <div className="flex gap-4">
            {
              submitted === null &&
              <Button className="w-full" color="primary" type="submit" disabled={submitted !== null}>
                {lang === "it" ? "Continua al pagamento" : "Continue to payment"}
              </Button>
            }
            {
              submitted !== null &&
              <Button className="w-full" type="button" onPress={() => setSubmitted(null)} variant="ghost">
                {lang === "it" ? "Modifica i dati" : "Edit data"}
              </Button>
            }
            
          </div>
          
          <Divider className="my-4"></Divider>

            <div className="text-black space-y-1">
              <p>
                {lang === "it" ? "Importo totale*:" : "Total amount*:"} {price.price}{price.currency}
              </p>
              <p>
                {lang === "it" ? "Acconto da pagare ora: 50€" : "Down payment to be paid now: €50"}
              </p>
              <p className="text-xs text-gray-500">
                {lang === "it" ?
                  "* Tassa di soggiorno di 4,50 € per persona al giorno da pagare in struttura non compresa nel prezzo"
                  :
                  "* Tourism tax of €4.50 per person per day to be paid in the accommodation and not included in the price"
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
