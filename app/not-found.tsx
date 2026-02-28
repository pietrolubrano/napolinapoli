import Image from 'next/image'
import { Suspense } from 'react';

import Navbar from './[lang]/components/Navbar'
import Footer from './[lang]/components/Footer';
import Loading from './[lang]/loading';

import { Birthstone, Geist, Geist_Mono } from 'next/font/google';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const birthstone = Birthstone({
  variable: "--font-birthstone",
  weight: "400",
  subsets: ["latin"]
})

export default function NotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${birthstone.variable} text-white antialiased`}
      >
        <Navbar lang='en'></Navbar>
          <div className="h-[calc(100svh-70px)]">
            <div className="relative h-full p-8 pb-20 text-white">
              <h1 className="hidden">Napoli Napoli Rooms - b&b guesthouse Napoli</h1>
              <Image src="https://ubixbfsaksemukbx.public.blob.vercel-storage.com/images/sfondi/spaccanapoli-1068x712.jpg" alt="Napoli" width={1068} height={712} className="absolute inset-0 w-full h-full object-cover" />
              
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-8 text-center pb-52">
                <h3 className="text-3xl sm:text-5xl font-birthstone p-2 uppercase font-bold text-white font-birthstone!  ">
                  404 <br /> Page Not Found
                </h3>
              </div>

            </div>
          </div>
          <Footer lang='en' />
      </body>
    </html>
  )
}