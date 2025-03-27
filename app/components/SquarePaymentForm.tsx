"use client";

import { useState } from 'react';
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";

interface SquarePaymentFormProps {
  amount: number;
  formData: {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    pricing: string;
    message: string;
  };
  onSuccess: () => void;
}

export default function SquarePaymentForm({ amount, formData, onSuccess }: SquarePaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = async (paymentResult: any) => {
    try {
      console.log('Attempting to send email with data:', {
        formData,
        paymentResult: {
          status: 'success',
          amount: amount,
          transactionId: paymentResult.id
        }
      });

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          formData,
          paymentResult: {
            status: 'success',
            amount: amount,
            transactionId: paymentResult.id
          }
        }),
      });
      
      const data = await response.json();
      console.log('Email API Response:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      // Don't show error to user as payment was successful
    }
  };

  return (
    <div className="container mx-auto py-6 px-6 flex flex-col gap-4">
      {error && (
        <div className="text-red-600 mb-4 text-sm">{error}</div>
      )}

      <PaymentForm
        applicationId={process.env.NEXT_PUBLIC_SQUARE_APP_ID || ''}
        locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || ''}
        cardTokenizeResponseReceived={async (token) => {
          try {
            setLoading(true);
            setError(null);
            console.log('Processing payment with token:', token);
            const result = await fetch("/api/payment", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                sourceId: token.token,
                payment_amount: amount
              }),
            });
            const response = await result.json();
            console.log("Payment API Response:", {
              status: result.status,
              ok: result.ok,
              response: response
            });
            
            // Check if the payment was successful
            if (result.ok && response.payment) {
              console.log('Payment successful, showing popup');
              // Call onSuccess immediately after payment success
              onSuccess();
              
              // Send email in the background
              console.log('Sending email in background');
              sendEmail(response.payment).catch(error => {
                console.error('Background email sending failed:', error);
              });
            } else {
              console.log('Payment failed or response format incorrect:', response);
              setError(response.error || 'Payment failed');
            }
          } catch (error) {
            console.error("Payment failed:", error);
            setError(error instanceof Error ? error.message : 'Payment failed');
          } finally {
            setLoading(false);
          }
        }}
      >
        <CreditCard />
      </PaymentForm>

      {loading && (
        <div className="mt-4 text-gray-600">Processing payment...</div>
      )}
    </div>
  );
}