export async function POST(request: Request) {
    const body = await request.json();
    const {
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
    } = body

    const response = await fetch("https://login.smoobu.com/api/reservations",{
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

    const result = await response.json()

    console.log(result)
    return Response.json(result)
}
