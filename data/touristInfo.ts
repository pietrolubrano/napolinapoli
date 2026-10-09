import type { Locale } from "@/i18n-config";

export type LocalizedString = Record<Locale, string>;

export type TouristPlace = {
  name: LocalizedString;
  walkMinutes: number;
  blurb: LocalizedString;
  mapsQuery: string;
};

export type ArrivalTip = {
  title: LocalizedString;
  body: LocalizedString;
};

export type PracticalTip = {
  title: LocalizedString;
  body: LocalizedString;
};

export type DayTrip = {
  name: LocalizedString;
  body: LocalizedString;
};

export const nearbyPlaces: TouristPlace[] = [
  {
    name: { it: "Piazza San Domenico Maggiore", en: "Piazza San Domenico Maggiore" },
    walkMinutes: 3,
    blurb: {
      it: "Una delle piazze più belle del centro antico, a un passo da casa.",
      en: "One of the most beautiful squares in the old town, a stone's throw from home.",
    },
    mapsQuery: "Piazza San Domenico Maggiore, Napoli",
  },
  {
    name: { it: "San Gregorio Armeno", en: "San Gregorio Armeno" },
    walkMinutes: 4,
    blurb: {
      it: "La via dei presepi e delle botteghe artigiane: da non perdere, soprattutto in periodo natalizio.",
      en: "The street of nativity scenes and craft shops — a must, especially around Christmas.",
    },
    mapsQuery: "Via San Gregorio Armeno, Napoli",
  },
  {
    name: { it: "Cappella Sansevero", en: "Sansevero Chapel" },
    walkMinutes: 5,
    blurb: {
      it: "Il Cristo Velato e uno dei musei più visitati di Napoli. Prenota l'ingresso in anticipo.",
      en: "Home of the Veiled Christ and one of Naples' most visited museums. Book tickets ahead.",
    },
    mapsQuery: "Cappella Sansevero, Napoli",
  },
  {
    name: { it: "Napoli Sotterranea", en: "Napoli Sotterranea" },
    walkMinutes: 5,
    blurb: {
      it: "Percorso sotto la città greca e romana, partenza da Piazza San Gaetano.",
      en: "Tour beneath the Greek and Roman city, departing from Piazza San Gaetano.",
    },
    mapsQuery: "Napoli Sotterranea, Piazza San Gaetano",
  },
  {
    name: { it: "Duomo di Napoli", en: "Naples Cathedral" },
    walkMinutes: 8,
    blurb: {
      it: "La cattedrale e la cappella di San Gennaro, cuore religioso della città.",
      en: "The cathedral and the Chapel of San Gennaro — the city's religious heart.",
    },
    mapsQuery: "Duomo di Napoli",
  },
  {
    name: { it: "Gesù Nuovo e Santa Chiara", en: "Gesù Nuovo & Santa Chiara" },
    walkMinutes: 10,
    blurb: {
      it: "Facciata a punta di diamante, chiostro maiolicato e storia francescana.",
      en: "Diamond-point façade, majolica cloister, and Franciscan history.",
    },
    mapsQuery: "Piazza del Gesù Nuovo, Napoli",
  },
  {
    name: { it: "Museo Archeologico Nazionale", en: "National Archaeological Museum" },
    walkMinutes: 18,
    blurb: {
      it: "Reperti da Pompei ed Ercolano: una mezza giornata ben spesa.",
      en: "Finds from Pompeii and Herculaneum — half a day well spent.",
    },
    mapsQuery: "Museo Archeologico Nazionale di Napoli",
  },
];

export const arrivalTips: ArrivalTip[] = [
  {
    title: { it: "Aeroporto Capodichino (NAP)", en: "Capodichino Airport (NAP)" },
    body: {
      it: "Alibus fino a Piazza Garibaldi (~20–30 min), poi 20–25 min a piedi verso Spaccanapoli oppure Metro Linea 1 (Dante / Università) + breve passeggiata. In taxi il centro storico è circa 20–30 min a seconda del traffico.",
      en: "Alibus to Piazza Garibaldi (~20–30 min), then a 20–25 min walk to Spaccanapoli, or Metro Line 1 (Dante / Università) plus a short stroll. By taxi, expect about 20–30 min depending on traffic.",
    },
  },
  {
    title: { it: "Stazione Centrale / Piazza Garibaldi", en: "Central Station / Piazza Garibaldi" },
    body: {
      it: "A piedi lungo Corso Umberto I e poi nel centro antico (~20–25 min). In alternativa Metro Linea 1: scendi a Dante (~8 min a piedi) o Università (~10 min).",
      en: "Walk along Corso Umberto I into the historic centre (~20–25 min). Or take Metro Line 1 to Dante (~8 min walk) or Università (~10 min walk).",
    },
  },
  {
    title: { it: "Porto (Molo Beverello)", en: "Port (Molo Beverello)" },
    body: {
      it: "Taxi o autobus verso il centro; a piedi sono circa 25–30 minuti. Ideale se arrivi da Capri, Ischia o dalla Costiera.",
      en: "Taxi or bus toward the centre; on foot it is about 25–30 minutes. Handy if you arrive from Capri, Ischia, or the Amalfi Coast.",
    },
  },
  {
    title: { it: "In auto", en: "By car" },
    body: {
      it: "Il centro storico è in gran parte ZTL / pedonale. Lascia l'auto in un parcheggio vicino (Garibaldi, porto o garage convenzionati) e completa a piedi gli ultimi metri.",
      en: "Most of the historic centre is a limited-traffic / pedestrian zone. Park nearby (Garibaldi, the port, or a private garage) and walk the last stretch.",
    },
  },
];

