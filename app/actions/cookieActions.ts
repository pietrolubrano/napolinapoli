"use server"

import { cookies } from "next/headers"

export const setReservationCookie = async (reservationId: string, email: string) => {
    const cookieStore = await cookies()
    cookieStore.set('reservationId', reservationId)
    cookieStore.set('email', email)
}

export const clearReservationCookie = async () => {
    const cookieStore = await cookies()
    cookieStore.delete('reservationId')
    cookieStore.delete('email')
}