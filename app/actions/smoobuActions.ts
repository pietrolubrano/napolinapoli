"use server"

export const checkAvailability = async (
  arrivalDate: string,
  departureDate: string,
  guests: string,
  apartments?: string[]
) => fetch("https://login.smoobu.com/booking/checkApartmentAvailability",{
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

export const createBooking = async(
  arrivalDate: string,
  departureDate: string,
  apartmentId: number,
  firstName: string,
  lastName: string,
  adults: number,
  children: number,
  price: number,
  priceStatus: 1|0,
  email: string,
  phone?: string,
  notice?: string,
  arrivalTime?: string,
  departureTime?: string,

) => fetch("https://login.smoobu.com/api/reservations",{
    headers: {
      'Api-Key' : process.env.API_KEY as string,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      
    },
    method: "POST",
    body: JSON.stringify({
      arrivalDate,
      departureDate,
      apartmentId,
      firstName,
      lastName,
      adults,
      children,
      price,
      priceStatus,
      email,
      phone,
      notice,
      arrivalTime,
      departureTime,
      customerId: process.env.CUSTOMER_ID
    })
})