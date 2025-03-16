import { tool } from "ai";
import { z } from "zod";

export const getWeather = tool({
  description: "Get weather information",
  parameters: z.object({
    location: z.string(),
  }),
  execute: async ({ location: string }) => {
    const result = {
      temperature: "25°C",
    };

    return result;
  },
});
