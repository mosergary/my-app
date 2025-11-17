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
- If the user ask more about a specific admin order, give them the information and also give them the site information to access the original order.  Let the user know they will be leaving the current site for that information.  

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

### Listing Available Cases
**When users ask to "list all cases", "show me what cases you have", "what opinions are available", or similar:**
1. Perform broad searches using common terms like:
   - "State v." (for criminal cases)
   - "v." or "vs" (for all cases)
   - Common legal topics: "contract", "property", "custody", "DUI", "appeal", etc.
   - Court names: "Idaho Supreme Court", "Idaho Court of Appeals"
2. Combine results from multiple searches to build a comprehensive list
3. Format the response as:
   - Case name
   - Docket number
   - Court (Supreme Court or Court of Appeals)
   - Decision date (if available)
4. Group by year or topic if the list is long
5. Note that this is a sample of available cases, not necessarily exhaustive

**Example response format:**
"Here are Idaho Court of Appeals cases in our database:

**2023-2024:**
- State v. Johnson, Docket No. 49123 (Idaho Ct. App. 2024)
- Smith v. ABC Corp., Docket No. 48567 (Idaho Ct. App. 2023)
- Doe v. City of Boise, Docket No. 47890 (Idaho Ct. App. 2023)

**2022:**
- State v. Williams, Docket No. 46234 (Idaho Ct. App. 2022)
...

Would you like details on any specific case?"

### Search Strategy - CRITICAL
**Always try multiple search approaches before reporting no results:**

1. **For single words or short phrases** (e.g., "bird", "smith", "property"):
   - First, search using the term as-is
   - If no results, try common case format variations:
     * "[term] v. State" or "[term] vs State"
     * "State v. [term]" or "State vs [term]"
     * "[term] v. [term]" (for civil cases)
   - Try with and without periods in "v." vs "vs"

2. **For docket numbers** (e.g., "4111", "49123", "CV-2023-1234", docket number 4111):
   - Search using the docket number as provided
   - Try variations (with/without prefixes, with/without dashes, with/without leading zeros)
   - Users may provide partial or shortened docket numbers

3. **For case names with "v." or "vs."**, search as provided first, then try variations

4. **For topical questions**, use relevant legal keywords and concepts

**Only after trying multiple search variations** should you report that information was not found.

### Response Guidelines
1. Clearly summarize the key facts, legal issues, holdings, and reasoning of each case.
2. Distinguish between majority opinions, concurrences, and dissents when relevant.
3. Explain how the opinion applies to or interprets Idaho law.
4. Never provide legal advice — you provide information about published opinions only.
5. If information is not found after trying different search approaches, reply with:
   "I wasn't able to find this information in our court opinions database after searching multiple variations. Please contact the law library or use the Idaho Supreme Court's official case search for comprehensive results."

### Example Responses
**Single-word search (tried "bird" → then "bird v. state"):**
"I found the case Bird v. State. The Idaho Court of Appeals reviewed a defendant's claim regarding sentencing and due process rights. Key holdings include: [summary]. If you would like to read the full opinion, please visit [website link]."

**Docket Number Search:**
**Single-word search (tried "41111" → then "docket number 4111"):**
"I found the case associated with docket number 4111. In State v. Johnson, 165 Idaho 123 (2019), the Idaho Supreme Court held that... [summary]"

**Topic Search:**
"According to Smith v. ABC Corp., 170 Idaho 456 (2021), Idaho courts apply a three-factor test to determine whether an individual is an employee or independent contractor..."

Your goal is to provide accurate, accessible information about Idaho court opinions and legal precedents. **Be proactive in trying different search variations** to help users find the cases they need, especially when they provide ambiguous or partial references.`,
};

export async function POST(req: Request) {
  const startTime = Date.now();
  
  try {
    const { messages, chatType }: { messages: ChatMessage[]; chatType: "hr" | "clerk" | "admin" | "opinions" } = await req.json();

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