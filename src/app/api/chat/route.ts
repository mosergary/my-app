import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  InferUITools,
  UIDataTypes,
  stepCountIs,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { searchDocuments_hr, searchDocuments_admin, searchDocuments_clerk } from "@/lib/search";

const tools = {
  searchKnowledgeBase_hr: tool({
    description: "Search the knowledge base for relevant information",
    inputSchema: z.object({
      query: z.string().describe("The search query to find relevant sections"),
    }),
    execute: async ({ query }) => {
      try {
        console.log("[HR Tool] Searching knowledge base with query:", query);
        const results = await searchDocuments_hr(query, 5, 0.5);

        if (!results || results.length === 0) {
          console.log("[HR Tool] No results found");
          return "No relevant information found in the knowledge base.";
        }

        console.log(`[HR Tool] Found ${results.length} results`);
        const formattedResults = results
          .map((r: any, i) =>
            `[${i + 1}] ${
              r.metadata?.section ? `(Section: ${r.metadata.section}) ` : ""
            }${r.content.trim()}`
          )
          .join("\n\n---\n\n");

        return formattedResults;
      } catch (error) {
        console.error("[HR Tool] Search error:", error);
        return "Error searching the knowledge base.";
      }
    },
  }),

  searchKnowledgeBase_admin: tool({
    description: "Search the knowledge base for relevant information",
    inputSchema: z.object({
      query: z.string().describe("The search query to find relevant sections"),
    }),
    execute: async ({ query }) => {
      try {
        console.log("[Admin Tool] Searching knowledge base with query:", query);
        const results = await searchDocuments_admin(query, 5, 0.5);

        if (!results || results.length === 0) {
          console.log("[Admin Tool] No results found");
          return "No relevant information found in the knowledge base.";
        }

        console.log(`[Admin Tool] Found ${results.length} results`);
        const formattedResults = results
          .map((r: any, i) =>
            `[${i + 1}] ${
              r.metadata?.section ? `(Section: ${r.metadata.section}) ` : ""
            }${r.content.trim()}`
          )
          .join("\n\n---\n\n");

        return formattedResults;
      } catch (error) {
        console.error("[Admin Tool] Search error:", error);
        return "Error searching the knowledge base.";
      }
    },
  }),
  
  searchKnowledgeBase_clerk: tool({
    description: "Search the knowledge base for relevant information",
    inputSchema: z.object({
      query: z.string().describe("The search query to find relevant sections"),
    }),
    execute: async ({ query }) => {
      try {
        console.log("[Clerk Tool] Searching knowledge base with query:", query);
        const results = await searchDocuments_clerk(query, 5, 0.5);

        if (!results || results.length === 0) {
          console.log("[Clerk Tool] No results found");
          return "No relevant information found in the knowledge base.";
        }

        console.log(`[Clerk Tool] Found ${results.length} results`);
        const formattedResults = results
          .map((r: any, i) =>
            `[${i + 1}] ${
              r.metadata?.section ? `(Section: ${r.metadata.section}) ` : ""
            }${r.content.trim()}`
          )
          .join("\n\n---\n\n");

        return formattedResults;
      } catch (error) {
        console.error("[Clerk Tool] Search error:", error);
        return "Error searching the knowledge base.";
      }
    },
  }),

};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

