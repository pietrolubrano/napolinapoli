import type { Metadata } from "next";
import type { Viewport } from 'next'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./(components)/Navbar";
import {Providers} from "./providers";
import Footer from "./(components)/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Napoli Napoli Rooms - b&b, guest house",
  description: "B&b nel centro di Napoli, a due passi da Spaccanapoli e dal Duomo di Napoli.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} text-white antialiased`}
      >
        <Providers>
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </Providers>
      </body>
    </html>
  );
}
