import { Button } from "@heroui/button";
import Link from "next/link";

export default function ReservationNotFount() {
  return (
        <main className=" flex justify-center items-center w-full">
            <div className="text-gray-600 p-4 bg-white text-center">
                <p className="mb-4">
                    Prenotazione non trovata
                </p>
                <Button as={Link} href={'/reservation'} className="bg-background text-white">
                    Riprova
                </Button>
            </div>
        </main>
  )
}
