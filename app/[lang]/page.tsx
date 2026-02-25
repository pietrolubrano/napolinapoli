import SearchForm from "./search/components/SearchForm";
import { rooms } from "@/data/roomsData";
import Image from "next/image";
import Link from "next/link";
import GoogleMapsIFrame from "./components/GoogleMapsIFrame";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function Home(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang);

  return (
    <main className="bg-black/70">

      <div className="h-[calc(100svh-70px)]">
        <div className="relative h-full p-8 pb-20 text-white">
          <h1 className="hidden">Napoli Napoli Rooms - b&b guesthouse Napoli</h1>
          <Image src="https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/sfondi/spaccanapoli-1068x712.jpg" alt="Napoli" width={1068} height={712} className="absolute inset-0 w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-8 text-center pb-52">
            <h3 className="text-3xl sm:text-5xl font-birthstone p-2 uppercase font-bold text-white font-birthstone!  ">
              {
                lang === "it" ? <>Prenota qui<br/> al miglior prezzo possibile</> : <>Book here<br/> at the best possible price</>
              }
            </h3>
            <SearchForm lang={lang}></SearchForm>
          </div>

        </div>
      </div>
      
      {/* <Divider className="my-4" /> */}

      <div className="p-8 upper pb-8 bg-background">
        <div className="container mx-auto space-y-4 max-w-2xl  text-black p-8 bg-white ">
          {
            lang === "it" ? <>
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
            </>
            : <>
              <h3 className="text-2xl italic mb-4">Wake up in <strong>Spaccanapoli</strong>, in a comfortable mix of ancient and modern.</h3>
              <p className='md:ms-3'>
                Located at the corner between <strong>vicolo dei Maiorani</strong> and the city's minor decumanus <strong>via San Biagio dei Librai</strong>, popularly called <strong>Spaccanapoli</strong>, where walking means crossing centuries.
              </p>
              <p className='md:ms-3'>
                Between churches, noble palaces, Greek temples, traditional shops and ancient voices, the minor decumanus crosses two of the most beautiful squares in Naples, <strong>piazza del Gesù Nuovo</strong> and <strong>piazza San Domenico Maggiore</strong> and intersects with the famous <strong>San Gregorio Armeno</strong>, where the traditional <strong>mercato dei pastori</strong> takes place, a few steps from <strong>Cappella San Severo</strong>, <strong>Napoli Sotterranea</strong> and the main tourist sites of the city.
              </p>
              <p className='md:ms-3'>
                Smaller and less known is <strong>vico dei Maiorani</strong> where time seems to have stopped, walking through it you can be enchanted by observing the apse of the <strong>Basilica di San Lorenzo</strong> where in the underground hides the ancient <strong>mercato greco di Neapolis</strong>, it is said that there <strong>Boccaccio</strong> met <strong>Fiammetta</strong>.
              </p>
            </>
          }
          
        </div>
      </div>

      <div className="p-8 font-birthstone text-3xl bg-background font-bold upper mb-8">
        <h3>{lang === 'it' ? 'Le nostre stanze' : 'Our rooms'}</h3>
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
                  <p className="w-full text-gray-600 mb-4">{room.description[lang]}</p>
                </div>
                <Link href={`/room/${room.slug}`} className="text-background font-bold underline text-center">
                  {lang === 'it' ? 'Scopri di più' : 'Show more'}
                </Link>
              </div>
              
            </div>
          ))
        }

      </div>
      
      <div className="bg-background">
        <div className="p-8 font-birthstone bg-background text-3xl font-bold upper">
          <h3>
            {lang === 'it' ?
              'Nel cuore del centro storico di Napoli'
              :
              'In the heart of historic Naples'
            }
          </h3>
        </div>
        <GoogleMapsIFrame></GoogleMapsIFrame>
      </div>

    </main>
  );
}
