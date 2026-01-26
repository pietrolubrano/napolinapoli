"use client"

import { useState } from "react"
import { capturePayment } from "@/app/actions/paypalActions"
import { rooms } from "@/data/roomsData"

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import type { FormData } from "./BookingForm"

export default function PaypalForm({
    arrivalDate,
    departureDate,
    guests,
    price,
    apartmentId,
    validatedData
} : {
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
}) {

    const [isProcessing, setIsProcessing] = useState(false);
    const [paypalError, setPaypalError] = useState("");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createOrder = (data: any, actions: any) => {
        return actions.order.create({
        purchase_units: [
            {
            amount: {
                value: (price.price/100*10).toFixed(2),
                currency_code: 'EUR'
            },
            description: `Prenotazione della stanza ${rooms[apartmentId].name} dal ${new Date(arrivalDate).toLocaleDateString()} al ${new Date(departureDate).toLocaleDateString()} per ${guests} ospiti`,
            },
        ],
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
    /*      const response = await fetch('/api/payment', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        }); */

        const response = await capturePayment(paymentData);

    /*       if (!response.ok) {
            const errorText = await response.text();
            console.error('API error response:', errorText);
            throw new Error('Payment processing failed');
        }
        const result = await response.json(); */
        console.log('API response:', response);
        alert('Payment processed successfully!');
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