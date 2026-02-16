"use server"

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
    data.prices[apartmentId].price = Math.round(apartmentPrice - (apartmentPrice * 0.35)) // Sconto del 35%
  })

  return data

  } catch (error) {
    console.error('Error checking availability:', error);
    throw new Error('Failed to check availability. Please try again later.');
  }
}

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