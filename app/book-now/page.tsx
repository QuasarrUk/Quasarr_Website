"use client"

import Link from 'next/link'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Marcellus } from 'next/font/google'
import { PT_Serif } from 'next/font/google'
import SquarePaymentForm from "../components/SquarePaymentForm";

const marcellus = Marcellus({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const ptSerif = PT_Serif({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function BookNow() {
  const pricingOptions = [
    {
      id: 'half-hour',
      title: 'Half Hour',
      price: '£50',
      duration: '30 minutes',
      value: 'Half Hour - £50',
      interval: 30,
      backgroundImage: '/images/image6.jpg' // Add background image path
    },
    {
      id: 'one-hour',
      title: 'One Hour',
      price: '£100',
      duration: '60 minutes',
      value: 'One Hour - £100',
      interval: 60,
      backgroundImage: '/images/image6.jpg' // Add background image path
    }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    pricing: '',
    message: ''
  });

  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  // Add a function to handle clicking on the entire div for time selection
  const openTimeMenu = () => {
    document.getElementById('time')?.click();
  };

  // Generate time slots based on selected package
  useEffect(() => {
    if (!formData.pricing) {
      setAvailableTimes([]);
      return;
    }

    // Find the selected pricing option
    const selectedOption = pricingOptions.find(option => option.value === formData.pricing);
    if (!selectedOption) return;

    const interval = selectedOption.interval;
    const times: string[] = [];

    // Generate time slots from 9 AM to 5 PM
    const startHour = 9;
    const endHour = 17;

    for (let hour = startHour; hour < endHour; hour++) {
      if (interval === 30) {
        // For 30-minute intervals, add both :00 and :30 slots
        times.push(`${hour.toString().padStart(2, '0')}:00`);
        times.push(`${hour.toString().padStart(2, '0')}:30`);
      } else {
        // For 60-minute intervals, add only :00 slots
        times.push(`${hour.toString().padStart(2, '0')}:00`);
      }
    }

    setAvailableTimes(times);

    // Reset time if changing packages
    setFormData(prev => ({ ...prev, time: '' }));
  }, [formData.pricing]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const selectPricing = (pricingValue: string) => {
    setFormData({
      ...formData,
      pricing: pricingValue
    });

    // Scroll to the form section for better UX
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Add new state for payment status
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [paymentError, setPaymentError] = useState<string>('');

  // Calculate amount based on selected package
  const getAmountInCents = () => {
    if (formData.pricing.includes('Half Hour')) {
      return 5000; // £50.00
    } else if (formData.pricing.includes('One Hour')) {
      return 10000; // £100.00
    }
    return 0;
  };

  const handlePaymentSuccess = () => {
    console.log('Payment success handler called');
    // Clear the form
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      pricing: '',
      message: ''
    });
    
    // Show success message
    setPaymentStatus('success');
    console.log('Payment status set to success');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setPaymentStatus('pending');
      console.log('Payment status reset to pending');
    }, 5000);
  };

  const handlePaymentError = (error: any) => {
    setPaymentStatus('error');
    setPaymentError('Payment failed. Please try again.');
    console.error('Payment Error:', error);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form is now just validated, payment is handled by Square component
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black px-4 py-8">
      <main className="max-w-2xl mx-auto pt-16 pb-24">
        <h1 className={`text-4xl font-bold mb-12 text-center ${marcellus.className}`}>Book a Consultation</h1>

        {/* Success Popup */}
        {paymentStatus === 'success' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Booking Successful!</h2>
              <p className="text-gray-700 mb-6">
                Thank you for your booking. You will receive a confirmation email shortly.
              </p>
              <button
                onClick={() => {
                  setPaymentStatus('pending');
                  console.log('Popup closed manually');
                }}
                className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Pricing Section */}
        <section className="mb-16">
          <h2 className={`text-2xl font-semibold mb-8 text-center ${marcellus.className}`}>Pricing Options</h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${ptSerif.className}`}>
            {pricingOptions.map((option) => (
              <div
                key={option.id}
                className={`relative overflow-hidden rounded-lg shadow-md border cursor-pointer transition-all ${formData.pricing === option.value
                    ? 'border-gray-800 shadow-lg ring-2 ring-gray-800'
                    : 'border-gray-200 hover:shadow-lg'
                  }`}
                onClick={() => selectPricing(option.value)}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{ backgroundImage: `url(${option.backgroundImage})` }}
                ></div>

                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-white opacity-75 z-0"></div>

                {/* Content */}
                <div className="relative z-10 p-6">
                  <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                  <p className="text-3xl font-bold text-gray-800 mb-4">{option.price}</p>
                  <p className="text-gray-600 mb-2">Duration: {option.duration}</p>
                  <button
                    type="button"
                    className={`mt-4 w-full py-2 px-4 rounded-md transition-colors text-sm ${formData.pricing === option.value
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                  >
                    {formData.pricing === option.value ? 'Selected' : 'Select'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Form */}
        <form id="booking-form" className={`space-y-8 ${ptSerif.className}`} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-black">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:text-black text-black"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-black">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:text-black text-black"
              placeholder="Your Email"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2 text-black">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:text-black text-black"
              placeholder="Your Number"
              required
            />
          </div>

          <div>
            <label htmlFor="pricing" className="block text-sm font-medium mb-2 text-black">Selected Package</label>
            <select
              id="pricing"
              name="pricing"
              value={formData.pricing}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:text-black text-black"
              required
            >
              <option value="">Select a package</option>
              {pricingOptions.map(option => (
                <option key={option.id} value={option.value}>{option.value}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2 text-black">Preferred Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:text-black text-black"
                required
              />
            </div>


            <div onClick={openTimeMenu} className="cursor-pointer">
              <label htmlFor="time" className="block text-sm font-medium mb-2 text-black">Preferred Time</label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:text-black text-black"
                required
                disabled={!formData.pricing}
              >
                <option value="">
                  {!formData.pricing
                    ? "Select a package first"
                    : "Select a time"}
                </option>
                {availableTimes.map(time => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {!formData.pricing && (
                <p className="text-xs text-gray-600 mt-1">Please select a package to view available times</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-black">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:text-black text-black"
              placeholder="Tell us about your specific needs or any questions you have"
              required
            ></textarea>
          </div>

          {/* Payment Section */}
          {formData.pricing && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="mb-4">Amount to pay: {formData.pricing}</p>
                <SquarePaymentForm 
                  amount={formData.pricing.includes('Half Hour') ? 50 : 100} 
                  formData={formData}
                  onSuccess={handlePaymentSuccess}
                />
              </div>
            </div>
          )}

          {paymentStatus === 'error' && (
            <div className="text-red-600 text-sm mt-2">
              {paymentError}
            </div>
          )}
        </form>
      </main>
    </div>
  )
}