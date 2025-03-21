import { createOpenAI } from "@ai-sdk/openai";
import { jsonSchema, streamText } from "ai";

const openai = createOpenAI();

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, system, tools } = await req.json();
  console.log({ messages, system, tools });

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    // forward system prompt and tools from the frontend
    system,
    tools: Object.fromEntries(
      Object.entries<{ parameters: unknown }>(tools).map(([name, tool]) => [
        name,
        {
          parameters: jsonSchema(tool.parameters!),
        },
      ])
    ),
    maxSteps: 10,
  });

  return result.toDataStreamResponse();
}
