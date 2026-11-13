import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/i18n-config";
import { touristPageCopy } from "@/data/touristInfo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title:
      lang === "it"
        ? "Napoli per te — Info utili | Napoli Napoli Rooms"
        : "Naples for you — Useful info | Napoli Napoli Rooms",
    description: touristPageCopy.subtitle[lang],
  };
}

export default async function NapoliPage({
  params,
}: PageProps<"/[lang]/napoli">) {
  const { lang } = await params;
  const locale = lang as Locale;
  const copy = touristPageCopy;

  return (
    <main className="bg-black/70">
      <div className="bg-background">
        <div className="container mx-auto max-w-2xl px-8 pt-10 pb-4 text-white">
          <h1 className="font-birthstone text-5xl font-bold mb-2">{copy.title[locale]}</h1>
          <p className="text-lg opacity-95">{copy.subtitle[locale]}</p>
        </div>
      </div>

      <div className="bg-background">
        <div className="container mx-auto max-w-2xl p-8 bg-white text-black">

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link
              href={`/${locale}/search`}
              className="inline-block bg-background text-white font-bold uppercase px-6 py-3 rounded-lg hover:opacity-90"
            >
              {copy.ctaBook[locale]}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
