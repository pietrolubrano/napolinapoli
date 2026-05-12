import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';

export default function TripadvisorLeaveReview() {
  return (<div className="p-8 flex flex-col md:flex-row items-center justify-center">
    <div id="TA_cdswritereviewnew83" className="TA_cdswritereviewnew">
        <ul id="jgXOkfhi" className="TA_links pLMuVCH74p">
            <li id="AUazgLNO" className="hj6IO7TapSs">
                <a target="_blank" href="https://www.tripadvisor.it/">
                <Image width={200} height={200} src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" alt="TripAdvisor"/>
                </a>
            </li>
        </ul>
    </div>
    <Script  async src="https://www.jscache.com/wejs?wtype=cdswritereviewnew&amp;uniq=83&amp;locationId=1152912&amp;lang=it&amp;lang=it&amp;display_version=2" data-loadtrk onLoad={(e) => (e.loadtrk = true)}></Script>
    <Link href='https://g.page/r/CVVHdV8ViIn6EBM/review' target="_blank">
        <Image src="https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/review-us-google.png" alt="google review" width={300} height={200} />
    </Link>
  </div>)
}
