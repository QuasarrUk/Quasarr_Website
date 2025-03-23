import Image from 'next/image'
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

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 px-8 mt-16 border-t border-gray-200">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-2xl font-bold">
            <Image
              src="/images/logo.png"
              alt="Quasarr Ltd Logo"
              width={150}
              height={150}
              priority
            />
          </div>
          
          <div>
            <h3 className={`text-3xl font-bold text-gray-800 mb-4 ${marcellus.className}`}>Location</h3>
            <p className={`text-gray-700 ${ptSerif.className}`}>The United Kingdom</p>
          </div>
          
          <div>
            <h3 className={`text-3xl font-bold text-gray-800 mb-4 ${marcellus.className}`}>Contact</h3>
            <p className={`text-gray-700 mb-2 ${ptSerif.className}`}>quasarltd.uk222@gmail.com</p>
            <p className={`text-gray-700 font-medium ${ptSerif.className}`}>(+44) 7543490835</p>
          </div>
        </div>
      </div>
    </footer>
  )
} 