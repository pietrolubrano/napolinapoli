export async function POST(request: Request) {

    const body: CreateBookingRequestBody = await request.json();

    /* console.log("Received booking request:", body); */
    const response = await fetch("https://login.smoobu.com/api/reservations",{
        headers: {
        'Api-Key' : process.env.API_KEY as string,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify({ ...body, customerId: process.env.CUSTOMER_ID })
    })

    const result = await response.json()

    return Response.json(result)
}
