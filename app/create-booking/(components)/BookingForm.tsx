"use client"

import { FormEvent, useState } from "react";
import {Form, Input, Checkbox, Button} from "@heroui/react";

type FormData = {
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

export default function App() {
  const [submitted, setSubmitted] = useState<FormData | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as FormData;

    // Custom validation checks
    const newErrors: Errors = {};

    console.log(data)
    // Username validation
    if (data.firstName.length < 3) {
        console.log('errore nome')
      newErrors.firstName = "Nice try! Choose a different username";
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

  return (
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
        />

        <Input
          isRequired
          errorMessage={({validationDetails}) => {
            if (validationDetails.valueMissing) {
              return "inserisci il tuo nome";
            }

            return errors.lastName;
          }}
          label="Cognome"
          labelPlacement="outside"
          name="lastName"
          placeholder="Cognome"
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
        >
          Accetto termini e condizioni di vendita
        </Checkbox>

        {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}

        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit">
            Invia
          </Button>
          {/* <Button type="reset" variant="bordered">
            Reset
          </Button> */}
        </div>
      </div>

      {submitted && (
        <div className="text-small text-default-500 mt-4">
          Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
}

