import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">A+</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Prep</span>
            </div>
            
            <nav className="hidden md:flex items-center bg-gray-50 rounded-full px-8 py-2 space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Resources</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Testimonials</a>
            </nav>
            
            <Link 
              href="/quiz/core2"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Try Now
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/6149793/pexels-photo-6149793.jpeg"
            alt="Person studying with laptop"
            fill
            className="object-cover blur-[4px]"
            priority
          />
        </div>
        
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Ace your CompTIA A+<br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              220-1102 exam
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Master the Core 2 (220-1102) objectives with our comprehensive practice tests. Practice makes perfect! 😉
          </p>
          <Link 
            href="/tests"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Start practicing
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>


    </div>
  );
}

