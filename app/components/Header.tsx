"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Marcellus } from 'next/font/google'

const marcellus = Marcellus({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`py-6 px-8 bg-gray-100 ${marcellus.className}`}>
      <div className="flex justify-between items-center relative">
        <Link href="/" className="text-2xl font-medium text-gray-900">
          <Image
            src="/images/logo.png"
            alt="Quasarr Ltd Logo"
            width={100}
            height={100}
            priority
          />
        </Link>

        {/* Large QUASARR text (only visible on desktop) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-6xl font-bold text-gray-900">QUASARR LTD</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/about" className="text-gray-800 hover:underline">
            About
          </Link>
          <Link href="/contact-us" className="text-gray-800 hover:underline">
            Contact
          </Link>
          <Link href="/book-now" className="bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-colors">
            Book now
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {!isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden mt-4 py-4 border-t border-gray-200">
          <div className="flex flex-col space-y-4">
            <Link 
              href="/about" 
              className="text-gray-800 hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact-us" 
              className="text-gray-800 hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/book-now" 
              className="bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-colors inline-block text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Book now
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}