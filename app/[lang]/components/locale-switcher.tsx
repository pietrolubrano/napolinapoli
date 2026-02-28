"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n-config";
import { Button } from "@headlessui/react";


export default function LocaleSwitcher() {

  const pathname = usePathname();
  const segments = pathname.split("/");

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div>
      <Button as={Link} className="border-0 p-0 font-bold text-sm flex items-center" href={redirectedPathname(segments[1] === "it" ? "en" : "it")}>
        {segments[1] === "it" ?
          <><span className="text-xl mr-1">🇬🇧</span> EN</>
          :
          <><span className="text-xl mr-1">🇮🇹</span> IT</>
        }
      </Button>
    </div>
  );
}
