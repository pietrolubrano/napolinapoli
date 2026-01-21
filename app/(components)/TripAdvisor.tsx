"use client";

import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function TripAdvisor() {
    
    const [loaded, setLoaded] = useState(false);

    return (<>
        {
            loaded ? 
                <div id="TA_selfserveprop838" className="TA_selfserveprop">
                    <ul id="FD0Wp8" className="TA_links xHuZmONpB">
                        <li id="WEKgBovRqdk" className="p674QANNOAek">
                            <Link target="_blank" href="https://www.tripadvisor.it/Hotel_Review-g187785-d1152912-Reviews-Napoli_Napoli-Naples_Province_of_Naples_Campania.html">
                                <Image width={200} height={200} src="https://www.tripadvisor.it/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-11900-2.svg" alt="TripAdvisor"/>
                            </Link>
                        </li>
                    </ul>
                </div>
            :
            null
        }
        <Script async src="https://www.jscache.com/wejs?wtype=selfserveprop&amp;uniq=838&amp;locationId=1152912&amp;lang=it&amp;rating=true&amp;nreviews=0&amp;writereviewlink=false&amp;popIdx=false&amp;iswide=false&amp;border=true&amp;display_version=2" data-loadtrk onLoad={() => setLoaded(true)}></Script>
    </>)}