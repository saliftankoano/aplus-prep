import Link from "next/link";

export default function Core2TestsPage() {
  const practiceTests = [
    {
      id: 1,
      title: "Operating Systems Fundamentals",
      description: "Master Windows, macOS, and Linux operating systems",
      topics: ["Windows Installation", "macOS Configuration", "Linux Basics", "File Systems"],
      questions: 30,
      difficulty: "Beginner",
      gradient: "from-blue-500 to-blue-700"
    },
    {
      id: 2,
      title: "Security & Best Practices",
      description: "Learn security protocols and operational procedures",
      topics: ["Security Policies", "Access Control", "Data Protection", "Incident Response"],
      questions: 30,
      difficulty: "Intermediate",
      gradient: "from-green-500 to-green-700"
    },
    {
      id: 3,
      title: "Software Troubleshooting",
      description: "Diagnose and resolve common software issues",
      topics: ["Application Issues", "OS Problems", "Performance Optimization", "Malware Removal"],
      questions: 30,
      difficulty: "Advanced",
      gradient: "from-purple-500 to-purple-700"
    }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100 overflow-hidden">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/tests" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">A+</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Prep</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/tests"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to Tests
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center">
        {/* Hero Section */}
        <div className="text-center mb-12">
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
                    href={`/quiz/core2/test${test.id}`}
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
        <div className="mt-12 text-center">
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