export const practicalTips: PracticalTip[] = [
  {
    title: { it: "Indirizzo e accesso", en: "Address & access" },
    body: {
      it: "Vico Maiorani, 29 — all'angolo con Spaccanapoli (via San Biagio dei Librai). Le viuzze del centro antico hanno poca copertura GPS: punta su Piazza San Domenico Maggiore e chiedi pure in zona.",
      en: "Vico Maiorani, 29 — at the corner with Spaccanapoli (via San Biagio dei Librai). Old-town alleys have weak GPS: aim for Piazza San Domenico Maggiore and ask locally if needed.",
    },
  },
  {
    title: { it: "Deposito bagagli", en: "Luggage storage" },
    body: {
      it: "Deposito bagagli gratuito: comodo se arrivi presto o parti tardi e vuoi esplorare a mani libere.",
      en: "Free luggage storage — useful if you arrive early or leave late and want to explore hands-free.",
    },
  },
  {
    title: { it: "Pagamenti e contanti", en: "Payments & cash" },
    body: {
      it: "Carte accettate ovunque nei locali moderni; tieni un po' di contanti per caffe, fritti e piccole botteghe.",
      en: "Cards work in most modern spots; keep some cash for coffee, street food, and small shops.",
    },
  },
  {
    title: { it: "Quando visitare San Gregorio Armeno", en: "When to visit San Gregorio Armeno" },
    body: {
      it: "Mattina presto o giorni feriali: la via si riempie soprattutto nel weekend e da ottobre a dicembre.",
      en: "Go early or on weekdays — the street gets crowded on weekends and from October through December.",
    },
  },
  {
    title: { it: "Sicurezza e ritmo", en: "Safety & pace" },
    body: {
      it: "Il centro è vivace fino a tarda sera. Come in ogni grande città: occhio a borse e telefoni nei tratti più affollati, e goditi il ritmo napoletano.",
      en: "The centre stays lively late. As in any big city, mind bags and phones in crowded stretches — and enjoy Naples' pace.",
    },
  },
];

export const dayTrips: DayTrip[] = [
  {
    name: { it: "Pompei ed Ercolano", en: "Pompeii & Herculaneum" },
    body: {
      it: "Circumvesuviana da Piazza Garibaldi (linea Sorrento): scendi a Pompei Scavi o Ercolano Scavi. Prenota i biglietti online nei periodi di punta.",
      en: "Circumvesuviana from Piazza Garibaldi (Sorrento line): get off at Pompei Scavi or Ercolano Scavi. Book tickets online in peak season.",
    },
  },
  {
    name: { it: "Capri, Ischia, Procida", en: "Capri, Ischia, Procida" },
    body: {
      it: "Aliscafi e traghetti da Molo Beverello o Mergellina. Capri è la più frequentata; Procida e Ischia regalano un ritmo più lento.",
      en: "Hydrofoils and ferries from Molo Beverello or Mergellina. Capri is the busiest; Procida and Ischia feel slower.",
    },
  },
  {
    name: { it: "Costiera Amalfitana", en: "Amalfi Coast" },
    body: {
      it: "Da Sorrento (Circumvesuviana) pullman SITA verso Positano e Amalfi, oppure tour organizzati da Napoli. Parti presto: le strade sono strette e il traffico intenso.",
      en: "From Sorrento (Circumvesuviana) take SITA buses to Positano and Amalfi, or join a tour from Naples. Leave early — roads are narrow and busy.",
    },
  },
];

export const touristPageCopy = {
  title: { it: "Napoli per te", en: "Naples for you" },
  subtitle: {
    it: "Come arrivare, cosa vedere a piedi e consigli pratici dal cuore di Spaccanapoli.",
    en: "How to get here, what to see on foot, and practical tips from the heart of Spaccanapoli.",
  },
  nearbyTitle: { it: "A pochi passi", en: "A short walk away" },
  nearbyLead: {
    it: "Tempi a piedi stimati da Vico Maiorani, 29.",
    en: "Estimated walking times from Vico Maiorani, 29.",
  },
  walkLabel: { it: "min a piedi", en: "min walk" },
  mapsLabel: { it: "Apri in Maps", en: "Open in Maps" },
  arrivalTitle: { it: "Come arrivare", en: "How to get here" },
  tipsTitle: { it: "Consigli pratici", en: "Practical tips" },
  dayTripsTitle: { it: "Fuori Napoli", en: "Beyond Naples" },
  dayTripsLead: {
    it: "Idee per una giornata quando vuoi uscire dal centro antico.",
    en: "Day-trip ideas when you want to leave the old town.",
  },
  ctaBook: { it: "Verifica disponibilità", en: "Check availability" },
  homeTeaserTitle: { it: "Info utili per il tuo soggiorno", en: "Useful info for your stay" },
  homeTeaserBody: {
    it: "Come raggiungerci, attrazioni a pochi minuti a piedi e consigli per vivere Spaccanapoli senza stress.",
    en: "How to reach us, attractions a few minutes away on foot, and tips for enjoying Spaccanapoli without stress.",
  },
  homeTeaserCta: { it: "Scopri Napoli", en: "Discover Naples" },
  reservationLink: {
    it: "Guida locale: come arrivare e cosa vedere",
    en: "Local guide: how to get here and what to see",
  },
};
