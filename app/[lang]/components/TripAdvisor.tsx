"use client";

import Script from "next/script";
import Image from "next/image";
import Link from "next/link";

export default function TripAdvisor() {

    return(<>
        <div id="TA_cdsratingsonlynarrow290" className="TA_cdsratingsonlynarrow max-w-34">
            <ul id="HAfVeLjBE6b" className="TA_links f9lMaUxDs9A">
                <li id="Nk6YXVd" className="CSMhm2M">
                    <Link target="_blank" href="https://www.tripadvisor.it/Hotel_Review-g187785-d1152912-Reviews-Napoli_Napoli-Naples_Province_of_Naples_Campania.html">
                        <Image width={200} height={200} src="https://www.tripadvisor.it/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-18034-2.svg" alt="TripAdvisor"/>
                    </Link>
                </li>
            </ul>
        </div>
        <Script async strategy="afterInteractive" src="https://www.jscache.com/wejs?wtype=cdsratingsonlynarrow&amp;uniq=290&amp;locationId=1152912&amp;lang=it&amp;border=true&amp;shadow=false&amp;backgroundColor=white&amp;display_version=2" data-loadtrk></Script>
    </>)
}