import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { sourceId, payment_amount } = await request.json();
    
    // Log the request data (remove in production)
    console.log('Payment Request:', {
      sourceId,
      payment_amount,
      accessToken: process.env.SQUARE_ACCESS_TOKEN ? 'Present' : 'Missing'
    });

    if (!process.env.SQUARE_ACCESS_TOKEN) {
      throw new Error('Square access token is not configured');
    }

    if (!payment_amount || payment_amount <= 0) {
      throw new Error('Invalid payment amount');
    }

    const response = await fetch('https://connect.squareupsandbox.com/v2/payments', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-01-18',
        'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idempotency_key: crypto.randomUUID(),
        source_id: sourceId,
        amount_money: {
          amount: Math.round(payment_amount * 100), // Convert to pence
          currency: 'GBP'  // Changed from USD to GBP
        }
      })
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      console.error('Square API Error:', responseData);
      throw new Error(`Payment failed: ${responseData.error?.message || response.statusText}`);
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Payment Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Payment failed' },
      { status: 500 }
    );
  }
} 