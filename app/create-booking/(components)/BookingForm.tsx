"use client"

interface Props {
    arrivalDate: string
    departureDate: string
    guests: string
    price: {
        price: number
        currency: string
        priceElements: {
            type: 'basePrice' | 'longStayDiscount' | 'CleaningFee'
            amount: number
        }[]
    },
    apartmentId: number
}

import TermsAndConditionModal from "@/app/(components)/TermsAndConditionModal"
import { FormEvent, useState } from "react";
import {Form, Input, TimeInput, Checkbox, Button, Divider, useDisclosure} from "@heroui/react";
import PaypalForm from "./PaypalForm";
import {Time} from "@internationalized/date";

export type FormData = {
    email: string,
    firstName: string,
    lastName: string,
    terms: "true" | "false"
    arrivalTime: string
}

type Errors = {
    email?: string,
    firstName?: string,
    lastName?: string,
    terms?: string
}

export default function App({
    arrivalDate,
    departureDate,
    guests,
    price,
    apartmentId
} : Props) {

  const [submitted, setSubmitted] = useState<FormData | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as FormData;

    // Custom validation checks
    const newErrors: Errors = {};

    // Username validation
    if (data.firstName.length < 3) {
        console.log('errore nome')
      newErrors.firstName = "Inserisci un nome valido (minimo 3 caratteri)";
    }

    // Username validation
    if (data.lastName === "admin") {
      newErrors.lastName = "Nice try! Choose a different username";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    if (data.terms !== "true") {
      setErrors({terms: "Per favore accetta termini e condizioni"});

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
        className="w-full  justify-center items-center space-y-4"
        validationErrors={errors}
        onReset={() => setSubmitted(null)}
        onSubmit={onSubmit}
      >
        <div>
          <h2 className="text-xl font-bold pt-4">Compila il modulo coi tuoi dati</h2>
        </div>

        <div className="flex flex-col bg-white gap-4 max-w-md w-full sm:w-fit border-4 p-4 border-gray-300">
          <Input
            isRequired
            errorMessage={({validationDetails}) => {
              if (validationDetails.valueMissing) {
                return "inserisci il tuo nome";
              }

              return errors.firstName;
            }}
            label="Nome"
            labelPlacement="outside"
            name="firstName"
            placeholder="Nome"
            disabled={submitted !== null}
            classNames={{
              inputWrapper: submitted !== null && submittedClassNames,
             }}
          />
          <Input
            isRequired
            errorMessage={({validationDetails}) => {
              if (validationDetails.valueMissing) {
                return "inserisci il tuo cognome";
              }

              return errors.lastName;
            }}
            label="Cognome"
            labelPlacement="outside"
            name="lastName"
            placeholder="Cognome"
            disabled={submitted !== null}
            classNames={{
              inputWrapper: submitted !== null && submittedClassNames,
             }}
          />

          <Input
            isRequired
            errorMessage={({validationDetails}) => {
              if (validationDetails.valueMissing) {
                return "Per favore inserisci la tua email";
              }
              if (validationDetails.typeMismatch) {
                return "Inserisci un indirizzo email valido";
              }
            }}
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Inserisci la tua email"
            type="email"
            disabled={submitted !== null}
            classNames={{
              inputWrapper: submitted !== null && submittedClassNames,
            }}
          />

          <div className="grid grid-cols-2">
            <TimeInput
              label="Orario di arrivo"
              labelPlacement="outside"
              name="arrivalTime"
              defaultValue={new Time(14, 0)}
              isRequired
              isDisabled={submitted !== null}
            />
          </div>

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
            >
              
            </Checkbox>
            <span className="text-black">
              Accetto <Button variant="light" onPress={onOpen} className="underline text-background p-0 hover:bg-white!"> termini e condizioni</Button>
            </span>
          </div>
          
          <TermsAndConditionModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}></TermsAndConditionModal>
          {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}

          <div className="flex gap-4">
            {
              submitted === null &&
              <Button className="w-full" color="primary" type="submit" disabled={submitted !== null}>
                Continua al pagamento
              </Button>
            }
            {
              submitted !== null &&
              <Button className="w-full" type="button" onPress={() => setSubmitted(null)} variant="ghost">
                Modifica i dati
              </Button>
            }
            
          </div>
          
          <Divider className="my-4"></Divider>

            <div className="text-black space-y-1">
              <p>
                Importo totale*: {price.price}{price.currency}
              </p>
              <p>
                Acconto da pagare ora: 50€
              </p>
              <p className="text-xs text-gray-500">
                * Tassa di soggiorno di 4,50 € per persona al giorno da pagare in struttura non compresa nel prezzo
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
          />

        </div>

      </Form>

  </>);

}
