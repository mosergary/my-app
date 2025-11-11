export default function TechStackPage() {
    return (
      <div
        className="font-sans min-h-screen flex flex-col"
        style={{ backgroundColor: "#002F87" }}
      >
        {/* Header */}
        <header className="w-full bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-6 relative">
            <button
              onClick={() => window.print()}
              className="absolute top-6 right-6 bg-[#FFD700] text-[#002F87] px-6 py-3 rounded-lg hover:bg-[#FFC700] transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:scale-105 print:hidden"
            >
              🖨️ Print to PDF
            </button>
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
        <main className="flex-grow px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <h2
              className="text-center text-white text-4xl mb-6"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Tech Stack Architecture
            </h2>
            <p className="text-center text-[#FFD700] mb-12 text-lg">
              Next.js • React • TypeScript • Tailwind • Clerk • OpenAI SDK •
              LangChain • Python • Neon PostgreSQL • Vercel
            </p>
  
            {/* Architecture Diagram */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-8">
              {/* Client Layer */}
              <div className="p-8">
                <div className="h-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] mb-6"></div>
                <h3
                  className="text-[#002F87] text-3xl font-bold mb-6"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  🌐 Client Browser
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#002F87] hover:shadow-lg transition-all">
                    <h4 className="text-[#002F87] font-bold text-xl mb-2">
                      👤 User
                    </h4>
                    <p className="text-gray-700 text-sm">
                      End user interacting with the application
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#002F87] hover:shadow-lg transition-all">
                    <h4 className="text-[#002F87] font-bold text-xl mb-2">
                      🔐 Clerk Authentication
                    </h4>
                    <div className="mb-2">
                      <span className="inline-block bg-[#6c47ff] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Clerk
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      User authentication, sign-in/sign-up, session management
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#002F87] hover:shadow-lg transition-all">
                    <h4 className="text-[#002F87] font-bold text-xl mb-2">
                      ⚛️ React Components
                    </h4>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className="inline-block bg-[#61dafb] text-black px-3 py-1 rounded-full text-xs font-semibold">
                        React
                      </span>
                      <span className="inline-block bg-[#3178c6] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        TypeScript
                      </span>
                      <span className="inline-block bg-[#06b6d4] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Tailwind
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      UI components with type safety and utility-first styling
                    </p>
                  </div>
                </div>
              </div>
  
              <div className="text-center text-[#FFD700] text-4xl py-4">↓</div>
  
              {/* Vercel Layer */}
              <div className="p-8 bg-gray-50">
                <div className="h-3 bg-gradient-to-r from-[#4169E1] to-[#1E90FF] mb-6"></div>
                <h3
                  className="text-[#002F87] text-3xl font-bold mb-6"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  ☁️ Vercel (Deployment & Hosting)
                </h3>
  
                <div className="bg-black text-white p-8 rounded-lg">
                  <h4
                    className="text-2xl font-bold mb-6"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    ⚡ Next.js Application
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-[#1a1a1a] p-6 rounded-lg border-l-4 border-[#FFD700] hover:bg-[#2a2a2a] transition-all">
                      <h5 className="font-bold text-lg mb-2">📄 Pages & Routes</h5>
                      <div className="mb-2 flex flex-wrap gap-2">
                        <span className="inline-block bg-black text-white px-3 py-1 rounded-full text-xs font-semibold border border-white">
                          Next.js
                        </span>
                        <span className="inline-block bg-[#3178c6] text-white px-3 py-1 rounded-full text-xs font-semibold">
                          TypeScript
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">
                        App Router for navigation with type-safe routing
                      </p>
                    </div>
                    <div className="bg-[#1a1a1a] p-6 rounded-lg border-l-4 border-[#FFD700] hover:bg-[#2a2a2a] transition-all">
                      <h5 className="font-bold text-lg mb-2">🔌 API Routes</h5>
                      <p className="text-gray-300 text-sm">
                        /api/chat endpoint with TypeScript for backend logic
                      </p>
                    </div>
                    <div className="bg-[#1a1a1a] p-6 rounded-lg border-l-4 border-[#FFD700] hover:bg-[#2a2a2a] transition-all">
                      <h5 className="font-bold text-lg mb-2">
                        🖥️ Server Components
                      </h5>
                      <p className="text-gray-300 text-sm">
                        Server-side rendered components with RSC
                      </p>
                    </div>
                    <div className="bg-[#1a1a1a] p-6 rounded-lg border-l-4 border-[#FFD700] hover:bg-[#2a2a2a] transition-all">
                      <h5 className="font-bold text-lg mb-2">
                        💻 Client Components
                      </h5>
                      <p className="text-gray-300 text-sm">
                        Interactive client-side components
                      </p>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="text-center text-[#FFD700] text-4xl py-4 bg-gray-50">
                ↓
              </div>
  
              {/* Backend Layer */}
              <div className="p-8">
                <div className="h-3 bg-gradient-to-r from-[#DC143C] to-[#B22222] mb-6"></div>
                <h3
                  className="text-[#002F87] text-3xl font-bold mb-6"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  🧠 AI & Data Layer
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#2e7d32] hover:shadow-lg transition-all">
                    <h4 className="text-[#002F87] font-bold text-xl mb-2">
                      🦜 LangChain
                    </h4>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className="inline-block bg-[#2e7d32] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        LangChain
                      </span>
                      <span className="inline-block bg-[#3776ab] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Python
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      AI orchestration, chains, prompts, and memory management
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#10a37f] hover:shadow-lg transition-all">
                    <h4 className="text-[#002F87] font-bold text-xl mb-2">
                      🤖 OpenAI SDK
                    </h4>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className="inline-block bg-[#10a37f] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        OpenAI
                      </span>
                      <span className="inline-block bg-[#3178c6] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        TypeScript
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Direct integration with GPT models for chat completions and
                      streaming
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#9c27b0] hover:shadow-lg transition-all">
                    <h4 className="text-[#002F87] font-bold text-xl mb-2">
                      💬 LLM Provider
                    </h4>
                    <p className="text-gray-700 text-sm">
                      OpenAI GPT-4, GPT-3.5, or other AI models for generation
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#0066cc] hover:shadow-lg transition-all">
                    <h4 className="text-[#002F87] font-bold text-xl mb-2">
                      🐘 Neon PostgreSQL
                    </h4>
                    <div className="mb-2">
                      <span className="inline-block bg-[#0066cc] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Neon
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Serverless PostgreSQL for users, chats, and session data
                    </p>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Request Flow */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden p-8 mb-8">
              <h3
                className="text-[#002F87] text-3xl font-bold mb-6"
                style={{ fontFamily: "Georgia, serif" }}
              >
                🔄 Typical Request Flow
              </h3>
              <div className="space-y-4">
                {[
                  "User authenticates via Clerk and types a message in the React UI",
                  "Client component sends authenticated request to /api/chat",
                  "API route verifies user session with Clerk",
                  "API route processes request using OpenAI SDK and LangChain:\n• Retrieve user's conversation history from Neon\n• Build prompts with context (LangChain)\n• Call OpenAI API via SDK for chat completion\n• Stream response back to client\n• Store new messages in Neon",
                  "Response streams back to the UI in real-time",
                  "React updates the display with the new message",
                ].map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-9 h-9 bg-[#002F87] text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-gray-700 whitespace-pre-line">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Key Benefits */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden p-8">
              <h3
                className="text-[#002F87] text-3xl font-bold mb-6"
                style={{ fontFamily: "Georgia, serif" }}
              >
                💡 Key Benefits
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong>Secure Authentication:</strong> Clerk handles user
                  management and sessions
                </li>
                <li>
                  <strong>Type Safety:</strong> TypeScript prevents runtime errors
                  across the stack
                </li>
                <li>
                  <strong>Native OpenAI Integration:</strong> Official SDK for
                  reliable, streaming responses
                </li>
                <li>
                  <strong>Serverless Architecture:</strong> Automatic scaling with
                  Vercel and Neon
                </li>
                <li>
                  <strong>Real-time AI:</strong> Streaming chat completions for
                  better UX
                </li>
                <li>
                  <strong>Persistent Memory:</strong> User-specific conversation
                  history in PostgreSQL
                </li>
                <li>
                  <strong>Edge Deployment:</strong> Fast global access via Vercel's
                  CDN
                </li>
                <li>
                  <strong>Modern UI:</strong> React components with Tailwind styling
                </li>
                <li>
                  <strong>Flexible AI Orchestration:</strong> LangChain + OpenAI SDK
                  for complex workflows
                </li>
              </ul>
            </div>
          </div>
        </main>
  
        {/* Footer */}
        <footer className="w-full bg-[#001F57] py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-white text-sm">
              © 2025 State of Idaho Judicial Branch. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
  }