"use server"

import { cookies } from "next/headers"

export const setReservationCookie = async (reservationId: string, email: string) => {
    const expirationTime = new Date(Date.now() + 400 * 24 * 60 * 60 * 1000); // expires in 400 days
    const cookieStore = await cookies()
    cookieStore.set('reservationId', reservationId, {expires: expirationTime})
    cookieStore.set('email', email, {expires: expirationTime})
}

export const clearReservationCookie = async () => {
    const cookieStore = await cookies()
    cookieStore.delete('reservationId')
    cookieStore.delete('email')
}