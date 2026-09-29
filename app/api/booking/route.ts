import { getSmoobuCustomerId, smoobuFetch } from "@/lib/smoobu"

export async function POST(request: Request) {

    const body: CreateBookingData = await request.json();

    /* console.log("Received booking request:", body); */
    const response = await smoobuFetch("/api/reservations", {
        method: "POST",
        body: { ...body, customerId: getSmoobuCustomerId() },
    })

    const result = await response.json()

    return Response.json(result)
}
