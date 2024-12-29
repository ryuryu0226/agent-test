import { openai } from "@ai-sdk/openai";
import { generateText, tool } from "ai";
import * as mathjs from "mathjs";
import { z } from "zod";

export const getEarnings = async () => {
  const { toolCalls, steps } = await generateText({
    model: openai("gpt-4o", { structuredOutputs: true }),
    tools: {
      calculate: tool({
        description:
          "A tool for evaluating mathematical expressions. Example expressions: " +
          "'1.2 * (2 + 4.5)', '12.7 cm to inch', 'sin(45 deg) ^ 2'.",
        parameters: z.object({ expression: z.string() }),
        execute: async ({ expression }) => mathjs.evaluate(expression),
      }),
      // answer tool: the LLM will provide a structured answer
      answer: tool({
        description: "A tool for providing the final answer.",
        parameters: z.object({
          steps: z.array(
            z.object({
              calculation: z.string(),
              reasoning: z.string(),
            })
          ),
          answer: z.string(),
        }),
        // no execute function - invoking it will terminate the agent
      }),
    },
    toolChoice: "required",
    maxSteps: 10,
    onStepFinish: ({ toolCalls }) => {
      console.log(`STEP FINISHED: ${JSON.stringify(toolCalls, null, 2)}`);
    },
    system:
      "You are solving math problems. " +
      "Reason step by step. " +
      "Use the calculator when necessary. " +
      "When you give the final answer, " +
      "provide an explanation for how you arrived at it.",
    prompt:
      "A taxi driver earns $9461 per 1-hour of work. " +
      "If he works 12 hours a day and in 1 hour " +
      "he uses 12 liters of petrol with a price  of $134 for 1 liter. " +
      "How much money does he earn in one day?",
  });

  // extract all tool calls from the steps:
  const allToolCalls = steps.flatMap((step) => step.toolCalls);
  console.log(`ALL TOOL CALLS: ${JSON.stringify(allToolCalls, null, 2)}`);
  console.log(`RESPONSE: ${JSON.stringify(toolCalls, null, 2)}`);

  const answer =
    toolCalls[0].args && "answer" in toolCalls[0].args
      ? toolCalls[0].args.answer
      : null;
  return answer;
};
