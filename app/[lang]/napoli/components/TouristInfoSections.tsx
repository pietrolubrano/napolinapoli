import Link from "next/link";
import type { Locale } from "@/i18n-config";
import {
  arrivalTips,
  dayTrips,
  nearbyPlaces,
  practicalTips,
  touristPageCopy,
} from "@/data/touristInfo";

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function TouristInfoSections({ lang }: { lang: Locale }) {
  const copy = touristPageCopy;

  return (
    <div className="space-y-12">
      <section aria-labelledby="nearby-heading">
        <h2 id="nearby-heading" className="text-2xl font-bold text-background mb-1">
          {copy.nearbyTitle[lang]}
        </h2>
        <p className="text-gray-600 mb-6">{copy.nearbyLead[lang]}</p>
        <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
          {nearbyPlaces.map((place) => (
            <li key={place.mapsQuery} className="py-4 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
              <div className="sm:w-48 shrink-0">
                <p className="font-semibold text-black">{place.name[lang]}</p>
                <p className="text-sm text-background font-medium">
                  ~{place.walkMinutes} {copy.walkLabel[lang]}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-gray-700">{place.blurb[lang]}</p>
                <Link
                  href={mapsUrl(place.mapsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 text-sm underline text-background hover:opacity-80"
                >
                  {copy.mapsLabel[lang]}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="arrival-heading">
        <h2 id="arrival-heading" className="text-2xl font-bold text-background mb-4">
          {copy.arrivalTitle[lang]}
        </h2>
        <ul className="space-y-5">
          {arrivalTips.map((tip) => (
            <li key={tip.title.en}>
              <h3 className="font-semibold text-black mb-1">{tip.title[lang]}</h3>
              <p className="text-gray-700 md:ms-1">{tip.body[lang]}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tips-heading">
        <h2 id="tips-heading" className="text-2xl font-bold text-background mb-4">
          {copy.tipsTitle[lang]}
        </h2>
        <ul className="space-y-5">
          {practicalTips.map((tip) => (
            <li key={tip.title.en}>
              <h3 className="font-semibold text-black mb-1">{tip.title[lang]}</h3>
              <p className="text-gray-700 md:ms-1">{tip.body[lang]}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="daytrips-heading">
        <h2 id="daytrips-heading" className="text-2xl font-bold text-background mb-1">
          {copy.dayTripsTitle[lang]}
        </h2>
        <p className="text-gray-600 mb-4">{copy.dayTripsLead[lang]}</p>
        <ul className="space-y-5">
          {dayTrips.map((trip) => (
            <li key={trip.name.en}>
              <h3 className="font-semibold text-black mb-1">{trip.name[lang]}</h3>
              <p className="text-gray-700 md:ms-1">{trip.body[lang]}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
