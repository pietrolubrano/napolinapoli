import Link from "next/link";
import type { Locale } from "@/i18n-config";
import { touristPageCopy } from "@/data/touristInfo";

export default function TouristInfoTeaser({ lang }: { lang: Locale }) {
  const copy = touristPageCopy;

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-2xl p-8 bg-white text-black">
        <h2 className="font-birthstone text-4xl font-bold text-background mb-3">
          {copy.homeTeaserTitle[lang]}
        </h2>
        <p className="md:ms-1 text-gray-700 mb-6">{copy.homeTeaserBody[lang]}</p>
        <Link
          href={`/${lang}/napoli`}
          className="inline-block bg-background text-white font-bold uppercase px-6 py-3 rounded-lg hover:opacity-90"
        >
          {copy.homeTeaserCta[lang]}
        </Link>
      </div>
    </div>
  );
}
