import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { formData, paymentResult } = await request.json();
    
    // Log the incoming data
    console.log('Email Request Data:', {
      formData,
      paymentResult,
      hasApiKey: !!process.env.RESEND_API_KEY
    });

    const emailContent = `
New Booking Request

Customer Details:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Date: ${formData.date}
Time: ${formData.time}
Package: ${formData.pricing}
Message: ${formData.message}

Payment Details:
Status: ${paymentResult.status}
Amount: £${paymentResult.amount}
Transaction ID: ${paymentResult.transactionId}
    `.trim();

    const { data, error } = await resend.emails.send({
      from: 'Quasarr <onboarding@resend.dev>',
      to: process.env.BUSINESS_EMAIL || 'vinayakbora09@gmail.com',
      subject: `New Booking Request from ${formData.name}`,
      text: emailContent
    });

    // Log the response
    console.log('Resend Response:', { data, error });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send email' },
      { status: 500 }
    );
  }
} 