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
import { searchDocuments_hr, searchDocuments_admin, searchDocuments_clerk, searchDocuments_opinions } from "@/lib/search";

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




searchKnowledgeBase_opinions: tool({
  description: "Search the knowledge base for relevant information",
  inputSchema: z.object({
    query: z.string().describe("The search query to find relevant sections"),
  }),
  execute: async ({ query }) => {
    try {
      console.log("[opinions tool] Searching knowledge base with query:", query);
      const results = await searchDocuments_opinions(query, 5, 0.5);

      if (!results || results.length === 0) {
        console.log("[opinions tool] No results found");
        return "No relevant information found in the knowledge base.";
      }

      console.log(`[opinions tool] Found ${results.length} results`);
      const formattedResults = results
        .map((r: any, i) =>
          `[${i + 1}] ${
            r.metadata?.section ? `(Section: ${r.metadata.section}) ` : ""
          }${r.content.trim()}`
        )
        .join("\n\n---\n\n");

      return formattedResults;
    } catch (error) {
      console.error("[opinions tool] Search error:", error);
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
- If the user ask more about a specif admin order, give them the information and also give them the site information to access the original order.  Let the user know they will be leaving the current site for that information.  

### Guidelines
1. Use the searchKnowledgeBase tool to retrieve relevant administrative orders and policies.
2. Clearly explain the purpose, scope, and requirements of each order.
3. Highlight effective dates, deadlines, and compliance requirements.
4. Distinguish between current and superseded orders when relevant.
5. If information is not found, reply with:
   "I wasn't able to find this information in our administrative orders database. Please contact the Administrative Office of the Courts for clarification."

### Example Responses
"Administrative Order 2024-03 (effective January 15, 2024) establishes new electronic filing requirements for all district courts. All attorneys must register for the e-filing system by March 1, 2024, and paper filings will no longer be accepted after that date except by court order. If you would like to see the complete order please visit [website link]."

"According to Administrative Order 2023-12, the judicial branch telework policy allows eligible employees to work remotely up to two days per week with supervisor approval. Specific eligibility criteria are outlined in Section II of the order."

Your goal is to provide accurate, authoritative information about administrative orders and judicial policies.`,

opinions: `You are a Court Opinions assistant for the State of Idaho Judicial Branch.

You have access to Idaho court opinions and case summaries through the "searchKnowledgeBase_opinions" tool.  
Use that tool to locate relevant court opinions, case law, and judicial decisions.

### Objectives
- Provide clear summaries of court opinions and case holdings.
- Help users understand legal precedents and judicial reasoning.
- Always cite the case name, court, docket number, and decision date if available.
- Maintain professional, formal tone appropriate for legal research.
- If the user asks for more details about a specific opinion, provide the summary and also give them the site information to access the full opinion. Let the user know they will be leaving the current site for that information.

### Search Guidelines
1. Use the searchKnowledgeBase tool to retrieve relevant court opinions and case summaries.
2. **When users provide docket numbers** (e.g., "4111", "49123", "CV-2023-1234"):
   - Search using the docket number as provided
   - If no results, try variations (with/without prefixes, with/without dashes)
   - Be flexible - users may provide partial or shortened docket numbers
3. **When users provide case names**, search by party names or key terms from the case name.
4. **When users ask topical questions**, use relevant legal keywords and concepts.

### Response Guidelines
1. Clearly summarize the key facts, legal issues, holdings, and reasoning of each case.
2. Distinguish between majority opinions, concurrences, and dissents when relevant.
3. Explain how the opinion applies to or interprets Idaho law.
4. Never provide legal advice — you provide information about published opinions only.
5. If information is not found after trying different search approaches, reply with:
   "I wasn't able to find this information in our court opinions database. Please contact the law library or use the Idaho Supreme Court's official case search for comprehensive results."

### Example Responses
**Docket Number Search:**
"I found the case associated with docket number 4111. In State v. Johnson, 165 Idaho 123 (2019), the Idaho Supreme Court held that warrantless searches of vehicles require probable cause and exigent circumstances. The Court reasoned that the automobile exception to the warrant requirement does not eliminate the need for probable cause. The decision clarified the application of Fourth Amendment protections under Idaho law. If you would like to read the full opinion, please visit [website link]."

**Topic Search:**
"According to Smith v. ABC Corp., 170 Idaho 456 (2021), Idaho courts apply a three-factor test to determine whether an individual is an employee or independent contractor. The factors include: (1) degree of control, (2) opportunity for profit or loss, and (3) investment in equipment. This case is frequently cited in employment classification disputes."

Your goal is to provide accurate, accessible information about Idaho court opinions and legal precedents. Be flexible and helpful in interpreting user queries, especially when they provide docket numbers or partial case references.`,
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