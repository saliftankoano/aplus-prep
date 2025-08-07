import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice Tests - A+ Prep",
  description: "Choose your CompTIA A+ practice test. Core 1 and Core 2 exams available with comprehensive question banks.",
};

export default function TestsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100">
      {/* Header with Logo */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clipRule="evenodd" fill="currentColor" fillRule="evenodd"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">A+ Prep</span>
            </Link>
            
            <Link 
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 pt-20">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your CompTIA A+ Practice Test
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Select the CompTIA A+ core exam you want to practice for. Each test is designed to match the real exam format and difficulty level.
          </p>
        </div>

        {/* Test Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Core 1 Card */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-blue-700 p-8 text-white transform transition-all duration-300 group-hover:scale-105 shadow-2xl">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-600/30"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-4">
                    Hardware & Networking
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Core 1 (220-1101)
                  </h2>
                  <p className="text-lg text-blue-100 mb-6">
                    Master hardware fundamentals, networking, and troubleshooting techniques for the 220-1101 exam.
                  </p>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-white/90">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Hardware fundamentals
                  </div>
                  <div className="flex items-center text-white/90">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Networking concepts
                  </div>
                  <div className="flex items-center text-white/90">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Mobile devices
                  </div>
                  <div className="flex items-center text-white/90">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Hardware & network troubleshooting
                  </div>
                  <div className="flex items-center text-white/90">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Virtualization & cloud
                  </div>
                </div>

                <button 
                  className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-white/30 cursor-not-allowed opacity-75"
                  disabled
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          {/* Core 2 Card */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 to-teal-700 p-8 text-white transform transition-all duration-300 group-hover:scale-105 shadow-2xl">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-gradient-to-br from-green-500/30 to-teal-600/30"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-4">
                    Software & Security
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Core 2 (220-1102)
                  </h2>
                  <p className="text-lg text-green-100 mb-6">
                    Focus on operating systems, security fundamentals, and software troubleshooting for the 220-1102 exam.
                  </p>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-white/90">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Operating systems
                  </div>
                  <div className="flex items-center text-white/90">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Security fundamentals
                  </div>
                  <div className="flex items-center text-white/90">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Software troubleshooting
                  </div>
                  <div className="flex items-center text-white/90">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Operational procedures
                  </div>
                  <div className="flex items-center text-white/90">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Customer service
                  </div>
                </div>

                <Link 
                  href="/tests/core2"
                  className="block w-full bg-white text-green-700 px-8 py-4 rounded-2xl font-bold text-lg text-center transition-all duration-300 hover:bg-gray-100 transform hover:scale-105 shadow-lg"
                >
                  View Practice Tests
                </Link>
              </div>
            </div>
          </div>
        </div>
        
      </main>
    </div>
  );
}
