"use client";

import { Fragment, useState } from "react";
import { useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Response } from "@/components/ai-elements/response";
import { Loader } from "@/components/ai-elements/loader";

export default function RAGChatBot() {
  const [input, setInput] = useState("");

  // ✅ still use the SDK’s state management
  const { messages, sendMessage, status } = useChat();

  // ✅ override the backend endpoint manually to include chatType=clerk
  const handleSubmit = async (message: PromptInputMessage) => {
    if (!message.text) return;

    // use the built-in `sendMessage` but route to our custom endpoint
    await sendMessage(
      { text: message.text },
      {
        body: { chatType: "admin" }, // send extra field for your route
      }
    );

    setInput("");
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-white bg-[#002F87]">
      {/* Header */}
      <header className="w-full bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1
                className="text-black text-2xl sm:text-3xl font-bold tracking-wide"
                style={{ fontFamily: "Georgia, serif" }}
              >
                STATE OF IDAHO
              </h1>
              <h2
                className="text-black text-lg sm:text-xl font-normal tracking-wide"
                style={{ fontFamily: "Georgia, serif" }}
              >
                JUDICIAL BRANCH
              </h2>
            </div>
            <div className="text-right">
              <h3
                className="text-black text-xl sm:text-2xl font-bold"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Administrative Orders AI Assistant--Curently 5th and Supreme Court
              </h3>
            </div>
          </div>
        </div>
      </header>

      {/* Chat area */}
      <main className="flex-grow flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-5xl h-[70vh] md:h-[75vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-[#FFD700] to-[#FFA500]" />
          <div className="flex flex-col flex-grow p-6 overflow-hidden">
            <Conversation className="flex-grow overflow-y-auto">
              <ConversationContent>
                {messages.map((message) => (
                  <div key={message.id}>
                    {message.parts.map((part, i) => {
                      if (part.type === "text") {
                        return (
                          <Fragment key={`${message.id}-${i}`}>
                            <Message from={message.role}>
                              <MessageContent>
                                <Response>{part.text}</Response>
                              </MessageContent>
                            </Message>
                          </Fragment>
                        );
                      }
                      return null;
                    })}
                  </div>
                ))}
                {(status === "submitted" || status === "streaming") && <Loader />}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

            <PromptInput onSubmit={handleSubmit} className="mt-4">
              <PromptInputBody className="border-2 border-[#002F87] rounded-lg focus-within:border-[#FFD700] transition-colors">
                <PromptInputTextarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me about administrative orders in the 5th district or supreme court..."
                  className="text-black"
                />
              </PromptInputBody>
              <PromptInputToolbar>
                <PromptInputTools />
                <PromptInputSubmit
                  disabled={!input}
                  status={status}
                  className="bg-[#FFD700] text-[#002F87] hover:bg-[#FFC700] font-bold rounded-lg px-6 py-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </PromptInputToolbar>
            </PromptInput>
          </div>
        </div>
      </main>

      <footer className="w-full bg-[#001F57] py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white text-sm">
            © 2025 State of Idaho Judicial Branch. All rights reserved.
          </p>
          <p className="text-[#FFD700] text-xs mt-1">ESTO PERPETUA</p>
        </div>
      </footer>
    </div>
  );
}
