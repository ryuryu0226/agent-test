"use client";

import { useAssistantRuntime, tool } from "@assistant-ui/react";
import { z } from "zod";

import { WeatherInformationToolUI } from "@/features/tool-ui-test/web-search-tool-ui";
import { Thread } from "@/components/assistant-ui/thread";
import { useEffect } from "react";

export function AgentThread() {
  const assistantRuntime = useAssistantRuntime();

  const getWeather = tool({
    description: "Get weather information",
    parameters: z.object({
      location: z.string(),
    }),
    execute: async (
      args: { location: string },
      {
        toolCallId,
        abortSignal,
      }: { toolCallId: string; abortSignal: AbortSignal }
    ) => {
      const result = {
        temperature: "25°C",
      };

      return result;
    },
  });

  useEffect(() => {
    return assistantRuntime.registerModelContextProvider({
      getModelContext: () => ({
        system:
          "あなたは天気情報を取得できます。もし天気を聞かれたら、天気情報を取得し、分かりやすく伝えて。",
        tools: { getWeather },
      }),
    });
  }, [assistantRuntime]);

  return (
    <>
      <div className="h-dvh">
        <Thread />
      </div>
      <WeatherInformationToolUI />
    </>
  );
}
