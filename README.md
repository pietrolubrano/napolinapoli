# Napoli Napoli Rooms - [text](https://www.napolinapolirooms.it/it)

Overview

Hospitality web platform built with Next.js integrating Smoobu PMS APIs for real-time availability and booking management.

Tech Stack

* Next.js App Router
* React
* TypeScript
* TailwindCSS
* Server Actions
* Smoobu API integration
* Paypal integration
* Next UI
* i18n
* Responsive Design

Features

* Real-time room availability
* External PMS integration
* Dynamic multilingual routing
* SEO metadata generation
* Server-side data fetching
* Booking flow handling
* Responsive UI

Reservation Persistence Strategy

Once a reservation is completed, users are redirected to their booking details page.

The application temporarily stores non-sensitive reservation reference data in cookies, including:

* reservation ID
* guest email

These values are subsequently used to fetch and display the corresponding reservation data through server-side requests.

A traditional authentication system was intentionally avoided in order to:

* reduce friction during the booking flow
* simplify the user experience
* avoid unnecessary account management complexity for a public-facing hospitality platform
