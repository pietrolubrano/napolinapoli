import { Divider } from "@heroui/react";
import SearchForm from "./search/(components)/SearchForm";
import { rooms } from "@/data/roomsData";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-black/70">

      <div className="h-[calc(100svh-70px)]">
        <div className="relative h-full p-8 pb-20 text-white">

          <Image src="https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/sfondi/napoli-sfondo.webp" alt="Napoli" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-8 text-center pb-20">
            <h3 className="md:text-2xl p-2 uppercase font-bold text-white">
              Il tuo soggiorno a Napoli <br /> al miglior prezzo possibile
            </h3>
            <SearchForm></SearchForm>
          </div>

        </div>
      </div>
      
      {/* <Divider className="my-4" /> */}

      <div className="p-8 bg-background upper pb-8">
        <div className="container mx-auto space-y-4">
          <h3 className="text-2xl italic mb-4">Svegliarsi a <strong>Spaccanapoli</strong>, in un confortevole mix tra antico e moderno.</h3>
          <p className='md:ms-3'>
            Situato ad angolo tra <strong>vicolo dei Maiorani</strong> e il decumano minore della città <strong>via San Biagio dei Librai</strong>, popolarmente chiamato <strong>Spaccanapoli</strong>, dove passeggiare vuol dire attraversare i secoli.
          </p>
          <p className='md:ms-3'>
            Tra chiese, palazzi nobiliari, templi greci, botteghe tradizionali e voci antiche, il decumano Minore attraversa due delle più belle piazze di Napoli, <strong>piazza del Gesù Nuovo</strong> e <strong>piazza San Domenico Maggiore</strong> e si interseca con la famosissima <strong>San Gregorio Armeno</strong>, dove si svolge il tradizionale <strong>mercato dei pastori</strong>, a pochi passi da <strong>Cappella San Severo</strong>, <strong>Napoli Sotterranea</strong> e dai principali siti turistici della città.
          </p>
          <p className='md:ms-3'>
            Più piccolo e meno noto è <strong>vico dei Maiorani</strong> dove il tempo sembra essersi fermato, percorrendolo potrete incantarvi ad osservare l’abside della <strong>Basilica di San Lorenzo</strong> dove nei sotterranei si nasconde l’antico <strong>mercato greco di Neapolis</strong>, si narra che lì <strong>Boccaccio</strong> incontrò <strong>Fiammetta</strong>.
          </p>
        </div>
      </div>

      <div className="p-8 bg-background text-2xl font-bold upper mb-8">
        <h3>Le nostre stanze</h3>
      </div>

      <div className="container mx-auto space-y-8 pb-16! p-8 md:p-0 ">
        {
          rooms && Object.values(rooms).slice(0,3).map((room, index) => (
            <div key={room.name} className="grid md:grid-cols-3 border-b border-gray-300 bg-white">

              <div className={`md:col-span-2 ${index % 2 !== 0 && 'md:order-last'}`}>
                <Image width={1920} height={1080} src={room.images[0]} alt={room.name} className="w-full h-auto object-cover" />
              </div>

              <div className="p-4 md:p-8 flex flex-col justify-between w-full">
                <div className=" ">
                  <h4 className="w-full text-xl text-background font-bold mb-2">{room.name}</h4>
                  <p className="w-full text-gray-600 mb-4">{room.description}</p>
                </div>
                <Link href={`/room/${room.slug}`} className="text-background font-bold underline text-center">Scopri di più</Link>
              </div>
              
            </div>
          ))
        }

      </div>
    </main>
  );
}
