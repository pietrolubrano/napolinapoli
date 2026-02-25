import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Listbox,
  ListboxItem
} from "@heroui/react";
import { Locale } from "@/i18n-config";

export default function TermsAndConditionModal({
    isOpen,
    onOpen,
    onOpenChange,
    lang
} : {
    isOpen: boolean
    onOpen: () => void
    onOpenChange: () => void
    lang: Locale
}) {

    const termsAndConditions = [
        {
            title: {
                it: "Caparra confirmatoria",
                en: "Confirmatory deposit"
            },
            description: {
                it: 'All’atto della conclusione del contratto, il Cliente è tenuto a versare la somma di €50,00 a titolo di caparra confirmatoria.',
                en: 'At the time of the conclusion of the contract, the Client is required to pay the sum of €50.00 as a confirmatory deposit.'
            }
        },
        {
            title: {
                it: "Inadempimento del Cliente",
                en: "Client's non-compliance"
            },
            description: {
                it: 'In caso di recesso dal contratto da parte del Cliente oltre il termine di cui al capo “2”, o in caso di mancato arrivo senza preavviso entro le ore 24 del giorno stabilito per il check-in, Napoli Napoli Rooms tratterrà l’importo versato a titolo di caparra confirmatoria, fatto salvo il maggior danno, la cui dimostrazione è in capo al Gestore.',
                en: 'In case of withdrawal from the contract by the Client beyond the term set out in section "2", or in case of failure to arrive without prior notice within 24 hours of the established check-in day, Napoli Napoli Rooms will retain the amount paid as a confirmatory deposit, except for any additional damage, whose demonstration is the responsibility of the Manager.'
            }
        },
        {
            title: {
                it: "Inadempimento della struttura ospitante",
                en: "Host's non-compliance"
            },
            description: {
                it: 'Nel caso di impossibilità di Napoli Napoli Rooms a fornire i servizi di alloggio confermati, il Gestore deve restituire la caparra ricevuta, fatto salvo il maggior danno, qualora il Cliente non accetti di essere ricollocato presso una struttura ricettiva limitrofa di uguale o superiore categoria. In caso di ricollocamento, le spese per il trasferimento ad altra struttura e l’eventuale differenza di prezzo della stessa sono a carico del Gestore dell’alloggio che non è stato in grado di fornire i servizi confermati.',
                en: 'In case of inability of Napoli Napoli Rooms to provide confirmed accommodation services, the Manager must refund the received deposit, except for any additional damage, if the Client does not agree to be relocated to a nearby accommodation facility of equal or higher category. In case of relocation, expenses for transfer to another facility and any price difference are borne by the Manager who was unable to provide the confirmed services.'
            }
        },
        {
            title: {
                it: "Ora di arrivo e di partenza",
                en: "Arrival and departure time"
            },
            description: {
                it: 'La camera viene messa a disposizione del Cliente dalle ore 14.00 del giorno di arrivo, e deve essere lasciata libera dal Cliente non più tardi delle ore 10.00 del giorno di partenza.',
                en: 'The room is made available to the Client from 14:00 on the arrival day, and must be left free by the Client no later than 10:00 on the departure day.'
            }
        },
        {
            title: {
                it: "Rispetto dei servizi secondo la classificazione",
                en: "Respect for services according to classification"
            },
            description: {
                it: 'Il Gestore garantisce servizi adeguati alla classificazione di categoria.',
                en: 'The Manager guarantees services appropriate to the category classification.'
            }
        },
        {
            title: {
                it: "Saldo e partenza anticipata del Cliente",
                en: "Balance and early departure of the Client"
            },
            description: {
                it: 'All’arrivo, il Cliente sarà tenuto al pagamento del saldo per l’intero periodo pattuito. Nell’ipotesi di partenza anticipata, il Cliente è tenuto alla comunicazione di preavviso al Gestore entro 24H dalla partenza effettiva ad ogni modo il Gestore tratterrà l’intero importo del soggiorno.',
                en: 'Upon arrival, the Client is required to pay the balance for the entire agreed period. In case of early departure, the Client is required to notify the Manager within 24 hours of actual departure; in any case, the Manager will retain the full amount of the stay.'
            }
        },
        {
            title: {
                it: "Scarico di responsabilità",
                en: "Waiver of liability"
            },
            description: {
                it: 'Ai sensi dell’art. 1587 c.c. l’Ospite deve prendere in consegna la cosa e osservare la diligenza del buon padre di famiglia nel servirsene per l’uso determinato nel contratto. Il Cliente esonera, altresì, il Gestore da ogni responsabilità verso terzi, per omissioni e/o danni arrecati per effetto di comportamenti illeciti tenuti dal Cliente.',
                en: 'In accordance with article 1587 of the Civil Code, the Guest must take possession of the item and observe the diligence of a good father of the family in using it for the purpose determined in the contract. The Client will also release the Manager from any liability towards third parties for omissions and/or damages caused by illegal behavior by the Client.'
            }
        },
        {
            title: {it: "Clausola di composizione delle controversie", en: "Clause for dispute resolution"},
            description: {
                it: 'Tutte le controversie nascenti dal presente contratto verranno deferite alla Camera di Commercio di Napoli e risolte secondo il Regolamento di conciliazione dalla stessa adottato. Qualora le Parti intendano adire l’Autorità giudiziaria ordinaria, il Foro competente è quello di Napoli. Per quanto non espressamente pattuito, il presente contratto è regolamentato dalle disposizioni del Codice civile sui contratti in generale.Ai sensi del Codice sulla privacy, la informiamo che il trattamento dei suoi dati personali sarà effettuato anche con mezzi informatici al solo fine di dare esecuzione al presente contratto. Il cliente, ai sensi degli artt. 1341 e 1342 c.c. nonché degli artt. 33 e ss. del d.lgs. 206/2005 (Codice del consumo), dichiara di accettare le condizioni contrattuali sopra riportate e particolarmente quelle contenute al punto n. 2 (Diritto di recesso senza penale), 3 (Inadempimento del Cliente), n. 5 (Ora di arrivo e di partenza) e n. 7 (Partenza anticipata del Cliente).',
                en: "All disputes arising from this contract will be referred to the Chamber of Commerce of Naples and resolved according to the conciliation regulations adopted by it. If the Parties intend to go to ordinary judicial authority, the competent Court is that of Naples. For anything not expressly agreed, this contract is governed by the provisions of the Civil Code on contracts in general. Pursuant to the Privacy Code, we inform you that the processing of your personal data will also be carried out with IT tools for the sole purpose of executing this contract. The client, pursuant to articles 1341 and 1342 of the Civil Code as well as articles 33 and following of Legislative Decree 206/2005 (Consumer Code), declares that he accepts the contractual conditions set out above and particularly those contained in point n. 2 (Right of withdrawal without penalty), 3 (Client's non-compliance), n. 5 (Arrival and departure time) and n. 7 (Early departure of the Client)."
            }
        }
    ]

    return (
        <Modal isOpen={isOpen} scrollBehavior={'inside'} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1 text-background">{lang === 'it' ? 'Termini e condizioni' : 'Terms and conditions'}</ModalHeader>
                <ModalBody className="text-black">
                    <ul className="space-y-4">
                        {
                            termsAndConditions.map(item => <li key={item.title[lang]} className="overflow-visible! ">
                                <h5 className="font-bold text-gray-600">{item.title[lang]}</h5>
                                <p className="ms-1 text-sm">
                                    {item.description[lang]}
                                </p>
                            </li>)
                        }
                    </ul>

                </ModalBody>
                <ModalFooter>
                    {/* <Button color="danger" variant="light" onPress={onClose}>
                    Chiudi
                    </Button> */}
                    <Button color="primary" onPress={onClose}>
                    Chiudi
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    );
}