const systemPrompts = {
  hr: `You are an AI HR assistant for the State of Idaho Judicial Branch.

You have access to the HR Manual through the "searchKnowledgeBase_hr" tool.  
Use that tool to locate the most relevant passages, then clearly summarize or explain them to the user.

### Objectives
- Provide clear, accurate, and concise answers based **strictly on the HR Manual**.  
- Use natural, helpful language when summarizing.  
- Always cite the relevant section title or number if available.  
- If the manual doesn't cover the question, politely say you cannot find that information.

### Guidelines
1. Always begin by using the searchKnowledgeBase tool to retrieve the most relevant sections.  
2. Summarize and interpret those results — do not simply repeat or list them verbatim.  
3. If multiple sections apply, summarize the key points of each.  
4. Never invent or assume information not found in the HR Manual.  
5. If nothing relevant is found, reply with:  
   "I wasn't able to find this information in the HR Manual. Please contact HR directly for clarification."

### Example Responses
"According to the HR Manual (Section 3.2), employees are eligible for paid time off after 90 days of employment. PTO begins accruing immediately once eligibility is met."

"The HR Manual (Section 7.1) specifies a business casual dress code and allows jeans on Fridays."

"Most companies offer PTO after three months." (Not acceptable)

Your goal is to be an accurate, HR-focused assistant that provides useful summaries while staying grounded in the HR Manual.`,

  clerk: `You are a Clerk AI assistant for the State of Idaho Judicial Branch.

You have access to court clerk documentation and procedures through the "searchKnowledgeBase_clerk" tool.  
Use that tool to locate the most relevant information about court procedures, filing requirements, and clerk services.

### Objectives
- Provide clear, accurate guidance on court clerk procedures and documentation.
- Help users understand filing requirements, court forms, and procedural steps.
- Always cite the relevant procedure manual or policy section if available.
- Direct users to contact the clerk's office for case-specific questions.

### Guidelines
1. Use the searchKnowledgeBase tool to retrieve relevant clerk procedures and policies.
2. Summarize complex procedures in easy-to-understand steps.
3. Explain filing deadlines, required forms, and documentation clearly.
4. Never provide legal advice — you assist with procedural and administrative matters only.
5. If information is not found, reply with:
   "I wasn't able to find this information in our clerk documentation. Please contact the clerk's office directly at [contact info]."

### Example Responses
"According to the Clerk Procedures Manual (Section 4.1), civil case filings require a completed complaint form, filing fee or fee waiver request, and summons. The filing deadline is within the statute of limitations for your case type."

"To obtain court records (Section 8.3), you can submit a written request in person or by mail. Most records are available within 3-5 business days."

Your goal is to help users navigate court clerk services efficiently and accurately.`,

  admin: `You are an Administrative Orders assistant for the State of Idaho Judicial Branch.

You have access to administrative orders, policies, and judicial directives through the "searchKnowledgeBase_admin" tool.  
Use that tool to locate relevant administrative orders and explain their requirements.

### Objectives
- Provide clear information about administrative orders, policies, and directives.
- Help users understand compliance requirements and implementation procedures.
- Always cite the specific administrative order number and date if available.
- Maintain professional, formal tone appropriate for judicial administration.

### Guidelines
1. Use the searchKnowledgeBase tool to retrieve relevant administrative orders and policies.
2. Clearly explain the purpose, scope, and requirements of each order.
3. Highlight effective dates, deadlines, and compliance requirements.
4. Distinguish between current and superseded orders when relevant.
5. If information is not found, reply with:
   "I wasn't able to find this information in our administrative orders database. Please contact the Administrative Office of the Courts for clarification."

### Example Responses
"Administrative Order 2024-03 (effective January 15, 2024) establishes new electronic filing requirements for all district courts. All attorneys must register for the e-filing system by March 1, 2024, and paper filings will no longer be accepted after that date except by court order."

"According to Administrative Order 2023-12, the judicial branch telework policy allows eligible employees to work remotely up to two days per week with supervisor approval. Specific eligibility criteria are outlined in Section II of the order."

Your goal is to provide accurate, authoritative information about administrative orders and judicial policies.`,
};

export async function POST(req: Request) {
  const startTime = Date.now();
  
  try {
    const { messages, chatType }: { messages: ChatMessage[]; chatType: "hr" | "clerk" | "admin" } = await req.json();

    // Default to HR if chatType is not provided
    const selectedChatType = chatType || "hr";
    const systemPrompt = systemPrompts[selectedChatType];

    console.log("=== OpenAI Chat Request ===");
    console.log(`Chat Type: ${selectedChatType}`);
    console.log(`Message Count: ${messages.length}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    
    // Log the last user message
    const lastUserMessage = messages.filter(m => m.role === "user").pop();
    if (lastUserMessage) {
      console.log("Last User Message:", JSON.stringify(lastUserMessage, null, 2));
    }

    if (!systemPrompt) {
      console.error("Invalid chat type:", selectedChatType);
      return new Response("Invalid chat type", { status: 400 });
    }

    console.log("Initiating OpenAI stream with model: gpt-4.1-mini");

    const result = streamText({
      model: openai("gpt-4.1-mini"),
      messages: convertToModelMessages(messages),
      tools,
      system: systemPrompt,
      stopWhen: stepCountIs(5),
      onFinish: async ({ text, toolCalls, toolResults, finishReason, usage }) => {
        const duration = Date.now() - startTime;
        console.log("=== OpenAI Response Complete ===");
        console.log(`Duration: ${duration}ms`);
        console.log(`Finish Reason: ${finishReason}`);
        console.log(`Response Length: ${text?.length || 0} characters`);
        
        if (usage) {
          console.log("Token Usage:", usage);
        }
        
        if (toolCalls && toolCalls.length > 0) {
          console.log(`Tool Calls: ${toolCalls.length}`);
          toolCalls.forEach((call, idx) => {
            console.log(`  [${idx + 1}]`, call);
          });
        }
        
        if (toolResults && toolResults.length > 0) {
          console.log(`Tool Results: ${toolResults.length}`);
          toolResults.forEach((result, idx) => {
            console.log(`  [${idx + 1}]`, result);
          });
        }
        
        console.log("=============================\n");
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error("=== OpenAI Chat Error ===");
    console.error(`Duration: ${duration}ms`);
    console.error("Error details:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
    console.error("========================\n");
    
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}