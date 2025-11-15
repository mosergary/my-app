export default function Home() {
  return (
    <div
      className="font-sans min-h-screen flex flex-col text-white"
      style={{ backgroundColor: "#002F87" }}
    >
      {/* Header */}
      <header className="w-full bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1
            className="text-black text-4xl sm:text-5xl font-bold tracking-wide"
            style={{ fontFamily: "Georgia, serif" }}
          >
            STATE OF IDAHO
          </h1>
          <h2
            className="text-black text-2xl sm:text-3xl font-normal tracking-wide mt-1"
            style={{ fontFamily: "Georgia, serif" }}
          >
            JUDICIAL BRANCH
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
          {/* HR AI Assistant Card */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500]"></div>
            <div className="p-8 text-center">
              <h3
                className="text-black text-3xl font-bold mb-4"
                style={{ fontFamily: "Georgia, serif" }}
              >
                HR AI Assistant
              </h3>
              <p className="text-gray-700 mb-6 text-lg">
                Get instant assistance with HR-related questions and policies.
              </p>
              <a
                href="/chat"
                className="inline-block bg-[#FFD700] text-[#002F87] px-10 py-4 rounded-lg hover:bg-[#FFC700] transition-all duration-300 font-bold shadow-lg text-lg hover:shadow-xl hover:scale-105"
              >
                Launch PeggyBot →
              </a>
            </div>
          </div>

          {/* Clerk AI Chat Card */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-[#4169E1] to-[#1E90FF]"></div>
            <div className="p-8 text-center">
              <h3
                className="text-black text-3xl font-bold mb-4"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Clerk AI Chat
              </h3>
              <p className="text-gray-700 mb-6 text-lg">
                Access clerk services and court documentation assistance.
              </p>
              <a
                href="/clerk"
                className="inline-block bg-[#4169E1] text-white px-10 py-4 rounded-lg hover:bg-[#1E90FF] transition-all duration-300 font-bold shadow-lg text-lg hover:shadow-xl hover:scale-105"
              >
                Launch Chat →
              </a>
            </div>
          </div>

          {/* Admin Orders Card */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-[#DC143C] to-[#B22222]"></div>
            <div className="p-8 text-center">
              <h3
                className="text-black text-3xl font-bold mb-4"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Admin Orders
              </h3>
              <p className="text-gray-700 mb-6 text-lg">
                Manage and review administrative orders and documentation.
              </p>
              <a
                href="/orders"
                className="inline-block bg-[#DC143C] text-white px-10 py-4 rounded-lg hover:bg-[#B22222] transition-all duration-300 font-bold shadow-lg text-lg hover:shadow-xl hover:scale-105"
              >
                View Orders →
              </a>
            </div>
          </div>

          {/* Court Opinions Card */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-[#228B22] to-[#32CD32]"></div>
            <div className="p-8 text-center">
              <h3
                className="text-black text-3xl font-bold mb-4"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Court Opinions
              </h3>
              <p className="text-gray-700 mb-6 text-lg">
                Search and review Idaho court opinions and case summaries.
              </p>
              <a
                href="/opinions"
                className="inline-block bg-[#228B22] text-white px-10 py-4 rounded-lg hover:bg-[#32CD32] transition-all duration-300 font-bold shadow-lg text-lg hover:shadow-xl hover:scale-105"
              >
                Search Opinions →
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#001F57] py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <p className="text-white text-sm">
              © 2025 State of Idaho Judicial Branch. All rights reserved.
            </p>
            <a
              href="/techstack"
              className="text-white text-sm hover:text-[#FFD700] transition-colors duration-300 underline"
            >
              Tech Stack & Architecture
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}