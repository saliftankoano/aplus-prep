import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100">
      {/* Header */}
      <header className="h-[6.5vh] bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clipRule="evenodd" fill="currentColor" fillRule="evenodd"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">A+ Prep</span>
            </div>
            
            <nav className="hidden md:flex items-center bg-gray-50 rounded-full px-8 py-2 space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Resources</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Testimonials</a>
            </nav>
            
            <Link 
              href="/tests"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Try Now
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[93.5vh] flex items-center justify-center overflow-hidden">
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
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Ace Your CompTIA A+<br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Core 1 & Core 2 exams
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Because practice makes perfect! We&apos;ve got you covered for the Core 1 & Core 2 exams. 😉
          </p>
          <Link 
            href="/tests"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Start practicing
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Attribution in lower right corner */}
        <div className="absolute bottom-4 right-4 z-10">
          <div className="text-md text-white/80 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
            Built with ❤️ by{" "}
            <a 
              href="https://saliftankoano.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 font-medium transition-colors"
            >
              Salif Tankoano
            </a>
          </div>
        </div>
      </section>


    </div>
  );
}

