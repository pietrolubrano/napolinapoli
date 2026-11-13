"use client"

import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { Button, Dropdown } from "@heroui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Locale } from "@/i18n-config";
import LocaleSwitcher from "./LocaleSwitcher";
import Loading from "../loading";

const navigation = [
  { name: {it: "Napoli", en: "Naples"}, href: '/napoli' },
  { name: {it: "La Mia Prenotazione", en: "My Booking"}, href: '/reservation' },
]

const rooms = [
  { name: 'San Biagio', href: '/room/san-biagio' },
  { name: 'Maiorani', href: '/room/maiorani' },
  { name: 'Divino Amore', href: '/room/divino-amore' }
]

export const Logo = () => {
  return (
    <Image
      width={100}
      height={100}
      loading="eager"
      alt="Your Company"
      src="/images/napoli-napoli-logo.png"
      className="h-8 w-auto"
    />
  );
};

export default function App(props: { lang: Locale }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hiddenOnScroll, setHiddenOnScroll] = useState(false);
  const { lang } = props;

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHiddenOnScroll(y > lastY && y > 80);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b border-white/20 bg-background transition-transform duration-300 ${
        hiddenOnScroll && !isMenuOpen ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex h-[70px] w-full items-center justify-between gap-4 px-4 sm:px-6">
        {/* Mobile brand */}
        <div className="flex flex-1 items-center justify-center sm:hidden">
          <Link href={`/${lang}`} onClick={() => setIsMenuOpen(false)}>
            <Logo />
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 sm:hidden">
          <Suspense fallback={<Loading />}>
            <LocaleSwitcher />
          </Suspense>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center text-white"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
            <span className="flex flex-col gap-1.5">
              <span className={`block h-0.5 w-5 bg-white transition ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-white transition ${isMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-white transition ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden flex-1 items-center gap-4 uppercase sm:flex">
          <Link href={`/${lang}`} onClick={() => setIsMenuOpen(false)}>
            <Logo />
          </Link>

          <Dropdown>
            <Dropdown.Trigger>
              <Button
                variant="ghost"
                className="bg-transparent p-0 text-sm font-bold uppercase text-white hover:bg-transparent"
              >
                <span className="flex items-center">
                  {lang === "it" ? "Le Stanze" : "Our Rooms"}
                  <ChevronDownIcon className="m-0 p-0" height={20} />
                </span>
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu aria-label="Napoli Napoli Rooms">
                {rooms.map((item) => (
                  <Dropdown.Item
                    key={item.name}
                    id={item.name}
                    textValue={item.name}
                    href={`/${lang}${item.href}`}
                    className="text-foreground"
                  >
                    {item.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          {navigation.map((item) => (
            <Link
              key={item.name[lang]}
              href={`/${lang}${item.href}`}
              className="text-sm font-bold uppercase text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name[lang]}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 sm:flex">
          <Suspense fallback={<Loading />}>
            <LocaleSwitcher />
          </Suspense>
          <Link
            href={`/${lang}/search`}
            className="text-sm font-bold uppercase text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            {lang === "it" ? "PRENOTA" : "BOOK NOW"}
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-x-0 bottom-0 top-[70px] z-40 flex items-center justify-center bg-background uppercase font-bold sm:hidden">
          <div>
            <p className="mb-1 text-3xl text-white">
              {lang === "it" ? "Le Stanze" : "Our Rooms"}
            </p>
            {rooms.map((item) => (
              <div key={item.name} className="ms-3">
                <Link
                  className="w-full text-md text-white"
                  href={`/${lang}${item.href}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}

            <div className="my-4 h-px w-full bg-transparent" />

            {navigation.map((item) => (
              <div key={item.name[lang]}>
                <Link
                  className="w-full text-xl text-white"
                  href={`/${lang}${item.href}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name[lang]}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
