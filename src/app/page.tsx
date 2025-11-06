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
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-md w-full">
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
              Launch Assistant →
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#001F57] py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white text-sm">
            © 2025 State of Idaho Judicial Branch. All rights reserved.
          </p>
          <p className="text-[#FFD700] text-xs mt-2">
            ESTO PERPETUA - Let it be perpetual
          </p>
        </div>
      </footer>
    </div>
  );
}
