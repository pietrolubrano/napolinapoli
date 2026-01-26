"use client"

import { FormEvent, useState } from "react";
import {Form, Input, Checkbox, Button, Divider} from "@heroui/react";
import PaypalForm from "./PaypalForm";
import { error } from "console";

export type FormData = {
    email: string,
    firstName: string,
    lastName: string,
    terms: "true" | "false"
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
} : {
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
}) {
  const [submitted, setSubmitted] = useState<FormData | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log('SUBMIT')
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as FormData;

    // Custom validation checks
    const newErrors: Errors = {};

    console.log(data)
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

    // Clear errors and submit
    setErrors({});
    setSubmitted(data);
  };

  const submittedClassNames = "bg-white border-0 shadow-none hover:bg-white! focus:bg-white! active:bg-white!";

  console.log('Submitted data:', submitted);

    return (<>
      <Form
        className="w-full justify-center items-center space-y-4"
        validationErrors={errors}
        onReset={() => setSubmitted(null)}
        onSubmit={onSubmit}
      >
        <div>
          <h2 className="text-xl font-bold">Compila il modulo coi tuoi dati</h2>
        </div>

        <div className="flex flex-col gap-4 max-w-md w-full sm:w-fit md:border-4 md:p-4 border-gray-300">
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

          <Checkbox
            isRequired
            classNames={{
              base: 'accent-pink-500!',
              label: "text-small",
            }}
            color="primary"
            isInvalid={!!errors.terms}
            name="terms"
            validationBehavior="aria"
            value="true"
            onValueChange={() => setErrors((prev) => ({...prev, terms: undefined}))}
            isDisabled={submitted !== null}
          >
            Accetto termini e condizioni di vendita
          </Checkbox>

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
          
          <Divider className="my-4 shadow- "></Divider>

          <PaypalForm
            arrivalDate={arrivalDate}
            departureDate={departureDate}
            guests={guests}
            price={price}
            apartmentId={apartmentId}
            validatedData={submitted !== null}
          />

        </div>

        
      </Form>

      
  </>);

}
