"use client";

import Link from "next/link";
import { ShieldIcon, HouseIcon } from "@/app/components/PhosphorIcons";

export default function TestsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100">
      {/* Header with Logo */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <ShieldIcon size={20} weight="fill" className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">A+ Prep</span>
            </Link>

            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <HouseIcon size={24} weight="regular" />
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
            Select the CompTIA A+ core exam you want to practice for. Each test
            is designed to match the real exam format and difficulty level.
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
                    Master hardware fundamentals, networking, and
                    troubleshooting techniques for the 220-1101 exam.
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

                <Link
                  href="/tests/core1"
                  className="block w-full bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold text-lg text-center transition-all duration-300 hover:bg-gray-100 transform hover:scale-105 shadow-lg"
                >
                  View Practice Tests
                </Link>
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
                    Focus on operating systems, security fundamentals, and
                    software troubleshooting for the 220-1102 exam.
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
