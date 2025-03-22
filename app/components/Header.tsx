import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="py-6 px-8 bg-gray-100 flex justify-between items-center">
      <Link href="/" className="text-2xl font-medium text-gray-900">
      Quasarr LTD
      </Link>
      <div className="flex items-center space-x-8">
        <Link href="/about" className="text-gray-800 hover:underline">
          About
        </Link>
        <Link href="/contact-us" className="text-gray-800 hover:underline">
          Contact
        </Link>
        <Link href="/book-now" className="bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-colors">
          Book now
        </Link>
      </div>
    </header>
  )
} 