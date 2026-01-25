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