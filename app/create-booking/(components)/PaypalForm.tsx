"use client"

interface Props {
  arrivalDate: string
    departureDate: string
    guests: string
    price: {
        price: number
        currency: string
        priceElements: {
            type: 'basePrice' | 'longStayDiscount' | 'CleaningFee'
            amount: number
        }[]
    },
    apartmentId: number,
    validatedData: boolean
    formData: FormData | null
}

import { useState } from "react"
import { rooms } from "@/data/roomsData"
import { FormData } from "./BookingForm"

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter } from "next/navigation"

export default function PaypalForm({
    arrivalDate,
    departureDate,
    guests,
    price,
    apartmentId,
    validatedData,
    formData
} : Props) {

    const [isProcessing, setIsProcessing] = useState(false);
    const [paypalError, setPaypalError] = useState("");
    const router = useRouter()

    const createBooking = async () => {

        const reservationData = {
            arrivalDate,
            departureDate,
            apartmentId,
            firstName: formData?.firstName as string,
            lastName: formData?.lastName as string,
            adults: +guests,
            children: 0,
            price: price.price,
            priceStatus: 0,
            deposit: 50,
            depositStatus: 1,
            language: "it",
            email: formData?.email as string,
            arrivalTime: formData?.arrivalTime as string,
            phone: formData?.phone,
            notice: 'RESERVATION FROM WEBSITE'
        }

        const bookingResponse = await fetch('/api/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        });

        const bookingResult = await bookingResponse.json()

        router.push(`/reservation?email=${encodeURIComponent(formData?.email as string)}&reservationId=${encodeURIComponent(bookingResult.id)}`)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createOrder = (data: any, actions: any) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: 50,
                        currency_code: 'EUR'
                    },
                    description: `Prenotazione della stanza ${rooms[apartmentId].name} dal ${new Date(arrivalDate).toLocaleDateString()} al ${new Date(departureDate).toLocaleDateString()} per ${guests} ospiti`,
                },
            ]
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onApprove = async (data: any, actions: any) => {

        setIsProcessing(true);
        
        try {
            const order = await actions.order.get();
            console.log('Payment successful', order);
            
            // Extract payer information from PayPal response
            const payerName = order.payer?.name?.given_name || '';
            const payerEmail = order.payer?.email_address || '';
            
            const paymentData = {
                name: payerName,
                email: payerEmail,
                amount: (price.price%10).toFixed(2),
                orderID: data.orderID
            };
            
            console.log('Sending to API:', paymentData);
            
            // Send payment data to our API
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API error response:', errorText);
                throw new Error('Payment processing failed');
            }

            const result = await response.json();
            console.log('API response:', result);
            
            await createBooking()

        } catch (error) {
            console.error('Payment failed:', error);
            setPaypalError('Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }

    };

    const onError = (err: unknown) => {
        console.error('PayPal error:', err);
        setPaypalError('An error occurred with PayPal. Please try again.');
    };

    return (
        <PayPalScriptProvider options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
          currency: 'EUR',
          intent: 'capture',
          "disable-funding": "mybank"
        }}>
          <PayPalButtons
            className="z-0"
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            style={{ layout: "vertical" }}
            disabled={isProcessing || !validatedData}
          />
        </PayPalScriptProvider>
    )
}