"use client";

import Link from "next/link";
import { ShieldIcon, HouseIcon } from "@/app/components/PhosphorIcons";

export default function Core2TestsPage() {
  const practiceTests = [
    {
      id: 1,
      title: "Test 1: System Installation & Configuration",
      description: "Server installation, backup methods, and system configuration",
      topics: ["Bare-metal installation", "Backup methods", "Windows settings", "System configuration"],
      questions: 30,
      difficulty: "Intermediate",
      gradient: "from-blue-500 to-blue-700"
    },
    {
      id: 2,
      title: "Test 2: Security & User Management",
      description: "Security controls, user permissions, and system administration",
      topics: ["NTFS security", "User permissions", "macOS utilities", "System administration"],
      questions: 30,
      difficulty: "Intermediate",
      gradient: "from-green-500 to-green-700"
    },
    {
      id: 3,
      title: "Test 3: Software Installation & Troubleshooting",
      description: "Software installation, file management, and system troubleshooting",
      topics: ["Software installation", "File management", "System troubleshooting", "Performance issues"],
      questions: 30,
      difficulty: "Advanced",
      gradient: "from-purple-500 to-purple-700"
    },
    {
      id: 4,
      title: "Test 4: Network Configuration & Security",
      description: "Network setup, security protocols, and connectivity issues",
      topics: ["Network configuration", "Security protocols", "Connectivity issues", "Network troubleshooting"],
      questions: 30,
      difficulty: "Intermediate",
      gradient: "from-indigo-500 to-indigo-700"
    },
    {
      id: 5,
      title: "Test 5: System Maintenance & Optimization",
      description: "System maintenance, performance optimization, and disk management",
      topics: ["System maintenance", "Performance optimization", "Disk management", "System updates"],
      questions: 30,
      difficulty: "Beginner",
      gradient: "from-teal-500 to-teal-700"
    },
    {
      id: 6,
      title: "Test 6: Mobile Device Management",
      description: "Mobile device configuration, security, and synchronization",
      topics: ["Mobile configuration", "Device security", "Synchronization", "Mobile troubleshooting"],
      questions: 30,
      difficulty: "Intermediate",
      gradient: "from-orange-500 to-orange-700"
    },
    {
      id: 7,
      title: "Test 7: Cloud Services & Virtualization",
      description: "Cloud computing, virtualization, and service models",
      topics: ["Cloud computing", "Virtualization", "Service models", "Cloud security"],
      questions: 30,
      difficulty: "Advanced",
      gradient: "from-cyan-500 to-cyan-700"
    },
    {
      id: 8,
      title: "Test 8: Data Protection & Privacy",
      description: "Data encryption, backup procedures, and privacy controls",
      topics: ["Data encryption", "Backup procedures", "Privacy controls", "Data protection"],
      questions: 30,
      difficulty: "Intermediate",
      gradient: "from-emerald-500 to-emerald-700"
    },
    {
      id: 9,
      title: "Test 9: Troubleshooting & Problem Resolution",
      description: "Systematic troubleshooting and problem resolution techniques",
      topics: ["Troubleshooting methodology", "Problem resolution", "System diagnostics", "Issue escalation"],
      questions: 30,
      difficulty: "Advanced",
      gradient: "from-violet-500 to-violet-700"
    },
    {
      id: 10,
      title: "Test 10: Customer Service & Communication",
      description: "Professional communication and customer service skills",
      topics: ["Customer service", "Communication skills", "Professional ethics", "Support procedures"],
      questions: 30,
      difficulty: "Beginner",
      gradient: "from-rose-500 to-rose-700"
    },
    {
      id: 11,
      title: "Test 11: Hardware & Component Management",
      description: "Hardware components, device management, and system hardware",
      topics: ["Hardware components", "Device management", "System hardware", "Component troubleshooting"],
      questions: 30,
      difficulty: "Intermediate",
      gradient: "from-slate-500 to-slate-700"
    },
    {
      id: 12,
      title: "Test 12: Peripheral & External Devices",
      description: "Peripheral device configuration and external device management",
      topics: ["Peripheral devices", "External devices", "Device configuration", "Device troubleshooting"],
      questions: 30,
      difficulty: "Beginner",
      gradient: "from-amber-500 to-amber-700"
    },
    {
      id: 13,
      title: "Test 13: Network Security & Monitoring",
      description: "Network security implementation and monitoring systems",
      topics: ["Network security", "Security monitoring", "Firewall configuration", "Security protocols"],
      questions: 30,
      difficulty: "Advanced",
      gradient: "from-red-500 to-red-700"
    },
    {
      id: 14,
      title: "Test 14: System Administration & Policies",
      description: "System administration tasks and policy management",
      topics: ["System administration", "Policy management", "User administration", "System configuration"],
      questions: 30,
      difficulty: "Advanced",
      gradient: "from-lime-500 to-lime-700"
    },
    {
      id: 15,
      title: "Test 15: Final Comprehensive Review",
      description: "Comprehensive review covering all Core 2 exam objectives",
      topics: ["Mixed objectives", "Real-world scenarios", "Exam preparation", "Comprehensive review"],
      questions: 9,
      difficulty: "Advanced",
      gradient: "from-gray-500 to-gray-700"
    }
  ];

  return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100">
      {/* Header with Logo */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/tests" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <ShieldIcon size={20} weight="fill" className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">A+ Prep</span>
            </Link>
            
            <Link 
              href="/tests"
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
            Core 2 (220-1102) Practice Tests
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our segmented practice tests. Each test contains 30 carefully selected questions from our pool of 429 Core 2 (220-1102) questions.
          </p>
        </div>

        {/* Test Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {practiceTests.map((test) => (
            <div key={test.id} className="relative group">
              <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${test.gradient} p-6 text-white transform transition-all duration-300 group-hover:scale-105 shadow-2xl`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                        {test.difficulty}
                      </span>
                      <span className="text-sm opacity-90">
                        {test.questions} Questions
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold mb-3">
                      {test.title}
                    </h2>
                    <p className="text-sm opacity-90 mb-4">
                      {test.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {test.topics.map((topic, index) => (
                      <div key={index} className="flex items-center text-sm opacity-90">
                        <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                        {topic}
                      </div>
                    ))}
                  </div>

                  <Link 
                    href={`/tests/core2/quiz/${test.id}`}
                    className="block w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-2xl font-semibold text-center transition-all duration-300 hover:bg-white hover:text-gray-900 transform hover:scale-105"
                  >
                    Start Test {test.id}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 mb-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold text-blue-600">429</div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">30</div>
                <div className="text-sm text-gray-600">Questions per Test</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">15</div>
                <div className="text-sm text-gray-600">Practice Tests</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
