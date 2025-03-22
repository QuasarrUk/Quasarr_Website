// pages/index.js - Home Page
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Your Business Name - Professional Services</title>
        <meta name="description" content="Professional services for your needs. Book an appointment today." />
      </Head>
      
      <header className="mb-10">
        <nav className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold">Your Business Name</div>
          <div className="flex space-x-6">
            <Link href="/" className="font-medium">Home</Link>
            <Link href="/about" className="font-medium">About</Link>
            <Link href="/book-now" className="bg-blue-600 text-white px-4 py-2 rounded-md">Book Now</Link>
          </div>
        </nav>
      </header>
      
      <main>
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl font-bold mb-6">Welcome to Your Business Name</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Your tagline or brief description goes here. Highlight what makes your business special.</p>
          <Link href="/book-now" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors">
            Book an Appointment
          </Link>
        </section>
        
        {/* Services Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="border p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Service One</h3>
              <p>Description of your first service and what clients can expect.</p>
            </div>
            
            {/* Service 2 */}
            <div className="border p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Service Two</h3>
              <p>Description of your second service and what clients can expect.</p>
            </div>
            
            {/* Service 3 */}
            <div className="border p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Service Three</h3>
              <p>Description of your third service and what clients can expect.</p>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-12 bg-gray-100 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Our Location</h3>
              <p className="mb-2">123 Business Street</p>
              <p className="mb-2">Your City, State 12345</p>
              <p className="mb-6">United States</p>
              
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <p className="mb-2">Phone: (123) 456-7890</p>
              <p className="mb-2">Email: info@yourbusiness.com</p>
              <p className="mb-2">Hours: Monday-Friday, 9am-5pm</p>
            </div>
            <div className="h-64 bg-gray-300 rounded-lg">
              {/* Replace with Google Maps embed */}
              <div className="w-full h-full flex items-center justify-center">
                <p>Google Maps Embed Here</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="mt-12 py-6 border-t">
        <div className="text-center">
          <p>© {new Date().getFullYear()} Your Business Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}