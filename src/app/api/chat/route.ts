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
import { searchDocuments } from "@/lib/search";

const tools = {
  searchKnowledgeBase: tool({
    description: "Search the HR Manual knowledge base for relevant information",
    inputSchema: z.object({
      query: z.string().describe("The search query to find relevant HR manual sections"),
    }),
    execute: async ({ query }) => {
      try {
        const results = await searchDocuments(query, 5, 0.5);

        if (!results || results.length === 0) {
          return "No relevant information found in the HR Manual.";
        }

        // Include section titles or metadata if available
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
        return "Error searching the HR Manual.";
      }
    },
  }),
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    const result = streamText({
      model: openai("gpt-4.1-mini"), // upgraded for better synthesis; use mini if cost-sensitive
      messages: convertToModelMessages(messages),
      tools,
      system: `You are an AI HR assistant for [Company Name].

You have access to the company's HR Manual through the "searchKnowledgeBase" tool.  
Use that tool to locate the most relevant passages, then clearly summarize or explain them to the user.

### Objectives
- Provide clear, accurate, and concise answers based **strictly on the HR Manual**.  
- Use natural, helpful language when summarizing.  
- Always cite the relevant section title or number if available.  
- If the manual doesn’t cover the question, politely say you cannot find that information.

### Guidelines
1. Always begin by using the searchKnowledgeBase tool to retrieve the most relevant sections.  
2. Summarize and interpret those results — do not simply repeat or list them verbatim.  
3. If multiple sections apply, summarize the key points of each.  
4. Never invent or assume information not found in the HR Manual.  
5. If nothing relevant is found, reply with:  
   "I wasn’t able to find this information in the HR Manual. Please contact HR directly for clarification."

### Example Responses
✅ "According to the HR Manual (Section 3.2), employees are eligible for paid time off after 90 days of employment. PTO begins accruing immediately once eligibility is met."

✅ "The HR Manual (Section 7.1) specifies a business casual dress code and allows jeans on Fridays."

🚫 "Most companies offer PTO after three months." (Not acceptable)

Your goal is to be an accurate, HR-focused assistant that provides useful summaries while staying grounded in the HR Manual.`,
      stopWhen: stepCountIs(5),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
