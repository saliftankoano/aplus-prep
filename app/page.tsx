"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  CheckCircle, 
  Cpu, 
  Monitor, 
  Shield, 
  TrendingUp, 
  Users,
  ArrowRight,
  Zap
} from "lucide-react";
import Image from "next/image";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                A+ Prep
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</Link>
              <Link href="#exams" className="text-gray-600 hover:text-blue-600 transition-colors">Exams</Link>
              <Link href="/tests" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg text-sm font-medium">
                Start Practicing
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50 -translate-x-1/3 translate-y-1/4" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-sm mb-8 border border-blue-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Updated for 2026 Exams
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-8 leading-tight">
              Master the <span className="text-blue-600">CompTIA A+</span><br />
              Exam with Confidence
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Comprehensive practice tests for Core 1 (220-1101) & Core 2 (220-1102). 
              Simulation-based learning designed to help you pass on your first try.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/tests" 
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
              >
                Start Free Practice
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="#features" 
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all flex items-center justify-center"
              >
                Learn More
              </Link>
            </motion.div>
            
            <motion.div variants={fadeIn} className="mt-12 flex items-center justify-center gap-8 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Instant access</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Practice Questions", value: "1,000+", icon: BookOpen },
              { label: "Active Users", value: "500+", icon: Users },
              { label: "Pass Rate", value: "94%", icon: TrendingUp },
              { label: "Uptime", value: "99.9%", icon: Zap },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="mb-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-blue-600">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exams Section */}
      <section id="exams" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Path</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select the exam you're preparing for. We provide comprehensive coverage for both Core 1 and Core 2 exams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Core 1 Card */}
            <div className="group relative bg-white rounded-3xl border border-gray-200 p-8 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-t-3xl" />
              <div className="mb-6 inline-block p-4 bg-blue-50 rounded-2xl text-blue-600">
                <Monitor className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Core 1 (220-1101)</h3>
              <p className="text-gray-600 mb-8">
                Focuses on mobile devices, networking technology, hardware, virtualization and cloud computing, and network troubleshooting.
              </p>
              <ul className="space-y-3 mb-8">
                {["Mobile Devices", "Networking", "Hardware", "Cloud Computing"].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link 
                href="/tests/core1" 
                className="block w-full py-3 px-6 bg-gray-900 text-white text-center rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Practice Core 1
              </Link>
            </div>

            {/* Core 2 Card */}
            <div className="group relative bg-white rounded-3xl border border-gray-200 p-8 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-t-3xl" />
              <div className="mb-6 inline-block p-4 bg-indigo-50 rounded-2xl text-indigo-600">
                <Cpu className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Core 2 (220-1102)</h3>
              <p className="text-gray-600 mb-8">
                Covers installing and configuring operating systems, expanded security, software troubleshooting, and operational procedures.
              </p>
              <ul className="space-y-3 mb-8">
                {["Operating Systems", "Security", "Software Troubleshooting", "Operational Procedures"].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <CheckCircle className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link 
                href="/tests/core2" 
                className="block w-full py-3 px-6 bg-gray-900 text-white text-center rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Practice Core 2
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-xl font-bold text-gray-900">A+ Prep</span>
            </div>
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} A+ Prep. All rights reserved.
            </div>
            <div className="text-sm text-gray-500">
              Built with ❤️ by{" "}
              <a 
                href="https://saliftankoano.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Salif Tankoano
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
