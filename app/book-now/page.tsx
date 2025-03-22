import Link from 'next/link'

export default function BookNow() {
  return (
    <div className="min-h-screen bg-gray-100 text-black px-4 py-8">
      
      <main className="max-w-2xl mx-auto pt-16 pb-24">
        <h1 className="text-4xl font-bold mb-12 text-center">Book a Consultation</h1>
        <form className="space-y-8">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-black">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
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
              className="w-full px-4 py-3 bg-gray-100 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:text-black text-black"
               placeholder="Your Number"
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-2 text-black">Preferred Date</label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:text-black text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-black">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:text-black text-black"
              placeholder="Tell us about your specific needs or any questions you have"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-4 px-6 rounded-md hover:bg-gray-700 transition-colors text-sm mt-6"
          >
            Submit Booking Request
          </button>
        </form>
      </main>
    </div>
  )
}