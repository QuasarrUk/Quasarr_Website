"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, ChangeEvent, FormEvent } from 'react'

export default function Contact() {
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
      {/* Main Content */}
      <main className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form Section */}
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

          {/* Image Section */}
          <div className="hidden lg:block">
            <div className="w-full h-full bg-gray-300 rounded overflow-hidden">
              <div className="w-full h-full relative">
                <div className="text-2xl font-bold">
                  <img
                    src="/images/contact.jpg"
                    alt="Office view with silhouettes of people looking at city skyline"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}