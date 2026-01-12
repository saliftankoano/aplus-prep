import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core 1 (220-1201) Practice Tests - A+ Prep",
  description:
    "Master the CompTIA A+ 220-1201 Core 1 exam with our 8 practice tests covering all exam objectives.",
};

export default function Core1TestsPage() {
  const practiceTests = [
    {
      id: 1,
      title: "Test 1: Mobile Devices & Hardware",
      description:
        "Mobile device features, laptop hardware, and mobile connectivity",
      topics: [
        "Mobile devices",
        "Laptop components",
        "Display types",
        "Mobile networking",
      ],
      questions: 30,
      difficulty: "Beginner",
      gradient: "from-blue-500 to-blue-700",
    },
    {
      id: 2,
      title: "Test 2: Networking Fundamentals",
      description: "Network protocols, cabling, and wireless configurations",
      topics: [
        "TCP/IP",
        "Common ports",
        "Networking hardware",
        "Wireless standards",
      ],
      questions: 30,
      difficulty: "Intermediate",
      gradient: "from-indigo-500 to-indigo-700",
    },
    {
      id: 3,
      title: "Test 3: Hardware Components",
      description: "CPU, RAM, storage, and power supplies",
      topics: ["Processors", "Memory types", "Storage devices", "Motherboards"],
      questions: 30,
      difficulty: "Intermediate",
      gradient: "from-purple-500 to-purple-700",
    },
    {
      id: 4,
      title: "Test 4: Virtualization & Cloud",
      description: "Cloud computing concepts and client-side virtualization",
      topics: [
        "Cloud models",
        "Virtualization features",
        "SaaS/PaaS/IaaS",
        "Client-side hypervisors",
      ],
      questions: 30,
      difficulty: "Advanced",
      gradient: "from-cyan-500 to-cyan-700",
    },
    {
      id: 5,
      title: "Test 5: Hardware Troubleshooting",
      description: "Diagnosing and resolving physical hardware issues",
      topics: [
        "POST errors",
        "Storage issues",
        "Display problems",
        "Printer troubleshooting",
      ],
      questions: 30,
      difficulty: "Advanced",
      gradient: "from-orange-500 to-orange-700",
    },
    {
      id: 6,
      title: "Test 6: Network Troubleshooting",
      description:
        "Identifying and fixing common network connectivity problems",
      topics: [
        "Connection issues",
        "IP configuration",
        "Network tools",
        "Signal strength",
      ],
      questions: 30,
      difficulty: "Advanced",
      gradient: "from-red-500 to-red-700",
    },
    {
      id: 7,
      title: "Test 7: Printers & Multi-function Devices",
      description: "Printer types, maintenance, and setup",
      topics: ["Laser printers", "Inkjet", "Thermal", "Impact printers"],
      questions: 30,
      difficulty: "Intermediate",
      gradient: "from-teal-500 to-teal-700",
    },
    {
      id: 8,
      title: "Test 8: Comprehensive Review",
      description: "Final review of all Core 1 objectives",
      topics: [
        "Mixed objectives",
        "Real-world scenarios",
        "Exam preparation",
        "Comprehensive review",
      ],
      questions: 26,
      difficulty: "Advanced",
      gradient: "from-gray-500 to-gray-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100">
      <header className="bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/tests" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z"
                    clipRule="evenodd"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">A+ Prep</span>
            </Link>

            <Link
              href="/tests"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12 pt-20">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Core 1 (220-1201) Practice Tests
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our segmented practice tests. Each test contains 30
            carefully selected questions from our pool of 236 Core 1 (220-1201)
            questions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {practiceTests.map((test) => (
            <div key={test.id} className="relative group">
              <div
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${test.gradient} p-6 text-white transform transition-all duration-300 group-hover:scale-105 shadow-2xl`}
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
                </div>

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
                      <div
                        key={index}
                        className="flex items-center text-sm opacity-90"
                      >
                        <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                        {topic}
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/tests/core1/quiz/${test.id}`}
                    className="block w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-2xl font-semibold text-center transition-all duration-300 hover:bg-white hover:text-gray-900 transform hover:scale-105"
                  >
                    Start Test {test.id}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 mb-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold text-blue-600">236</div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">30</div>
                <div className="text-sm text-gray-600">Questions per Test</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">8</div>
                <div className="text-sm text-gray-600">Practice Tests</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
