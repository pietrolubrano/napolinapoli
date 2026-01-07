import SearchForm from "./search/(components)/SearchForm";

export default function Home() {
  return (
    <main>
      <div className="bg-cover bg-center bg-transparent h-[calc(100svh-60px)]">
        <div className="flex flex-col items-center justify-center h-full p-8 pb-20 text-white bg-black/70">
          <h3 className="md:text-2xl p-6 uppercase font-bold">Il tuo soggiorno a Napoli <br /> al miglior prezzo possibile</h3>
          <SearchForm></SearchForm>
        </div>
      </div>
    </main>
  );
}
