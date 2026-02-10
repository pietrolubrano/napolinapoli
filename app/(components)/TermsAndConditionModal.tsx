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

export default function TermsAndConditionModal({
    isOpen,
    onOpen,
    onOpenChange
} : {
    isOpen: boolean
    onOpen: () => void
    onOpenChange: () => void
}) {

    const termsAndConditions = [
        {
            title: '⁠Caparra confirmatoria.',
            description: 'All’atto della conclusione del contratto, il Cliente è tenuto a versare la somma di €50,00 a titolo di caparra confirmatoria.'
        },
        {
            title: '⁠Diritto di recesso senza penale.',
            description: 'Il Cliente ha diritto di recedere dal contratto fino al 7° giorno/giorni prima della data di arrivo prevista senza pagare alcuna penale. Il recesso deve essere comunicato al Gestore entro tale termine via e-mail (al numero e/o all’indirizzo sopra indicato).'
        },
        {
            title: '⁠Inadempimento del Cliente.',
            description: 'In caso di recesso dal contratto da parte del Cliente oltre il termine di cui al capo “2”, o in caso di mancato arrivo senza preavviso entro le ore 24 del giorno stabilito per il check-in, Napoli Napoli Rooms tratterrà l’importo versato a titolo di caparra confirmatoria, fatto salvo il maggior danno, la cui dimostrazione è in capo al Gestore.'
        },
        {
            title: 'Inadempimento della struttura ospitante.',
            description: 'Nel caso di impossibilità di Napoli Napoli Rooms a fornire i servizi di alloggio confermati, il Gestore deve restituire la caparra ricevuta, fatto salvo il maggior danno, qualora il Cliente non accetti di essere ricollocato presso una struttura ricettiva limitrofa di uguale o superiore categoria. In caso di ricollocamento, le spese per il trasferimento ad altra struttura e l’eventuale differenza di prezzo della stessa sono a carico del Gestore dell’alloggio che non è stato in grado di fornire i servizi confermati.'
        },
        {
            title: 'Ora di arrivo e di partenza.',
            description: 'La camera viene messa a disposizione del Cliente dalle ore 14.00 del giorno di arrivo, e deve essere lasciata libera dal Cliente non più tardi delle ore 10.00 del giorno di partenza.'
        },
        {
            title: '⁠Rispetto dei servizi secondo la classificazione.',
            description: 'Il Gestore garantisce servizi adeguati alla classificazione di categoria.'
        },
        {
            title: '⁠Saldo e partenza anticipata del Cliente',
            description: 'All’arrivo, il Cliente sarà tenuto al pagamento del saldo per l’intero periodo pattuito. Nell’ipotesi di partenza anticipata, il Cliente è tenuto alla comunicazione di preavviso al Gestore entro 24H dalla partenza effettiva ad ogni modo il Gestore tratterrà l’intero importo del soggiorno.'
        },
        {
            title: '⁠Scarico di responsabilità.',
            description: 'Ai sensi dell’art. 1587 c.c. l’Ospite deve prendere in consegna la cosa e osservare la diligenza del buon padre di famiglia nel servirsene per l’uso determinato nel contratto. Il Cliente esonera, altresì, il Gestore da ogni responsabilità verso terzi, per omissioni e/o danni arrecati per effetto di comportamenti illeciti tenuti dal Cliente.'
        },
        {
            title: '⁠Clausola di composizione delle controversie.',
            description: 'Tutte le controversie nascenti dal presente contratto verranno deferite alla Camera di Commercio di Napoli e risolte secondo il Regolamento di conciliazione dalla stessa adottato. Qualora le Parti intendano adire l’Autorità giudiziaria ordinaria, il Foro competente è quello di Napoli. Per quanto non espressamente pattuito, il presente contratto è regolamentato dalle disposizioni del Codice civile sui contratti in generale.Ai sensi del Codice sulla privacy, la informiamo che il trattamento dei suoi dati personali sarà effettuato anche con mezzi informatici al solo fine di dare esecuzione al presente contratto. Il cliente, ai sensi degli artt. 1341 e 1342 c.c. nonché degli artt. 33 e ss. del d.lgs. 206/2005 (Codice del consumo), dichiara di accettare le condizioni contrattuali sopra riportate e particolarmente quelle contenute al punto n. 2 (Diritto di recesso senza penale), 3 (Inadempimento del Cliente), n. 5 (Ora di arrivo e di partenza) e n. 7 (Partenza anticipata del Cliente).'
        }
    ]

    return (
        <Modal isOpen={isOpen} scrollBehavior={'inside'} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1 text-background">Termini e condizioni di acquisto</ModalHeader>
                <ModalBody className="text-black">
                    <ul className="space-y-4">
                        {
                            termsAndConditions.map(item => <li key={item.title} className="overflow-visible! ">
                                <h5 className="font-bold text-gray-600">{item.title}</h5>
                                <p className="ms-1 text-sm">
                                    {item.description}
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

