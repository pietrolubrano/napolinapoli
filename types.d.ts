type CreateBookingRequestBody = {
    arrivalDate: string,
    departureDate: string,
    channelId?: number,
    apartmentId: number,
    arrivalTime?: string,
    departureTime?: string,
    firstName: string,
    lastName: string,
    email: string,
    phone?: string,
    notice?: string,
    adults: number,
    children?: number,
    price: number,
    priceStatus: 1|0,
    deposit?: number,
    depositStatus?: 1|0,
    prepayment: number,
    prepaymentStatus: 1|0,
    language: string
}

type GuestExceedApartmentLimitError = {
    errorCode: 400
    message: string
    numberOfGuest: number
}

type DurationBookingError = {
    errorCode: 401
    message: string
    minimumLengthOfStay: number
}

type ChoosenDayOfArrivalNotAvilableError = {
    errorCode: 402
    message: string
}

type ArrivalDayIsTooShortTermError = {
    errorCode: 403
    message: string
}

type MinimumBeetweenBookingsError = {
    errorCode: 404
    message: string
}

type SmoobuAvailabilityErrorMessages = 
    GuestExceedApartmentLimitError
    | 
    DurationBookingError
    |
    ChoosenDayOfArrivalNotAvilableError
    |
    ArrivalDayIsTooShortTermError
    |
    MinimumBeetweenBookingsError

type SmoobuAvailabilityResponseData = {
  availableApartments: number[]
  errorMessages: {
    [key: number]: SmoobuAvailabilityErrorMessages
}
  prices: {
    [key: number]: {
      price: number
      currency: string
      priceElements: {
        type: 'basePrice' | 'longStayDiscount' | 'cleaningFee'
        amount: number
        additionalInfo: string | null
        currencyCode: string
        quantity: number | null
        sortOrder: number | null
        tax: number | null
      }[]
    }
  }
}

type Reservation = {
    "status": number,
    "id": number,
    "reference-id":null | number,
    "type": "reservation",
    "arrival": string,
    "departure":string ,
    "created-at": string,
    "modifiedAt":string,
    "apartment":{
        "id":number,
        "name":string
    },
    "channel":{
        "id": number,
        "channel_id":number,
        "name":string
    },
    "guest-name":string,
    "firstname":string,
    "lastname":string,
    "email":string,
    "phone":string,
    "adults":number,
    "children":number,
    "check-in":string,
    "check-out":string,
    "notice":string,
    "assistant-notice":string,
    "price":number,
    "price-details":string,
    "city-tax": null | number,
    "price-paid":string,
    "commission-included":null | number,
    "prepayment":number,
    "prepayment-paid":string,
    "deposit":number,
    "deposit-paid":string,
    "language":string,
    "guest-app-url":string,
    "is-blocked-booking":boolean,
    "guestId":number,
    "related":{
        "id":number,
        "name":string
    }[]
}

type Message = {
    "id": number
    "subject": string
    "message": string
    "htmlMessage": string
    "type": 1 | 2
    "createdAt": string
}

type ReservationMessageResponse = {
    "page_count": number
    "page_size": number
    "total_items": number
    "page": number
    "messages": Message[]
}