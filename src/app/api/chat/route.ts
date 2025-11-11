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
        const results = await searchDocuments_hr(query, 5, 0.5);

        if (!results || results.length === 0) {
          return "No relevant information found in the knowledge base.";
        }

        const formattedResults = results
          .map((r: any, i) =>
            `[${i + 1}] ${
              r.metadata?.section ? `(Section: ${r.metadata.section}) ` : ""
            }${r.content.trim()}`
          )
          .join("\n\n---\n\n");

        return formattedResults;
      } catch (error) {
        console.error("Search error:", error);
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
        const results = await searchDocuments_admin(query, 5, 0.5);

        if (!results || results.length === 0) {
          return "No relevant information found in the knowledge base.";
        }

        const formattedResults = results
          .map((r: any, i) =>
            `[${i + 1}] ${
              r.metadata?.section ? `(Section: ${r.metadata.section}) ` : ""
            }${r.content.trim()}`
          )
          .join("\n\n---\n\n");

        return formattedResults;
      } catch (error) {
        console.error("Search error:", error);
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
        const results = await searchDocuments_clerk(query, 5, 0.5);

        if (!results || results.length === 0) {
          return "No relevant information found in the knowledge base.";
        }

        const formattedResults = results
          .map((r: any, i) =>
            `[${i + 1}] ${
              r.metadata?.section ? `(Section: ${r.metadata.section}) ` : ""
            }${r.content.trim()}`
          )
          .join("\n\n---\n\n");

        return formattedResults;
      } catch (error) {
        console.error("Search error:", error);
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
  try {
    const { messages, chatType }: { messages: ChatMessage[]; chatType: "hr" | "clerk" | "admin" } = await req.json();

    // Default to HR if chatType is not provided
    const selectedChatType = chatType || "hr";
    const systemPrompt = systemPrompts[selectedChatType];

    if (!systemPrompt) {
      return new Response("Invalid chat type", { status: 400 });
    }

    const result = streamText({
      model: openai("gpt-4.1-mini"),
      messages: convertToModelMessages(messages),
      tools,
      system: systemPrompt,
      stopWhen: stepCountIs(5),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}