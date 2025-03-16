import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

import { getWeather } from "./tools";

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
    tools: { getWeather },
    maxSteps: 10,
  });

  return result.toDataStreamResponse();
}
