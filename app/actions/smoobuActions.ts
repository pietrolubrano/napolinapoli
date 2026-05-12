"use server"

import { updateTag } from "next/cache"
import { rooms } from '../../data/roomsData';

export const getVacancies = async (
  from?: string,
  to?: string
) => {
  try {
    const response = await fetch(`https://login.smoobu.com/api/reservations?from=${from}&to=${to}&showCancellation=false`,{
      headers: {
        'Api-Key' : process.env.API_KEY as string,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "GET"
    })

    const data : SmoobuGetBookingsResponseData = await response.json()
    const apartmentsIds = Object.keys(rooms).map(key => +key)
    const bookingsByApartment: { [key: number]: { arrival: string, departure: string }[] } = {}

    apartmentsIds.forEach(apartmentId => {
      const apartmentBookings = data.bookings.filter(booking => booking.apartment.id === apartmentId)
      bookingsByApartment[apartmentId] = apartmentBookings.map(booking => ({
        arrival: booking.arrival,
        departure: booking.departure
      }))
    })

    const vacancyData = Object.entries(bookingsByApartment).map(([apartmentId, bookings]) => {
      const sortedBookings = bookings.sort((a, b) => new Date(a.arrival).getTime() - new Date(b.arrival).getTime())
      const vacancies = []
      for(let i = 0; i < sortedBookings.length - 1; i++){
        const currentBooking = sortedBookings[i]
        const nextBooking = sortedBookings[i + 1]
        if(currentBooking.departure !== nextBooking.arrival){
          vacancies.push({
            from: currentBooking.departure,
            to: nextBooking.arrival
          })
        }
      }
      return {
        apartmentId,
        vacancies
      }
    })

    return vacancyData

  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw new Error('Failed to fetch bookings. Please try again later.');
  }
}

export const checkApartmentAvailability = async (
  arrivalDate: string,
  departureDate: string,
  guests: string,
  apartments?: string[]
) => {
  try {
    const response = await fetch("https://login.smoobu.com/booking/checkApartmentAvailability",{
      headers: {
        'Api-Key' : process.env.API_KEY as string,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        arrivalDate,
        departureDate,
        guests: +guests,
        apartments: apartments || [],
        customerId: process.env.CUSTOMER_ID
      })
  })

  const data: SmoobuAvailabilityResponseData = await response.json()

  if(response.status === 200){
    data.availableApartments.forEach((apartmentId: number) => {
      const apartmentPrice = data.prices[apartmentId].price
      data.prices[apartmentId].price = Math.round(apartmentPrice - (apartmentPrice * 0.40)) // Sconto del 40%
    })
    return data
  }

  } catch (error) {
    console.error('Error checking availability:', error);
    throw new Error('Failed to check availability. Please try again later.');
  }
}

export const createBooking = async(createBookingData: CreateBookingData) => 
  fetch("https://login.smoobu.com/api/reservations",{
    headers: {
      'Api-Key' : process.env.API_KEY as string,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      ...createBookingData,
      customerId: process.env.CUSTOMER_ID
    })
})

export const sendMessageToHost = async (prevState: any, formData: FormData) => {

  const reservationId = formData.get('reservationId') as string
  const subject = formData.get('subject') as string
  const messageBody = formData.get('messageBody') as string

  try {
    const response = await fetch(`https://login.smoobu.com/api/reservations/${reservationId}/messages/send-message-to-host`, {
      headers: {
        'Api-Key': process.env.API_KEY as string,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        subject,
        messageBody
      })
    });

    updateTag('messages');
    return await response.json();

  } catch (error) {

    console.error('Error sending message to host:', error);

    return {
      errors: {
        messageBody: "Invalid.",
      },
    };
  }
}

export const getReservation = async (
    reservationId: string,
) => fetch(`https://login.smoobu.com/api/reservations/${reservationId}`,{
    headers: {
        'Api-Key' : process.env.API_KEY as string,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    method: "GET"
})

export const getReservationMessages = async (
  reservationId: string,
  page: string = '1'
) => fetch(`https://login.smoobu.com/api/reservations/${reservationId}/messages?page=${page}`,{
    headers: {
        'Api-Key' : process.env.API_KEY as string,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    method: "GET",
    next: { tags: ['messages'] }
})
