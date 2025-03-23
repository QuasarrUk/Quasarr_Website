"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, ChangeEvent, FormEvent } from 'react'
import { Marcellus } from 'next/font/google'
import { PT_Serif } from 'next/font/google'


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

            <h1 className={`text-5xl font-medium text-gray-800 mb-8 ${marcellus.className}`}>Contact Us</h1>

            <p className={`text-gray-700 mb-8 ${ptSerif.className}`}>
              Eager to explore a collaboration? Kindly share your details, and we will reach out
              to you promptly. We look forward to the opportunity to connect.
            </p>

            <div className={`mb-8 ${ptSerif.className}`}>
              <p className="text-gray-700">quasarltd.uk222@gmail.com</p>
              <p className="text-gray-700">(+44) 7543490835</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className={`block text-black mb-2 ${ptSerif.className}`}>
                  Name <span className="text-black">(required)</span>
                </label>
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
                      className={`w-full border text-black rounded px-4 py-2 bg-transparent ${ptSerif.className}`}
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
                      className={`w-full border text-black rounded px-4 py-2 bg-transparent ${ptSerif.className}`}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className={`block text-black mb-2 ${ptSerif.className}`}>
                  Email <span className="text-black">(required)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full border text-black rounded px-4 py-2 bg-transparent ${ptSerif.className}`}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className={`block text-black mb-2 ${ptSerif.className}`}>
                  Message <span className="text-black">(required)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`w-full border text-black rounded px-4 py-2 bg-transparent ${ptSerif.className}`}
                ></textarea>
              </div>

              <button
                type="submit"
                className={`bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors ${ptSerif.className}`}
              >
                SEND
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div className="lg:block relative h-[calc(100%-2rem)]">
            <div className="sticky top-8 w-full h-[300px] lg:h-full rounded overflow-hidden">
              <Image
                src="/images/contact.jpg"
                alt="Office view with silhouettes of people looking at city skyline"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}