import { i18n, type Locale } from "@/i18n-config";
import type { Metadata } from "next";
import type { Viewport } from 'next'

import { Birthstone, Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "./components/Navbar";
import {Providers} from "../providers";
import Footer from "./components/Footer";

import { Suspense } from 'react'
import Loading from "./loading";

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

export const metadata: Metadata = {
  title: "Napoli Napoli Rooms - Guest House",
  description: "Guest House nel centro storico di Napoli, a due passi da Spaccanapoli e dal Duomo.",
  openGraph: {
    images: ['/images/napoli-napoli-logo.png']
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#00a0d5' },
    { media: '(prefers-color-scheme: dark)', color: '#00a0d5' },
  ],
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  params,
  children
}: LayoutProps<'/[lang]'>) {

  const { lang } = await params

  return (
    <html lang={lang || "en"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${birthstone.variable} text-white antialiased`}
      >
        <Providers>
          <Navbar lang={lang as Locale}></Navbar>
            {children}
          <Footer lang={lang as Locale}></Footer>
        </Providers>
      </body>
    </html>
  );
}
