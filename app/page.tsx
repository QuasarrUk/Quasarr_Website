"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, ChangeEvent, FormEvent } from 'react'

export default function Home() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create email content
    const subject = `Contact Form Submission from ${formData.firstName} ${formData.lastName}`;
    const body = `
    Name: ${formData.firstName} ${formData.lastName}
    Email: ${formData.email}
    Message:${formData.message}`;

    // Create mailto URL with encoded parameters
    const mailtoUrl = `mailto:vinayakbora09@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open default email client
    window.location.href = mailtoUrl;

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section with Padded Image Background */}
      <section className="relative text-white p-6 md:p-12">
        {/* Container with padding that will hold the background image */}
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background Image with padding effect */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/londonskyline.jpg"
              alt="London skyline view"
              fill
              priority
              className="object-cover"
            />
            {/* Overlay to ensure text is readable */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          <div className="relative z-10 mx-auto px-6 py-24">
            <div className="max-w-3xl mx-auto text-center pt-16 pb-16">
              <h1 className="text-5xl font-bold mb-8 leading-tight">Elevating Global Trade Excellence</h1>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/book-now" className="bg-white text-blue-600 px-10 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                  Get Started
                </Link>
                <Link href="/about" className="border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section with Collaborative Work Image */}
      <section className="py-16 bg-gray-100 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Reserve An Appointment</h2>
              <p className="text-lg text-gray-600 mb-8">Experience the epitome of refinement in international trade by booking a personalized
                consultation with our experts. Let us guide you through a seamless import and export journey, tailor-made to uphold the highest
                standards of excellence. </p>
              <Link href="/book-now" className="text-blue-600 font-semibold hover:text-blue-800">
                Explore our services →
              </Link>
            </div>
            <div className="md:w-1/2 relative h-80 md:h-96 w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/image4.jpg"
                alt="Team collaborating on laptops"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-gray-100">
        {/* Main Content */}
        <main className="container mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information Section */}
            <div>
              <h1 className="text-5xl font-medium text-gray-800 mb-8">Contact Us</h1>

              <p className="text-gray-700 mb-8">
                Eager to explore a collaboration? Kindly share your details, and we will reach out
                to you promptly. We look forward to the opportunity to connect.
              </p>

              <div className="mb-8">
                <p className="text-gray-700">quasarltd.uk222@gmail.com</p>
                <p className="text-gray-700">(+44) 7543490835</p>
              </div>
            </div>

            {/* Form Section */}
            <div>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-black mb-2">Name <span className="text-black">(required)</span></label>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full border text-black rounded px-4 py-2 bg-transparent"
                      />
                    </div>
                    <div className="w-1/2">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full border text-black rounded px-4 py-2 bg-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-black mb-2">Email <span className="text-black">(required)</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border text-black rounded px-4 py-2 bg-transparent"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-black mb-2">Message <span className="text-black">(required)</span></label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full border text-black rounded px-4 py-2 bg-transparent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors"
                >
                  SEND
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}