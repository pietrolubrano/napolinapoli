"use server"

import { updateTag } from "next/cache"

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
        'Content-Type': 'application/json',
        
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
  
  data.availableApartments.forEach((apartmentId: number) => {
    const apartmentPrice = data.prices[apartmentId].price
    data.prices[apartmentId].price = Math.round(apartmentPrice - (apartmentPrice * 0.40)) // Sconto del 40%
  })

  return data

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