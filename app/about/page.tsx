import Link from 'next/link'
import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h1 className="text-5xl font-normal text-gray-800">Who we are</h1>
            <p className="text-gray-700 leading-relaxed">
              Embark on an exclusive journey of global connectivity through our 
              bespoke import and export services. Schedule a consultation today and 
              discover the unbridled potential of seamless international trade tailored 
              just for you.
            </p>
            <p className="text-gray-700 leading-relaxed">
              At Quasarr LTD, we pride ourselves on building lasting relationships with our 
              clients, understanding their unique needs, and delivering customized solutions 
              that drive success in the global marketplace.
            </p>
          </div>
          <div className="h-96 md:h-auto">
          <img 
                  src="/images/image2.jpg" 
                  alt="Office view with silhouettes of people looking at city skyline"
                  className="w-full h-full object-cover"
                />
          </div>
        </div>
      </main>
    </div>
  )
}